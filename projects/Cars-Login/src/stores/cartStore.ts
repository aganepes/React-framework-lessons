import { create } from 'zustand';
import type { Car } from '../types/car';

interface CartItem extends Car {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (car: Car) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addToCart: (car: Car) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === car.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === car.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { ...car, quantity: 1 }],
      };
    });
  },

  removeFromCart: (id: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  updateQuantity: (id: string, quantity: number) => {
    if (quantity <= 0) {
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      }));
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  getTotalPrice: () => {
    return useCartStore.getState().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  getTotalItems: () => {
    return useCartStore.getState().items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  },
}));

