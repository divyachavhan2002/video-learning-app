import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SEO from '@/components/common/SEO';
import Link from 'next/link';
import { coursesData } from '@/data/courses';
import { useAuth } from '@/context/AuthContext';
import { getString, ROUTES } from '@/config';
import styles from '@/styles/CourseDetail.module.css';

export default function CourseDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { user, enrollInCourse, isEnrolled } = useAuth();
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);

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
      sessionStorage.setItem('redirectAfterLogin', ROUTES.COURSE_DETAIL(id));
      router.push(ROUTES.LOGIN);
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const result = await enrollInCourse(parseInt(id));
      
      if (result?.alreadyEnrolled) {
        // Already enrolled — go straight to watch page
        router.push(ROUTES.COURSE_WATCH(id));
        return;
      }

      setEnrolled(true);
      setMessage(getString('course.enrollmentSuccess'));
      setTimeout(() => {
        router.push(ROUTES.COURSE_WATCH(id));
      }, 1000);
    } catch (error) {
      setMessage(getString('course.enrollmentError'));
    } finally {
      setLoading(false);
    }
  };

  // Share course functionality
  const getCourseUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getCourseUrl());
      setMessage(getString('courseDetail.linkCopied'));
      setTimeout(() => setMessage(''), 2000);
    } catch {
      setMessage(getString('courseDetail.linkCopyFailed'));
    }
    setShowShareMenu(false);
  };

  const handleShareWhatsApp = () => {
    const text = `${getString('courseDetail.shareText')} ${course.title} - ${getCourseUrl()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    setShowShareMenu(false);
  };

  const handleShareEmail = () => {
    const subject = `${getString('courseDetail.shareText')} ${course.title}`;
    const body = `${course.description}\n\n${getCourseUrl()}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setShowShareMenu(false);
  };

  if (!course) {
    return (
      <div className={styles.notFound}>
        <h1>{getString('courseDetail.notFoundTitle')}</h1>
        <p>{getString('courseDetail.notFoundDesc')}</p>
        <Link href={ROUTES.COURSES} className={styles.backBtn}>
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
            <Link href={ROUTES.COURSES}>{getString('nav.courses')}</Link>
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
                    <Link href={ROUTES.COURSE_WATCH(id)} className={styles.startLearningBtn}>
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
                <div className={styles.shareContainer}>
                  <button 
                    className={styles.shareBtn}
                    onClick={() => setShowShareMenu(!showShareMenu)}
                  >
                    {getString('courseDetail.shareCourse')}
                  </button>
                  {showShareMenu && (
                    <div className={styles.shareMenu}>
                      <button onClick={handleCopyLink} className={styles.shareOption}>
                        🔗 {getString('courseDetail.copyLink')}
                      </button>
                      <button onClick={handleShareWhatsApp} className={styles.shareOption}>
                        💬 {getString('courseDetail.shareWhatsApp')}
                      </button>
                      <button onClick={handleShareEmail} className={styles.shareOption}>
                        ✉️ {getString('courseDetail.shareEmail')}
                      </button>
                    </div>
                  )}
                </div>
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
