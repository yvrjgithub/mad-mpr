import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const { cartCount } = useCart();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-50">
      <div className="flex items-center justify-around">
        <Link
          to="/"
          className={`flex flex-col items-center py-3 ${
            location.pathname === '/' ? 'text-primary-500' : 'text-neutral-500'
          }`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          to="/favorites"
          className={`flex flex-col items-center py-3 ${
            location.pathname === '/favorites' ? 'text-primary-500' : 'text-neutral-500'
          }`}
        >
          <Heart className="h-6 w-6" />
          <span className="text-xs mt-1">Favorites</span>
        </Link>
        <Link
          to="/cart"
          className={`flex flex-col items-center py-3 relative ${
            location.pathname === '/cart' ? 'text-primary-500' : 'text-neutral-500'
          }`}
        >
          <ShoppingBag className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-xs font-medium text-white">
              {cartCount}
            </span>
          )}
          <span className="text-xs mt-1">Cart</span>
        </Link>
        <Link
          to="/account"
          className={`flex flex-col items-center py-3 ${
            location.pathname === '/account' ? 'text-primary-500' : 'text-neutral-500'
          }`}
        >
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Account</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavigation;