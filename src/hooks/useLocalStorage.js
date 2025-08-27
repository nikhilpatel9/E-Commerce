import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
 
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const setValue = (value) => {
    setStoredValue(prev =>
      value instanceof Function ? value(prev) : value
    );
  };

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

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('recentlyViewed', []);

  const addToRecentlyViewed = (product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== product.id);
      return [product, ...filtered].slice(0, 5);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  return { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed };
};


export const useUserPreferences = () => {
  const [preferences, setPreferences] = useLocalStorage('userPreferences', {
    theme: 'light',
    currency: 'USD',
    itemsPerPage: 20,
    defaultView: 'grid'
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

  return { preferences, updatePreference, resetPreferences };
};
