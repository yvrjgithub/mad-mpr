import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FirestoreService } from '../services/firestore';
import { ShoeModel } from '../types/shoe';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/products/ProductGrid';

const BrandPage: React.FC = () => {
  const { brand } = useParams<{ brand: string }>();
  const [shoes, setShoes] = useState<ShoeModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: () => void;

    setLoading(true);

    switch (brand) {
      case 'nike':
        unsubscribe = FirestoreService.getNikeShoes((shoes) => {
          setShoes(shoes);
          setLoading(false);
        });
        break;
      case 'adidas':
        unsubscribe = FirestoreService.getAdidasShoes((shoes) => {
          setShoes(shoes);
          setLoading(false);
        });
        break;
      case 'puma':
        unsubscribe = FirestoreService.getPumaShoes((shoes) => {
          setShoes(shoes);
          setLoading(false);
        });
        break;
      default:
        setShoes([]);
        setLoading(false);
        break;
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [brand]);

  const getBrandName = () => {
    switch (brand) {
      case 'nike':
        return 'Nike';
      case 'adidas':
        return 'Adidas';
      case 'puma':
        return 'Puma';
      default:
        return '';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 pb-24 pt-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">{getBrandName()} Shoes</h1>
          <p className="mt-2 text-neutral-600">
            {`Discover the latest ${getBrandName()} shoes collection.`}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
          </div>
        ) : shoes.length > 0 ? (
          <ProductGrid products={shoes} brand={brand || ''} />
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-500">No products found for this brand.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BrandPage;