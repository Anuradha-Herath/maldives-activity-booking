/**
 * Utility functions for cache management and cache busting
 */

// Version number to use for cache busting
// Increment this when deploying new versions of the site
export const CACHE_VERSION = '1.0.0';

/**
 * Adds a cache busting parameter to a URL
 * @param {string} url - The original URL
 * @param {boolean} useTimestamp - Whether to use a timestamp (for development) or version (for production)
 * @returns {string} The URL with a cache busting parameter
 */
export const addCacheBuster = (url, useTimestamp = process.env.NODE_ENV !== 'production') => {
  if (!url) return url;
  
  const separator = url.includes('?') ? '&' : '?';
  const cacheBuster = useTimestamp ? `v=${Date.now()}` : `v=${CACHE_VERSION}`;
  
  return `${url}${separator}${cacheBuster}`;
};

/**
 * Adds cache busting to image URLs in an object
 * @param {object} obj - Object containing image URLs
 * @param {string[]} imageKeys - Array of keys in the object that contain image URLs
 * @returns {object} New object with cache busting added to image URLs
 */
export const addCacheBustingToImages = (obj, imageKeys = ['image', 'imageUrl', 'thumbnail']) => {
  if (!obj) return obj;
  
  return {
    ...obj,
    ...imageKeys.reduce((acc, key) => {
      if (obj[key]) {
        acc[key] = addCacheBuster(obj[key]);
      }
      return acc;
    }, {})
  };
};

export default {
  CACHE_VERSION,
  addCacheBuster,
  addCacheBustingToImages
};
