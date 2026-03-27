import { useState, useRef, useEffect } from 'react';
import styles from './VideoPlayer.module.css';

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  
  // Handle different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
};

export default function VideoPlayer({ 
  url, 
  onProgress, 
  onEnded,
  onError,
  initialProgress = 0 
}) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);
  const playerRef = useRef(null);
  const iframeRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const videoId = getYouTubeVideoId(url);

  // Load YouTube IFrame API
  useEffect(() => {
    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      return;
    }

    // Load the IFrame Player API code asynchronously
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // API will call this function when ready
    window.onYouTubeIframeAPIReady = () => {
      console.log('YouTube IFrame API ready');
    };
  }, []);

  // Initialize player when video ID changes
  useEffect(() => {
    if (!videoId) {
      setError('Invalid YouTube URL');
      return;
    }

    console.log('Loading video:', videoId);
    setReady(false);
    setError(null);

    // Wait for API to be ready
    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) {
        setTimeout(initPlayer, 100);
        return;
      }

      // Destroy existing player
      if (playerRef.current) {
        playerRef.current.destroy();
      }

      // Create new player
      try {
        playerRef.current = new window.YT.Player(iframeRef.current, {
          videoId: videoId,
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            enablejsapi: 1,
            origin: window.location.origin,
            // Allow ads to play
            disablekb: 0,
            fs: 1,
            playsinline: 1
          },
          events: {
            onReady: handlePlayerReady,
            onStateChange: handleStateChange,
            onError: handlePlayerError
          }
        });
      } catch (err) {
        console.error('Failed to create player:', err);
        setError('Failed to initialize player');
      }
    };

    initPlayer();

    // Cleanup
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  const handlePlayerReady = (event) => {
    console.log('Player ready');
    setReady(true);
    setError(null);

    // Start tracking progress
    if (onProgress) {
      progressIntervalRef.current = setInterval(() => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
          try {
            const currentTime = playerRef.current.getCurrentTime();
            const duration = playerRef.current.getDuration();
            if (duration > 0) {
              const played = currentTime / duration;
              onProgress(played, currentTime);
            }
          } catch (err) {
            console.error('Progress tracking error:', err);
          }
        }
      }, 1000);
    }
  };

  const handleStateChange = (event) => {
    // YouTube Player States
    // -1: unstarted, 0: ended, 1: playing, 2: paused, 3: buffering, 5: video cued
    if (event.data === 0 && onEnded) {
      // Video ended
      onEnded();
    }
  };

  const handlePlayerError = (event) => {
    console.error('YouTube player error:', event.data);
    const errorMessages = {
      2: 'Invalid video ID',
      5: 'HTML5 player error',
      100: 'Video not found or private',
      101: 'Video owner does not allow embedding',
      150: 'Video owner does not allow embedding'
    };
    
    const message = errorMessages[event.data] || 'Failed to load video';
    setError(message);
    setReady(true);
    
    // Call parent error handler if provided
    if (onError) {
      onError(message);
    }
  };

  if (!videoId) {
    return (
      <div className={styles.videoContainer}>
        <div className={styles.error}>Invalid YouTube URL</div>
      </div>
    );
  }

  return (
    <div className={styles.videoContainer}>
      <div className={styles.playerWrapper}>
        {!ready && !error && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner}>Loading video...</div>
          </div>
        )}
        {error && (
          <div className={styles.errorOverlay}>
            <div className={styles.errorIcon}>⚠️</div>
            <div className={styles.errorMessage}>{error}</div>
            <p className={styles.errorDescription}>
              This video cannot be played in embedded mode.
            </p>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.watchOnYoutubeBtn}
            >
              Watch on YouTube ↗
            </a>
          </div>
        )}
        <div ref={iframeRef} className={styles.youtubePlayer}></div>
      </div>
    </div>
  );
}
