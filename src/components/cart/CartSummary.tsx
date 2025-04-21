import React from 'react';
import Button from '../ui/Button';
import { useCart } from '../../contexts/CartContext';

const CartSummary: React.FC = () => {
  const { cartTotal, cartCount } = useCart();
  const shippingCost = cartTotal > 0 ? 250 : 0;
  const tax = cartTotal * 0.18; // 18% GST
  const totalAmount = cartTotal + shippingCost + tax;

  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here');
  };

  return (
    <div className="rounded-lg bg-neutral-50 p-6">
      <h2 className="text-lg font-medium text-neutral-900">Order Summary</h2>
      
      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <p className="text-sm text-neutral-600">Subtotal ({cartCount} items)</p>
          <p className="text-sm font-medium text-neutral-900">₹{cartTotal.toLocaleString()}</p>
        </div>
        
        <div className="flex justify-between">
          <p className="text-sm text-neutral-600">Shipping</p>
          <p className="text-sm font-medium text-neutral-900">₹{shippingCost.toLocaleString()}</p>
        </div>
        
        <div className="flex justify-between">
          <p className="text-sm text-neutral-600">GST (18%)</p>
          <p className="text-sm font-medium text-neutral-900">₹{tax.toFixed(2)}</p>
        </div>
        
        <div className="border-t border-neutral-200 pt-4">
          <div className="flex justify-between">
            <p className="text-base font-medium text-neutral-900">Total</p>
            <p className="text-base font-medium text-neutral-900">₹{totalAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Button
          fullWidth
          onClick={handleCheckout}
          disabled={cartCount === 0}
        >
          Checkout
        </Button>
      </div>
      
      <div className="mt-4">
        <p className="text-xs text-neutral-500 text-center">
          Taxes and shipping calculated at checkout
        </p>
      </div>
    </div>
  );
};

export default CartSummary;