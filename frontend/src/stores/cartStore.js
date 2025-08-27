import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const useCartStore = create(
  persist(
    (set, get) => ({
      
      items: [],
      
      
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);
          
          if (existingItem) {
            
            return {
              items: state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: Math.min(item.quantity + quantity, 10) }
                  : item
              )
            };
          } else {
            
            return {
              items: [...state.items, { 
                ...product, 
                quantity: Math.min(quantity, 10) 
              }]
            };
          }
        });
      },

      // Remove item from cart
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId)
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map(item =>
            item.id === productId
              ? { ...item, quantity: Math.min(Math.max(quantity, 1), 10) }
              : item
          )
        }));
      },

 
      clearCart: () => {
        set({ items: [] });
      },

      
      getTotals: () => {
        const state = get();
        const subtotal = state.items.reduce((total, item) => {
          return total + (item.price * item.quantity);
        }, 0);
        
        const tax = subtotal * 0.1; 
        const shipping = subtotal > 50 ? 0 : 5.99; 
        const total = subtotal + tax + shipping;

        return {
          subtotal: Math.round(subtotal * 100) / 100,
          tax: Math.round(tax * 100) / 100,
          shipping: Math.round(shipping * 100) / 100,
          total: Math.round(total * 100) / 100,
          itemCount: state.items.reduce((count, item) => count + item.quantity, 0)
        };
      },

     
      getItemCount: () => {
        const state = get();
        return state.items.reduce((count, item) => count + item.quantity, 0);
      },

      isInCart: (productId) => {
        const state = get();
        return state.items.some(item => item.id === productId);
      },

 
      getItemQuantity: (productId) => {
        const state = get();
        const item = state.items.find(item => item.id === productId);
        return item ? item.quantity : 0;
      }
    }),
    {
      name: 'cart-storage', 
      getStorage: () => localStorage, 
    }
  )
);

export default useCartStore;