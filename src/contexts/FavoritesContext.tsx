import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FirestoreService } from '../services/firestore';
import { ShoeModel } from '../types/shoe';
import { useAuth } from './AuthContext';

interface FavoritesContextProps {
  favorites: ShoeModel[];
  toggleFavorite: (shoe: ShoeModel, brand: string) => Promise<boolean>;
  isInFavorites: (shoeName: string) => Promise<boolean>;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<ShoeModel[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    
    if (currentUser) {
      unsubscribe = FirestoreService.getFavorites((items) => {
        setFavorites(items);
      });
    } else {
      setFavorites([]);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [currentUser]);

  const toggleFavorite = async (shoe: ShoeModel, brand: string) => {
    return await FirestoreService.toggleFavorite(shoe, brand);
  };

  const isInFavorites = async (shoeName: string) => {
    return await FirestoreService.isInFavorites(shoeName);
  };

  const value = {
    favorites,
    toggleFavorite,
    isInFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};