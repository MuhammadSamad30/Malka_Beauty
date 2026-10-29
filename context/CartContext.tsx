'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { OrderItem } from '@/lib/whatsapp';

interface CartContextType {
  items: OrderItem[];
  addToCart: (product: Omit<OrderItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isInCart: (productId: number) => boolean;
  getItemQuantity: (productId: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('malka_cart');
      if (savedCart) {
        const parsed: unknown = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          const validItems = parsed.filter((item): item is OrderItem => {
            if (!item || typeof item !== 'object') return false;
            const candidate = item as Partial<OrderItem>;
            return Number.isInteger(candidate.id) && typeof candidate.title === 'string' &&
              typeof candidate.description === 'string' && typeof candidate.price === 'number' && Number.isFinite(candidate.price) &&
              typeof candidate.image === 'string' && Number.isInteger(candidate.quantity) &&
              (candidate.quantity as number) > 0;
          }).map((item) => ({ ...item, quantity: Math.min(item.quantity, 99) }));
          setItems(validItems);
        }
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setIsCartLoaded(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isCartLoaded) return;
    try { localStorage.setItem('malka_cart', JSON.stringify(items)); } catch (error) { console.error('Failed to save cart:', error); }
  }, [items, isCartLoaded]);

  const addToCart = (product: Omit<OrderItem, 'quantity'>, quantity: number = 1) => {
    const safeQuantity = Math.max(1, Math.min(99, Math.floor(quantity) || 1));
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        // If item exists, increase quantity by the specified amount
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(99, item.quantity + safeQuantity) }
            : item
        );
      } else {
        // If new item, add with specified quantity
        return [...prevItems, { ...product, quantity: safeQuantity }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: Math.min(99, Math.floor(quantity)) } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((sum, item) => {
      const price = item.discountPrice || item.price;
      return sum + price * item.quantity;
    }, 0);
  };

  const isInCart = (productId: number) => {
    return items.some((item) => item.id === productId);
  };

  const getItemQuantity = (productId: number) => {
    const item = items.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isInCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
