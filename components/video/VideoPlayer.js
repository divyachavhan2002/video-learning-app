import { useState, useRef } from 'react';
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
  const playerRef = useRef(null);

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
    <div className={styles.videoContainer}>
      <div className={styles.playerWrapper}>
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          muted={muted}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onEnded={handleEnded}
          controls={false}
          className={styles.reactPlayer}
        />
      </div>

      <div className={styles.controls}>
        <button 
          onClick={handlePlayPause} 
          className={styles.playButton}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? '⏸️' : '▶️'}
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
      </div>
    </div>
  );
}
