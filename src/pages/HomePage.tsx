import React, { useState, useEffect } from 'react';
import { ShoeModel } from '../types/shoe';
import Layout from '../components/layout/Layout';
import FeaturedCarousel from '../components/products/FeaturedCarousel';
import ProductGrid from '../components/products/ProductGrid';
import { FirestoreService } from '../services/firestore';

const HomePage: React.FC = () => {
  const [nikeShoes, setNikeShoes] = useState<ShoeModel[]>([]);
  const [adidasShoes, setAdidasShoes] = useState<ShoeModel[]>([]);
  const [pumaShoes, setPumaShoes] = useState<ShoeModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeNike = FirestoreService.getNikeShoes((shoes) => {
      setNikeShoes(shoes);
      setLoading(false);
    });

    const unsubscribeAdidas = FirestoreService.getAdidasShoes((shoes) => {
      setAdidasShoes(shoes);
    });

    const unsubscribePuma = FirestoreService.getPumaShoes((shoes) => {
      setPumaShoes(shoes);
    });

    return () => {
      unsubscribeNike();
      unsubscribeAdidas();
      unsubscribePuma();
    };
  }, []);

  // Get latest shoes for "Just In" section
  const getLatestShoes = () => {
    const allShoes = [...nikeShoes, ...adidasShoes, ...pumaShoes];
    // In a real app, you'd sort by date added
    return allShoes.slice(0, 4);
  };

  // Determine brand for each shoe in the latest list
  const getBrandForShoe = (shoe: ShoeModel): string => {
    if (nikeShoes.some(s => s.Name === shoe.Name)) return 'nike';
    if (adidasShoes.some(s => s.Name === shoe.Name)) return 'adidas';
    if (pumaShoes.some(s => s.Name === shoe.Name)) return 'puma';
    return 'nike'; // Default fallback
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 pb-24 pt-6">
        {/* Featured Carousel */}
        <section className="mb-12">
          <FeaturedCarousel />
        </section>


        {/* Nike Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-900">NIKE</h2>
            <a href="/brand/nike" className="text-sm font-medium text-primary-500 hover:text-primary-600">
              View All
            </a>
          </div>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
            </div>
          ) : (
            <ProductGrid products={nikeShoes.slice(0, 4)} brand="nike" />
          )}
        </section>

        {/* Adidas Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-900">ADIDAS</h2>
            <a href="/brand/adidas" className="text-sm font-medium text-primary-500 hover:text-primary-600">
              View All
            </a>
          </div>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
            </div>
          ) : (
            <ProductGrid products={adidasShoes.slice(0, 4)} brand="adidas" />
          )}
        </section>

        {/* Puma Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-900">PUMA</h2>
            <a href="/brand/puma" className="text-sm font-medium text-primary-500 hover:text-primary-600">
              View All
            </a>
          </div>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
            </div>
          ) : (
            <ProductGrid products={pumaShoes.slice(0, 4)} brand="puma" />
          )}
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;