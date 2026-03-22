import SEO from '@/components/common/SEO';
import CourseCard from '@/components/course/CourseCard';
import { coursesData } from '@/data/courses';
import styles from '@/styles/Courses.module.css';

export default function Courses() {
  return (
    <>
      <SEO 
        title="All Courses"
        description="Browse our collection of free video courses on web development, programming, and design"
      />

      <div className={styles.container}>
        <section className={styles.header}>
          <h1 className={styles.title}>Explore Our Courses</h1>
          <p className={styles.subtitle}>
            Learn new skills with our comprehensive video courses. All courses are free!
          </p>
        </section>

        <section className={styles.coursesSection}>
          <div className={styles.courseGrid}>
            {coursesData.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {coursesData.length === 0 && (
          <div className={styles.emptyState}>
            <p>No courses available at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </>
  );
}
