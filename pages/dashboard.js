import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import SEO from '@/components/common/SEO';
import { useAuth } from '@/context/AuthContext';
import { coursesData } from '@/data/courses';
import { getString } from '@/config';
import styles from '@/styles/Dashboard.module.css';

export default function Dashboard() {
  const { user, loading, getEnrolledCourses, logout } = useAuth();
  const router = useRouter();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  // Fetch enrolled courses
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (user) {
        setLoadingCourses(true);
        try {
          const enrolled = await getEnrolledCourses();
          
          // Map enrolled course IDs to actual course data
          const coursesWithData = enrolled.map(enrolledCourse => {
            const courseData = coursesData.find(c => c.id === enrolledCourse.courseId);
            return {
              ...courseData,
              enrolledAt: enrolledCourse.enrolledAt,
              progress: enrolledCourse.progress || 0,
              completedLessons: enrolledCourse.completedLessons || [],
              totalWatchTime: enrolledCourse.totalWatchTime || 0,
            };
          }).filter(course => course.id); // Filter out any courses not found
          
          setEnrolledCourses(coursesWithData);
        } catch (error) {
          console.error('Error fetching enrolled courses:', error);
        } finally {
          setLoadingCourses(false);
        }
      }
    };

    fetchEnrolledCourses();
  }, [user, getEnrolledCourses]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
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

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{getString('dashboard.myCourses')}</h2>
          
          {loadingCourses ? (
            <div className={styles.loadingCourses}>
              <p>{getString('messages.loadingYourCourses')}</p>
            </div>
          ) : enrolledCourses.length > 0 ? (
            <div className={styles.coursesGrid}>
              {enrolledCourses.map((course) => (
                <div key={course.id} className={styles.courseCard}>
                  <div className={styles.courseIcon}>📚</div>
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  <p className={styles.courseCategory}>{course.category}</p>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill} 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className={styles.progressText}>
                    {course.progress}% {getString('dashboard.completed')}
                  </p>
                  <div className={styles.courseActions}>
                    <Link href={`/course/${course.id}`} className={styles.continueBtn}>
                      {getString('dashboard.continueLearning')}
                    </Link>
                  </div>
                  <p className={styles.enrolledDate}>
                    {getString('course.enrolled')}: {new Date(course.enrolledAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📖</div>
              <p>{getString('dashboard.noCourses')}</p>
              <Link href="/courses" className={styles.browseBtn}>
                {getString('dashboard.browseCourses')}
              </Link>
            </div>
          )}
        </section>

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
                {(() => {
                  const totalSeconds = enrolledCourses.reduce((sum, c) => sum + (c.totalWatchTime || 0), 0);
                  const hours = Math.floor(totalSeconds / 3600);
                  const minutes = Math.floor((totalSeconds % 3600) / 60);
                  if (hours > 0) return `${hours}h ${minutes}m`;
                  if (minutes > 0) return `${minutes}m`;
                  return '0h';
                })()}
              </div>
              <div className={styles.statLabel}>{getString('dashboardStats.hoursLearnedLabel')}</div>
            </div>
          </div>
        </section>

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
    </>
  );
}
