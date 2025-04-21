import React from 'react';
import { ShoeModel } from '../../types/shoe';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: ShoeModel[];
  brand: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, brand }) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.name} shoe={product} brand={brand} />
      ))}
    </div>
  );
};

export default ProductGrid;