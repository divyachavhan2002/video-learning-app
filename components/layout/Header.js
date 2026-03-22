import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import styles from './Header.module.css';

export default function Header() {
  const { user, logout } = useAuth();

  // Handle user logout action
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <h2>🎓 LearnHub</h2>
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/courses" className={styles.navLink}>
            Courses
          </Link>
          {user && (
            <Link href="/dashboard" className={styles.navLink}>
              Dashboard
            </Link>
          )}
        </nav>

        <div className={styles.authButtons}>
          <ThemeToggle />
          
          {user ? (
            <>
              <span className={styles.userName}>
                {user.displayName || 'User'}
              </span>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className={styles.loginBtn}>
                Login
              </Link>
              <Link href="/auth/signup" className={styles.signupBtn}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
