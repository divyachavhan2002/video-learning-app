import Link from 'next/link';
import styles from './CourseCard.module.css';

export default function CourseCard({ course }) {
  return (
    <div className={styles.card}>
      {/* Thumbnail placeholder */}
      <div className={styles.thumbnail}>
        <div className={styles.thumbnailPlaceholder}>
          <span className={styles.icon}>📚</span>
        </div>
        <span className={styles.level}>{course.level}</span>
      </div>

      {/* Course Info */}
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
            {course.duration}
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>👥</span>
            {course.students} students
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>⭐</span>
            {course.rating}
          </div>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>{course.price}</span>
          <Link href={`/course/${course.id}`} className={styles.enrollBtn}>
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
}
