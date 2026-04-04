import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { strings, getSiteInfo, isNavVisible, isFeatureEnabled, ROUTES } from '@/config';
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
          <Link href={ROUTES.HOME}>
            <h2>{siteInfo.logo} {strings.appName}</h2>
          </Link>
        </div>

        <nav className={styles.nav}>
          {isNavVisible('Home') && (
            <Link href={ROUTES.HOME} className={styles.navLink}>
              {strings.nav.home}
            </Link>
          )}
          {isNavVisible('Courses') && (
            <Link href={ROUTES.COURSES} className={styles.navLink}>
              {strings.nav.courses}
            </Link>
          )}
          {user && showDashboard && (
            <Link href={ROUTES.DASHBOARD} className={styles.navLink}>
              {strings.nav.dashboard}
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
                    {strings.nav.logout}
                  </button>
                </>
              ) : (
                <>
                  <Link href={ROUTES.LOGIN} className={styles.loginBtn}>
                    {strings.nav.login}
                  </Link>
                  <Link href={ROUTES.SIGNUP} className={styles.signupBtn}>
                    {strings.nav.signup}
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
