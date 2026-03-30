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
    enrolled: 'Enrolled',
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
    pageSubtitle: 'Continue your learning journey',
    welcomeBack: 'Welcome back',
    myCourses: 'My Enrolled Courses',
    noCourses: 'You haven\'t enrolled in any courses yet',
    browseCourses: 'Browse Available Courses',
    continueLearning: 'Continue Learning',
    progress: 'Progress',
    completed: 'Completed',
    profileTitle: 'Profile',
    profileName: 'Name',
    profileEmail: 'Email',
    profileMemberSince: 'Member since',
    profileNotSet: 'Not set',
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
    formName: 'Your Name *',
    formEmail: 'Your Email *',
    formSubject: 'Subject *',
    formMessage: 'Message *',
    formNamePlaceholder: 'John Doe',
    formEmailPlaceholder: 'john@example.com',
    formSubjectPlaceholder: 'How can we help you?',
    formMessagePlaceholder: 'Tell us more about your question...',
    formSubmit: 'Send Message',
    formSending: 'Sending...',
    formSuccess: 'Opening your email client...',
    formError: 'Failed to open email client. Please try again.',
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
    loginSubtitle: 'Login to continue your learning journey',
    signupTitle: 'Create Account',
    signupSubtitle: 'Start your learning journey today',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    confirmPasswordLabel: 'Confirm Password',
    nameLabel: 'Full Name',
    emailPlaceholder: 'your@email.com',
    passwordPlaceholder: '••••••••',
    namePlaceholder: 'John Doe',
    loginBtn: 'Login',
    signupBtn: 'Sign Up',
    loggingIn: 'Logging in...',
    creatingAccount: 'Creating account...',
    continueWithGoogle: 'Continue with Google',
    forgotPassword: 'Forgot Password?',
    noAccount: 'Don\'t have an account?',
    haveAccount: 'Already have an account?',
    orDivider: 'OR',
  },

  // Common Messages
  messages: {
    loading: 'Loading...',
    loadingYourCourses: 'Loading your courses...',
    error: 'Something went wrong',
    success: 'Success!',
    tryAgain: 'Please try again',
    noResults: 'No results found',
    searchError: 'Failed to search',
    notFound: 'Not Found',
    backToCourses: 'Back to Courses',
    shareThis: 'Share',
    user: 'User',
    student: 'Student',
  },

  // Home Page Features
  homeFeatures: {
    qualityVideosTitle: 'Quality Videos',
    qualityVideosDesc: 'Learn from high-quality video content created by experts',
    learnPaceTitle: 'Learn at Your Pace',
    learnPaceDesc: 'Study whenever you want, wherever you are',
    trackProgressTitle: 'Track Progress',
    trackProgressDesc: 'Monitor your learning journey with detailed progress tracking',
    expertInstructorsTitle: 'Expert Instructors',
    expertInstructorsDesc: 'Learn from industry professionals and experienced teachers',
    qualityVideosIcon: '📹',
    learnPaceIcon: '⏱️',
    trackProgressIcon: '📊',
    expertInstructorsIcon: '🎓',
  },

  // Dashboard Stats
  dashboardStats: {
    enrolledCoursesLabel: 'Enrolled Courses',
    completedLabel: 'Completed',
    inProgressLabel: 'In Progress',
    hoursLearnedLabel: 'Hours Learned',
    enrolledIcon: '📚',
    completedIcon: '✅',
    inProgressIcon: '⏳',
    hoursIcon: '🕐',
  },

  // Course Detail
  courseDetail: {
    notFoundTitle: 'Course Not Found',
    notFoundDesc: 'The course you\'re looking for doesn\'t exist.',
    noLessonsDesc: 'This course doesn\'t have any video lessons yet.',
    breadcrumbSeparator: '›',
    enrolledBtn: '✓ Enrolled',
    enrollFor: 'Enroll for',
    shareCourse: 'Share Course',
    copyLink: 'Copy Link',
    shareWhatsApp: 'WhatsApp',
    shareEmail: 'Email',
    shareText: 'Check out this course:',
    linkCopied: 'Course link copied to clipboard!',
    linkCopyFailed: 'Failed to copy link',
    viewCourse: 'View Course',
    studentsLabel: 'students',
    whatYouLearn: '📖 What You\'ll Learn',
    courseCurriculum: '📚 Course Curriculum',
    aboutInstructor: '👨‍🏫 About the Instructor',
    comingSoon: 'More modules coming soon! This course is under development.',
    moduleIntro: 'Module 1: Introduction',
    welcomeLesson: 'Welcome to the Course',
    setupLesson: 'Setting Up Your Environment',
    masterFundamentals: 'Master the fundamentals of',
    buildProjects: 'Build real-world projects from scratch',
    bestPractices: 'Understand best practices and industry standards',
    handsOnExperience: 'Get hands-on experience with practical examples',
    expertWith: 'Expert instructor with years of experience in',
  },

  // YouTube Search
  youtube: {
    searchPlaceholder: 'Search YouTube videos...',
    searchBtn: 'Search',
    searching: 'Searching...',
    searchResults: 'Search Results',
    apiKeyError: 'YouTube API key not configured',
    apiKeyHint: 'Add NEXT_PUBLIC_YOUTUBE_API_KEY to your .env.local file',
    searchFailed: 'Failed to search YouTube',
    tutorialSuffix: ' tutorial',
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

  // Page Titles & Meta
  pageTitles: {
    home: 'LearnHub - Video Learning Platform',
    courses: 'All Courses - LearnHub',
    dashboard: 'Dashboard - LearnHub',
    about: 'About Us - LearnHub',
    contact: 'Contact Us - LearnHub',
    login: 'Login - LearnHub',
    signup: 'Sign Up - LearnHub',
  },

  pageDescriptions: {
    home: 'Learn new skills with our comprehensive video courses. Browse 72+ courses across frontend, backend, security, DevOps, cloud, and AI.',
    about: 'Learn more about LearnHub - Your gateway to quality online education',
    contact: 'Get in touch with LearnHub team. We\'re here to help!',
    dashboard: 'Your learning dashboard',
  },
};

export default strings;
