import { useState } from 'react';
import useCartStore from '../stores/cartStore';

// Custom hook for cart operations and state
export const useCart = () => {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotals,
    getItemCount,
    isInCart,
    getItemQuantity
  } = useCartStore();

  const [isUpdating, setIsUpdating] = useState(false);

  // Add item with loading state
  const addToCart = async (product, quantity = 1) => {
    setIsUpdating(true);
    try {
      addItem(product, quantity);
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
    } finally {
      setIsUpdating(false);
    }
  };

  // Remove item with loading state
  const removeFromCart = async (productId) => {
    setIsUpdating(true);
    try {
      removeItem(productId);
      await new Promise(resolve => setTimeout(resolve, 200));
    } finally {
      setIsUpdating(false);
    }
  };

  // Update quantity with loading state
  const updateItemQuantity = async (productId, quantity) => {
    setIsUpdating(true);
    try {
      updateQuantity(productId, quantity);
      await new Promise(resolve => setTimeout(resolve, 200));
    } finally {
      setIsUpdating(false);
    }
  };

  // Clear cart with loading state
  const clearAllItems = async () => {
    setIsUpdating(true);
    try {
      clearCart();
      await new Promise(resolve => setTimeout(resolve, 300));
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    // Cart state
    items,
    totals: getTotals(),
    itemCount: getItemCount(),
    isUpdating,
    isEmpty: items.length === 0,

    // Cart operations
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearAllItems,

    // Utility functions
    isInCart,
    getItemQuantity
  };
};