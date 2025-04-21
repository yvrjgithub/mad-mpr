import React from 'react';
import { Link } from 'react-router-dom';

interface FeaturedProductProps {
  title: string;
  subtitle: string;
  image: string;
  link: string;
  backgroundColor: string;
}

const FeaturedProduct: React.FC<FeaturedProductProps> = ({
  title,
  subtitle,
  image,
  link,
  backgroundColor,
}) => {
  return (
    <Link to={link} className="block">
      <div
        className="relative overflow-hidden rounded-lg h-64 md:h-80"
        style={{ backgroundColor }}
      >
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-black bg-opacity-30 text-white text-xs font-medium mb-2">
              ON AIR
            </div>
            <h3 className="text-white text-4xl font-bold uppercase tracking-wide">
              {title}
            </h3>
            <p className="text-white mt-2">{subtitle}</p>
          </div>
          
          <div className="flex justify-end">
            <img 
              src={image}  
              className="max-h-44 md:max-h-56 w-auto object-contain transform -rotate-12 translate-x-4 translate-y-4" 
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedProduct;