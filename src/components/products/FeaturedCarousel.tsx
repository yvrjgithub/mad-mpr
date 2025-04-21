import React, { useState, useEffect } from 'react';
import FeaturedProduct from './FeaturedProduct';

const carouselItems = [
  {
    id: 1,
    title: 'Nike Air',
    subtitle: 'Evolution of Icon',
    image: '',
    link: '/brand/nike',
    backgroundColor: 'transparent',
    backgroundImage: 'https://cdnb.artstation.com/p/assets/images/images/045/265/153/large/world-of-gaming-sports-banner.jpg?1642330191', // Background image for Nike Air
  },
  {
    id: 2,
    title: 'Adidas Boost',
    subtitle: 'Energize Your Run',
    image: '',
    link: '/brand/adidas',
    backgroundColor: 'transparent',
    backgroundImage: 'https://payload.cargocollective.com/1/8/282928/8709412/adidas-banner_1340_c.jpeg', // Background image for Adidas Boost
  },
  {
    id: 3,
    title: 'Puma RS-X',
    subtitle: 'Reinvention of Sport',
    image: '',
    link: '/brand/puma',
    backgroundColor: 'transparent',
    backgroundImage: 'https://cdnb.artstation.com/p/assets/images/images/047/620/843/large/shaurya-garg-shoe-promo.jpg?1648035064', // Background image for Puma RS-X
  },
];

const CarouselIndicators: React.FC<{ activeIndex: number; setActiveIndex: React.Dispatch<React.SetStateAction<number>> }> = ({ activeIndex, setActiveIndex }) => (
  <div className="flex justify-center mt-4 space-x-2">
    {carouselItems.map((_, index) => (
      <button
        key={index}
        onClick={() => setActiveIndex(index)}
        className={`h-2 w-8 rounded-full transition-colors ${
          index === activeIndex ? 'bg-primary-500' : 'bg-neutral-300'
        }`}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
);

const FeaturedCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="relative" style={{ position: 'relative', height: '400px' }}>
      <div
        className="overflow-hidden"
        style={{
          backgroundImage: `url(${carouselItems[activeIndex].backgroundImage})`, // Dynamically set background image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {carouselItems.map((item) => (
            <div key={item.id} className="min-w-full px-4">
              <FeaturedProduct
                title={item.title}
                subtitle={item.subtitle}
                image={item.image}
                link={item.link}
                backgroundColor={item.backgroundColor}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Indicators */}
      <CarouselIndicators activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    </div>
  );
};

export default FeaturedCarousel;
