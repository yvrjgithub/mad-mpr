import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FirestoreService } from '../services/firestore';
import { ShoeModel } from '../types/shoe';
import { useAuth } from './AuthContext';

interface CartContextProps {
  cartItems: ShoeModel[];
  addToCart: (shoe: ShoeModel) => Promise<void>;
  removeFromCart: (shoeName: string) => Promise<void>;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ShoeModel[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    
    if (currentUser) {
      unsubscribe = FirestoreService.getCartItems((items) => {
        setCartItems(items);
      });
    } else {
      setCartItems([]);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [currentUser]);

  const addToCart = async (shoe: ShoeModel) => {
    await FirestoreService.addToCart(shoe);
  };

  const removeFromCart = async (shoeName: string) => {
    await FirestoreService.removeFromCart(shoeName);
  };

  const cartTotal = cartItems.reduce((total, item) => {
    return total + item.price * (item.quantity || 1);
  }, 0);

  const cartCount = cartItems.reduce((count, item) => {
    return count + (item.quantity || 1);
  }, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    cartTotal,
    cartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};