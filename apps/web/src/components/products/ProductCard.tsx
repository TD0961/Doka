import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import styles from './ProductCard.module.css';

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;        // path like /hoodie.png
  colors: string[];
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {product.isNew && <span className={styles.badge}>New</span>}
        <button className={styles.favoriteBtn} aria-label="Add to wishlist">
          <Heart size={18} />
        </button>

        <Link href={`/product/${product.id}`} className={styles.imageLink}>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={styles.image}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className={styles.imagePlaceholder} />
          )}
        </Link>

        <div className={styles.quickActions}>
          <Link href={`/customize/${product.id}`} className={styles.actionBtn}>
            Customize
          </Link>
          <button className={`${styles.actionBtn} ${styles.primaryBtn}`}>
            Buy Now
          </button>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.header}>
          <Link href={`/product/${product.id}`} className={styles.name}>
            {product.name}
          </Link>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
        </div>

        <div className={styles.ratingRow}>
          <div className={styles.stars}>
            <Star size={13} fill="currentColor" />
            <span>{product.rating}</span>
            <span className={styles.reviews}>({product.reviews})</span>
          </div>
          <div className={styles.colors}>
            {product.colors.slice(0, 4).map(color => (
              <div key={color} className={styles.colorDot} style={{ backgroundColor: color }} />
            ))}
            {product.colors.length > 4 && (
              <span className={styles.moreColors}>+{product.colors.length - 4}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
