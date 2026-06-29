'use client';

import Link from 'next/link';
import { User, MapPin, Package, Heart, Settings, LogOut, Trash2 } from 'lucide-react';
import styles from '../profile/Profile.module.css'; // Reusing profile layout styles
import wishlistStyles from './Wishlist.module.css';
import { ProductCard } from '@/components/products/ProductCard';

export default function WishlistPage() {
  const wishlistedProducts = [
    {
      id: '1',
      name: 'Premium Heavyweight Hoodie',
      price: 55.00,
      rating: 4.9,
      reviews: 128,
      image: '/hoodie.png',
      colors: ['#000', '#333', '#800000', '#F5F5DC'],
      isNew: true,
    },
    {
      id: '2',
      name: 'Classic Organic T-Shirt',
      price: 24.00,
      rating: 4.7,
      reviews: 342,
      image: '/tshirt.png',
      colors: ['#FFF', '#000', '#1F4D8F', '#FF0000', '#008000', '#FFFF00'],
    }
  ];

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>JD</div>
          <div>
            <h2 className={styles.userName}>John Doe</h2>
            <p className={styles.userEmail}>john.doe@example.com</p>
          </div>
        </div>
        
        <nav className={styles.nav}>
          <Link href="/profile" className={styles.navItem}>
            <User size={18} /> Personal Info
          </Link>
          <Link href="/orders" className={styles.navItem}>
            <Package size={18} /> My Orders
          </Link>
          <Link href="/wishlist" className={`${styles.navItem} ${styles.active}`}>
            <Heart size={18} /> Wishlist
          </Link>
          <Link href="/addresses" className={styles.navItem}>
            <MapPin size={18} /> Addresses
          </Link>
          <Link href="/settings" className={styles.navItem}>
            <Settings size={18} /> Settings
          </Link>
          <button className={`${styles.navItem} ${styles.logoutBtn}`}>
            <LogOut size={18} /> Log out
          </button>
        </nav>
      </aside>

      <main className={styles.main}>
        <div className={wishlistStyles.header}>
          <h1 className={styles.pageTitle}>My Wishlist</h1>
          <span className={wishlistStyles.count}>{wishlistedProducts.length} Items</span>
        </div>
        
        {wishlistedProducts.length > 0 ? (
          <div className={wishlistStyles.grid}>
            {wishlistedProducts.map(product => (
              <div key={product.id} className={wishlistStyles.itemWrapper}>
                <ProductCard product={product} />
                <div className={wishlistStyles.quickActions}>
                  <Link href={`/customize/${product.id}`} className={wishlistStyles.customizeBtn}>
                    Customize
                  </Link>
                  <button className={wishlistStyles.addToCartBtn}>
                    Add to Cart
                  </button>
                </div>
                <button className={wishlistStyles.removeBtn} onClick={() => {}}>
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className={wishlistStyles.emptyState}>
            <Heart size={48} className={wishlistStyles.emptyIcon} />
            <h2>Your wishlist is empty</h2>
            <p>Save items you love to view them later.</p>
            <Link href="/" className={wishlistStyles.shopBtn}>Explore Products</Link>
          </div>
        )}
      </main>
    </div>
  );
}
