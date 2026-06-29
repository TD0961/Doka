import Link from 'next/link';
import Image from 'next/image';
import { User, MapPin, Package, Heart, Settings, LogOut, ChevronRight } from 'lucide-react';
import styles from '../profile/Profile.module.css'; // Reusing profile layout styles
import ordersStyles from './Orders.module.css';

export default function UserOrdersPage() {
  const orders = [
    {
      id: 'DK-89234',
      date: 'Oct 24, 2023',
      total: 55.00,
      status: 'In Production',
      items: 1
    },
    {
      id: 'DK-74892',
      date: 'Sep 12, 2023',
      total: 124.50,
      status: 'Delivered',
      items: 3
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
          <Link href="/orders" className={`${styles.navItem} ${styles.active}`}>
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
        <h1 className={styles.pageTitle}>My Orders</h1>
        
        <div className={ordersStyles.orderList}>
          {orders.map(order => (
            <div key={order.id} className={ordersStyles.orderCard}>
              <div className={ordersStyles.orderHeader}>
                <div className={ordersStyles.headerInfo}>
                  <div className={ordersStyles.infoCol}>
                    <span className={ordersStyles.label}>Order Placed</span>
                    <span className={ordersStyles.value}>{order.date}</span>
                  </div>
                  <div className={ordersStyles.infoCol}>
                    <span className={ordersStyles.label}>Total</span>
                    <span className={ordersStyles.value}>${order.total.toFixed(2)}</span>
                  </div>
                  <div className={ordersStyles.infoCol}>
                    <span className={ordersStyles.label}>Ship To</span>
                    <span className={ordersStyles.value}>John Doe</span>
                  </div>
                </div>
                
                <div className={ordersStyles.orderAction}>
                  <span className={ordersStyles.label}>Order # {order.id}</span>
                  <Link href="/tracking" className={ordersStyles.detailsLink}>
                    View Details
                  </Link>
                </div>
              </div>
              
              <div className={ordersStyles.orderBody}>
                <div className={ordersStyles.status}>
                  <span className={`${ordersStyles.statusBadge} ${order.status === 'Delivered' ? ordersStyles.delivered : ordersStyles.production}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className={ordersStyles.items}>
                  <div className={ordersStyles.itemImageWrapper}>
                    <Image src="/hoodie.png" alt="Order item" fill className={ordersStyles.imgEl} />
                  </div>
                  {order.items > 1 && (
                    <div className={ordersStyles.moreItems}>+{order.items - 1} more</div>
                  )}
                </div>
                
                <div className={ordersStyles.actions}>
                  <Link href="/tracking" className={ordersStyles.trackBtn}>Track Package</Link>
                  <button className={ordersStyles.buyAgainBtn}>Buy Again</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
