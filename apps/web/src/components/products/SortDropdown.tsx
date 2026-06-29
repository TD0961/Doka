'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import styles from './SortDropdown.module.css';

const SORT_OPTIONS = [
  'Featured', 'Newest', 'Popular', 'Best Selling', 'Price: Low to High', 'Price: High to Low', 'Rating'
];

export function SortDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Featured');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.sortWrapper} ref={dropdownRef}>
      <span className={styles.sortLabel}>Sort by:</span>
      <button 
        className={styles.sortBtn}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selected}
        <ChevronDown size={16} className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`} />
      </button>

      {isOpen && (
        <ul className={styles.dropdown} role="listbox">
          {SORT_OPTIONS.map(option => (
            <li key={option} role="option" aria-selected={selected === option}>
              <button 
                className={`${styles.optionBtn} ${selected === option ? styles.selectedOption : ''}`}
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
              >
                <span className={styles.optionText}>{option}</span>
                {selected === option && <Check size={16} className={styles.checkIcon} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
