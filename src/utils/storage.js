/**
 * Safe localStorage wrapper with fallback for restricted contexts
 * Handles "Access to storage is not allowed from this context" errors
 */

// Check if localStorage is available (cached)
let storageAvailable = null;
const isStorageAvailable = () => {
  if (storageAvailable !== null) {
    return storageAvailable;
  }
  
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    storageAvailable = true;
    return true;
  } catch (e) {
    storageAvailable = false;
    return false;
  }
};

// In-memory fallback storage
const memoryStorage = new Map();

const storage = {
  /**
   * Get item from storage
   * @param {string} key - Storage key
   * @returns {string|null} - Stored value or null
   */
  getItem: (key) => {
    try {
      if (isStorageAvailable()) {
        return localStorage.getItem(key);
      } else {
        return memoryStorage.get(key) || null;
      }
    } catch (error) {
      // Silently fallback to memory storage
      return memoryStorage.get(key) || null;
    }
  },

  /**
   * Set item in storage
   * @param {string} key - Storage key
   * @param {string} value - Value to store
   */
  setItem: (key, value) => {
    try {
      if (isStorageAvailable()) {
        localStorage.setItem(key, value);
      }
      // Always set in memory as backup
      memoryStorage.set(key, value);
    } catch (error) {
      // Silently fallback to memory storage
      memoryStorage.set(key, value);
    }
  },

  /**
   * Remove item from storage
   * @param {string} key - Storage key
   */
  removeItem: (key) => {
    try {
      if (isStorageAvailable()) {
        localStorage.removeItem(key);
      }
      memoryStorage.delete(key);
    } catch (error) {
      // Silently fallback to memory storage
      memoryStorage.delete(key);
    }
  },

  /**
   * Clear all storage
   */
  clear: () => {
    try {
      if (isStorageAvailable()) {
        localStorage.clear();
      }
      memoryStorage.clear();
    } catch (error) {
      // Silently fallback to memory storage
      memoryStorage.clear();
    }
  },

  /**
   * Check if storage is available
   * @returns {boolean}
   */
  isAvailable: isStorageAvailable,
};

export default storage;
