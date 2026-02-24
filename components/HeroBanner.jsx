import styles from '../styles/HeroBanner.module.css';

export default function HeroBanner() {
  return (
    <section className={styles.hero}>

      {/* Main Banner */}
      <div className={styles.mainBanner}>
        <div className={styles.bannerContent}>
          <span className={styles.badge}>⚡ 10 Minute Delivery</span>
          <h1 className={styles.title}>Fresh Groceries <br/> At Your Doorstep</h1>
          <p className={styles.subtitle}>
            Order fresh vegetables, dairy, snacks & more. <br/>
            Delivered in 10 minutes — guaranteed.
          </p>
          <div className={styles.bannerActions}>
            <button className={styles.shopBtn}>Shop Now →</button>
            <button className={styles.offerBtn}>View Offers 🎁</button>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>10k+</span>
              <span className={styles.statLabel}>Products</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>10 min</span>
              <span className={styles.statLabel}>Delivery</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>4.8⭐</span>
              <span className={styles.statLabel}>Rating</span>
            </div>
          </div>
        </div>

        <div className={styles.bannerImage}>
          <div className={styles.imageCircle}>
            <span className={styles.bigEmoji}>🛒</span>
            <div className={styles.floatingBadge1}>🥦 Fresh Veggies</div>
            <div className={styles.floatingBadge2}>🥛 Dairy</div>
            <div className={styles.floatingBadge3}>🍎 Fruits</div>
          </div>
        </div>
      </div>

      {/* Offer Strips */}
      <div className={styles.offerStrip}>
        <div className={styles.offerCard}>
          <span className={styles.offerEmoji}>🚚</span>
          <div>
            <p className={styles.offerTitle}>Free Delivery</p>
            <p className={styles.offerSub}>On orders above ₹299</p>
          </div>
        </div>
        <div className={styles.offerCard}>
          <span className={styles.offerEmoji}>💰</span>
          <div>
            <p className={styles.offerTitle}>Best Prices</p>
            <p className={styles.offerSub}>Lowest price guaranteed</p>
          </div>
        </div>
        <div className={styles.offerCard}>
          <span className={styles.offerEmoji}>🔄</span>
          <div>
            <p className={styles.offerTitle}>Easy Returns</p>
            <p className={styles.offerSub}>Hassle free returns</p>
          </div>
        </div>
        <div className={styles.offerCard}>
          <span className={styles.offerEmoji}>🔒</span>
          <div>
            <p className={styles.offerTitle}>Secure Payments</p>
            <p className={styles.offerSub}>UPI, Cards, COD</p>
          </div>
        </div>
      </div>

    </section>
  );
}