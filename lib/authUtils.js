// ========================================
// SHARED AUTH UTILITIES
// Reusable functions for authentication
// ========================================

/**
 * Map Firebase error codes to user-friendly messages
 * @param {string} code - Firebase error code
 * @returns {string} User-friendly error message
 */
export const getAuthErrorMessage = (code) => {
  const errorMessages = {
    // Login errors
    'auth/invalid-email': 'Invalid email address.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/invalid-credential': 'Invalid email or password.',
    
    // Signup errors
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Password is too weak. Use at least 6 characters.',
    
    // Common errors
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed.',
  };
  
  return errorMessages[code] || 'An error occurred. Please try again.';
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} { isValid: boolean, message: string }
 */
export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return { 
      isValid: false, 
      message: 'Password must be at least 6 characters' 
    };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {Object} { isValid: boolean, message: string }
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || !emailRegex.test(email)) {
    return { 
      isValid: false, 
      message: 'Please enter a valid email address' 
    };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate passwords match
 * @param {string} password - Password
 * @param {string} confirmPassword - Confirmation password
 * @returns {Object} { isValid: boolean, message: string }
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return { 
      isValid: false, 
      message: 'Passwords do not match' 
    };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate full signup form
 * @param {Object} formData - { name, email, password, confirmPassword }
 * @returns {Object} { isValid: boolean, message: string }
 */
export const validateSignupForm = ({ name, email, password, confirmPassword }) => {
  if (!name || name.trim().length < 2) {
    return { 
      isValid: false, 
      message: 'Name must be at least 2 characters' 
    };
  }

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) return emailValidation;

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) return passwordValidation;

  const matchValidation = validatePasswordMatch(password, confirmPassword);
  if (!matchValidation.isValid) return matchValidation;

  return { isValid: true, message: '' };
};
