import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>

      {/* Top Bar */}
      <div className={styles.topBar}>

        {/* Logo */}
        <div className={styles.logo}>
          <span>🛒</span>
          <span className={styles.logoText}>FreshCart</span>
          <span className={styles.logoTag}>10-min delivery</span>
        </div>

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
        <a href="#">🏠 Home</a>
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