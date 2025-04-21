import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../contexts/FavoritesContext';
import { ShoeModel } from '../../types/shoe';
import { useAuth } from '../../contexts/AuthContext';

interface FavoriteButtonProps {
  shoe: ShoeModel;
  brand: string;
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ shoe, brand, className = '' }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toggleFavorite, isInFavorites } = useFavorites();
  const { currentUser } = useAuth();

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (currentUser) {
        const status = await isInFavorites(shoe.name);
        setIsFavorite(status);
      }
    };

    checkFavoriteStatus();
  }, [shoe.name, isInFavorites, currentUser]);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) {
      alert('Please log in to add favorites');
      return;
    }

    setIsLoading(true);
    try {
      const result = await toggleFavorite(shoe, brand);
      setIsFavorite(result);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`rounded-full p-2 transition-all ${
        isFavorite
          ? 'text-red-500 hover:bg-red-50'
          : 'text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700'
      } ${className}`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`h-5 w-5 transition-all ${isFavorite ? 'fill-current' : ''}`}
      />
    </button>
  );
};

export default FavoriteButton;
