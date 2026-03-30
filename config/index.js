/**
 * Configuration Utility
 * Helper functions to access app configuration and strings
 */

import appConfig from './config';
import strings from './strings';

/**
 * Get a configuration value by path
 * @param {string} path - Dot notation path (e.g., 'coursesPage.categories.frontend')
 * @param {any} defaultValue - Default value if path not found
 * @returns {any} Configuration value
 */
export const getConfig = (path, defaultValue = null) => {
  const keys = path.split('.');
  let value = appConfig;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return defaultValue;
    }
  }

  return value;
};

/**
 * Get a string value by path
 * @param {string} path - Dot notation path (e.g., 'courses.pageTitle')
 * @param {string} defaultValue - Default value if path not found
 * @returns {string} String value
 */
export const getString = (path, defaultValue = '') => {
  const keys = path.split('.');
  let value = strings;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return defaultValue;
    }
  }

  return value || defaultValue;
};

/**
 * Check if a feature is enabled
 * @param {string} featureName - Feature name from config
 * @returns {boolean} True if feature is enabled
 */
export const isFeatureEnabled = (featureName) => {
  return getConfig(`features.${featureName}`, false);
};

/**
 * Check if a category should be shown
 * @param {string} categoryId - Category ID
 * @returns {boolean} True if category should be displayed
 */
export const isCategoryVisible = (categoryId) => {
  return getConfig(`coursesPage.categories.${categoryId}`, true);
};

/**
 * Check if a navigation item should be shown
 * @param {string} navItem - Navigation item name
 * @returns {boolean} True if nav item should be displayed
 */
export const isNavVisible = (navItem) => {
  return getConfig(`navigation.show${navItem}`, true);
};

/**
 * Get filtered categories based on config
 * @param {Array} allCategories - All available categories
 * @returns {Array} Filtered categories
 */
export const getVisibleCategories = (allCategories) => {
  return allCategories.filter(category => isCategoryVisible(category.id));
};

/**
 * Get site information
 * @returns {Object} Site information
 */
export const getSiteInfo = () => {
  return getConfig('site', {});
};

/**
 * Get YouTube configuration
 * @returns {Object} YouTube configuration
 */
export const getYouTubeConfig = () => {
  return getConfig('youtube', {});
};

// Export configuration objects
export { appConfig, strings };

// Export default utility object
export default {
  getConfig,
  getString,
  isFeatureEnabled,
  isCategoryVisible,
  isNavVisible,
  getVisibleCategories,
  getSiteInfo,
  getYouTubeConfig,
  appConfig,
  strings,
};
