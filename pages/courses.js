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
  const [searchMode, setSearchMode] = useState('courses'); // 'courses' or 'youtube'
  const [youtubeResults, setYoutubeResults] = useState([]);
  const [youtubeLoading, setYoutubeLoading] = useState(false);
  const [youtubeError, setYoutubeError] = useState(null);

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
    if (searchMode === 'youtube') {
      setYoutubeResults([]);
      setYoutubeError(null);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setYoutubeResults([]);
    setYoutubeError(null);
  };

  const toggleSearchMode = () => {
    const newMode = searchMode === 'courses' ? 'youtube' : 'courses';
    setSearchMode(newMode);
    setSearchQuery('');
    setYoutubeResults([]);
    setYoutubeError(null);
  };

  const searchYouTube = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;

    setYoutubeLoading(true);
    setYoutubeError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
      
      if (!apiKey) {
        throw new Error('YouTube API key not configured. Add NEXT_PUBLIC_YOUTUBE_API_KEY to .env.local');
      }

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${encodeURIComponent(searchQuery)}&type=video&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to search YouTube');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      setYoutubeResults(data.items || []);
    } catch (err) {
      console.error('YouTube search error:', err);
      setYoutubeError(err.message || 'Failed to search YouTube');
    } finally {
      setYoutubeLoading(false);
    }
  };

  const handleYouTubeVideoClick = (video) => {
    const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
    window.open(videoUrl, '_blank');
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

        {/* Unified Search - Always visible */}
        <section className={styles.unifiedSearchSection}>
          <div className={styles.searchModeToggle}>
            <button 
              onClick={toggleSearchMode}
              className={styles.modeToggleBtn}
            >
              {searchMode === 'courses' ? '🎥 Switch to YouTube' : '📚 Switch to Courses'}
            </button>
          </div>

          <form onSubmit={searchMode === 'youtube' ? searchYouTube : (e) => e.preventDefault()} className={styles.searchContainer}>
            <input
              type="text"
              placeholder={searchMode === 'courses' ? 'Search courses, topics, or technologies...' : 'Search YouTube videos...'}
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button type="button" onClick={clearSearch} className={styles.clearButton}>
                ✕
              </button>
            )}
            {searchMode === 'youtube' && searchQuery && (
              <button type="submit" disabled={youtubeLoading} className={styles.youtubeSearchSubmit}>
                {youtubeLoading ? '⏳' : '🔍'}
              </button>
            )}
            <span className={styles.searchIcon}>
              {searchMode === 'courses' ? '🔍' : '🎥'}
            </span>
          </form>

          {/* Search Mode Indicator */}
          <div className={styles.searchModeIndicator}>
            <span className={searchMode === 'courses' ? styles.activeMode : ''}>
              � Courses
            </span>
            <span className={styles.modeSeparator}>|</span>
            <span className={searchMode === 'youtube' ? styles.activeMode : ''}>
              🎥 YouTube
            </span>
          </div>

          {/* YouTube Error */}
          {youtubeError && (
            <div className={styles.youtubeError}>
              {youtubeError}
            </div>
          )}
        </section>

        {/* YouTube Results */}
        {searchMode === 'youtube' && youtubeResults.length > 0 && (
          <section className={styles.youtubeResultsSection}>
            <h2 className={styles.resultsTitle}>YouTube Results ({youtubeResults.length})</h2>
            <div className={styles.youtubeGrid}>
              {youtubeResults.map((video) => (
                <div
                  key={video.id.videoId}
                  className={styles.youtubeCard}
                  onClick={() => handleYouTubeVideoClick(video)}
                >
                  <div className={styles.youtubeThumbnail}>
                    <img
                      src={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.title}
                    />
                    <div className={styles.playOverlay}>▶️</div>
                  </div>
                  <div className={styles.youtubeInfo}>
                    <h3 className={styles.youtubeTitle}>{video.snippet.title}</h3>
                    <p className={styles.youtubeDescription}>
                      {video.snippet.description.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Course Content - Only show in courses mode */}
        {searchMode === 'courses' && (
          <>
            {/* Show search only when category is selected or searching */}
            {(selectedCategory || searchQuery) && searchQuery && (
              <div className={styles.searchResults}>
                <p>
                  Found <strong>{filteredCourses.length}</strong> course{filteredCourses.length !== 1 ? 's' : ''} 
                  matching "<strong>{searchQuery}</strong>"
                </p>
              </div>
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
          </>
        )}
      </div>
    </>
  );
}
