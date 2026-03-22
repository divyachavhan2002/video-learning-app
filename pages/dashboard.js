import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { coursesData } from '@/data/courses';
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
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <SEO 
        title="Dashboard"
        description="Your learning dashboard"
      />

      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Welcome back, {user.displayName || 'Student'}!</h1>
            <p className={styles.subtitle}>Continue your learning journey</p>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📚 My Courses</h2>
          
          {loadingCourses ? (
            <div className={styles.loadingCourses}>
              <p>Loading your courses...</p>
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
                  <p className={styles.progressText}>{course.progress}% Complete</p>
                  <div className={styles.courseActions}>
                    <Link href={`/course/${course.id}`} className={styles.continueBtn}>
                      Continue Learning
                    </Link>
                  </div>
                  <p className={styles.enrolledDate}>
                    Enrolled: {new Date(course.enrolledAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📖</div>
              <p>You haven't enrolled in any courses yet.</p>
              <Link href="/courses" className={styles.browseBtn}>
                Browse Courses
              </Link>
            </div>
          )}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📊 Learning Stats</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>📚</div>
              <div className={styles.statValue}>{enrolledCourses.length}</div>
              <div className={styles.statLabel}>Enrolled Courses</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>✅</div>
              <div className={styles.statValue}>
                {enrolledCourses.filter(c => c.progress === 100).length}
              </div>
              <div className={styles.statLabel}>Completed</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>⏱️</div>
              <div className={styles.statValue}>0h</div>
              <div className={styles.statLabel}>Learning Time</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🔥</div>
              <div className={styles.statValue}>0</div>
              <div className={styles.statLabel}>Day Streak</div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>👤 Profile</h2>
          <div className={styles.profileCard}>
            <div className={styles.profileInfo}>
              <p><strong>Name:</strong> {user.displayName || 'Not set'}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Member since:</strong> {new Date(user.metadata.creationTime).toLocaleDateString()}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
