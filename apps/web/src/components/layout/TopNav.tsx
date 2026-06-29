'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingCart, User, Clock, TrendingUp } from 'lucide-react';
import styles from './TopNav.module.css';

export function TopNav() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const RECENT_SEARCHES = ['T-Shirts', 'Custom Mug', 'Hoodie'];
  const SUGGESTIONS = ['Premium Heavyweight Hoodie', 'Minimalist Phone Case'];
  const CATEGORIES = ['Hoodies', 'Accessories'];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            Doka
          </Link>
        </div>
        
        <div className={styles.center}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            />
            {isSearchFocused && (
              <div className={styles.searchDropdown}>
                {!searchQuery ? (
                  <div className={styles.dropdownSection}>
                    <h4 className={styles.dropdownTitle}>Recent Searches</h4>
                    <ul className={styles.dropdownList}>
                      {RECENT_SEARCHES.map(item => (
                        <li key={item}>
                          <Link href={`/search?q=${item}`} className={styles.dropdownItem}>
                            <Clock size={14} />
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <>
                    <div className={styles.dropdownSection}>
                      <h4 className={styles.dropdownTitle}>Suggestions</h4>
                      <ul className={styles.dropdownList}>
                        {SUGGESTIONS.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())).map(item => (
                          <li key={item}>
                            <Link href={`/search?q=${item}`} className={styles.dropdownItem}>
                              <Search size={14} />
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.dropdownSection}>
                      <h4 className={styles.dropdownTitle}>Categories</h4>
                      <ul className={styles.dropdownList}>
                        {CATEGORIES.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase())).map(item => (
                          <li key={item}>
                            <Link href={`/search?q=${item}`} className={styles.dropdownItem}>
                              <TrendingUp size={14} />
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={styles.right}>
          <Link href="/wishlist" className={styles.iconButton}>
            <Heart size={22} />
          </Link>
          <Link href="/cart" className={styles.iconButton}>
            <ShoppingCart size={22} />
          </Link>
          <Link href="/profile" className={styles.iconButton}>
            <User size={22} />
          </Link>
        </div>
      </div>
    </header>
  );
}
