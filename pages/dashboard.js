import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '@/context/AuthContext';
import styles from '@/styles/Dashboard.module.css';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

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

  return (
    <>
      <Head>
        <title>Dashboard - LearnHub</title>
        <meta name="description" content="Your learning dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome back, {user.displayName || 'Student'}!</h1>
          <p className={styles.subtitle}>Continue your learning journey</p>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📚 My Courses</h2>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📖</div>
            <p>You haven't enrolled in any courses yet.</p>
            <a href="/courses" className={styles.browseBtn}>
              Browse Courses
            </a>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📊 Learning Stats</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>📚</div>
              <div className={styles.statValue}>0</div>
              <div className={styles.statLabel}>Enrolled Courses</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>✅</div>
              <div className={styles.statValue}>0</div>
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
