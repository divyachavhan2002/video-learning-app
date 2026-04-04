/**
 * Centralized Route Configuration
 * 
 * All application routes are defined here as constants.
 * Use these instead of hardcoded strings throughout the app.
 * 
 * Usage:
 *   import { ROUTES } from '@/config/routes';
 *   <Link href={ROUTES.COURSES}>Courses</Link>
 *   router.push(ROUTES.DASHBOARD);
 *   router.push(ROUTES.COURSE_DETAIL(courseId));
 */

// ==========================================
// Static Routes
// ==========================================
export const ROUTES = {
  HOME: '/',
  COURSES: '/courses',
  ABOUT: '/about',
  CONTACT: '/contact',
  DASHBOARD: '/dashboard',

  // Auth
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',

  // Dynamic Route Helpers
  COURSE_DETAIL: (id) => `/course/${id}`,
  COURSE_WATCH: (id) => `/course/${id}/watch`,
  COURSES_BY_CATEGORY: (categoryId) => `/courses?category=${categoryId}`,
  YOUTUBE_WATCH: (videoId) => `/course/youtube-${videoId}/watch`,
};

export default ROUTES;
