import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SEO from '@/components/common/SEO';
import { useAuth } from '@/context/AuthContext';
import { coursesData, techIconMap } from '@/data/courses';
import { getString, ROUTES } from '@/config';
import styles from '@/styles/Dashboard.module.css';

// Format seconds into human-readable watch time
function formatWatchTime(totalSeconds) {
  if (!totalSeconds || totalSeconds <= 0) return null;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m`;
  return '<1m';
}

// Get status label for a course based on progress
function getCourseStatus(progress) {
  if (progress >= 100) return { label: getString('dashboard.statusCompleted'), type: 'completed' };
  if (progress > 0) return { label: getString('dashboard.statusInProgress'), type: 'in-progress' };
  return { label: getString('dashboard.statusNotStarted'), type: 'not-started' };
}

export default function Dashboard() {
  const { user, loading, getEnrolledCourses, unenrollFromCourse, logout } = useAuth();
  const router = useRouter();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [removingCourseId, setRemovingCourseId] = useState(null);   // course being removed (loading)
  const [confirmRemoveId, setConfirmRemoveId] = useState(null);     // course pending confirmation

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push(ROUTES.LOGIN);
    }
  }, [user, loading, router]);

  // Fetch enrolled courses
  const fetchEnrolledCourses = useCallback(async () => {
    if (!user) return;
    setLoadingCourses(true);
    try {
      const enrolled = await getEnrolledCourses();

      // Map enrolled course IDs to actual course data
      const coursesWithData = enrolled.map(enrolledCourse => {
        const courseData = coursesData.find(c => c.id === enrolledCourse.courseId);
        if (!courseData) return null;
        return {
          ...courseData,
          Icon: techIconMap[courseData.tech] || null,
          enrolledAt: enrolledCourse.enrolledAt,
          progress: enrolledCourse.progress || 0,
          completedLessons: enrolledCourse.completedLessons || [],
          totalWatchTime: enrolledCourse.totalWatchTime || 0,
        };
      }).filter(Boolean);

      setEnrolledCourses(coursesWithData);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    } finally {
      setLoadingCourses(false);
    }
  }, [user, getEnrolledCourses]);

  useEffect(() => {
    fetchEnrolledCourses();
  }, [fetchEnrolledCourses]);

  // Handle course removal
  const handleRemoveCourse = async (courseId) => {
    setRemovingCourseId(courseId);
    try {
      await unenrollFromCourse(courseId);
      setEnrolledCourses(prev => prev.filter(c => c.id !== courseId));
    } catch (error) {
      console.error('Error removing course:', error);
    } finally {
      setRemovingCourseId(null);
      setConfirmRemoveId(null);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push(ROUTES.HOME);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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

  return (
    <>
      <SEO
        title={getString('pageTitles.dashboard')}
        description={getString('pageDescriptions.dashboard')}
      />

      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>
              {getString('dashboard.welcomeBack')}, {user.displayName || getString('messages.student')}!
            </h1>
            <p className={styles.subtitle}>{getString('dashboard.pageSubtitle')}</p>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            {getString('nav.logout')}
          </button>
        </div>

        {/* ─── Stats Section (moved up for quick glance) ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📊 {getString('dashboard.pageTitle')}</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>{getString('dashboardStats.enrolledIcon')}</div>
              <div className={styles.statValue}>{enrolledCourses.length}</div>
              <div className={styles.statLabel}>{getString('dashboardStats.enrolledCoursesLabel')}</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>{getString('dashboardStats.completedIcon')}</div>
              <div className={styles.statValue}>
                {enrolledCourses.filter(c => c.progress === 100).length}
              </div>
              <div className={styles.statLabel}>{getString('dashboardStats.completedLabel')}</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>{getString('dashboardStats.inProgressIcon')}</div>
              <div className={styles.statValue}>
                {enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length}
              </div>
              <div className={styles.statLabel}>{getString('dashboardStats.inProgressLabel')}</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>{getString('dashboardStats.hoursIcon')}</div>
              <div className={styles.statValue}>
                {formatWatchTime(enrolledCourses.reduce((sum, c) => sum + (c.totalWatchTime || 0), 0)) || '0h'}
              </div>
              <div className={styles.statLabel}>{getString('dashboardStats.hoursLearnedLabel')}</div>
            </div>
          </div>
        </section>

        {/* ─── My Enrolled Courses ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{getString('dashboard.myCourses')}</h2>

          {loadingCourses ? (
            <div className={styles.loadingCourses}>
              <p>{getString('messages.loadingYourCourses')}</p>
            </div>
          ) : enrolledCourses.length > 0 ? (
            <div className={styles.coursesGrid}>
              {enrolledCourses.map((course) => {
                const status = getCourseStatus(course.progress);
                const CourseIcon = course.Icon;
                const totalLessons = course.lessons?.length || 0;
                const completedCount = course.completedLessons?.length || 0;
                const watchTimeLabel = formatWatchTime(course.totalWatchTime);

                return (
                  <div key={course.id} className={`${styles.courseCard} ${status.type === 'completed' ? styles.courseCardCompleted : ''}`}>
                    {/* Status badge */}
                    <div className={`${styles.statusBadge} ${styles[`status_${status.type.replace('-', '_')}`]}`}>
                      {status.type === 'completed' && '✓ '}{status.label}
                    </div>

                    {/* Course header with icon */}
                    <div className={styles.courseHeader}>
                      <div className={styles.courseIconWrapper}>
                        {CourseIcon ? (
                          <CourseIcon className={styles.techIcon} />
                        ) : (
                          <span className={styles.courseIcon}>📚</span>
                        )}
                      </div>
                      <div className={styles.courseMeta}>
                        <span className={styles.courseLevel}>{course.level}</span>
                        <span className={styles.courseDuration}>{course.duration}</span>
                      </div>
                    </div>

                    <h3 className={styles.courseTitle}>{course.title}</h3>
                    <p className={styles.courseCategory}>{course.category}</p>

                    {/* Progress section */}
                    <div className={styles.progressSection}>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className={styles.progressDetails}>
                        <span className={styles.progressPercent}>
                          {course.progress}% {getString('dashboard.completed')}
                        </span>
                        {totalLessons > 0 && (
                          <span className={styles.lessonCount}>
                            {completedCount}/{totalLessons} {getString('dashboard.lessonsSuffix')}
                          </span>
                        )}
                      </div>
                      {watchTimeLabel && (
                        <div className={styles.watchTimeLabel}>
                          🕐 {watchTimeLabel} {getString('dashboard.watchTime')}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className={styles.courseActions}>
                      {course.progress < 100 ? (
                        <Link href={ROUTES.COURSE_WATCH(course.id)} className={styles.continueBtn}>
                          ▶ {getString('dashboard.continueLearning')}
                        </Link>
                      ) : (
                        <Link href={ROUTES.COURSE_WATCH(course.id)} className={styles.continueBtn}>
                          🔄 {getString('dashboard.continueLearning')}
                        </Link>
                      )}
                      <div className={styles.secondaryActions}>
                        <Link href={ROUTES.COURSE_DETAIL(course.id)} className={styles.viewCourseBtn}>
                          {getString('dashboard.viewCourse')}
                        </Link>
                        <button
                          onClick={() => setConfirmRemoveId(course.id)}
                          className={styles.removeBtn}
                          disabled={removingCourseId === course.id}
                        >
                          {removingCourseId === course.id ? getString('dashboard.removing') : getString('dashboard.removeCourse')}
                        </button>
                      </div>
                    </div>

                    <p className={styles.enrolledDate}>
                      {getString('course.enrolled')}: {new Date(course.enrolledAt).toLocaleDateString()}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📖</div>
              <p>{getString('dashboard.noCourses')}</p>
              <Link href={ROUTES.COURSES} className={styles.browseBtn}>
                {getString('dashboard.browseCourses')}
              </Link>
            </div>
          )}
        </section>

        {/* ─── Profile Section ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>👤 {getString('dashboard.profileTitle')}</h2>
          <div className={styles.profileCard}>
            <div className={styles.profileInfo}>
              <p><strong>{getString('dashboard.profileName')}:</strong> {user.displayName || getString('dashboard.profileNotSet')}</p>
              <p><strong>{getString('dashboard.profileEmail')}:</strong> {user.email}</p>
              <p><strong>{getString('dashboard.profileMemberSince')}:</strong> {new Date(user.metadata.creationTime).toLocaleDateString()}</p>
            </div>
          </div>
        </section>
      </div>

      {/* ─── Remove Course Confirmation Modal ─── */}
      {confirmRemoveId && (
        <div className={styles.modalOverlay} onClick={() => setConfirmRemoveId(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}>⚠️</div>
            <h3 className={styles.modalTitle}>{getString('dashboard.removeCourseConfirmTitle')}</h3>
            <p className={styles.modalText}>
              {getString('dashboard.removeCourseConfirmText')}
            </p>
            <div className={styles.modalActions}>
              <button
                onClick={() => setConfirmRemoveId(null)}
                className={styles.modalCancelBtn}
              >
                {getString('dashboard.removeCourseCancel')}
              </button>
              <button
                onClick={() => handleRemoveCourse(confirmRemoveId)}
                className={styles.modalConfirmBtn}
                disabled={removingCourseId === confirmRemoveId}
              >
                {removingCourseId === confirmRemoveId
                  ? getString('dashboard.removing')
                  : getString('dashboard.removeCourseConfirmBtn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}