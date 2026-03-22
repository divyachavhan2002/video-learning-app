import SEO from "@/components/common/SEO";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <SEO 
        title="LearnHub - Video Learning Platform"
        description="Learn new skills with our comprehensive video courses. Browse 72+ courses across frontend, backend, security, DevOps, cloud, and AI."
        keywords="online learning, video courses, programming tutorials, web development, LearnHub"
      />

      <div className={styles.container}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Welcome to <span className={styles.highlight}>LearnHub</span>
          </h1>
          <p className={styles.subtitle}>
            Learn new skills with our comprehensive video courses
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/courses" className={styles.primaryBtn}>
              Browse Courses
            </Link>
            <Link href="/auth/signup" className={styles.secondaryBtn}>
              Get Started Free
            </Link>
          </div>
        </section>

        <section className={styles.features}>
          <h2 className={styles.sectionTitle}>Why Choose LearnHub?</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.icon}>📹</div>
              <h3>Quality Videos</h3>
              <p>Learn from high-quality video content created by experts</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.icon}>⏱️</div>
              <h3>Learn at Your Pace</h3>
              <p>Study whenever you want, wherever you are</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.icon}>📊</div>
              <h3>Track Progress</h3>
              <p>Monitor your learning journey with detailed progress tracking</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.icon}>🎓</div>
              <h3>Expert Instructors</h3>
              <p>Learn from industry professionals and experienced teachers</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

