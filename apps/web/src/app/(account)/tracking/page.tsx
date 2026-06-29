import Image from 'next/image';
import { CheckCircle2, Clock, Circle, Package, Truck, PaintBucket } from 'lucide-react';
import styles from './Tracking.module.css';

export default function OrderTrackingPage() {
  const steps = [
    { label: 'Order Received', date: 'Oct 24, 10:30 AM', status: 'completed', icon: CheckCircle2 },
    { label: 'Design Approved', date: 'Oct 24, 2:15 PM', status: 'completed', icon: PaintBucket },
    { label: 'Printing', date: 'Oct 25, 9:00 AM', status: 'current', icon: Package },
    { label: 'Quality Check', date: 'Pending', status: 'upcoming', icon: Circle },
    { label: 'Shipped', date: 'Pending', status: 'upcoming', icon: Truck },
    { label: 'Delivered', date: 'Pending', status: 'upcoming', icon: CheckCircle2 },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Order #DK-89234</h1>
            <p className={styles.subtitle}>Placed on October 24, 2023</p>
          </div>
          <div className={styles.statusBadge}>
            <Clock size={16} />
            <span>In Production</span>
          </div>
        </div>

        <div className={styles.timeline}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className={`${styles.step} ${styles[step.status]}`}>
                <div className={styles.iconContainer}>
                  <Icon size={20} className={styles.icon} />
                  {index < steps.length - 1 && <div className={styles.connector} />}
                </div>
                <div className={styles.content}>
                  <h3 className={styles.stepLabel}>{step.label}</h3>
                  <p className={styles.stepDate}>{step.date}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.productDetails}>
          <h3>Order Details</h3>
          <div className={styles.item}>
            <div className={styles.itemImageWrapper}>
              <Image src="/hoodie.png" alt="Premium Heavyweight Hoodie" fill className={styles.imgEl} />
            </div>
            <div className={styles.itemInfo}>
              <h4>Premium Heavyweight Hoodie</h4>
              <p>Black / L</p>
            </div>
            <div className={styles.itemQty}>Qty: 1</div>
          </div>
        </div>
      </div>
    </div>
  );
}
