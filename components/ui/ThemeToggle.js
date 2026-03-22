import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (newTheme) => {
    toggleTheme(newTheme);
    setIsOpen(false);
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'system':
        return '💻';
      default:
        return '💻';
    }
  };

  return (
    <div className={styles.themeToggle} ref={dropdownRef}>
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme"
      >
        <span className={styles.icon}>{getIcon()}</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <button
            className={`${styles.option} ${theme === 'light' ? styles.active : ''}`}
            onClick={() => handleThemeChange('light')}
          >
            <span className={styles.optionIcon}>☀️</span>
            <span>Light</span>
            {theme === 'light' && <span className={styles.check}>✓</span>}
          </button>
          <button
            className={`${styles.option} ${theme === 'dark' ? styles.active : ''}`}
            onClick={() => handleThemeChange('dark')}
          >
            <span className={styles.optionIcon}>🌙</span>
            <span>Dark</span>
            {theme === 'dark' && <span className={styles.check}>✓</span>}
          </button>
          <button
            className={`${styles.option} ${theme === 'system' ? styles.active : ''}`}
            onClick={() => handleThemeChange('system')}
          >
            <span className={styles.optionIcon}>💻</span>
            <span>System</span>
            {theme === 'system' && <span className={styles.check}>✓</span>}
          </button>
        </div>
      )}
    </div>
  );
}
