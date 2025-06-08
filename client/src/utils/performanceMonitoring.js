// Production Dashboard Performance Monitoring Implementation
import { useState, useEffect } from 'react';
import bookingEvents from './BookingEventEmitter';

/**
 * Dashboard Performance Tracking Hook
 * This hook adds performance monitoring to any dashboard component
 */
function useDashboardPerformanceTracking() {
  const [metrics, setMetrics] = useState({
    navigationStart: performance.now(),
    componentMounted: 0,
    dataLoaded: 0,
    renderComplete: 0,
    updatedFromEvent: false,
    updatedFromStorage: false,
    updatedFromURL: false,
    errors: []
  });
  // Define markDataLoaded outside useEffect for proper scope
  const markDataLoaded = () => {
    setMetrics(prev => ({
      ...prev,
      dataLoaded: performance.now()
    }));
    
    const loadTime = performance.now() - metrics.navigationStart;
    logMetric('dashboard_load_time', loadTime);
    
    // Send detailed metrics after render is complete
    setTimeout(() => {
      setMetrics(prev => ({
        ...prev,
        renderComplete: performance.now()
      }));
      
      // Send full performance report
      logPerformanceData('dashboard_performance', metrics);
    }, 100);
  };

  useEffect(() => {
    // Mark component mounted time
    setMetrics(prev => ({
      ...prev,
      componentMounted: performance.now()
    }));

    // Setup event listeners for performance
    bookingEvents.on('booking_created', () => {
      setMetrics(prev => ({
        ...prev,
        updatedFromEvent: true
      }));
      logMetric('dashboard_updated_from_event', { timestamp: performance.now() });
    });

    // Check for URL updates
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('refresh')) {
      setMetrics(prev => ({
        ...prev,
        updatedFromURL: true
      }));
      logMetric('dashboard_updated_from_url', { timestamp: performance.now() });
    }

    // Check for storage updates
    if (localStorage.getItem('force_dashboard_refresh')) {
      setMetrics(prev => ({
        ...prev,
        updatedFromStorage: true
      }));
      logMetric('dashboard_updated_from_storage', { timestamp: performance.now() });
      // Clear the flag
      localStorage.removeItem('force_dashboard_refresh');
    }

    return () => {
      // Cleanup event listeners
      bookingEvents.off('booking_created');
    };
  }, []);

  // Return the mark data loaded function for components to call
  return {
    markDataLoaded,
    recordError: (error) => {
      setMetrics(prev => ({
        ...prev,
        errors: [...prev.errors, error.message]
      }));
      logError('dashboard_error', error);
    }
  };
}

/**
 * Logging utility for performance metrics
 * Can be connected to your monitoring system
 */
function logMetric(name, value) {
  // For development, just log to console
  console.log(`[METRIC] ${name}:`, value);
  
  // In production, would send to monitoring service
  if (process.env.NODE_ENV === 'production') {
    // Example implementations:
    
    // 1. For Google Analytics:
    // if (window.gtag) {
    //   window.gtag('event', name, value);
    // }
    
    // 2. For custom endpoint:
    // fetch('/api/metrics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, value, timestamp: Date.now() })
    // }).catch(err => console.error('Failed to log metric:', err));
  }
}

/**
 * Logging utility for errors
 */
function logError(category, error) {
  console.error(`[ERROR] ${category}:`, error);
  
  // In production, would send to error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Example for Sentry:
    // if (window.Sentry) {
    //   window.Sentry.captureException(error);
    //   window.Sentry.setExtra('category', category);
    // }
  }
}

/**
 * Logging utility for detailed performance data
 */
function logPerformanceData(category, data) {
  console.log(`[PERF] ${category}:`, data);
  
  // Calculate key metrics
  const mountTime = data.componentMounted - data.navigationStart;
  const dataLoadTime = data.dataLoaded - data.componentMounted;
  const renderTime = data.renderComplete - data.dataLoaded;
  const totalTime = data.renderComplete - data.navigationStart;
  
  const metrics = {
    mountTime,
    dataLoadTime,
    renderTime,
    totalTime,
    updatedFromEvent: data.updatedFromEvent,
    updatedFromStorage: data.updatedFromStorage,
    updatedFromURL: data.updatedFromURL,
    errorCount: data.errors.length
  };
  
  console.log('[PERF] Calculated metrics:', metrics);
  
  // In production, would send to monitoring service
  if (process.env.NODE_ENV === 'production') {
    // Implementation would depend on your monitoring solution
  }
}

export { useDashboardPerformanceTracking, logMetric, logError, logPerformanceData };
