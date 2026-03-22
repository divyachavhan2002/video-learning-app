import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import styles from './VideoPlayer.module.css';

export default function VideoPlayer({ 
  url, 
  onProgress, 
  onEnded, 
  initialProgress = 0 
}) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(initialProgress);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch(e.key) {
        case ' ':
          e.preventDefault();
          handlePlayPause();
          break;
        case 'ArrowRight':
          e.preventDefault();
          skipForward();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skipBackward();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          toggleMute();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playing, played]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (state) => {
    setPlayed(state.played);
    if (onProgress) {
      onProgress(state.played, state.playedSeconds);
    }
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleSeek = (e) => {
    const seekTo = parseFloat(e.target.value);
    setPlayed(seekTo);
    playerRef.current.seekTo(seekTo);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
    setMuted(false);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const handleEnded = () => {
    setPlaying(false);
    if (onEnded) {
      onEnded();
    }
  };

  const skipForward = () => {
    const newTime = Math.min(played + (10 / duration), 0.999999);
    setPlayed(newTime);
    playerRef.current.seekTo(newTime);
  };

  const skipBackward = () => {
    const newTime = Math.max(played - (10 / duration), 0);
    setPlayed(newTime);
    playerRef.current.seekTo(newTime);
  };

  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate);
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = ('0' + date.getUTCSeconds()).slice(-2);
    if (hh) {
      return `${hh}:${('0' + mm).slice(-2)}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  return (
    <div className={styles.videoContainer} ref={containerRef}>
      <div className={styles.playerWrapper}>
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          muted={muted}
          playbackRate={playbackRate}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onEnded={handleEnded}
          controls={false}
          className={styles.reactPlayer}
          config={{
            youtube: {
              playerVars: {
                showinfo: 1,
                modestbranding: 1,
                rel: 0
              }
            }
          }}
        />
      </div>

      <div className={styles.controls}>
        <button 
          onClick={handlePlayPause} 
          className={styles.playButton}
          aria-label={playing ? 'Pause' : 'Play'}
          title="Play/Pause (Space)"
        >
          {playing ? '⏸️' : '▶️'}
        </button>

        <button 
          onClick={skipBackward} 
          className={styles.skipButton}
          aria-label="Rewind 10 seconds"
          title="Rewind 10s (←)"
        >
          ⏪
        </button>

        <button 
          onClick={skipForward} 
          className={styles.skipButton}
          aria-label="Forward 10 seconds"
          title="Forward 10s (→)"
        >
          ⏩
        </button>

        <div className={styles.progressContainer}>
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onChange={handleSeek}
            className={styles.progressBar}
          />
          <div 
            className={styles.progressFill} 
            style={{ width: `${played * 100}%` }}
          />
        </div>

        <div className={styles.timeDisplay}>
          <span>{formatTime(duration * played)}</span>
          <span className={styles.timeSeparator}>/</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div className={styles.volumeControl}>
          <button 
            onClick={toggleMute} 
            className={styles.volumeButton}
            aria-label={muted ? 'Unmute' : 'Mute'}
            title="Mute (M)"
          >
            {muted ? '🔇' : volume > 0.5 ? '🔊' : '🔉'}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={muted ? 0 : volume}
            onChange={handleVolumeChange}
            className={styles.volumeSlider}
          />
        </div>

        <div className={styles.speedControl}>
          <button 
            onClick={() => setShowSpeedMenu(!showSpeedMenu)}
            className={styles.speedButton}
            aria-label="Playback speed"
            title="Playback Speed"
          >
            {playbackRate}x
          </button>
          {showSpeedMenu && (
            <div className={styles.speedMenu}>
              {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(rate => (
                <button
                  key={rate}
                  onClick={() => changePlaybackRate(rate)}
                  className={`${styles.speedOption} ${playbackRate === rate ? styles.active : ''}`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          )}
        </div>

        <button 
          onClick={toggleFullscreen} 
          className={styles.fullscreenButton}
          aria-label="Toggle fullscreen"
          title="Fullscreen (F)"
        >
          ⛶
        </button>
      </div>
    </div>
  );
}
