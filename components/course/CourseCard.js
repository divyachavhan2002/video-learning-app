import Link from 'next/link';
import { getString, ROUTES } from '@/config';
import styles from './CourseCard.module.css';

export default function CourseCard({ course }) {
  const CourseIcon = course.Icon;
  
  return (
    <div className={styles.card}>
      <div className={styles.thumbnail}>
        <div className={styles.thumbnailPlaceholder}>
          {CourseIcon ? (
            <CourseIcon className={styles.icon} />
          ) : (
            <span className={styles.iconFallback}>📚</span>
          )}
        </div>
        <span className={styles.level}>{course.level}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.category}>{course.category}</div>
        
        <h3 className={styles.title}>{course.title}</h3>
        
        <p className={styles.description}>{course.description}</p>
        
        <div className={styles.instructor}>
          <span className={styles.instructorIcon}>👤</span>
          {course.instructor}
        </div>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>⏱️</span>
            <span>{course.duration}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>👥</span>
            <span>{course.students?.toLocaleString() || 0} {getString('courseDetail.studentsLabel', 'students')}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>⭐</span>
            <span>{course.rating}</span>
          </div>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>{course.price || getString('home.featureFreeTitle', 'Free')}</span>
          <Link href={ROUTES.COURSE_DETAIL(course.id)} className={styles.enrollBtn}>
            {getString('courseDetail.viewCourse', 'View Course')}
          </Link>
        </div>
      </div>
    </div>
  );
}
