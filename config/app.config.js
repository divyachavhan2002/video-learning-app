/**
 * Application Configuration
 * Control which features and sections are displayed
 * Set to false to hide components/sections
 */

const APP_CONFIG = {
  // Site Information
  site: {
    name: 'LearnHub',
    url: 'https://learnhub.com',
    logo: '🎓',
    author: 'Divya Chavhan',
    authorEmail: 'divyachavhan234@gmail.com',
    authorLinkedIn: 'https://www.linkedin.com/in/divya-chavhan-8a91b7315',
    authorGitHub: 'https://github.com/divyachavhan2002',
  },

  // Feature Toggles
  features: {
    authentication: true,
    enrollment: true,
    progressTracking: true,
    youtubeSearch: true,
    darkMode: true,
    socialShare: false, // Not implemented yet
    comments: false, // Not implemented yet
    ratings: false, // Not implemented yet
  },

  // Navigation
  navigation: {
    showHome: true,
    showCourses: true,
    showDashboard: true,
    showAbout: true,
    showContact: true,
  },

  // Home Page
  homePage: {
    showHero: true,
    showFeatures: true,
    showStats: true,
    showCTA: true,
  },

  // Courses Page
  coursesPage: {
    showSearch: true,
    showCategories: true,
    showYouTubeSearch: true,
    
    // Category Visibility - Set to false to hide specific categories
    categories: {
      frontend: true,
      backend: true,
      database: true,
      security: true,
      devops: true,
      mobile: true,
      cloud: true,
      ai: true,
    },
    
    // Course Display Options
    coursesPerPage: 12,
    showInstructor: true,
    showDuration: true,
    showLevel: true,
    showStudentCount: true,
    showRating: true,
  },

  // Course Details Page
  courseDetailsPage: {
    showInstructor: true,
    showDuration: true,
    showLevel: true,
    showCategory: true,
    showWhatYouLearn: true,
    showCourseContent: true,
    showEnrollButton: true,
  },

  // Watch Page
  watchPage: {
    showCourseInfo: true,
    showLessonList: true,
    showProgress: true,
    showAutoPlay: true,
    showBreadcrumb: true,
  },

  // Dashboard
  dashboard: {
    showWelcome: true,
    showEnrolledCourses: true,
    showProgress: true,
    showStats: false, // Not implemented yet
    showRecommendations: false, // Not implemented yet
  },

  // About Page
  aboutPage: {
    showHero: true,
    showMission: true,
    showValues: true,
    showStats: true,
    showCTA: true,
  },

  // Contact Page
  contactPage: {
    showHero: true,
    showForm: true,
    showEmail: true,
    showWhatsApp: true,
    showResponseTime: true,
    showFAQ: true,
    whatsappNumber: '919876543210', // Replace with actual number
  },

  // Footer
  footer: {
    showQuickLinks: true,
    showSocialLinks: true,
    showCopyright: true,
    showMadeBy: true,
    socialLinks: {
      linkedin: true,
      github: true,
      twitter: false,
      facebook: false,
    },
  },

  // YouTube Integration
  youtube: {
    enabled: true,
    apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
    maxResults: 12,
    searchDelay: 1000, // milliseconds
    autoSearchOnNoResults: true,
  },

  // SEO
  seo: {
    enableMetaTags: true,
    enableOpenGraph: true,
    enableTwitterCard: true,
    defaultImage: '/images/og-image.jpg',
  },

  // Performance
  performance: {
    enableImageOptimization: true,
    enableCodeSplitting: true,
    enablePrefetching: true,
  },

  // Development
  development: {
    showDebugInfo: false,
    enableConsoleLogging: process.env.NODE_ENV === 'development',
  },
};

export default APP_CONFIG;
