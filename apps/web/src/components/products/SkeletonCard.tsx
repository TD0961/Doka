import styles from './SkeletonCard.module.css';

export function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.info}>
        <div className={`${styles.line} ${styles.nameLine}`} />
        <div className={`${styles.line} ${styles.priceLine}`} />
        <div className={styles.bottomRow}>
          <div className={`${styles.line} ${styles.ratingLine}`} />
          <div className={styles.colorDots}>
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
          </div>
        </div>
      </div>
    </div>
  );
}
