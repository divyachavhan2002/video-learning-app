import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getAuthErrorMessage, validateSignupForm } from '@/lib/authUtils';
import { getString, ROUTES } from '@/config';
import styles from '@/styles/Auth.module.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
  const router = useRouter();

  // Redirect to saved URL or dashboard after signup
  const redirectAfterAuth = () => {
    const redirect = sessionStorage.getItem('redirectAfterLogin');
    if (redirect) {
      sessionStorage.removeItem('redirectAfterLogin');
      router.push(redirect);
    } else {
      router.push(ROUTES.DASHBOARD);
    }
  };

  // Handle signup form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form
    const validation = validateSignupForm({ name, email, password, confirmPassword });
    if (!validation.isValid) {
      return setError(validation.message);
    }

    setLoading(true);

    try {
      await signup(email, password, name);
      redirectAfterAuth();
    } catch (error) {
      setError(getAuthErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  // Handle Google OAuth signup
  const handleGoogleSignup = async () => {
    setError('');
    setLoading(true);

    try {
      await loginWithGoogle();
      redirectAfterAuth();
    } catch (error) {
      setError(getAuthErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>{getString('auth.signupTitle')}</h1>
        <p className={styles.subtitle}>{getString('auth.signupSubtitle')}</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">{getString('auth.nameLabel')}</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={getString('auth.namePlaceholder')}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">{getString('auth.emailLabel')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={getString('auth.emailPlaceholder')}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">{getString('auth.passwordLabel')}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={getString('auth.passwordPlaceholder')}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">{getString('auth.confirmPasswordLabel')}</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={getString('auth.passwordPlaceholder')}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? getString('auth.creatingAccount') : getString('auth.signupBtn')}
          </button>
        </form>

        <div className={styles.divider}>
          <span>{getString('auth.orDivider')}</span>
        </div>

        <button
          onClick={handleGoogleSignup}
          className={styles.googleButton}
          disabled={loading}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
          </svg>
          {getString('auth.continueWithGoogle')}
        </button>

        <p className={styles.switchAuth}>
          {getString('auth.haveAccount')}{' '}
          <Link href={ROUTES.LOGIN}>{getString('nav.login')}</Link>
        </p>
      </div>
    </div>
  );
}
