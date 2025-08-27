import { useState } from 'react';

// Custom hook for localStorage management
export const useLocalStorage = (key, initialValue) => {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Remove item from localStorage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};

// Hook for managing recently viewed products
export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('recentlyViewed', []);

  const addToRecentlyViewed = (product) => {
    setRecentlyViewed(prev => {
      // Remove if already exists
      const filtered = prev.filter(item => item.id !== product.id);
      // Add to beginning and keep only last 5 items
      return [product, ...filtered].slice(0, 5);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  return {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed
  };
};

// Hook for managing user preferences
export const useUserPreferences = () => {
  const [preferences, setPreferences] = useLocalStorage('userPreferences', {
    theme: 'light',
    currency: 'USD',
    itemsPerPage: 20,
    defaultView: 'grid' // grid or list
  });

  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetPreferences = () => {
    setPreferences({
      theme: 'light',
      currency: 'USD',
      itemsPerPage: 20,
      defaultView: 'grid'
    });
  };

  return {
    preferences,
    updatePreference,
    resetPreferences
  };
};