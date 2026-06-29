import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>Doka</Link>
            <p className={styles.tagline}>Premium Print-on-Demand</p>
          </div>
          <div className={styles.links}>
            <Link href="/about" className={styles.link}>About</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
            <Link href="/help" className={styles.link}>Help</Link>
            <Link href="/privacy" className={styles.link}>Privacy</Link>
            <Link href="/terms" className={styles.link}>Terms</Link>
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copyright}>&copy; {new Date().getFullYear()} Doka. All rights reserved.</p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialLink} aria-label="Twitter">Twitter</a>
            <a href="#" className={styles.socialLink} aria-label="Instagram">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
