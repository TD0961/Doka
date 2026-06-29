import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { ProductCard, Product } from '@/components/products/ProductCard';
import { SortDropdown } from '@/components/products/SortDropdown';
import { SlidersHorizontal, Search as SearchIcon } from 'lucide-react';
import styles from '../../page.module.css'; // Reusing homepage styles
import searchStyles from './Search.module.css';

// Mock data for MVP
const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Premium Heavyweight Hoodie', price: 55.00, rating: 4.9, reviews: 128, image: '/hoodie.png', colors: ['#000', '#333', '#800000', '#F5F5DC'], isNew: true },
  { id: '2', name: 'Classic Organic T-Shirt', price: 24.00, rating: 4.7, reviews: 342, image: '/tshirt.png', colors: ['#FFF', '#000', '#1F4D8F', '#FF0000', '#008000', '#FFFF00'] },
  { id: '8', name: 'Performance Active Tee', price: 32.00, rating: 4.8, reviews: 215, image: '/tshirt.png', colors: ['#000', '#333', '#0000FF'], isNew: true },
];

export default function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q || 'Hoodie';
  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.layout}>
        <LeftSidebar />
        
        <div className={styles.mainContent}>
          <div className={searchStyles.searchHeader}>
            <div className={searchStyles.titleArea}>
              <h1 className={searchStyles.title}>
                Results for "{query}"
              </h1>
              <span className={styles.productCount}>{MOCK_PRODUCTS.length} products found</span>
            </div>
            
            <div className={styles.controls}>
              <button className={styles.controlBtn}>
                <SlidersHorizontal size={16} />
                Filters
              </button>
              <SortDropdown />
            </div>
          </div>
          
          {MOCK_PRODUCTS.length > 0 ? (
            <div className={styles.grid}>
              {MOCK_PRODUCTS.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={searchStyles.noResults}>
              <SearchIcon size={48} className={searchStyles.noResultsIcon} />
              <h2>No results found</h2>
              <p>We couldn't find any products matching "{query}".</p>
              <p>Try checking your spelling or using more general terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
