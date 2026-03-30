import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SEO from '@/components/common/SEO';
import Link from 'next/link';
import { coursesData } from '@/data/courses';
import { useAuth } from '@/context/AuthContext';
import { getString } from '@/config';
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
      // Save redirect URL so login page can bring user back
      sessionStorage.setItem('redirectAfterLogin', `/course/${id}`);
      router.push('/auth/login');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const result = await enrollInCourse(parseInt(id));
      
      if (result?.alreadyEnrolled) {
        // Already enrolled — go straight to watch page
        router.push(`/course/${id}/watch`);
        return;
      }

      setEnrolled(true);
      setMessage(getString('course.enrollmentSuccess'));
      setTimeout(() => {
        router.push(`/course/${id}/watch`);
      }, 1000);
    } catch (error) {
      setMessage(getString('course.enrollmentError'));
    } finally {
      setLoading(false);
    }
  };

  if (!course) {
    return (
      <div className={styles.notFound}>
        <h1>{getString('courseDetail.notFoundTitle')}</h1>
        <p>{getString('courseDetail.notFoundDesc')}</p>
        <Link href="/courses" className={styles.backBtn}>
          {getString('messages.backToCourses')}
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${course.title} - ${getString('appName')}`}
        description={course.description}
        keywords={`${course.title}, ${course.tech}, online course, ${course.category}, ${course.level}`}
      />

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.breadcrumb}>
            <Link href="/courses">{getString('nav.courses')}</Link>
            <span className={styles.separator}>{getString('courseDetail.breadcrumbSeparator')}</span>
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
                      {getString('course.startLearning')}
                    </Link>
                    <button className={styles.enrolledBtn} disabled>
                      {getString('courseDetail.enrolledBtn')}
                    </button>
                  </>
                ) : (
                  <button 
                    className={styles.enrollBtn}
                    onClick={handleEnroll}
                    disabled={loading}
                  >
                    {loading ? getString('course.enrolling') : `${getString('courseDetail.enrollFor')} ${course.price}`}
                  </button>
                )}
                <button className={styles.shareBtn}>
                  {getString('courseDetail.shareCourse')}
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
            <h2 className={styles.sectionTitle}>{getString('courseDetail.whatYouLearn')}</h2>
            <ul className={styles.learningList}>
              <li>{getString('courseDetail.masterFundamentals')} {course.title}</li>
              <li>{getString('courseDetail.buildProjects')}</li>
              <li>{getString('courseDetail.bestPractices')}</li>
              <li>{getString('courseDetail.handsOnExperience')}</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{getString('courseDetail.courseCurriculum')}</h2>
            <div className={styles.curriculum}>
              <div className={styles.module}>
                <h3 className={styles.moduleTitle}>
                  <span className={styles.moduleIcon}>▶️</span>
                  {getString('courseDetail.moduleIntro')}
                </h3>
                <ul className={styles.lessonList}>
                  <li className={styles.lesson}>
                    <span className={styles.lessonIcon}>🎥</span>
                    <span className={styles.lessonTitle}>{getString('courseDetail.welcomeLesson')}</span>
                    <span className={styles.lessonDuration}>5 min</span>
                  </li>
                  <li className={styles.lesson}>
                    <span className={styles.lessonIcon}>🎥</span>
                    <span className={styles.lessonTitle}>{getString('courseDetail.setupLesson')}</span>
                    <span className={styles.lessonDuration}>10 min</span>
                  </li>
                </ul>
              </div>

              <div className={styles.comingSoon}>
                <p>{getString('courseDetail.comingSoon')}</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{getString('courseDetail.aboutInstructor')}</h2>
            <div className={styles.instructorCard}>
              <div className={styles.instructorAvatar}>
                <span className={styles.avatarIcon}>👨‍💻</span>
              </div>
              <div className={styles.instructorInfo}>
                <h3>{course.instructor}</h3>
                <p>{getString('courseDetail.expertWith')} {course.category}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
