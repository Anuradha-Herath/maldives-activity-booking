import { useEffect } from 'react';

/**
 * Hook to directly update component data from localStorage in production environments
 * This helps bypass potential issues with stale data in production deployments
 * 
 * @param {Object} options Configuration options
 * @param {string} options.key localStorage key to check
 * @param {Function} options.onUpdate Callback function when data is found
 * @param {boolean} options.clearAfter Whether to clear the key after use
 * @param {any[]} options.dependencies Array of dependencies for the effect
 */
const useDirectDataUpdate = ({ key, onUpdate, clearAfter = true, dependencies = [] }) => {
  useEffect(() => {
    const value = localStorage.getItem(key);
    
    if (value) {
      console.log(`[useDirectDataUpdate] Found data for key: ${key}`);
      
      try {
        // Parse if it's JSON, otherwise pass the raw value
        let data;
        try {
          data = JSON.parse(value);
        } catch (e) {
          data = value;
        }
        
        // Call the update handler
        onUpdate(data);
        
        // Clear if requested
        if (clearAfter) {
          console.log(`[useDirectDataUpdate] Clearing key: ${key}`);
          localStorage.removeItem(key);
        }
      } catch (error) {
        console.error(`[useDirectDataUpdate] Error processing key ${key}:`, error);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default useDirectDataUpdate;
