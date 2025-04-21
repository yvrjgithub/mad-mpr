import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import Layout from '../components/layout/Layout';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/ui/Button';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const CartPage: React.FC = () => {
  const { cartItems, cartCount } = useCart();
  const { currentUser } = useAuth();

  // If user is not logged in
  if (!currentUser) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-neutral-100 p-6 mb-4">
              <ShoppingBag className="h-12 w-12 text-neutral-400" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Your cart is empty</h1>
            <p className="text-neutral-600 mb-6">Please log in to view your cart</p>
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // If cart is empty
  if (cartCount === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-neutral-100 p-6 mb-4">
              <ShoppingBag className="h-12 w-12 text-neutral-400" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Your cart is empty</h1>
            <p className="text-neutral-600 mb-6">Start shopping to add items to your cart</p>
            <Link to="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 pb-24 pt-6">
        <h1 className="text-2xl font-bold text-neutral-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-12">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="rounded-lg border border-neutral-200 bg-white p-6">
              <h2 className="text-lg font-medium text-neutral-900 mb-6">
                Cart Items ({cartCount})
              </h2>

              <div className="divide-y divide-neutral-200">
                {cartItems.map((item) => (
                  <CartItem key={item.Name} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-8 lg:col-span-4 lg:mt-0">
            <CartSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;