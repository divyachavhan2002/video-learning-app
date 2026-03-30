import { useState } from 'react';
import { getString, getYouTubeConfig } from '@/config';
import styles from './YouTubeSearch.module.css';

export default function YouTubeSearch({ onSelectVideo }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchYouTube = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Using YouTube Data API v3
      const ytConfig = getYouTubeConfig();
      const apiKey = ytConfig.apiKey || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
      
      if (!apiKey) {
        throw new Error(getString('youtube.apiKeyError'));
      }

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${ytConfig.maxResults || 10}&q=${encodeURIComponent(searchQuery)}&type=video&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(getString('youtube.searchFailed'));
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      setResults(data.items || []);
    } catch (err) {
      console.error('YouTube search error:', err);
      setError(err.message || getString('youtube.searchFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVideo = (video) => {
    const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
    onSelectVideo({
      title: video.snippet.title,
      url: videoUrl,
      thumbnail: video.snippet.thumbnails.medium.url,
      description: video.snippet.description
    });
    // Clear results after selection
    setResults([]);
    setSearchQuery('');
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={searchYouTube} className={styles.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={getString('youtube.searchPlaceholder')}
          className={styles.searchInput}
        />
        <button type="submit" disabled={loading} className={styles.searchButton}>
          {loading ? getString('youtube.searching') : getString('youtube.searchBtn')}
        </button>
      </form>

      {error && (
        <div className={styles.error}>
          {error}
          {error.includes(getString('youtube.apiKeyError')) && (
            <p className={styles.errorHint}>
              {getString('youtube.apiKeyHint')}
            </p>
          )}
        </div>
      )}

      {results.length > 0 && (
        <div className={styles.results}>
          <h3>{getString('youtube.searchResults')}</h3>
          <div className={styles.resultsList}>
            {results.map((video) => (
              <div
                key={video.id.videoId}
                className={styles.resultItem}
                onClick={() => handleSelectVideo(video)}
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className={styles.thumbnail}
                />
                <div className={styles.videoInfo}>
                  <h4 className={styles.videoTitle}>{video.snippet.title}</h4>
                  <p className={styles.videoDescription}>
                    {video.snippet.description.substring(0, 100)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
