import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SEO from '@/components/common/SEO';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { coursesData } from '@/data/courses';
import VideoPlayer from '@/components/video/VideoPlayer';
import styles from '@/styles/Watch.module.css';

export default function Watch() {
  const router = useRouter();
  const { id } = router.query;
  const { user, loading } = useAuth();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [watchProgress, setWatchProgress] = useState({});

  // Check for YouTube video from sessionStorage
  const [tempCourse, setTempCourse] = useState(null);
  
  useEffect(() => {
    const stored = sessionStorage.getItem('tempCourse');
    if (stored && id?.startsWith('youtube-')) {
      setTempCourse(JSON.parse(stored));
    }
  }, [id]);

  const course = tempCourse || coursesData.find(c => c.id === parseInt(id));

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!course || !course.lessons || course.lessons.length === 0) {
    return (
      <div className={styles.notFound}>
        <h1>Course Not Found</h1>
        <p>This course doesn't have any video lessons yet.</p>
        <Link href="/courses" className={styles.backBtn}>
          Back to Courses
        </Link>
      </div>
    );
  }

  const handleProgress = (played, playedSeconds) => {
    setWatchProgress(prev => ({
      ...prev,
      [currentLesson]: { played, playedSeconds }
    }));
  };

  const handleVideoEnded = () => {
    // Auto-play next lesson
    if (currentLesson < course.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const selectLesson = (index) => {
    setCurrentLesson(index);
  };

  const currentVideo = course.lessons[currentLesson];
  const isYouTubeVideo = course.isYouTube || id?.startsWith('youtube-');

  return (
    <>
      <SEO 
        title={`${course.title} - Watch - LearnHub`}
        description={`Watch ${course.title} video lessons. Learn ${course.tech} with ${course.instructor}.`}
        keywords={`${course.title}, video lessons, ${course.tech}, online learning`}
      />

      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/courses">Courses</Link>
          <span className={styles.separator}>›</span>
          {!isYouTubeVideo && (
            <>
              <Link href={`/course/${id}`}>{course.title}</Link>
              <span className={styles.separator}>›</span>
            </>
          )}
          <span className={styles.current}>Watch</span>
        </div>

        {/* Full-width layout for YouTube videos */}
        {isYouTubeVideo ? (
          <div className={styles.youtubeLayout}>
            <div className={styles.youtubeVideoSection}>
              <VideoPlayer
                url={currentVideo.videoUrl}
                onProgress={handleProgress}
                onEnded={handleVideoEnded}
                initialProgress={watchProgress[currentLesson]?.played || 0}
              />

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
                    <h3 className={styles.descriptionTitle}>About this video</h3>
                    <p className={styles.descriptionText}>{course.description}</p>
                  </div>
                )}

                <div className={styles.youtubeActions}>
                  <button 
                    onClick={() => router.push('/courses')} 
                    className={styles.backToCourses}
                  >
                    ← Back to Courses
                  </button>
                  <a 
                    href={currentVideo.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.watchOnYoutube}
                  >
                    Watch on YouTube ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.watchLayout}>
          {/* Video Section */}
          <div className={styles.videoSection}>
            <VideoPlayer
              url={currentVideo.videoUrl}
              onProgress={handleProgress}
              onEnded={handleVideoEnded}
              initialProgress={watchProgress[currentLesson]?.played || 0}
            />

            <div className={styles.videoInfo}>
              <h1 className={styles.videoTitle}>{currentVideo.title}</h1>
              <div className={styles.videoMeta}>
                <span>Lesson {currentLesson + 1} of {course.lessons.length}</span>
                <span className={styles.metaDivider}>•</span>
                <span>{currentVideo.duration}</span>
              </div>
            </div>

            <div className={styles.courseInfo}>
              <h2>{course.title}</h2>
              <p className={styles.instructor}>By {course.instructor}</p>
              <p className={styles.description}>{course.description}</p>
            </div>
          </div>

          {/* Lesson List Sidebar */}
          <div className={styles.lessonsSidebar}>
            <div className={styles.sidebarHeader}>
              <h3>Course Content</h3>
              <span className={styles.lessonCount}>
                {course.lessons.length} lessons
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
