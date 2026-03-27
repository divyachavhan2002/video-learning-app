# Configuration System Documentation

## Overview

The LearnHub application uses a centralized configuration system that allows you to:
- Manage all UI strings from one place
- Control which features and sections are displayed
- Easily customize the application without touching component code

## Files Structure

```
config/
├── strings.js       # All UI text/strings
├── app.config.js    # Feature toggles and display settings
└── index.js         # Utility functions to access configs
```

## 1. Strings Management (`strings.js`)

All user-facing text is centralized in this file for easy updates and future localization.

### Usage Example:

```javascript
import { STRINGS } from '@/config';

// In your component
<h1>{STRINGS.APP_NAME}</h1>
<p>{STRINGS.HOME.HERO_SUBTITLE}</p>
```

### String Categories:

- **APP_NAME, APP_TAGLINE**: Brand identity
- **SEO**: Meta tags and descriptions
- **NAV**: Navigation menu items
- **HOME**: Home page content
- **COURSES**: Courses page content
- **CATEGORIES**: Category names and descriptions
- **COURSE**: Course details page
- **WATCH**: Video watch page
- **DASHBOARD**: User dashboard
- **ABOUT**: About page
- **CONTACT**: Contact page
- **FOOTER**: Footer content
- **AUTH**: Authentication pages
- **MESSAGES**: Common messages
- **VIDEO**: Video player messages

## 2. App Configuration (`app.config.js`)

Control which features and sections are displayed throughout the application.

### Feature Toggles

Enable or disable entire features:

```javascript
features: {
  authentication: true,      // Show login/signup
  enrollment: true,          // Allow course enrollment
  progressTracking: true,    // Track learning progress
  youtubeSearch: true,       // Enable YouTube search
  darkMode: true,           // Dark mode toggle
}
```

### Page-Specific Configuration

#### Courses Page

```javascript
coursesPage: {
  showSearch: true,
  showCategories: true,
  showYouTubeSearch: true,
  
  // Hide specific categories
  categories: {
    frontend: true,
    backend: true,    // Set to false to hide
    database: false,  // Hidden
    security: true,
    devops: true,
    mobile: true,
    cloud: true,
    ai: true,
  },
  
  coursesPerPage: 12,
  showInstructor: true,
  showDuration: true,
}
```

#### Navigation

```javascript
navigation: {
  showHome: true,
  showCourses: true,
  showDashboard: false,  // Hide dashboard link
  showAbout: true,
  showContact: true,
}
```

## 3. Using Configuration in Components

### Method 1: Direct Import

```javascript
import { APP_CONFIG, STRINGS } from '@/config';

export default function MyComponent() {
  return (
    <>
      <h1>{STRINGS.COURSES.PAGE_TITLE}</h1>
      
      {APP_CONFIG.coursesPage.showSearch && (
        <SearchBar />
      )}
    </>
  );
}
```

### Method 2: Using Utility Functions

```javascript
import { getConfig, getString, isFeatureEnabled } from '@/config';

export default function MyComponent() {
  const showSearch = getConfig('coursesPage.showSearch', true);
  const pageTitle = getString('COURSES.PAGE_TITLE', 'Courses');
  const hasAuth = isFeatureEnabled('authentication');
  
  return (
    <>
      <h1>{pageTitle}</h1>
      {showSearch && <SearchBar />}
      {hasAuth && <LoginButton />}
    </>
  );
}
```

### Method 3: Filter Categories

```javascript
import { getVisibleCategories } from '@/config';
import { courseCategories } from '@/data/courses';

export default function CoursesPage() {
  const visibleCategories = getVisibleCategories(courseCategories);
  
  return (
    <div>
      {visibleCategories.map(category => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
```

## 4. Common Use Cases

### Hide a Specific Category

In `app.config.js`:
```javascript
coursesPage: {
  categories: {
    backend: false,  // Hide backend courses
  }
}
```

### Disable YouTube Search

```javascript
features: {
  youtubeSearch: false,
}
```

### Customize Contact Information

```javascript
contactPage: {
  showWhatsApp: true,
  whatsappNumber: '919876543210',
}
```

### Change Site Branding

In `strings.js`:
```javascript
APP_NAME: 'Your App Name',
APP_TAGLINE: 'Your custom tagline',
```

## 5. Best Practices

### ✅ DO:
- Use `getString()` for all user-facing text
- Use `getConfig()` for conditional rendering
- Keep all strings in `strings.js`
- Keep all feature flags in `app.config.js`

### ❌ DON'T:
- Hardcode strings in components
- Hardcode feature flags
- Modify config files in production
- Add logic to config files

## 6. Example: Hiding Backend Courses

**Step 1:** Update `app.config.js`
```javascript
coursesPage: {
  categories: {
    backend: false,
  }
}
```

**Step 2:** Component automatically hides it
```javascript
// In courses.js
import { getVisibleCategories } from '@/config';

const visibleCategories = getVisibleCategories(courseCategories);
// Backend category will be filtered out automatically
```

## 7. Future Enhancements

- [ ] Multi-language support (i18n)
- [ ] Environment-specific configs
- [ ] User preference overrides
- [ ] Admin panel for config management
- [ ] Config validation

## 8. Troubleshooting

**Q: Changes in config not reflecting?**
- Restart the dev server
- Clear Next.js cache: `rm -rf .next`

**Q: How to reset to defaults?**
- Check the default values in utility functions
- All functions accept default fallback values

**Q: Can I nest configs deeper?**
- Yes! Use dot notation: `getConfig('a.b.c.d.e')`

## Support

For questions or issues with configuration:
- Check this documentation
- Review example implementations in components
- Contact: divyachavhan234@gmail.com
