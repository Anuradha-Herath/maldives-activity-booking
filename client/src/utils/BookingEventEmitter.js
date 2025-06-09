// BookingEventEmitter.js
// A simple event system for tracking booking events across the application in production
// This helps synchronize components in an environment where React state updates might not propagate as expected

/**
 * A simple event emitter for booking-related events
 * Used to synchronize booking data across components
 */
class BookingEventEmitter {
  constructor() {
    this.events = {};
  }

  /**
   * Subscribe to an event
   * @param {string} event - Event name (e.g. 'booking_created', 'booking_cancelled')
   * @param {Function} callback - Function to call when event is emitted
   * @returns {Function} - Unsubscribe function
   */
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    
    // Return unsubscribe function
    return () => {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    };
  }
  
  /**
   * Emit an event with data
   * @param {string} event - Event name 
   * @param {*} data - Event data
   */
  emit(event, data) {
    console.log(`[BookingEventEmitter] Emitting ${event}`, data);
    
    // Call all callbacks
    if (this.events[event]) {
      this.events[event].forEach(callback => {
        try {
          callback(data);
        } catch (e) {
          console.error(`Error in ${event} event handler:`, e);
        }
      });
    }
  }
  
  // Remove all listeners for an event
  clearEvent(event) {
    this.events[event] = [];
  }

  // Debug method to see all registered events
  listEvents() {
    return Object.keys(this.events).map(event => ({
      name: event,
      listenerCount: this.events[event].length
    }));
  }
}

// Create a singleton instance
const bookingEvents = new BookingEventEmitter();

export default bookingEvents;
