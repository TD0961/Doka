'use client';

import styles from './LeftSidebar.module.css';

const CATEGORIES = [
  'T-Shirts', 'Hoodies', 'Caps', 'Mugs', 'Phone Cases', 
  'Bags', 'Stickers', 'Posters', 'Canvas', 'Accessories'
];

const BRANDS = ['Gildan', 'Bella+Canvas', 'Next Level', 'Champion'];
const MATERIALS = ['100% Cotton', 'Polyester', 'Tri-Blend', 'Organic Cotton'];
const AVAILABILITIES = ['In Stock', 'Out of Stock', 'Pre-order'];

const COLORS = [
  '#000000', '#FFFFFF', '#FF0000', '#0000FF', '#008000', '#FFFF00', '#800080', '#FFA500'
];

interface LeftSidebarProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export function LeftSidebar({ activeCategory = 'All', onCategoryChange }: LeftSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Categories</h3>
        <ul className={styles.categoryList}>
          <li key="All" className={styles.categoryItem}>
            <button 
              className={`${styles.categoryButton} ${activeCategory === 'All' ? styles.activeCategory : ''}`}
              onClick={() => onCategoryChange?.('All')}
            >
              All Products
            </button>
          </li>
          {CATEGORIES.map(category => (
            <li key={category} className={styles.categoryItem}>
              <button 
                className={`${styles.categoryButton} ${activeCategory === category ? styles.activeCategory : ''}`}
                onClick={() => onCategoryChange?.(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Price</h3>
        <div className={styles.priceInputs}>
          <input type="number" placeholder="Min" className={styles.input} />
          <span>-</span>
          <input type="number" placeholder="Max" className={styles.input} />
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Color</h3>
        <div className={styles.colorGrid}>
          {COLORS.map(color => (
            <button 
              key={color} 
              className={styles.colorButton}
              style={{ backgroundColor: color }}
              aria-label={`Filter by color ${color}`}
            />
          ))}
        </div>
      </div>
      
      <div className={styles.divider} />

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Printing Method</h3>
        <ul className={styles.checkboxList}>
          <li>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> DTG Printing
            </label>
          </li>
          <li>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Embroidery
            </label>
          </li>
          <li>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Sublimation
            </label>
          </li>
        </ul>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Brand</h3>
        <ul className={styles.checkboxList}>
          {BRANDS.map(brand => (
            <li key={brand}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" /> {brand}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Material</h3>
        <ul className={styles.checkboxList}>
          {MATERIALS.map(material => (
            <li key={material}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" /> {material}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Availability</h3>
        <ul className={styles.checkboxList}>
          {AVAILABILITIES.map(status => (
            <li key={status}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" /> {status}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
