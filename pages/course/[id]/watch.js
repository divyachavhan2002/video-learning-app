import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import SEO from '@/components/common/SEO';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { coursesData } from '@/data/courses';
import VideoPlayer from '@/components/video/VideoPlayer';
import { getString, ROUTES } from '@/config';
import styles from '@/styles/Watch.module.css';

export default function Watch() {
  const router = useRouter();
  const { id } = router.query;
  const { user, loading, updateCourseProgress, getEnrolledCourses } = useAuth();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [watchProgress, setWatchProgress] = useState({});
  const [videoError, setVideoError] = useState(null);
  const [progressLoaded, setProgressLoaded] = useState(false);

  // Auto-next countdown state
  const [autoNextCountdown, setAutoNextCountdown] = useState(null); // null = not showing, number = seconds left
  const countdownTimerRef = useRef(null);

  // Use refs for tracking to avoid stale closure issues
  const lessonWatchTimeRef = useRef(0);
  const lastTickRef = useRef(0);
  const savedRef = useRef({});

  // Check for YouTube video from sessionStorage
  const [tempCourse, setTempCourse] = useState(null);
  
  useEffect(() => {
    const stored = sessionStorage.getItem('tempCourse');
    if (stored && id?.startsWith('youtube-')) {
      try {
        setTempCourse(JSON.parse(stored));
      } catch {
        sessionStorage.removeItem('tempCourse');
      }
    }
  }, [id]);

  const course = tempCourse || coursesData.find(c => c.id === parseInt(id));
  const isYouTubeSearch = course?.isYouTube || id?.startsWith('youtube-');
  const courseId = !isYouTubeSearch ? parseInt(id) : null;

  // Load previously completed lessons from Firestore on mount and resume position
  useEffect(() => {
    if (!user || !courseId) return;

    const loadProgress = async () => {
      try {
        const enrolled = await getEnrolledCourses();
        const entry = enrolled.find(c => c.courseId === courseId);
        if (entry?.completedLessons?.length > 0) {
          const restored = {};
          for (const lessonIdx of entry.completedLessons) {
            restored[lessonIdx] = { played: 1, playedSeconds: 0, saved: true };
          }
          setWatchProgress(restored);
          savedRef.current = { ...savedRef.current, ...Object.fromEntries(entry.completedLessons.map(i => [i, true])) };

          // Auto-resume: find the first uncompleted lesson
          const courseData = coursesData.find(c => c.id === courseId);
          if (courseData?.lessons) {
            const totalLessons = courseData.lessons.length;
            const completedSet = new Set(entry.completedLessons);
            let resumeIndex = 0;
            for (let i = 0; i < totalLessons; i++) {
              if (!completedSet.has(i)) {
                resumeIndex = i;
                break;
              }
              // If all done, stay on last lesson
              if (i === totalLessons - 1) resumeIndex = i;
            }
            // Clamp to valid range
            setCurrentLesson(Math.min(resumeIndex, totalLessons - 1));
          }
        }
      } catch (err) {
        console.error('Error loading saved progress:', err);
      } finally {
        setProgressLoaded(true);
      }
    };
    loadProgress();
  }, [user, courseId, getEnrolledCourses]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      sessionStorage.setItem('redirectAfterLogin', ROUTES.COURSE_WATCH(id));
      router.push(ROUTES.LOGIN);
    }
  }, [user, loading, router, id]);

  // Save unsaved watch time on unmount (page leave, navigation)
  const saveCurrentProgress = useCallback(() => {
    if (!courseId || !course?.lessons || isYouTubeSearch) return;
    const watchTime = lessonWatchTimeRef.current;
    if (watchTime > 0 && !savedRef.current[currentLesson]) {
      // Fire-and-forget save of accumulated watch time
      updateCourseProgress(courseId, currentLesson, Math.round(watchTime), course.lessons.length);
      savedRef.current[currentLesson] = true;
      lessonWatchTimeRef.current = 0;
    }
  }, [courseId, course, currentLesson, isYouTubeSearch, updateCourseProgress]);

  // Save on page unload (browser close/navigate away)
  useEffect(() => {
    const handleBeforeUnload = () => saveCurrentProgress();
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Also save on component unmount (Next.js navigation)
      saveCurrentProgress();
    };
  }, [saveCurrentProgress]);

  // Go to next lesson (shared by auto-next countdown and skip button)
  const goToNextLesson = useCallback(() => {
    // Clear any running countdown
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    setAutoNextCountdown(null);

    if (!course?.lessons || currentLesson >= course.lessons.length - 1) return;
    saveCurrentProgress();
    lessonWatchTimeRef.current = 0;
    lastTickRef.current = 0;
    setCurrentLesson(prev => prev + 1);
  }, [course, currentLesson, saveCurrentProgress]);

  // Cancel auto-next countdown
  const cancelAutoNext = useCallback(() => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    setAutoNextCountdown(null);
  }, []);

  // Clean up countdown timer on unmount
  useEffect(() => {
    return () => {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>{getString('messages.loading')}</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!course || !course.lessons || course.lessons.length === 0) {
    return (
      <div className={styles.notFound}>
        <h1>{getString('courseDetail.notFoundTitle')}</h1>
        <p>This course doesn&apos;t have any video lessons yet.</p>
        <Link href={ROUTES.COURSES} className={styles.backBtn}>
          {getString('messages.backToCourses')}
        </Link>
      </div>
    );
  }

  const handleProgress = (played, playedSeconds) => {
    // Calculate real time delta (only count forward seeking up to 3s gaps as real watching)
    const prevSeconds = lastTickRef.current;
    const timeDelta = playedSeconds > prevSeconds ? playedSeconds - prevSeconds : 0;
    lastTickRef.current = playedSeconds;
    
    setWatchProgress(prev => ({
      ...prev,
      [currentLesson]: { played, playedSeconds }
    }));

    // Accumulate actual watch time (ignore large jumps from seeking)
    if (timeDelta > 0 && timeDelta < 3) {
      lessonWatchTimeRef.current += timeDelta;
    }

    // Save progress when lesson is >90% complete
    if (played > 0.9 && !savedRef.current[currentLesson] && !isYouTubeSearch) {
      savedRef.current[currentLesson] = true;
      setWatchProgress(prev => ({
        ...prev,
        [currentLesson]: { ...prev[currentLesson], saved: true }
      }));
      
      if (courseId && course.lessons) {
        updateCourseProgress(courseId, currentLesson, Math.round(lessonWatchTimeRef.current), course.lessons.length);
        lessonWatchTimeRef.current = 0;
      }
    }
  };

  const handleVideoEnded = () => {
    // Save watch time for completed lesson
    if (!isYouTubeSearch && courseId && course.lessons && !savedRef.current[currentLesson]) {
      savedRef.current[currentLesson] = true;
      updateCourseProgress(courseId, currentLesson, Math.round(lessonWatchTimeRef.current), course.lessons.length);
      lessonWatchTimeRef.current = 0;
    }

    // Mark current lesson as completed in watchProgress
    setWatchProgress(prev => ({
      ...prev,
      [currentLesson]: { ...prev[currentLesson], played: 1, saved: true }
    }));

    // Start auto-next countdown if there are more lessons
    if (course?.lessons && currentLesson < course.lessons.length - 1) {
      setAutoNextCountdown(5);
      countdownTimerRef.current = setInterval(() => {
        setAutoNextCountdown(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(countdownTimerRef.current);
            countdownTimerRef.current = null;
            // Trigger next lesson on next tick to avoid setState during render
            setTimeout(() => goToNextLesson(), 0);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const selectLesson = (index) => {
    // Cancel any running auto-next countdown
    cancelAutoNext();
    // Save progress for current lesson before switching
    saveCurrentProgress();
    lessonWatchTimeRef.current = 0;
    lastTickRef.current = 0;
    setCurrentLesson(index);
    setVideoError(null);
  };

  const handleVideoError = (error) => {
    setVideoError(error);
  };

  const currentVideo = course?.lessons?.[currentLesson];
  const isYouTubeVideo = isYouTubeSearch;
  const hasNextLesson = course?.lessons && currentLesson < course.lessons.length - 1;
  const nextLesson = hasNextLesson ? course.lessons[currentLesson + 1] : null;

  // Guard against out-of-bounds currentLesson (e.g. during async resume)
  if (!currentVideo) {
    return (
      <div className={styles.loading}>
        <p>{getString('messages.loading')}</p>
      </div>
    );
  }

  // Show error state if video cannot be played
  if (videoError) {
    return (
      <>
        <SEO 
          title={`${getString('watch.unableToPlay')} - ${getString('appName')}`}
          description={getString('watch.unableToPlay')}
        />
        <div className={styles.container}>
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>⚠️</div>
            <h1 className={styles.errorTitle}>{getString('watch.unableToPlay')}</h1>
            <p className={styles.errorMessage}>{videoError}</p>
            <p className={styles.errorDescription}>
              {getString('watch.videoRestricted')}
            </p>
            <div className={styles.errorActions}>
              <button 
                onClick={() => router.push(ROUTES.COURSES)} 
                className={styles.backToCoursesBtn}
              >
                {getString('watch.backToCourses')}
              </button>
              <a 
                href={currentVideo?.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.watchOnYoutubeBtn}
              >
                {getString('watch.watchOnYoutube')}
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title={`${course.title} - Watch - ${getString('appName')}`}
        description={`Watch ${course.title} video lessons. Learn ${course.tech} with ${course.instructor}.`}
        keywords={`${course.title}, video lessons, ${course.tech}, online learning`}
      />

      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href={ROUTES.COURSES}>{getString('nav.courses')}</Link>
          <span className={styles.separator}>{getString('courseDetail.breadcrumbSeparator')}</span>
          {!isYouTubeVideo && (
            <>
              <Link href={ROUTES.COURSE_DETAIL(id)}>{course.title}</Link>
              <span className={styles.separator}>{getString('courseDetail.breadcrumbSeparator')}</span>
            </>
          )}
          <span className={styles.current}>Watch</span>
        </div>

        {/* Full-width layout for YouTube videos */}
        {isYouTubeVideo ? (
          <div className={styles.youtubeLayout}>
            <div className={styles.youtubeVideoSection}>
              <div className={styles.videoPlayerWrapper}>
                <VideoPlayer
                  url={currentVideo.videoUrl}
                  onProgress={handleProgress}
                  onEnded={handleVideoEnded}
                  onError={handleVideoError}
                  initialProgress={watchProgress[currentLesson]?.played || 0}
                />

                {autoNextCountdown !== null && (
                  <div className={styles.autoNextOverlay}>
                    <div className={styles.autoNextContent}>
                      <span className={styles.autoNextLabel}>{getString('watch.upNext')}</span>
                      <h3 className={styles.autoNextLessonTitle}>{nextLesson?.title}</h3>
                      <div className={styles.countdownTimer}>
                        {getString('watch.nextIn')} <span className={styles.countdownNumber}>{autoNextCountdown}</span>{getString('watch.seconds')}
                      </div>
                      <div className={styles.countdownBar}>
                        <div
                          className={styles.countdownProgress}
                          style={{ width: `${((5 - autoNextCountdown) / 5) * 100}%` }}
                        />
                      </div>
                      <div className={styles.autoNextActions}>
                        <button onClick={goToNextLesson} className={styles.playNowBtn}>
                          {getString('watch.playNow')}
                        </button>
                        <button onClick={cancelAutoNext} className={styles.cancelBtn}>
                          {getString('watch.cancelAutoplay')}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {!hasNextLesson && watchProgress[currentLesson]?.played >= 0.9 && autoNextCountdown === null && (
                  <div className={styles.autoNextOverlay}>
                    <div className={styles.autoNextContent}>
                      <p className={styles.allDoneMessage}>{getString('watch.allLessonsCompleted')}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.youtubeVideoInfo}>
                <div className={styles.youtubeTitleSection}>
                  <h1 className={styles.youtubeVideoTitle}>{currentVideo.title}</h1>
                  <div className={styles.youtubeChannelInfo}>
                    <span className={styles.channelIcon}>👤</span>
                    <span className={styles.channelName}>{course.instructor}</span>
                  </div>
                </div>

                {course.description && course.description.trim() && (
                  <div className={styles.youtubeDescription}>
                    <h3 className={styles.descriptionTitle}>{getString('watch.aboutVideo')}</h3>
                    <p className={styles.descriptionText}>{course.description}</p>
                  </div>
                )}

                <div className={styles.youtubeActions}>
                  <button 
                    onClick={() => router.push(ROUTES.COURSES)} 
                    className={styles.backToCourses}
                  >
                    {getString('watch.backToCourses')}
                  </button>
                  <a 
                    href={currentVideo.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.watchOnYoutube}
                  >
                    {getString('watch.watchOnYoutube')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.watchLayout}>
          {/* Video Section */}
          <div className={styles.videoSection}>
            <div className={styles.videoPlayerWrapper}>
              <VideoPlayer
                url={currentVideo.videoUrl}
                onProgress={handleProgress}
                onEnded={handleVideoEnded}
                onError={handleVideoError}
                initialProgress={watchProgress[currentLesson]?.played || 0}
              />

              {autoNextCountdown !== null && (
                <div className={styles.autoNextOverlay}>
                  <div className={styles.autoNextContent}>
                    <span className={styles.autoNextLabel}>{getString('watch.upNext')}</span>
                    <h3 className={styles.autoNextLessonTitle}>{nextLesson?.title}</h3>
                    <div className={styles.countdownTimer}>
                      {getString('watch.nextIn')} <span className={styles.countdownNumber}>{autoNextCountdown}</span>{getString('watch.seconds')}
                    </div>
                    <div className={styles.countdownBar}>
                      <div
                        className={styles.countdownProgress}
                        style={{ width: `${((5 - autoNextCountdown) / 5) * 100}%` }}
                      />
                    </div>
                    <div className={styles.autoNextActions}>
                      <button onClick={goToNextLesson} className={styles.playNowBtn}>
                        {getString('watch.playNow')}
                      </button>
                      <button onClick={cancelAutoNext} className={styles.cancelBtn}>
                        {getString('watch.cancelAutoplay')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {!hasNextLesson && watchProgress[currentLesson]?.played >= 0.9 && autoNextCountdown === null && (
                <div className={styles.autoNextOverlay}>
                  <div className={styles.autoNextContent}>
                    <p className={styles.allDoneMessage}>{getString('watch.allLessonsCompleted')}</p>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.videoInfo}>
              <h1 className={styles.videoTitle}>{currentVideo.title}</h1>
              <div className={styles.videoMeta}>
                <span>{getString('watch.lesson')} {currentLesson + 1} {getString('watch.of')} {course.lessons.length}</span>
                <span className={styles.metaDivider}>•</span>
                <span>{currentVideo.duration}</span>
              </div>
            </div>

            <div className={styles.courseInfo}>
              <h2>{course.title}</h2>
              <p className={styles.instructor}>{getString('watch.by')} {course.instructor}</p>
              <p className={styles.description}>{course.description}</p>
            </div>
          </div>

          {/* Lesson List Sidebar */}
          <div className={styles.lessonsSidebar}>
            <div className={styles.sidebarHeader}>
              <h3>{getString('watch.courseContent')}</h3>
              <span className={styles.lessonCount}>
                {course.lessons.length} {getString('course.lessons')}
              </span>
            </div>

            <div className={styles.lessonsList}>
              {course.lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  onClick={() => selectLesson(index)}
                  className={`${styles.lessonItem} ${
                    currentLesson === index ? styles.active : ''
                  } ${watchProgress[index]?.played > 0.9 ? styles.completed : ''}`}
                >
                  <div className={styles.lessonNumber}>
                    {watchProgress[index]?.played > 0.9 ? '✓' : index + 1}
                  </div>
                  <div className={styles.lessonDetails}>
                    <div className={styles.lessonTitle}>{lesson.title}</div>
                    <div className={styles.lessonDuration}>{lesson.duration}</div>
                  </div>
                  {currentLesson === index && (
                    <div className={styles.playingIndicator}>▶️</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        )}
      </div>
    </>
  );
}
