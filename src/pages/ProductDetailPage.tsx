import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FirestoreService } from '../services/firestore';
import { ShoeModel } from '../types/shoe';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import FavoriteButton from '../components/ui/FavoriteButton';
import { useCart } from '../contexts/CartContext';

const ProductDetailPage: React.FC = () => {
  const { brand, name } = useParams<{ brand: string; name: string }>();
  const [shoe, setShoe] = useState<ShoeModel | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const loadShoe = () => {
      setLoading(true);
      console.log("Loading shoe with params:", { brand, name });
      
      if (!brand || !name) {
        setLoading(false);
        console.error("Missing brand or name parameters");
        return;
      }

      switch (brand.toLowerCase()) {
        case 'nike':
          unsubscribe = FirestoreService.getNikeShoes((shoes) => {
            console.log("Nike shoes loaded:", shoes.length);
            const foundShoe = shoes.find(s => s.id === name || s.name === name);
            console.log("Found shoe:", foundShoe);
            setShoe(foundShoe || null);
            if (foundShoe) {
              setSelectedSize(foundShoe.availableSizes?.[0] || '');
              setSelectedColor(foundShoe.availableColors?.[0] || '');
            }
            setLoading(false);
          });
          break;
        case 'adidas':
          unsubscribe = FirestoreService.getAdidasShoes((shoes) => {
            console.log("Adidas shoes loaded:", shoes.length);
            const foundShoe = shoes.find(s => s.id === name || s.name === name);
            console.log("Found shoe:", foundShoe);
            setShoe(foundShoe || null);
            if (foundShoe) {
              setSelectedSize(foundShoe.availableSizes?.[0] || '');
              setSelectedColor(foundShoe.availableColors?.[0] || '');
            }
            setLoading(false);
          });
          break;
        case 'puma':
          unsubscribe = FirestoreService.getPumaShoes((shoes) => {
            console.log("Puma shoes loaded:", shoes.length);
            const foundShoe = shoes.find(s => s.id === name || s.name === name);
            console.log("Found shoe:", foundShoe);
            setShoe(foundShoe || null);
            if (foundShoe) {
              setSelectedSize(foundShoe.availableSizes?.[0] || '');
              setSelectedColor(foundShoe.availableColors?.[0] || '');
            }
            setLoading(false);
          });
          break;
        default:
          setShoe(null);
          setLoading(false);
          console.error("Unknown brand:", brand);
          break;
      }
    };

    loadShoe();
    
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [brand, name]);

  const handleAddToCart = async () => {
    if (!shoe) return;

    setAddingToCart(true);
    try {
      const cartItem: ShoeModel = {
        ...shoe,
        quantity,
        selectedSize,
        selectedColor
      };
      await addToCart(cartItem);
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

  if (!shoe) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Product Not Found</h2>
          <p className="text-neutral-600">The product you're looking for doesn't exist or has been removed.</p>
          <div className="mt-4">
            <p className="text-neutral-500">Debug info:</p>
            <p className="text-neutral-500">Brand: {brand}</p>
            <p className="text-neutral-500">Product: {name}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
          {/* Product Image */}
          <div className="lg:col-span-1">
            <div className="overflow-hidden rounded-lg bg-neutral-100 animate-fade-in">
              <img
                src={`/images/${shoe.name.replace(/\s+/g, "").toLowerCase()}.png`}
                alt={shoe.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-1 animate-slide-up">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-neutral-900 uppercase">{shoe.name}</h1>
                <p className="mt-1 text-lg text-neutral-600">{shoe.detailName}</p>
              </div>
              <FavoriteButton shoe={shoe} brand={brand || ''} className="mt-1" />
            </div>

            <p className="mt-4 text-2xl font-bold text-neutral-900">₹{shoe.price.toLocaleString()}</p>

            {/* Size Selection */}
            {shoe.availableSizes && shoe.availableSizes.length > 0 && (
              <div className="mt-8">
                <h2 className="text-sm font-medium text-neutral-900">Size</h2>
                <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
                  {shoe.availableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`flex items-center justify-center rounded-md py-2 px-3 text-sm font-medium uppercase ${
                        selectedSize === size
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {shoe.availableColors && shoe.availableColors.length > 0 && (
              <div className="mt-8">
                <h2 className="text-sm font-medium text-neutral-900">Color</h2>
                <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
                  {shoe.availableColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`flex items-center justify-center rounded-md py-2 px-3 text-sm font-medium uppercase ${
                        selectedColor === color
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-8">
              <h2 className="text-sm font-medium text-neutral-900">Quantity</h2>
              <div className="mt-3 flex items-center">
                <button
                  type="button"
                  className="rounded-l-md border border-r-0 border-neutral-300 bg-neutral-100 p-2 text-neutral-600 hover:bg-neutral-200"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 border-y border-neutral-300 py-2 px-3 text-center text-neutral-900"
                />
                <button
                  type="button"
                  className="rounded-r-md border border-l-0 border-neutral-300 bg-neutral-100 p-2 text-neutral-600 hover:bg-neutral-200"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-8">
              <Button
                onClick={handleAddToCart}
                isLoading={addingToCart}
                fullWidth
                size="lg"
              >
                Add to Cart
              </Button>
            </div>

            {/* Product Description */}
            <div className="mt-10">
              <h2 className="text-sm font-medium text-neutral-900">Details</h2>
              <div className="mt-4 prose prose-sm text-neutral-600">
                <p>
                  The {shoe.name} {shoe.detailName} brings classic style and premium comfort to your everyday look.
                  Crafted with high-quality materials, these shoes offer durability and support for all-day wear.
                </p>
                <ul className="mt-4 space-y-2">
                  <li>Premium materials for durability</li>
                  <li>Cushioned insole for comfort</li>
                  <li>Rubber outsole for traction</li>
                  <li>Brand logo details</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;