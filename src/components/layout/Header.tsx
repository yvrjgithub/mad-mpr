import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ShoppingBag, Heart } from 'lucide-react';
import SearchBar from '../ui/SearchBar';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { cartCount } = useCart();
  const location = useLocation();

  const handleSearch = (query: string) => {
    // Implement search functionality
    console.log('Searching for:', query);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="relative h-10 w-16">
              <div className="absolute left-0 h-10 w-10 rounded-full bg-black"></div>
              <div className="absolute left-6 h-10 w-10 rounded-full bg-white border-2 border-black"></div>
            </div>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {currentUser ? (
              <>
                
                <Link to="/favorites" className="text-neutral-700 hover:text-primary-500">
                  <Heart className="h-6 w-6" />
                </Link>
                <Link to="/cart" className="relative text-neutral-700 hover:text-primary-500">
                  <ShoppingBag className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-xs font-medium text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-neutral-700 hover:text-primary-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-neutral-700 hover:text-primary-500"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-neutral-700"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-4 md:hidden">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Brand Navigation */}
        <div className="mt-4 border-b border-neutral-200">
          <nav className="flex space-x-8">
            <Link
              to="/brand/nike"
              className={`border-b-2 pb-3 text-base font-medium ${
                location.pathname === '/brand/nike'
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700'
              }`}
            >
              Nike
            </Link>
            <Link
              to="/brand/adidas"
              className={`border-b-2 pb-3 text-base font-medium ${
                location.pathname === '/brand/adidas'
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700'
              }`}
            >
              Adidas
            </Link>
            <Link
              to="/brand/puma"
              className={`border-b-2 pb-3 text-base font-medium ${
                location.pathname === '/brand/puma'
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700'
              }`}
            >
              Puma
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-neutral-200">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {currentUser ? (
              <>
                <Link
                  to="/favorites"
                  className="block py-2 text-base font-medium text-neutral-700 hover:text-primary-500"
                  onClick={toggleMenu}
                >
                  Favorites
                </Link>
                <Link
                  to="/cart"
                  className="block py-2 text-base font-medium text-neutral-700 hover:text-primary-500"
                  onClick={toggleMenu}
                >
                  Cart ({cartCount})
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full text-left py-2 text-base font-medium text-neutral-700 hover:text-primary-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 text-base font-medium text-neutral-700 hover:text-primary-500"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2 text-base font-medium text-neutral-700 hover:text-primary-500"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;