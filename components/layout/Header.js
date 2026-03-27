import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { STRINGS, getSiteInfo, isNavVisible, isFeatureEnabled } from '@/config';
import styles from './Header.module.css';

export default function Header() {
  const { user, logout } = useAuth();
  const siteInfo = getSiteInfo();
  const showDashboard = isNavVisible('Dashboard');
  const hasAuth = isFeatureEnabled('authentication');

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
            <h2>{siteInfo.logo} {STRINGS.appName}</h2>
          </Link>
        </div>

        <nav className={styles.nav}>
          {isNavVisible('Home') && (
            <Link href="/" className={styles.navLink}>
              {STRINGS.nav.home}
            </Link>
          )}
          {isNavVisible('Courses') && (
            <Link href="/courses" className={styles.navLink}>
              {STRINGS.nav.courses}
            </Link>
          )}
          {user && showDashboard && (
            <Link href="/dashboard" className={styles.navLink}>
              {STRINGS.nav.dashboard}
            </Link>
          )}
        </nav>

        <div className={styles.authButtons}>
          <ThemeToggle />
          
          {hasAuth && (
            <>
              {user ? (
                <>
                  <span className={styles.userName}>
                    {user.displayName || 'User'}
                  </span>
                  <button onClick={handleLogout} className={styles.logoutBtn}>
                    {STRINGS.nav.logout}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className={styles.loginBtn}>
                    {STRINGS.nav.login}
                  </Link>
                  <Link href="/auth/signup" className={styles.signupBtn}>
                    {STRINGS.nav.signup}
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
