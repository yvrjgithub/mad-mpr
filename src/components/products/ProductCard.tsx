import React from 'react';
import { Link } from 'react-router-dom';
import { ShoeModel } from '../../types/shoe';
import FavoriteButton from '../ui/FavoriteButton';
interface ProductCardProps {
  shoe: ShoeModel;
  brand: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ shoe, brand }) => {
  // Use the document ID as the URL parameter if available, otherwise fall back to name
  const urlParam = shoe.id || shoe.name;
  
  return (
    <div className="group animate-fade-in">
      <Link to={`/product/${brand}/${urlParam}`} className="block">
        <div className="relative aspect-square rounded-lg bg-neutral-100 overflow-hidden">
          <img
          src={`/images/${shoe.name.replace(/\s+/g, "").toLowerCase()}.png`}
            alt={shoe.name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <FavoriteButton shoe={shoe} brand={brand} />
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-lg font-bold text-neutral-900 uppercase">
            {shoe.name}
          </h3>
          <p className="mt-1 text-sm text-neutral-600">{shoe.detailName}</p>
          <p className="mt-1 font-medium text-neutral-900">₹{shoe.price.toLocaleString()}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;