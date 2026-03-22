import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SEO from '@/components/common/SEO';
import Link from 'next/link';
import { coursesData } from '@/data/courses';
import { useAuth } from '@/context/AuthContext';
import styles from '@/styles/CourseDetail.module.css';

export default function CourseDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { user, enrollInCourse, isEnrolled } = useAuth();
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Find course by ID from URL parameter
  const course = coursesData.find(c => c.id === parseInt(id));

  // Check if user is already enrolled
  useEffect(() => {
    const checkEnrollment = async () => {
      if (user && id) {
        const enrolled = await isEnrolled(parseInt(id));
        setEnrolled(enrolled);
      }
    };
    checkEnrollment();
  }, [user, id, isEnrolled]);

  // Handle course enrollment
  const handleEnroll = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await enrollInCourse(parseInt(id));
      setEnrolled(true);
      setMessage('Successfully enrolled! Redirecting to dashboard...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      setMessage('Failed to enroll. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!course) {
    return (
      <div className={styles.notFound}>
        <h1>Course Not Found</h1>
        <p>The course you're looking for doesn't exist.</p>
        <Link href="/courses" className={styles.backBtn}>
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${course.title} - LearnHub`}
        description={course.description}
        keywords={`${course.title}, ${course.tech}, online course, ${course.category}, ${course.level}`}
      />

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.breadcrumb}>
            <Link href="/courses">Courses</Link>
            <span className={styles.separator}>›</span>
            <span className={styles.current}>{course.title}</span>
          </div>

          <div className={styles.hero}>
            <div className={styles.heroContent}>
              <div className={styles.category}>{course.category}</div>
              <h1 className={styles.title}>{course.title}</h1>
              <p className={styles.description}>{course.description}</p>

              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <span className={styles.icon}>👤</span>
                  {course.instructor}
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.icon}>⏱️</span>
                  {course.duration}
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.icon}>⭐</span>
                  {course.rating} ({course.students} students)
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.icon}>📊</span>
                  {course.level}
                </div>
              </div>

              {message && (
                <div className={enrolled ? styles.successMessage : styles.errorMessage}>
                  {message}
                </div>
              )}

              <div className={styles.actions}>
                {enrolled ? (
                  <>
                    <Link href={`/course/${id}/watch`} className={styles.startLearningBtn}>
                      Start Learning
                    </Link>
                    <button className={styles.enrolledBtn} disabled>
                      ✓ Enrolled
                    </button>
                  </>
                ) : (
                  <button 
                    className={styles.enrollBtn}
                    onClick={handleEnroll}
                    disabled={loading}
                  >
                    {loading ? 'Enrolling...' : `Enroll for ${course.price}`}
                  </button>
                )}
                <button className={styles.shareBtn}>
                  Share Course
                </button>
              </div>
            </div>

            <div className={styles.heroImage}>
              <div className={styles.thumbnail}>
                <span className={styles.thumbnailIcon}>📚</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>📖 What You'll Learn</h2>
            <ul className={styles.learningList}>
              <li>Master the fundamentals of {course.title}</li>
              <li>Build real-world projects from scratch</li>
              <li>Understand best practices and industry standards</li>
              <li>Get hands-on experience with practical examples</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>📚 Course Curriculum</h2>
            <div className={styles.curriculum}>
              <div className={styles.module}>
                <h3 className={styles.moduleTitle}>
                  <span className={styles.moduleIcon}>▶️</span>
                  Module 1: Introduction
                </h3>
                <ul className={styles.lessonList}>
                  <li className={styles.lesson}>
                    <span className={styles.lessonIcon}>🎥</span>
                    <span className={styles.lessonTitle}>Welcome to the Course</span>
                    <span className={styles.lessonDuration}>5 min</span>
                  </li>
                  <li className={styles.lesson}>
                    <span className={styles.lessonIcon}>🎥</span>
                    <span className={styles.lessonTitle}>Setting Up Your Environment</span>
                    <span className={styles.lessonDuration}>10 min</span>
                  </li>
                </ul>
              </div>

              <div className={styles.comingSoon}>
                <p>More modules coming soon! This course is under development.</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>👨‍🏫 About the Instructor</h2>
            <div className={styles.instructorCard}>
              <div className={styles.instructorAvatar}>
                <span className={styles.avatarIcon}>👨‍💻</span>
              </div>
              <div className={styles.instructorInfo}>
                <h3>{course.instructor}</h3>
                <p>Expert instructor with years of experience in {course.category}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
