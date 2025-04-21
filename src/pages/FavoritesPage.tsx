import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import ProductGrid from '../components/products/ProductGrid';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const { currentUser } = useAuth();

  // If user is not logged in
  if (!currentUser) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-neutral-100 p-6 mb-4">
              <Heart className="h-12 w-12 text-neutral-400" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Your favorites list is empty</h1>
            <p className="text-neutral-600 mb-6">Please log in to view your favorites</p>
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  if (favorites.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-neutral-100 p-6 mb-4">
              <Heart className="h-12 w-12 text-neutral-400" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Your favorites list is empty</h1>
            <p className="text-neutral-600 mb-6">Start adding shoes you love to your favorites list</p>
            <Link to="/">
              <Button>Explore Shoes</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 pb-24 pt-6">
        <h1 className="text-2xl font-bold text-neutral-900 mb-8">Your Favorites</h1>
        
        <ProductGrid 
          products={favorites} 
          brand=""
        />
      </div>
    </Layout>
  );
};

export default FavoritesPage;