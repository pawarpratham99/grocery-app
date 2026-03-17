import styles from '../styles/Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>

      <div className={styles.footerGrid}>

        {/* Brand */}
        <div className={styles.footerBrand}>
          <div className={styles.logo}>
            <span>🛒</span>
            <span className={styles.logoText}>FreshCart</span>
          </div>
          <p className={styles.tagline}>
            Fresh groceries delivered to your door in 10 minutes. 
            Quality products at the best prices.
          </p>
          <div className={styles.socialLinks}>
            <a href="#">📘 Facebook</a>
            <a href="#">📸 Instagram</a>
            <a href="#">🐦 Twitter</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.footerSection}>
          <h4>Quick Links</h4>
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <a href="#">Careers</a>
          <a href="#">Blog</a>
        </div>

        {/* Categories */}
        <div className={styles.footerSection}>
          <h4>Categories</h4>
          <a href="#">Vegetables & Fruits</a>
          <a href="#">Dairy & Eggs</a>
          <a href="#">Snacks</a>
          <a href="#">Personal Care</a>
        </div>

        {/* Contact */}
        <div className={styles.footerSection}>
          <h4>Contact Us</h4>
          <p>📧 support@freshcart.in</p>
          <p>📞 1800-123-4567</p>
          <p>📍 Mumbai, Maharashtra</p>
          <p>🕐 24/7 Support</p>
        </div>

      </div>

      <div className={styles.footerBottom}>
        <p>© 2024 FreshCart. All rights reserved.</p>
        <div className={styles.footerBottomLinks}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Refund Policy</a>
        </div>
      </div>

    </footer>
  );
}