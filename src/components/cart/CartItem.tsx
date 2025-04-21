import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { ShoeModel } from '../../types/shoe';
import { useCart } from '../../contexts/CartContext';

interface CartItemProps {
  item: ShoeModel;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, addToCart } = useCart();
  
  const handleRemove = () => {
    removeFromCart(item.name);
  };
  
  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedItem: ShoeModel = {
      ...item,
      quantity: newQuantity
    };
    
    addToCart(updatedItem);
  };

  return (
    <div className="flex items-start border-b border-neutral-200 py-6 animate-fade-in">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-neutral-100">
        <img
          src={`/images/${item.name.replace(/\s+/g, "").toLowerCase()}.png`}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium text-neutral-900">{item.name}</h3>
            <p className="mt-1 text-sm text-neutral-500">{item.detailName}</p>
            
            {item.selectedSize && (
              <p className="mt-1 text-sm text-neutral-500">
                Size: {item.selectedSize}
              </p>
            )}
            
            {item.selectedColor && (
              <p className="mt-1 text-sm text-neutral-500">
                Color: {item.selectedColor}
              </p>
            )}
          </div>
          <p className="text-sm font-medium text-neutral-900">₹{item.price.toLocaleString()}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center border border-neutral-300 rounded-md">
            <button
              type="button"
              className="p-2 text-neutral-600 hover:text-neutral-900"
              onClick={() => handleUpdateQuantity((item.quantity || 1) - 1)}
              disabled={(item.quantity || 1) <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-2 text-neutral-900">{item.quantity || 1}</span>
            <button
              type="button"
              className="p-2 text-neutral-600 hover:text-neutral-900"
              onClick={() => handleUpdateQuantity((item.quantity || 1) + 1)}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          
          <button
            type="button"
            className="text-neutral-500 hover:text-red-600"
            onClick={handleRemove}
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;