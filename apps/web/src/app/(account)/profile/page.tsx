import Link from 'next/link';
import { User, MapPin, Package, Heart, Settings, LogOut } from 'lucide-react';
import styles from './Profile.module.css';

export default function UserProfilePage() {
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
          <Link href="/profile" className={`${styles.navItem} ${styles.active}`}>
            <User size={18} /> Personal Info
          </Link>
          <Link href="/orders" className={styles.navItem}>
            <Package size={18} /> My Orders
          </Link>
          <Link href="/wishlist" className={styles.navItem}>
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
        <h1 className={styles.pageTitle}>Personal Information</h1>
        
        <div className={styles.card}>
          <div className={styles.sectionHeader}>
            <h3>Basic Details</h3>
            <button className={styles.editBtn}>Edit</button>
          </div>
          
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>First Name</span>
              <span className={styles.value}>John</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Last Name</span>
              <span className={styles.value}>Doe</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Email Address</span>
              <span className={styles.value}>john.doe@example.com</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Phone Number</span>
              <span className={styles.value}>+1 (555) 123-4567</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.sectionHeader}>
            <h3>Password</h3>
            <button className={styles.editBtn}>Change Password</button>
          </div>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Current Password</span>
              <span className={styles.value}>••••••••••••</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
