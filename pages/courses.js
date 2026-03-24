import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import SEO from '@/components/common/SEO';
import CourseCard from '@/components/course/CourseCard';
import { coursesData, courseCategories } from '@/data/courses';
import styles from '@/styles/Courses.module.css';

export default function Courses() {
  const router = useRouter();
  const { category: categoryQuery } = router.query;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryQuery || null);

  // Update selected category when URL changes
  useEffect(() => {
    setSelectedCategory(categoryQuery || null);
    setSearchQuery('');
  }, [categoryQuery]);

  // Filter courses based on search and category
  const filteredCourses = useMemo(() => {
    let filtered = coursesData;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course => {
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesDescription = course.description.toLowerCase().includes(query);
        const matchesTech = course.tech.toLowerCase().includes(query);
        const matchesInstructor = course.instructor.toLowerCase().includes(query);
        const matchesLessons = course.lessons?.some(lesson => 
          lesson.title.toLowerCase().includes(query)
        );
        
        return matchesTitle || matchesDescription || matchesTech || matchesInstructor || matchesLessons;
      });
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
    router.push(`/courses?category=${categoryId}`, undefined, { shallow: true });
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    router.push('/courses', undefined, { shallow: true });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <>
      <SEO 
        title="All Courses - LearnHub"
        description="Browse our collection of free video courses on web development, programming, and design"
        keywords="online courses, web development, programming, frontend, backend, database, security, devops, mobile, cloud, AI"
      />

      <div className={styles.container}>
        <section className={styles.header}>
          <h1 className={styles.title}>Explore Our Courses</h1>
          <p className={styles.subtitle}>
            Learn new skills with our comprehensive video courses. All courses are free!
          </p>
        </section>

        {/* Show search only when category is selected or search is active */}
        {(selectedCategory || searchQuery) && (
          <section className={styles.searchSection}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search courses, topics, or technologies..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button onClick={clearSearch} className={styles.clearButton}>
                  ✕
                </button>
              )}
              <span className={styles.searchIcon}>🔍</span>
            </div>
          </section>
        )}

        {/* Show Categories only when no category is selected */}
        {!selectedCategory && !searchQuery && (
          <section className={styles.categoriesSection}>
            <h2 className={styles.categoriesTitle}>Browse by Category</h2>
            <div className={styles.categoriesGrid}>
              {courseCategories.map((category) => {
                const Icon = category.Icon;
                const count = coursesData.filter(c => c.category === category.id).length;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={styles.categoryCard}
                  >
                    <div className={styles.categoryIcon}>
                      <Icon />
                    </div>
                    <h3 className={styles.categoryName}>{category.name}</h3>
                    <p className={styles.categoryDescription}>{category.description}</p>
                    <span className={styles.categoryCount}>{count} courses</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Search Results Info */}
        {searchQuery && (
          <div className={styles.searchResults}>
            <p>
              Found <strong>{filteredCourses.length}</strong> course{filteredCourses.length !== 1 ? 's' : ''} 
              matching "<strong>{searchQuery}</strong>"
            </p>
          </div>
        )}

        {/* Courses Grid - Show ONLY when category is selected or searching */}
        {(selectedCategory || searchQuery) && (
          <section className={styles.coursesSection}>
            {selectedCategory && !searchQuery && (
              <div className={styles.categoryHeader}>
                <h2>
                  {courseCategories.find(c => c.id === selectedCategory)?.name || 'Courses'}
                </h2>
                <button 
                  onClick={handleBackToCategories}
                  className={styles.viewAllButton}
                >
                  ← Back to Categories
                </button>
              </div>
            )}

            <div className={styles.courseGrid}>
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {(selectedCategory || searchQuery) && filteredCourses.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📭</div>
            {searchQuery ? (
              <>
                <h3>No courses found</h3>
                <p>Try adjusting your search terms or browse by category</p>
                <button onClick={clearSearch} className={styles.clearSearchButton}>
                  Clear Search
                </button>
              </>
            ) : (
              <>
                <h3>No courses in this category yet</h3>
                <p>Check back soon for new courses!</p>
                <button onClick={handleBackToCategories} className={styles.clearSearchButton}>
                  Back to Categories
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
