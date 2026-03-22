# 🏗️ Architecture Documentation

> Technical design and architecture of the Video Learning App

---

## 📋 Table of Contents

- [System Overview](#system-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Component Architecture](#component-architecture)
- [Routing Structure](#routing-structure)
- [State Management](#state-management)
- [Styling Architecture](#styling-architecture)
- [Data Flow](#data-flow)
- [Future Architecture](#future-architecture)

---

## 🎯 System Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                    User Browser                      │
│  ┌──────────────────────────────────────────────┐  │
│  │           Next.js Frontend (React)           │  │
│  │                                              │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │  │
│  │  │  Pages   │  │Components│  │  Styles  │  │  │
│  │  └──────────┘  └──────────┘  └──────────┘  │  │
│  │                                              │  │
│  │  ┌──────────────────────────────────────┐  │  │
│  │  │        Layout (Header + Footer)      │  │  │
│  │  └──────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │    Firebase (Future)          │
        │  ┌─────────────────────────┐  │
        │  │   Authentication        │  │
        │  │   Firestore Database    │  │
        │  │   Cloud Storage         │  │
        │  └─────────────────────────┘  │
        └───────────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │    YouTube API (Videos)       │
        └───────────────────────────────┘
```

### Current State (Phase 3)
✅ **Frontend:** Complete with responsive design  
⏳ **Backend:** Not yet implemented  
⏳ **Database:** Not yet implemented  
⏳ **Authentication:** Not yet implemented

---

## 🛠️ Technology Stack

### Frontend Framework
```javascript
{
  "framework": "Next.js 16.2.1",
  "router": "Pages Router",
  "rendering": "Server-Side Rendering (SSR) + Static Generation",
  "language": "JavaScript (ES6+)",
  "ui-library": "React 19.2.4"
}
```

### Styling
```javascript
{
  "methodology": "CSS Modules",
  "approach": "Mobile-First Responsive Design",
  "features": [
    "CSS Variables for theming",
    "Fluid Typography (clamp)",
    "Flexbox & CSS Grid",
    "No external CSS frameworks"
  ]
}
```

### Development Tools
```javascript
{
  "package-manager": "npm",
  "linting": "ESLint",
  "version-control": "Git + GitHub",
  "deployment": "Vercel"
}
```

### Future Stack
```javascript
{
  "database": "Firebase Firestore",
  "authentication": "Firebase Auth",
  "storage": "Firebase Storage",
  "video-player": "React Player",
  "video-hosting": "YouTube (embedded)"
}
```

---

## 📁 Project Structure

### Current Directory Tree

```
video-learning-app/
│
├── 📄 Configuration Files
│   ├── .gitignore              # Git ignore rules
│   ├── package.json            # Dependencies & scripts
│   ├── next.config.mjs         # Next.js configuration
│   ├── jsconfig.json           # JavaScript config (path aliases)
│   └── eslint.config.mjs       # ESLint rules
│
├── 📁 pages/                   # Next.js Pages (Routes)
│   ├── _app.js                 # Global app wrapper
│   ├── _document.js            # HTML document structure
│   ├── index.js                # Home page (/)
│   ├── api/                    # API routes (future)
│   │   └── hello.js            # Sample API endpoint
│   │
│   ├── 🔄 Future Pages:
│   ├── courses.js              # Course listing (/courses)
│   ├── login.js                # Login page (/login)
│   ├── signup.js               # Signup page (/signup)
│   ├── dashboard.js            # User dashboard (/dashboard)
│   ├── course/
│   │   └── [id].js             # Course detail (/course/:id)
│   └── watch/
│       └── [videoId].js        # Video player (/watch/:videoId)
│
├── 📁 components/              # Reusable React Components
│   ├── layout/
│   │   ├── Header.js           # Navigation header
│   │   ├── Header.module.css   # Header styles
│   │   ├── Footer.js           # Site footer
│   │   ├── Footer.module.css   # Footer styles
│   │   ├── Layout.js           # Main layout wrapper
│   │   └── Layout.module.css   # Layout styles
│   │
│   ├── 🔄 Future Components:
│   ├── course/
│   │   ├── CourseCard.js       # Course card component
│   │   └── CourseList.js       # Course listing component
│   ├── video/
│   │   └── VideoPlayer.js      # Video player component
│   └── ui/
│       ├── Button.js           # Reusable button
│       ├── Input.js            # Form input
│       └── Card.js             # Card wrapper
│
├── 📁 styles/                  # CSS Files
│   ├── globals.css             # Global styles & CSS variables
│   └── Home.module.css         # Home page styles
│
├── 📁 lib/                     # Configuration & Setup
│   └── 🔄 firebase.js          # Firebase config (future)
│
├── 📁 utils/                   # Utility Functions
│   └── 🔄 helpers.js           # Helper functions (future)
│
├── 📁 public/                  # Static Assets
│   ├── images/                 # Images
│   ├── favicon.ico             # Site icon
│   └── *.svg                   # SVG assets
│
└── 📁 Documentation
    ├── README.md               # Main documentation
    ├── CONTRIBUTING.md         # Contribution guidelines
    └── ARCHITECTURE.md         # This file
```

### Path Aliases

Configured in `jsconfig.json`:
```javascript
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**Usage:**
```javascript
// Instead of: import Layout from '../../components/layout/Layout'
import Layout from '@/components/layout/Layout'

// Instead of: import styles from '../../styles/Home.module.css'
import styles from '@/styles/Home.module.css'
```

---

## 🧩 Component Architecture

### Component Hierarchy

```
App (_app.js)
└── Layout
    ├── Header
    │   ├── Logo
    │   ├── Navigation
    │   └── AuthButtons
    │
    ├── Main Content (Page)
    │   └── Home
    │       ├── Hero Section
    │       │   ├── Title
    │       │   ├── Subtitle
    │       │   └── CTA Buttons
    │       │
    │       └── Features Section
    │           └── Feature Grid
    │               ├── Feature Card (4x)
    │               │   ├── Icon
    │               │   ├── Title
    │               │   └── Description
    │
    └── Footer
        ├── About Section
        ├── Quick Links
        ├── Social Links
        └── Copyright
```

### Component Types

#### 1. **Layout Components** (`components/layout/`)
Purpose: Provide consistent structure across all pages

**Layout.js** - Main wrapper
```javascript
export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
```

**Header.js** - Navigation
- Sticky positioning
- Logo + Navigation links
- Auth buttons (Login/Signup)
- Responsive (mobile hides nav)

**Footer.js** - Site footer
- Grid layout (3 → 2 → 1 columns)
- Links and social media
- Copyright notice

#### 2. **Page Components** (`pages/`)
Purpose: Define routes and page content

**index.js** - Home page
- Hero section with gradient
- Features grid
- Call-to-action buttons

#### 3. **Future Component Types**

**UI Components** (`components/ui/`)
- Reusable elements (Button, Input, Card)
- Consistent styling
- Accept props for customization

**Feature Components** (`components/course/`, `components/video/`)
- Business logic components
- Course cards, video players
- Connected to data/state

---

## 🛣️ Routing Structure

### Next.js Pages Router

| Route | File | Component | Status |
|-------|------|-----------|--------|
| `/` | `pages/index.js` | Home | ✅ Complete |
| `/courses` | `pages/courses.js` | Course Listing | 🔄 Planned |
| `/course/:id` | `pages/course/[id].js` | Course Detail | 🔄 Planned |
| `/watch/:videoId` | `pages/watch/[videoId].js` | Video Player | 🔄 Planned |
| `/login` | `pages/login.js` | Login | 🔄 Planned |
| `/signup` | `pages/signup.js` | Signup | 🔄 Planned |
| `/dashboard` | `pages/dashboard.js` | User Dashboard | 🔄 Planned |

### Route Types

#### 1. **Static Routes**
```javascript
pages/index.js      → /
pages/courses.js    → /courses
pages/login.js      → /login
```

#### 2. **Dynamic Routes**
```javascript
pages/course/[id].js         → /course/123
pages/watch/[videoId].js     → /watch/abc123
```

**Usage:**
```javascript
import { useRouter } from 'next/router';

export default function CoursePage() {
  const router = useRouter();
  const { id } = router.query;  // Get ID from URL
  
  return <div>Course {id}</div>;
}
```

#### 3. **API Routes** (Future)
```javascript
pages/api/courses.js         → /api/courses
pages/api/auth/login.js      → /api/auth/login
```

---

## 🔄 State Management

### Current Approach (Phase 3)

**No state management library needed yet**
- Using React's built-in `useState` and `useEffect`
- Props drilling for simple data passing
- Context API for theme/auth (future)

### Future State Management

When the app grows, we'll use:

#### **Option 1: React Context API** (Recommended for this project)
```javascript
// AuthContext.js
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
```

#### **Option 2: Zustand** (If we need more features)
- Lightweight state management
- Better than Redux for small projects
- Easy to learn

### Data Flow Patterns

```
┌──────────────────────────────────────┐
│            Firebase                  │
│  (Auth, Firestore, Storage)          │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│         Context/State                │
│  (User, Courses, Progress)           │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│           Components                 │
│  (Read state, dispatch actions)      │
└──────────────────────────────────────┘
```

---

## 🎨 Styling Architecture

### CSS Modules Approach

**Why CSS Modules?**
- ✅ Scoped styles (no naming conflicts)
- ✅ Better performance than CSS-in-JS
- ✅ Easier to learn than Tailwind
- ✅ Works great with Next.js

### File Naming Convention
```
ComponentName.js
ComponentName.module.css
```

### Global Styles (`styles/globals.css`)

**CSS Variables:**
```css
:root {
  /* Colors */
  --primary-color: #2563eb;
  --accent-color: #fbbf24;
  --background: #f9fafb;
  
  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  
  /* Container */
  --container-max: 1200px;
}
```

### Component Styles

**Example: Header.module.css**
```css
.header {
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 100;
}

/* Responsive */
@media (max-width: 768px) {
  .nav {
    display: none;
  }
}
```

### Responsive Strategy

**Mobile-First Approach:**
1. Base styles for mobile
2. Add complexity for larger screens
3. Use `clamp()` for fluid typography
4. Test all breakpoints

**Breakpoints:**
```css
/* Mobile: < 480px (base styles) */
/* Tablet: 768px */
@media (max-width: 768px) { }

/* Laptop: 1024px */
@media (max-width: 1024px) { }

/* Desktop: 1440px+ */
@media (min-width: 1440px) { }

/* Landscape */
@media (max-height: 500px) and (orientation: landscape) { }
```

---

## 📊 Data Flow

### Current Data Flow (Static)

```
Static Data (Hardcoded)
        │
        ▼
   Component State
        │
        ▼
     Render UI
```

### Future Data Flow (Dynamic)

```
User Action (Click, Submit)
        │
        ▼
Event Handler
        │
        ▼
Firebase Query/Mutation
        │
        ▼
Update State (Context/Zustand)
        │
        ▼
Re-render Components
```

### Example: Course Enrollment Flow (Future)

```
1. User clicks "Enroll" button
        │
        ▼
2. handleEnroll() function
        │
        ▼
3. Firebase: Add to 'enrollments' collection
        │
        ▼
4. Update Context: Add course to user.enrolledCourses
        │
        ▼
5. UI Updates: Show "Enrolled" badge
        │
        ▼
6. Redirect to dashboard
```

---

## 🚀 Future Architecture

### Phase 4-7 Additions

#### **Authentication Flow**
```
Login Page
    │
    ├─→ Firebase Auth (Email/Password)
    │
    ├─→ Success: Set user in Context
    │
    └─→ Redirect to Dashboard
```

#### **Database Schema (Firestore)**

**Collections:**
```javascript
// users
{
  uid: "user123",
  name: "John Doe",
  email: "john@example.com",
  enrolledCourses: ["course1", "course2"],
  createdAt: timestamp
}

// courses
{
  id: "course1",
  title: "React Fundamentals",
  description: "Learn React from scratch",
  thumbnail: "url",
  videos: ["video1", "video2"],
  instructor: "Jane Smith",
  createdAt: timestamp
}

// videos
{
  id: "video1",
  courseId: "course1",
  title: "Introduction to React",
  youtubeId: "abc123",
  duration: 600,
  order: 1
}

// enrollments
{
  userId: "user123",
  courseId: "course1",
  progress: {
    video1: { watched: true, watchedAt: timestamp },
    video2: { watched: false }
  },
  enrolledAt: timestamp
}
```

#### **Video Player Integration**
```
YouTube Video → React Player → Progress Tracking → Firestore
```

---

## 🔐 Security Considerations (Future)

### Firebase Security Rules
```javascript
// Firestore Rules
match /users/{userId} {
  allow read, write: if request.auth.uid == userId;
}

match /courses/{courseId} {
  allow read: if true;  // Public
  allow write: if false;  // Admin only
}

match /enrollments/{enrollmentId} {
  allow read, write: if request.auth.uid == resource.data.userId;
}
```

### Environment Variables
```bash
# .env.local (Never commit this!)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
```

---

## 📈 Performance Optimization

### Current Optimizations
- ✅ CSS Modules (minimal CSS)
- ✅ No unnecessary dependencies
- ✅ Optimized images in `public/`
- ✅ Server-side rendering (Next.js)

### Future Optimizations
- Image optimization (Next.js Image component)
- Code splitting (dynamic imports)
- Lazy loading components
- Memoization (React.memo, useMemo)
- CDN for static assets (Vercel)

---

## 🧪 Testing Strategy (Future)

### Testing Pyramid
```
         ┌───────────────┐
         │  E2E Tests    │ (Few)
         │  (Cypress)    │
         ├───────────────┤
         │ Integration   │ (Some)
         │ (React Testing│
         │   Library)    │
         ├───────────────┤
         │  Unit Tests   │ (Many)
         │    (Jest)     │
         └───────────────┘
```

---

## 📚 Design Patterns Used

### 1. **Component Composition**
```javascript
<Layout>
  <Header />
  <PageContent />
  <Footer />
</Layout>
```

### 2. **Container/Presentational Pattern** (Future)
```javascript
// Container (logic)
function CourseListContainer() {
  const [courses, setCourses] = useState([]);
  // Fetch data logic
  return <CourseList courses={courses} />;
}

// Presentational (UI)
function CourseList({ courses }) {
  return courses.map(course => <CourseCard {...course} />);
}
```

### 3. **Higher-Order Components** (Future)
```javascript
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user } = useAuth();
    if (!user) return <Redirect to="/login" />;
    return <Component {...props} />;
  };
}
```

---

## 🔄 Deployment Architecture

### Vercel Deployment
```
GitHub Repository (master branch)
        │
        ▼
Vercel Auto-Deploy
        │
        ├─→ Build (npm run build)
        ├─→ Optimize
        └─→ Deploy to CDN
               │
               ▼
        Live Website
```

### CI/CD Pipeline
```
Push to GitHub
    │
    ▼
Vercel Build Trigger
    │
    ├─→ Install dependencies
    ├─→ Run build
    ├─→ Run tests (future)
    └─→ Deploy
```

---

## 📝 Decision Log

### Why Next.js Pages Router (not App Router)?
- ✅ Simpler for beginners
- ✅ Mature and stable
- ✅ Better documentation
- ✅ Easier to understand routing

### Why CSS Modules (not Tailwind)?
- ✅ No learning curve for CSS framework
- ✅ Better understanding of CSS fundamentals
- ✅ Lightweight (no extra dependencies)
- ✅ Easy to maintain

### Why Firebase (not custom backend)?
- ✅ Quick setup
- ✅ Free tier sufficient
- ✅ Built-in authentication
- ✅ Real-time database
- ✅ No server management

---

## 🎓 Learning Resources

### Architecture Patterns
- [React Component Patterns](https://reactpatterns.com/)
- [Next.js Architecture](https://nextjs.org/docs/architecture)
- [Firebase Best Practices](https://firebase.google.com/docs/rules/best-practices)

---

**Last Updated:** March 22, 2026  
**Version:** 1.0.0  
**Status:** Active Development - Phase 3 Complete
