/**
 * Application Strings Configuration
 * Centralized string management for easy updates and localization
 */

const STRINGS = {
  // App Name & Branding
  APP_NAME: 'LearnHub',
  APP_TAGLINE: 'Your gateway to quality online education',
  APP_ICON: '🎓',

  // SEO & Meta
  SEO: {
    DEFAULT_TITLE: 'LearnHub - Video Learning Platform',
    DEFAULT_DESCRIPTION: 'Learn new skills with free video courses on web development, programming, and more',
    DEFAULT_KEYWORDS: 'online learning, video courses, programming tutorials, web development, LearnHub',
  },

  // Navigation
  NAV: {
    HOME: 'Home',
    COURSES: 'Courses',
    DASHBOARD: 'Dashboard',
    ABOUT: 'About Us',
    CONTACT: 'Contact',
    LOGIN: 'Login',
    LOGOUT: 'Logout',
    SIGNUP: 'Sign Up',
  },

  // Home Page
  HOME: {
    HERO_TITLE: 'Welcome to',
    HERO_SUBTITLE: 'Start your learning journey today with free video courses',
    CTA_PRIMARY: 'Browse Courses',
    CTA_SECONDARY: 'Learn More',
    WHY_CHOOSE_TITLE: 'Why Choose LearnHub?',
    FEATURE_FREE_TITLE: '🆓 100% Free',
    FEATURE_FREE_DESC: 'All our courses are completely free. No hidden costs or subscriptions.',
    FEATURE_QUALITY_TITLE: '⭐ High Quality',
    FEATURE_QUALITY_DESC: 'Carefully curated courses from experienced instructors.',
    FEATURE_FLEXIBLE_TITLE: '🕒 Learn at Your Pace',
    FEATURE_FLEXIBLE_DESC: 'Watch lessons anytime, anywhere at your own speed.',
    FEATURE_VARIETY_TITLE: '📚 Wide Variety',
    FEATURE_VARIETY_DESC: 'Courses covering programming, design, business, and more.',
  },

  // Courses Page
  COURSES: {
    PAGE_TITLE: 'All Courses',
    PAGE_SUBTITLE: 'Learn new skills with our comprehensive video courses. All courses are free!',
    HERO_TITLE: 'Explore Our Courses',
    SEARCH_PLACEHOLDER: 'Search courses, topics, or technologies...',
    BROWSE_BY_CATEGORY: 'Browse by Category',
    EXPLORE_COURSES_BTN: 'Explore Courses',
    BACK_TO_CATEGORIES: '← Back to Categories',
    FOUND_COURSES: 'Found',
    COURSES_MATCHING: 'matching',
    NO_COURSES_CATEGORY: 'No courses in this category yet',
    CHECK_BACK_SOON: 'Check back soon for new courses!',
    YOUTUBE_FOUND: 'We found',
    YOUTUBE_VIDEOS: 'YouTube videos',
    YOUTUBE_CTA: 'Select a course and start learning!',
  },

  // Course Categories
  CATEGORIES: {
    FRONTEND: {
      NAME: 'Front-End Development',
      DESC: 'Build beautiful user interfaces',
    },
    BACKEND: {
      NAME: 'Back-End Development',
      DESC: 'Create powerful server-side applications',
    },
    DATABASE: {
      NAME: 'Database',
      DESC: 'Master data storage and management',
    },
    SECURITY: {
      NAME: 'Security',
      DESC: 'Protect applications and data',
    },
    DEVOPS: {
      NAME: 'DevOps',
      DESC: 'Streamline development workflows',
    },
    MOBILE: {
      NAME: 'Mobile Development',
      DESC: 'Build native and cross-platform apps',
    },
    CLOUD: {
      NAME: 'Cloud Computing',
      DESC: 'Deploy and scale in the cloud',
    },
    AI: {
      NAME: 'AI & Machine Learning',
      DESC: 'Build intelligent applications',
    },
  },

  // Course Details
  COURSE: {
    ENROLL_BTN: 'Enroll Now',
    ENROLLED_BTN: 'Already Enrolled',
    START_LEARNING: 'Start Learning',
    WHAT_YOU_LEARN: 'What you\'ll learn',
    COURSE_CONTENT: 'Course Content',
    LESSONS: 'lessons',
    INSTRUCTOR: 'Instructor',
    DURATION: 'Duration',
    LEVEL: 'Level',
    CATEGORY: 'Category',
    ENROLLING: 'Enrolling...',
    ENROLLMENT_SUCCESS: 'Successfully enrolled! Starting course...',
    ENROLLMENT_ERROR: 'Failed to enroll. Please try again.',
  },

  // Watch Page
  WATCH: {
    LESSON: 'Lesson',
    OF: 'of',
    COURSE_CONTENT: 'Course Content',
    UNABLE_TO_PLAY: 'Unable to Play Video',
    VIDEO_RESTRICTED: 'This video cannot be played in embedded mode. The video owner has restricted playback on external websites.',
    BACK_TO_COURSES: '← Back to Courses',
    WATCH_ON_YOUTUBE: 'Watch on YouTube ↗',
    ABOUT_VIDEO: 'About this video',
    BY: 'By',
  },

  // Dashboard
  DASHBOARD: {
    PAGE_TITLE: 'My Dashboard',
    WELCOME_BACK: 'Welcome back',
    MY_COURSES: 'My Enrolled Courses',
    NO_COURSES: 'You haven\'t enrolled in any courses yet',
    BROWSE_COURSES: 'Browse Available Courses',
    CONTINUE_LEARNING: 'Continue Learning',
    PROGRESS: 'Progress',
    COMPLETED: 'Completed',
  },

  // About Page
  ABOUT: {
    PAGE_TITLE: 'About Us',
    PAGE_SUBTITLE: 'Empowering learners worldwide with free, high-quality educational content',
    HERO_TITLE: 'About LearnHub',
    MISSION_TITLE: 'Our Mission',
    MISSION_TEXT_1: 'At LearnHub, we believe that education should be accessible to everyone, everywhere. Our mission is to provide free, high-quality video courses that help learners develop new skills and advance their careers.',
    MISSION_TEXT_2: 'We curate the best educational content across various domains including web development, mobile development, data science, cloud computing, and more.',
    VALUES_TITLE: 'Our Values',
    VALUE_QUALITY_TITLE: 'Quality First',
    VALUE_QUALITY_TEXT: 'We carefully select and curate courses to ensure the highest quality learning experience.',
    VALUE_FREE_TITLE: 'Always Free',
    VALUE_FREE_TEXT: 'All our courses are completely free. No hidden fees, no subscriptions required.',
    VALUE_LEARNING_TITLE: 'Continuous Learning',
    VALUE_LEARNING_TEXT: 'We regularly update our content library to keep pace with the latest technologies.',
    VALUE_COMMUNITY_TITLE: 'Community Driven',
    VALUE_COMMUNITY_TEXT: 'Built by learners, for learners. We value feedback and continuously improve.',
    STATS_COURSES: '72+',
    STATS_COURSES_LABEL: 'Free Courses',
    STATS_CATEGORIES: '8',
    STATS_CATEGORIES_LABEL: 'Categories',
    STATS_FREE: '100%',
    STATS_FREE_LABEL: 'Free Content',
    STATS_ACCESS: '24/7',
    STATS_ACCESS_LABEL: 'Access',
    CTA_TITLE: 'Ready to Start Learning?',
    CTA_TEXT: 'Join thousands of learners and start your journey today. All courses are free!',
    CTA_BROWSE: 'Browse Courses',
    CTA_CONTACT: 'Contact Us',
  },

  // Contact Page
  CONTACT: {
    PAGE_TITLE: 'Contact Us',
    PAGE_SUBTITLE: 'Have questions? We\'d love to hear from you. Send us a message!',
    HERO_TITLE: 'Get In Touch',
    FORM_TITLE: 'Send us a Message',
    FORM_NAME: 'Your Name',
    FORM_EMAIL: 'Your Email',
    FORM_SUBJECT: 'Subject',
    FORM_MESSAGE: 'Message',
    FORM_NAME_PLACEHOLDER: 'John Doe',
    FORM_EMAIL_PLACEHOLDER: 'john@example.com',
    FORM_SUBJECT_PLACEHOLDER: 'How can we help you?',
    FORM_MESSAGE_PLACEHOLDER: 'Tell us more about your question...',
    FORM_SUBMIT: 'Send Message',
    FORM_SENDING: 'Sending...',
    CONTACT_INFO_TITLE: 'Contact Information',
    EMAIL_TITLE: 'Email',
    EMAIL_ADDRESS: 'divyachavhan234@gmail.com',
    EMAIL_DESC: 'Send us an email anytime. We\'ll respond within 24 hours.',
    WHATSAPP_TITLE: 'WhatsApp',
    WHATSAPP_BTN: 'Chat with us on WhatsApp',
    WHATSAPP_DESC: 'Get instant responses to your questions via WhatsApp.',
    WHATSAPP_MESSAGE: 'Hi! I have a question about LearnHub.',
    RESPONSE_TITLE: 'Response Time',
    RESPONSE_TIME: 'Usually within 24 hours',
    RESPONSE_DESC: 'We strive to respond to all inquiries as quickly as possible.',
    FAQ_TITLE: 'Quick Questions?',
    FAQ_1: '✓ All courses are 100% free',
    FAQ_2: '✓ No registration required to browse',
    FAQ_3: '✓ New courses added regularly',
    FAQ_4: '✓ Available 24/7',
  },

  // Footer
  FOOTER: {
    TAGLINE: 'Your gateway to quality online education.',
    QUICK_LINKS: 'Quick Links',
    FOLLOW_US: 'Follow Us',
    LINKEDIN: 'LinkedIn',
    GITHUB: 'GitHub',
    COPYRIGHT: 'All rights reserved.',
    MADE_BY: 'Built with ❤️ by Divya Chavhan',
  },

  // Auth
  AUTH: {
    LOGIN_TITLE: 'Welcome Back',
    LOGIN_SUBTITLE: 'Sign in to continue your learning',
    SIGNUP_TITLE: 'Create Account',
    SIGNUP_SUBTITLE: 'Start your learning journey today',
    EMAIL_LABEL: 'Email',
    PASSWORD_LABEL: 'Password',
    NAME_LABEL: 'Full Name',
    LOGIN_BTN: 'Sign In',
    SIGNUP_BTN: 'Sign Up',
    FORGOT_PASSWORD: 'Forgot Password?',
    NO_ACCOUNT: 'Don\'t have an account?',
    HAVE_ACCOUNT: 'Already have an account?',
    SIGNING_IN: 'Signing in...',
    SIGNING_UP: 'Creating account...',
  },

  // Common Messages
  MESSAGES: {
    LOADING: 'Loading...',
    ERROR: 'Something went wrong',
    SUCCESS: 'Success!',
    TRY_AGAIN: 'Please try again',
    NO_RESULTS: 'No results found',
    SEARCH_ERROR: 'Failed to search',
  },

  // Video Player
  VIDEO: {
    LOADING: 'Loading video...',
    ERROR_INVALID_URL: 'Invalid YouTube URL',
    ERROR_NOT_FOUND: 'Video not found or private',
    ERROR_EMBED_DISABLED: 'Video owner does not allow embedding',
    ERROR_HTML5: 'HTML5 player error',
    ERROR_GENERIC: 'Failed to load video',
  },
};

export default STRINGS;
