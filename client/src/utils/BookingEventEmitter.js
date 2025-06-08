// BookingEventEmitter.js
// A simple event system for tracking booking events across the application in production
// This helps synchronize components in an environment where React state updates might not propagate as expected

class BookingEventEmitter {
  constructor() {
    this.events = {};
    this.lastBooking = null;
    
    // For cross-tab communication in production
    window.addEventListener('storage', (event) => {
      if (event.key === 'booking_event') {
        try {
          const bookingEvent = JSON.parse(event.newValue);
          if (bookingEvent && bookingEvent.type) {
            this.emit(bookingEvent.type, bookingEvent.data);
          }
        } catch (e) {
          console.error('Error parsing booking event:', e);
        }
      }
    });
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
    
    if (event === 'booking_created') {
      this.lastBooking = data;
    }
    
    // Store in localStorage for cross-tab communication in production
    const bookingEvent = { type: event, data, timestamp: Date.now() };
    localStorage.setItem('booking_event', JSON.stringify(bookingEvent));
    
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
  
  /**
   * Get the most recent booking
   * @returns {Object|null} The last booking data or null
   */
  getLastBooking() {
    return this.lastBooking;
  }
  
  /**
   * Clear the last booking data
   */
  clearLastBooking() {
    this.lastBooking = null;
  }
}

// Create a singleton instance
const bookingEvents = new BookingEventEmitter();

export default bookingEvents;
