import Head from 'next/head';
import CourseCard from '@/components/course/CourseCard';
import { coursesData } from '@/data/courses';
import styles from '@/styles/Courses.module.css';

export default function Courses() {
  return (
    <>
      <Head>
        <title>All Courses - LearnHub</title>
        <meta name="description" content="Browse our collection of free video courses on web development, programming, and design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.container}>
        {/* Header Section */}
        <section className={styles.header}>
          <h1 className={styles.title}>Explore Our Courses</h1>
          <p className={styles.subtitle}>
            Learn new skills with our comprehensive video courses. All courses are free!
          </p>
        </section>

        {/* Courses Grid */}
        <section className={styles.coursesSection}>
          <div className={styles.courseGrid}>
            {coursesData.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* Empty State (if no courses) */}
        {coursesData.length === 0 && (
          <div className={styles.emptyState}>
            <p>No courses available at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </>
  );
}
