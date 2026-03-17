import styles from '../styles/Header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  return (
    <header className={styles.header}>

      {/* Top Bar */}
      <div className={styles.topBar}>

        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span>🛒</span>
          <span className={styles.logoText}>FreshCart</span>
          <span className={styles.logoTag}>10-min delivery</span>
        </Link>

        {/* Location */}
        <div className={styles.location}>
          <span>📍</span>
          <div>
            <p className={styles.locationLabel}>Deliver to</p>
            <p className={styles.locationValue}>Mumbai, 400001 ▾</p>
          </div>
        </div>

        {/* Search */}
        <div className={styles.searchBar}>
          <span>🔍</span>
          <input type="text" placeholder='Search "milk", "fruits", "snacks"...' />
        </div>

        {/* Buttons */}
        <div className={styles.actions}>
          <button className={styles.loginBtn}>Login</button>
          <button className={styles.cartBtn}>🛒 Cart (0)</button>
        </div>

      </div>

      {/* Navigation Bar */}
      <nav className={styles.navBar}>
        <Link href="/" className={router.pathname === '/' ? styles.activeLink : ''}>
          🏠 Home
        </Link>
        <Link href="/about" className={router.pathname === '/about' ? styles.activeLink : ''}>
          ℹ️ About
        </Link>
        <a href="#">🥦 Vegetables</a>
        <a href="#">🥛 Dairy & Eggs</a>
        <a href="#">🍪 Snacks</a>
        <a href="#">🧴 Personal Care</a>
        <a href="#">🧹 Household</a>
        <a href="#" className={styles.dealLink}>⚡ Today's Deals</a>
      </nav>

    </header>
  );
}