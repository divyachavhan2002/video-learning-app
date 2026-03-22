# 🤝 Contributing to Video Learning App

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing Guidelines](#testing-guidelines)

---

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm or yarn
- Git
- GitHub account
- Code editor (VS Code recommended)

### Setup Development Environment

1. **Fork and clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/video-learning-app.git
cd video-learning-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Verify setup**
- Open http://localhost:3000
- Should see the home page without errors

---

## 🔄 Development Workflow

### Our Git Workflow

```
master (production-ready code)
  ├── feature/basic-layout ✅ (merged)
  ├── feature/responsive-improvements 🔄 (in progress)
  └── feature/YOUR-FEATURE (your branch)
```

### Step-by-Step Process

#### 1. **Start with Latest Code**
```bash
git checkout master
git pull origin master
```

#### 2. **Create Feature Branch**
```bash
git checkout -b feature/your-feature-name
```

#### 3. **Make Changes**
- Write code
- Test locally
- Follow code style guidelines

#### 4. **Commit Changes**
```bash
git add .
git commit -m "feat: Add your feature description"
```

#### 5. **Push to GitHub**
```bash
git push origin feature/your-feature-name
```

#### 6. **Create Pull Request**
- Go to GitHub repository
- Click "Compare & pull request"
- Fill in PR template
- Request review

#### 7. **Address Review Comments**
- Make requested changes
- Commit and push updates
- PR will auto-update

#### 8. **Merge PR**
- Once approved, merge to master
- Delete feature branch
- Pull latest master

---

## 🌿 Branch Naming Convention

### Format: `type/description`

**Types:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `style/` - Code formatting (no logic change)
- `refactor/` - Code restructuring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

**Examples:**
```bash
✅ feature/courses-page
✅ feature/user-authentication
✅ fix/header-mobile-menu
✅ docs/update-readme
✅ style/format-components
```

**Avoid:**
```bash
❌ my-changes
❌ update
❌ fix-bug
❌ feature
```

---

## 💬 Commit Message Guidelines

### Format

```
<type>: <description>

[optional body]

[optional footer]
```

### Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat: Add course listing page` |
| `fix` | Bug fix | `fix: Resolve mobile menu not closing` |
| `docs` | Documentation | `docs: Update installation steps` |
| `style` | Code formatting | `style: Format with Prettier` |
| `refactor` | Code restructure | `refactor: Simplify header component` |
| `perf` | Performance improvement | `perf: Optimize image loading` |
| `test` | Add/update tests | `test: Add header component tests` |
| `chore` | Maintenance | `chore: Update dependencies` |

### Good Commit Messages

```bash
✅ feat: Add responsive navigation menu for mobile devices
✅ fix: Correct footer alignment on tablet screens
✅ docs: Add responsive design documentation
✅ style: Format all CSS files with consistent indentation
✅ refactor: Extract reusable Button component
```

### Bad Commit Messages

```bash
❌ update
❌ fixed bug
❌ changes
❌ wip
❌ test commit
```

### Detailed Commit Example

```bash
feat: Add course card component

- Created reusable CourseCard component
- Added hover effects and transitions
- Implemented responsive grid layout
- Added course thumbnail, title, and description
- Included enrollment button

Closes #12
```

---

## 🔍 Pull Request Process

### Before Creating PR

- ✅ Code runs without errors
- ✅ Tested on desktop and mobile
- ✅ No console errors or warnings
- ✅ Code follows style guidelines
- ✅ Commit messages are clear
- ✅ Branch is up to date with master

### PR Title Format

```
<type>: <clear description>
```

**Examples:**
```
✅ feat: Add responsive course listing page
✅ fix: Resolve header sticky position on mobile
✅ docs: Update contributing guidelines
```

### PR Description Template

```markdown
## 📋 Changes Made

### Summary
Brief description of what this PR does

### Components Created/Modified
- Component 1
- Component 2

### Features Added
- ✅ Feature 1
- ✅ Feature 2

## 🎨 Screenshots (if UI changes)
[Add screenshots here]

## ✅ Checklist
- [ ] Code runs without errors
- [ ] Tested on mobile and desktop
- [ ] No console warnings
- [ ] Follows code style guidelines
- [ ] Updated documentation (if needed)

## 🔗 Related Issues
Closes #issue-number
```

### Review Process

1. **Self-Review**
   - Review your own code first
   - Check for typos, unused code
   - Verify all tests pass

2. **Peer Review** (if applicable)
   - Team member reviews code
   - Provides feedback
   - Approves or requests changes

3. **Address Feedback**
   - Make requested changes
   - Respond to comments
   - Push updates

4. **Merge**
   - Once approved, merge to master
   - Delete feature branch
   - Close related issues

---

## 🎨 Code Style Guidelines

### JavaScript/React

#### File Naming
```bash
✅ Components: PascalCase (Header.js, CourseCard.js)
✅ Pages: lowercase (index.js, courses.js)
✅ Utilities: camelCase (helpers.js, formatDate.js)
✅ CSS Modules: ComponentName.module.css
```

#### Component Structure
```javascript
// Good component structure
import styles from './ComponentName.module.css';

export default function ComponentName({ prop1, prop2 }) {
  // State declarations
  const [state, setState] = useState(null);
  
  // Event handlers
  const handleClick = () => {
    // logic
  };
  
  // Render
  return (
    <div className={styles.container}>
      {/* JSX */}
    </div>
  );
}
```

#### Best Practices
```javascript
// ✅ Good
const [isLoading, setIsLoading] = useState(false);
const handleSubmit = (e) => { e.preventDefault(); };

// ❌ Avoid
const [x, setX] = useState(false);
const submit = (e) => { /* no preventDefault */ };
```

### CSS/Styling

#### CSS Modules
```css
/* Good CSS structure */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: clamp(2rem, 5vw, 3rem);
  color: var(--primary-color);
}

/* Mobile-first responsive */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
```

#### Naming Conventions
```css
✅ .componentName
✅ .headerContainer
✅ .primaryButton

❌ .component-name
❌ .header_container
❌ .btn-primary
```

### Responsive Design

#### Always Use
```css
/* Fluid typography */
font-size: clamp(min, preferred, max);

/* Responsive spacing */
padding: clamp(1rem, 2vw, 2rem);

/* Touch-friendly */
min-height: 44px;
min-width: 44px;
```

#### Breakpoints
```css
/* Mobile */
@media (max-width: 480px) { }

/* Tablet */
@media (max-width: 768px) { }

/* Laptop */
@media (max-width: 1024px) { }

/* Desktop Large */
@media (min-width: 1440px) { }

/* Landscape */
@media (max-height: 500px) and (orientation: landscape) { }
```

---

## 🧪 Testing Guidelines

### Manual Testing Checklist

#### Before Every Commit
- [ ] Run `npm run dev` - no errors
- [ ] Test all new functionality
- [ ] Check browser console - no warnings
- [ ] Test on mobile view (DevTools)
- [ ] Test on tablet view (DevTools)
- [ ] Test on desktop view

#### Browser Testing
- [ ] Chrome (primary)
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Edge

#### Device Testing
- [ ] iPhone view (375px)
- [ ] iPad view (768px)
- [ ] Laptop view (1366px)
- [ ] Desktop view (1920px)

#### Responsive Testing
```bash
# Use Chrome DevTools
1. Press F12
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Test these presets:
   - iPhone SE
   - iPhone 12 Pro
   - iPad
   - iPad Pro
   - Desktop
4. Test both orientations
```

---

## 📝 Documentation

### When to Update Documentation

Update docs when you:
- Add new features
- Change project structure
- Modify setup process
- Add dependencies
- Change workflows

### Files to Update

| File | When to Update |
|------|---------------|
| `README.md` | New features, setup changes |
| `CONTRIBUTING.md` | Workflow changes |
| `ARCHITECTURE.md` | Structure changes, new patterns |

---

## 🐛 Reporting Bugs

### Bug Report Format

```markdown
**Describe the bug**
Clear description of the issue

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
- Browser: [e.g., Chrome 120]
- Device: [e.g., iPhone 12]
- OS: [e.g., Windows 11]
```

---

## 💡 Suggesting Features

### Feature Request Format

```markdown
**Feature Description**
Clear description of the feature

**Problem it Solves**
What user problem does this address?

**Proposed Solution**
How should it work?

**Alternatives Considered**
Other approaches you thought about

**Additional Context**
Screenshots, mockups, etc.
```

---

## ❓ Questions?

- Check existing issues/PRs
- Read documentation
- Ask in PR comments
- Contact: divyachavhan234@gmail.com

---

## 🎓 Learning Resources

### Recommended Reading
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Git Workflow](https://guides.github.com/introduction/flow/)
- [Writing Good Commits](https://chris.beams.io/posts/git-commit/)

---

**Thank you for contributing! 🎉**

Every contribution, no matter how small, helps make this project better.
