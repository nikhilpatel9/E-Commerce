import { useState } from 'react';
import useCartStore from '../stores/cartStore';

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


  const addToCart = async (product, quantity = 1) => {
    setIsUpdating(true);
    try {
      addItem(product, quantity);
     
      await new Promise(resolve => setTimeout(resolve, 300));
    } finally {
      setIsUpdating(false);
    }
  };

  
  const removeFromCart = async (productId) => {
    setIsUpdating(true);
    try {
      removeItem(productId);
      await new Promise(resolve => setTimeout(resolve, 200));
    } finally {
      setIsUpdating(false);
    }
  };

  const updateItemQuantity = async (productId, quantity) => {
    setIsUpdating(true);
    try {
      updateQuantity(productId, quantity);
      await new Promise(resolve => setTimeout(resolve, 200));
    } finally {
      setIsUpdating(false);
    }
  };

  
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
   
    items,
    totals: getTotals(),
    itemCount: getItemCount(),
    isUpdating,
    isEmpty: items.length === 0,

  
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearAllItems,

  
    isInCart,
    getItemQuantity
  };
};