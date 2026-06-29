'use client';

import { useState, useEffect } from 'react';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { ProductCard, Product } from '@/components/products/ProductCard';
import { SkeletonCard } from '@/components/products/SkeletonCard';
import { SortDropdown } from '@/components/products/SortDropdown';
import { SlidersHorizontal, Sparkles } from 'lucide-react';
import styles from './page.module.css';

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Premium Heavyweight Hoodie', price: 55.00, rating: 4.9, reviews: 128, image: '/hoodie.png',     colors: ['#000', '#333', '#7C3AED', '#DC2626'], isNew: true },
  { id: '2', name: 'Classic Organic T-Shirt',   price: 24.00, rating: 4.7, reviews: 342, image: '/tshirt.png',     colors: ['#FFF', '#000', '#3B82F6', '#EF4444', '#22C55E', '#EAB308'] },
  { id: '3', name: 'Embroidered Dad Hat',        price: 18.50, rating: 4.8, reviews: 89,  image: '/cap.png',       colors: ['#021024', '#F5F5DC'] },
  { id: '4', name: 'Minimalist Phone Case',      price: 15.00, rating: 4.6, reviews: 56,  image: '/phonecase.png', colors: ['#FFF', '#000', '#7C3AED'], isNew: true },
  { id: '5', name: 'Oversized Tote Bag',         price: 22.00, rating: 4.5, reviews: 112, image: '/tote.png',      colors: ['#F5F5DC', '#000'] },
  { id: '6', name: 'Ceramic Coffee Mug 11oz',    price: 12.00, rating: 4.9, reviews: 430, image: '/mug.png',       colors: ['#FFF', '#000'] },
  { id: '7', name: 'Premium Canvas Poster',      price: 28.00, rating: 4.7, reviews: 75,  image: '/tshirt.png',    colors: ['#FFF'] },
  { id: '8', name: 'Performance Active Tee',     price: 32.00, rating: 4.8, reviews: 215, image: '/hoodie.png',    colors: ['#000', '#333', '#3B82F6'], isNew: true },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const filteredProducts = MOCK_PRODUCTS.filter(prod => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'T-Shirts' && prod.name.includes('T-Shirt')) return true;
    if (activeCategory === 'Hoodies' && prod.name.includes('Hoodie')) return true;
    if (activeCategory === 'Caps' && prod.name.includes('Hat')) return true;
    if (activeCategory === 'Mugs' && prod.name.includes('Mug')) return true;
    if (activeCategory === 'Phone Cases' && prod.name.includes('Phone')) return true;
    if (activeCategory === 'Bags' && prod.name.includes('Bag')) return true;
    if (activeCategory === 'Posters' && prod.name.includes('Poster')) return true;
    if (activeCategory === 'Accessories') return false; // Add accessory check
    return false;
  });

  return (
    <div className={styles.pageContainer}>
      {/* Colorful announcement banner */}
      <div className={styles.banner}>
        <Sparkles size={14} />
        <span>🎉 Free shipping on orders over $75 · Use code <strong>DOKA10</strong> for 10% off your first order</span>
        <Sparkles size={14} />
      </div>

      <div className={styles.layout}>
        <LeftSidebar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        <div className={styles.mainContent}>
          {/* Hero category chips */}
          <div className={styles.chips}>
            {['All', 'T-Shirts', 'Hoodies', 'Caps', 'Mugs', 'Phone Cases', 'Bags', 'Posters'].map((chip) => (
              <button 
                key={chip} 
                className={`${styles.chip} ${activeCategory === chip ? styles.activeChip : ''}`}
                onClick={() => setActiveCategory(chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          <div className={styles.header}>
            <div className={styles.titleArea}>
              <h1 className={styles.title}>{activeCategory === 'All' ? 'All Products' : activeCategory}</h1>
              {!isLoading && <span className={styles.productCount}>{filteredProducts.length} results</span>}
            </div>
            <div className={styles.controls}>
              <button className={styles.controlBtn}>
                <SlidersHorizontal size={15} /> Filters
              </button>
              <SortDropdown />
            </div>
          </div>

          {isLoading ? (
            <div className={styles.grid}>
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-secondary)', gridColumn: '1 / -1' }}>
                  <p>No products found in this category.</p>
                </div>
              ) : (
                <div className={styles.grid}>
                  {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
