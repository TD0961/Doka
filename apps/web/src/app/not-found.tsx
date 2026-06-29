'use client';

import Link from 'next/link';
import { Search, ArrowLeft } from 'lucide-react';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Page not found</h2>
        <p className={styles.description}>
          Sorry, we couldn't find the page you're looking for. It might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input type="text" placeholder="Search for products..." className={styles.searchInput} />
        </div>
        
        <div className={styles.actions}>
          <Link href="/" className={styles.primaryBtn}>
            Return Home
          </Link>
          <button className={styles.secondaryBtn} onClick={() => typeof window !== 'undefined' && window.history.back()}>
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
