/**
 * Application strings Configuration
 * Centralized string management for easy updates and localization
 */

const strings = {
  // App Name & Branding
  appName: 'LearnHub',
  appTagline: 'Your gateway to quality online education',
  appIcon: '🎓',

  // SEO & Meta
  seo: {
    defaultTitle: 'LearnHub - Video Learning Platform',
    defaultDescription: 'Learn new skills with free video courses on web development, programming, and more',
    defaultKeywords: 'online learning, video courses, programming tutorials, web development, LearnHub',
  },

  // Navigation
  nav: {
    home: 'Home',
    courses: 'Courses',
    dashboard: 'Dashboard',
    about: 'About Us',
    contact: 'Contact',
    login: 'Login',
    logout: 'Logout',
    signup: 'Sign Up',
  },

  // Home Page
  home: {
    heroTitle: 'Welcome to',
    heroSubtitle: 'Start your learning journey today with free video courses',
    ctaPrimary: 'Browse Courses',
    ctaSecondary: 'Learn More',
    whyChooseTitle: 'Why Choose LearnHub?',
    featureFreeTitle: '🆓 100% Free',
    featureFreeDesc: 'All our courses are completely free. No hidden costs or subscriptions.',
    featureQualityTitle: '⭐ High Quality',
    featureQualityDesc: 'Carefully curated courses from experienced instructors.',
    featureFlexibleTitle: '🕒 Learn at Your Pace',
    featureFlexibleDesc: 'Watch lessons anytime, anywhere at your own speed.',
    featureVarietyTitle: '📚 Wide Variety',
    featureVarietyDesc: 'Courses covering programming, design, business, and more.',
  },

  // Courses Page
  courses: {
    pageTitle: 'All Courses',
    pageSubtitle: 'Learn new skills with our comprehensive video courses. All courses are free!',
    heroTitle: 'Explore Our Courses',
    searchPlaceholder: 'Search courses, topics, or technologies...',
    browseByCategory: 'Browse by Category',
    exploreCourses: 'Explore Courses',
    backToCategories: '← Back to Categories',
    foundCourses: 'Found',
    coursesMatching: 'matching',
    noCourseCategory: 'No courses in this category yet',
    checkBackSoon: 'Check back soon for new courses!',
    youtubeFound: 'We found',
    youtubeVideos: 'YouTube videos',
    youtubeCta: 'Select a course and start learning!',
  },

  // Course Categories
  categories: {
    frontend: {
      name: 'Front-End Development',
      desc: 'Build beautiful user interfaces',
    },
    backend: {
      name: 'Back-End Development',
      desc: 'Create powerful server-side applications',
    },
    database: {
      name: 'Database',
      desc: 'Master data storage and management',
    },
    security: {
      name: 'Security',
      desc: 'Protect applications and data',
    },
    devops: {
      name: 'DevOps',
      desc: 'Streamline development workflows',
    },
    mobile: {
      name: 'Mobile Development',
      desc: 'Build native and cross-platform apps',
    },
    cloud: {
      name: 'Cloud Computing',
      desc: 'Deploy and scale in the cloud',
    },
    ai: {
      name: 'AI & Machine Learning',
      desc: 'Build intelligent applications',
    },
  },

  // Course Details
  course: {
    enrollBtn: 'Enroll Now',
    enrolledBtn: 'Already Enrolled',
    startLearning: 'Start Learning',
    whatYouLearn: 'What you\'ll learn',
    courseContent: 'Course Content',
    lessons: 'lessons',
    instructor: 'Instructor',
    duration: 'Duration',
    level: 'Level',
    category: 'Category',
    enrolling: 'Enrolling...',
    enrollmentSuccess: 'Successfully enrolled! Starting course...',
    enrollmentError: 'Failed to enroll. Please try again.',
  },

  // Watch Page
  watch: {
    lesson: 'Lesson',
    of: 'of',
    courseContent: 'Course Content',
    unableToPlay: 'Unable to Play Video',
    videoRestricted: 'This video cannot be played in embedded mode. The video owner has restricted playback on external websites.',
    backToCourses: '← Back to Courses',
    watchOnYoutube: 'Watch on YouTube ↗',
    aboutVideo: 'About this video',
    by: 'By',
  },

  // Dashboard
  dashboard: {
    pageTitle: 'My Dashboard',
    welcomeBack: 'Welcome back',
    myCourses: 'My Enrolled Courses',
    noCourses: 'You haven\'t enrolled in any courses yet',
    browseCourses: 'Browse Available Courses',
    continueLearning: 'Continue Learning',
    progress: 'Progress',
    completed: 'Completed',
  },

  // About Page
  about: {
    pageTitle: 'About Us',
    pageSubtitle: 'Empowering learners worldwide with free, high-quality educational content',
    heroTitle: 'About LearnHub',
    missionTitle: 'Our Mission',
    missionText1: 'At LearnHub, we believe that education should be accessible to everyone, everywhere. Our mission is to provide free, high-quality video courses that help learners develop new skills and advance their careers.',
    missionText2: 'We curate the best educational content across various domains including web development, mobile development, data science, cloud computing, and more.',
    valuesTitle: 'Our Values',
    valueQualityTitle: 'Quality First',
    valueQualityText: 'We carefully select and curate courses to ensure the highest quality learning experience.',
    valueFreeTitle: 'Always Free',
    valueFreeText: 'All our courses are completely free. No hidden fees, no subscriptions required.',
    valueLearningTitle: 'Continuous Learning',
    valueLearningText: 'We regularly update our content library to keep pace with the latest technologies.',
    valueCommunityTitle: 'Community Driven',
    valueCommunityText: 'Built by learners, for learners. We value feedback and continuously improve.',
    statsCourses: '72+',
    statsCoursesLabel: 'Free Courses',
    statsCategories: '8',
    statsCategoriesLabel: 'Categories',
    statsFree: '100%',
    statsFreeLabel: 'Free Content',
    statsAccess: '24/7',
    statsAccessLabel: 'Access',
    ctaTitle: 'Ready to Start Learning?',
    ctaText: 'Join thousands of learners and start your journey today. All courses are free!',
    ctaBrowse: 'Browse Courses',
    ctaContact: 'Contact Us',
  },

  // Contact Page
  contact: {
    pageTitle: 'Contact Us',
    pageSubtitle: 'Have questions? We\'d love to hear from you. Send us a message!',
    heroTitle: 'Get In Touch',
    formTitle: 'Send us a Message',
    formName: 'Your Name',
    formEmail: 'Your Email',
    formSubject: 'Subject',
    formMessage: 'Message',
    formNamePlaceholder: 'John Doe',
    formEmailPlaceholder: 'john@example.com',
    formSubjectPlaceholder: 'How can we help you?',
    formMessagePlaceholder: 'Tell us more about your question...',
    formSubmit: 'Send Message',
    formSending: 'Sending...',
    contactInfoTitle: 'Contact Information',
    emailTitle: 'Email',
    emailAddress: 'divyachavhan234@gmail.com',
    emailDesc: 'Send us an email anytime. We\'ll respond within 24 hours.',
    whatsappTitle: 'WhatsApp',
    whatsappBtn: 'Chat with us on WhatsApp',
    whatsappDesc: 'Get instant responses to your questions via WhatsApp.',
    whatsappMessage: 'Hi! I have a question about LearnHub.',
    responseTitle: 'Response Time',
    responseTime: 'Usually within 24 hours',
    responseDesc: 'We strive to respond to all inquiries as quickly as possible.',
    faqTitle: 'Quick Questions?',
    faq1: '✓ All courses are 100% free',
    faq2: '✓ No registration required to browse',
    faq3: '✓ New courses added regularly',
    faq4: '✓ Available 24/7',
  },

  // Footer
  footer: {
    tagline: 'Your gateway to quality online education.',
    quickLinks: 'Quick Links',
    followUs: 'Follow Us',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    copyright: 'All rights reserved.',
    madeBy: 'Built with ❤️ by Divya Chavhan',
  },

  // Auth
  auth: {
    loginTitle: 'Welcome Back',
    loginSubtitle: 'Sign in to continue your learning',
    signupTitle: 'Create Account',
    signupSubtitle: 'Start your learning journey today',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    nameLabel: 'Full Name',
    loginBtn: 'Sign In',
    signupBtn: 'Sign Up',
    forgotPassword: 'Forgot Password?',
    noAccount: 'Don\'t have an account?',
    haveAccount: 'Already have an account?',
    signingIn: 'Signing in...',
    signingUp: 'Creating account...',
  },

  // Common Messages
  messages: {
    loading: 'Loading...',
    error: 'Something went wrong',
    success: 'Success!',
    tryAgain: 'Please try again',
    noResults: 'No results found',
    searchError: 'Failed to search',
  },

  // Video Player
  video: {
    loading: 'Loading video...',
    errorInvalidUrl: 'Invalid YouTube URL',
    errorNotFound: 'Video not found or private',
    errorEmbedDisabled: 'Video owner does not allow embedding',
    errorHtml5: 'HTML5 player error',
    errorGeneric: 'Failed to load video',
  },
};

export default strings;
