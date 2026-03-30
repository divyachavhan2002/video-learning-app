import { useState, useRef, useEffect, useCallback } from 'react';
import { getString } from '@/config';
import styles from './VideoPlayer.module.css';

// Maximum retries when waiting for YouTube IFrame API to load
const MAX_INIT_RETRIES = 50; // 50 × 100ms = 5 seconds

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
  const containerRef = useRef(null);       // React-managed container
  const playerElIdRef = useRef(null);      // ID of the imperatively-created div for YT.Player
  const progressIntervalRef = useRef(null);

  // Store callbacks in refs so the player init effect doesn't depend on them
  const onProgressRef = useRef(onProgress);
  const onEndedRef = useRef(onEnded);
  const onErrorRef = useRef(onError);

  // Keep refs in sync with latest props
  useEffect(() => { onProgressRef.current = onProgress; }, [onProgress]);
  useEffect(() => { onEndedRef.current = onEnded; }, [onEnded]);
  useEffect(() => { onErrorRef.current = onError; }, [onError]);

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
    window.onYouTubeIframeAPIReady = () => {};
  }, []);

  // Define event handlers before the effect that uses them
  const handlePlayerReady = useCallback(() => {
    setReady(true);
    setError(null);

    // Start tracking progress (clear any existing interval first)
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    progressIntervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        try {
          const currentTime = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();
          if (duration > 0) {
            const played = currentTime / duration;
            // Use ref to always call the latest onProgress callback
            if (onProgressRef.current) {
              onProgressRef.current(played, currentTime);
            }
          }
        } catch (err) {
          console.error('Progress tracking error:', err);
        }
      }
    }, 1000);
  }, []); // No deps — uses refs for callbacks

  const handleStateChange = useCallback((event) => {
    // YouTube Player States: 0 = ended
    if (event.data === 0 && onEndedRef.current) {
      onEndedRef.current();
    }
  }, []);

  const handlePlayerError = useCallback((event) => {
    console.error('YouTube player error:', event.data);
    const errorMessages = {
      2: getString('video.errorInvalidUrl'),
      5: getString('video.errorHtml5'),
      100: getString('video.errorNotFound'),
      101: getString('video.errorEmbedDisabled'),
      150: getString('video.errorEmbedDisabled'),
    };
    
    const message = errorMessages[event.data] || getString('video.errorGeneric');
    setError(message);
    setReady(true);
    
    if (onErrorRef.current) {
      onErrorRef.current(message);
    }
  }, []);

  // Initialize player when video ID changes
  useEffect(() => {
    if (!videoId) {
      setError(getString('video.errorInvalidUrl'));
      return;
    }

    setReady(false);
    setError(null);

    let retryCount = 0;

    // Wait for API to be ready (with retry limit)
    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) {
        retryCount++;
        if (retryCount >= MAX_INIT_RETRIES) {
          console.error('YouTube IFrame API failed to load after max retries');
          setError(getString('video.errorGeneric'));
          return;
        }
        setTimeout(initPlayer, 100);
        return;
      }

      // Destroy existing player and clean up old DOM element
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch { /* already destroyed */ }
        playerRef.current = null;
      }

      // Remove any previous player element from the container
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      // Create a fresh div for YT.Player (outside React's reconciliation)
      const playerEl = document.createElement('div');
      const elId = `yt-player-${Date.now()}`;
      playerEl.id = elId;
      playerEl.style.width = '100%';
      playerEl.style.height = '100%';
      playerElIdRef.current = elId;

      if (containerRef.current) {
        containerRef.current.appendChild(playerEl);
      }

      // Create new player targeting the imperatively-created div
      try {
        playerRef.current = new window.YT.Player(elId, {
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
        setError(getString('video.errorGeneric'));
      }
    };

    initPlayer();

    // Cleanup
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch { /* already destroyed */ }
        playerRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]); // Only re-init when the video ID changes — handlers use stable refs

  if (!videoId) {
    return (
      <div className={styles.videoContainer}>
        <div className={styles.error}>{getString('video.errorInvalidUrl')}</div>
      </div>
    );
  }

  return (
    <div className={styles.videoContainer}>
      <div className={styles.playerWrapper}>
        {!ready && !error && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner}>{getString('video.loading')}</div>
          </div>
        )}
        {error && (
          <div className={styles.errorOverlay}>
            <div className={styles.errorIcon}>⚠️</div>
            <div className={styles.errorMessage}>{error}</div>
            <p className={styles.errorDescription}>
              {getString('watch.videoRestricted')}
            </p>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.watchOnYoutubeBtn}
            >
              {getString('watch.watchOnYoutube')}
            </a>
          </div>
        )}
        {/* Container for YouTube player - managed imperatively to avoid React DOM conflicts */}
        <div ref={containerRef} className={styles.youtubePlayer}></div>
      </div>
    </div>
  );
}
