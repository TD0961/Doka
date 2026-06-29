import Link from 'next/link';
import { CheckCircle, Package, Truck, ArrowRight } from 'lucide-react';
import styles from './Success.module.css';

export default function OrderSuccessPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <CheckCircle size={48} className={styles.successIcon} />
        </div>
        
        <h1 className={styles.title}>Order Confirmed!</h1>
        <p className={styles.subtitle}>
          Thank you for your purchase. We've received your order and are getting it ready.
        </p>

        <div className={styles.orderInfo}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Order Number</span>
            <span className={styles.value}>#DK-89234</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Date</span>
            <span className={styles.value}>Oct 24, 2023</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Email</span>
            <span className={styles.value}>customer@example.com</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Total Amount</span>
            <span className={styles.value}>$55.00</span>
          </div>
        </div>

        <div className={styles.nextSteps}>
          <h2>What happens next?</h2>
          
          <div className={styles.step}>
            <div className={styles.stepIcon}>
              <Package size={20} />
            </div>
            <div className={styles.stepText}>
              <h3>Production</h3>
              <p>Your custom items will be printed within 2-3 business days.</p>
            </div>
          </div>
          
          <div className={styles.step}>
            <div className={styles.stepIcon}>
              <Truck size={20} />
            </div>
            <div className={styles.stepText}>
              <h3>Shipping</h3>
              <p>You'll receive a tracking link as soon as your order ships.</p>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href="/tracking" className={styles.secondaryBtn}>
            Track Order
          </Link>
          <Link href="/" className={styles.primaryBtn}>
            Continue Shopping
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
