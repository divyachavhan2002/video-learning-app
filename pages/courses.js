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
  const [youtubeResults, setYoutubeResults] = useState([]);
  const [youtubeLoading, setYoutubeLoading] = useState(false);
  const [youtubeError, setYoutubeError] = useState(null);
  const [showYoutubeResults, setShowYoutubeResults] = useState(false);

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
    const query = e.target.value;
    setSearchQuery(query);
    
    // Reset YouTube results when typing
    setYoutubeResults([]);
    setYoutubeError(null);
    setShowYoutubeResults(false);
    
    // Auto-search YouTube if no courses found after typing stops
    if (query.trim()) {
      clearTimeout(window.searchTimeout);
      window.searchTimeout = setTimeout(() => {
        autoSearchYouTube(query);
      }, 1000); // Wait 1 second after user stops typing
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setYoutubeResults([]);
    setYoutubeError(null);
    setShowYoutubeResults(false);
  };

  const autoSearchYouTube = async (query) => {
    // Only search YouTube if no courses match
    const coursesMatch = coursesData.some(course => 
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase()) ||
      course.tech.toLowerCase().includes(query.toLowerCase())
    );
    
    if (coursesMatch) {
      return; // Don't search YouTube if we have course matches
    }

    setYoutubeLoading(true);
    setYoutubeError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
      
      if (!apiKey) {
        throw new Error('YouTube API key not configured');
      }

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${encodeURIComponent(query + ' tutorial')}&type=video&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to search YouTube');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      setYoutubeResults(data.items || []);
      setShowYoutubeResults(true);
    } catch (err) {
      console.error('YouTube search error:', err);
      setYoutubeError(err.message || 'Failed to search YouTube');
    } finally {
      setYoutubeLoading(false);
    }
  };

  const handleYouTubeVideoClick = (video) => {
    // Create a temporary course object for the YouTube video
    const tempCourse = {
      id: `youtube-${video.id.videoId}`,
      title: video.snippet.title,
      description: video.snippet.description,
      instructor: video.snippet.channelTitle,
      duration: 'YouTube Video',
      level: 'External',
      category: 'youtube',
      tech: 'video',
      lessons: [
        {
          id: 1,
          title: video.snippet.title,
          duration: 'Video',
          videoUrl: `https://www.youtube.com/watch?v=${video.id.videoId}`
        }
      ]
    };
    
    // Store in sessionStorage so watch page can access it
    sessionStorage.setItem('tempCourse', JSON.stringify(tempCourse));
    
    // Navigate to watch page
    router.push(`/course/youtube-${video.id.videoId}/watch`);
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

        {/* Smart Search - Auto switches between courses and YouTube */}
        <section className={styles.searchSection}>
          <form onSubmit={(e) => e.preventDefault()} className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search courses, topics, or technologies..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button type="button" onClick={clearSearch} className={styles.clearButton}>
                ✕
              </button>
            )}
            {youtubeLoading && (
              <span className={styles.loadingIcon}>⏳</span>
            )}
            <span className={styles.searchIcon}>🔍</span>
          </form>

          {/* YouTube Error */}
          {youtubeError && (
            <div className={styles.youtubeError}>
              {youtubeError}
            </div>
          )}
        </section>



        {/* Show Categories only when no search and no category selected */}
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

        {/* Courses Grid - Show when category selected or course search has results */}
        {(selectedCategory || (searchQuery && filteredCourses.length > 0)) && (
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

        {/* Empty State - only for category with no courses */}
        {selectedCategory && !searchQuery && filteredCourses.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📭</div>
            <h3>No courses in this category yet</h3>
            <p>Check back soon for new courses!</p>
            <button onClick={handleBackToCategories} className={styles.clearSearchButton}>
              Back to Categories
            </button>
          </div>
        )}
      </div>
    </>
  );
}
