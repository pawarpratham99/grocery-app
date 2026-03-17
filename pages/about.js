import Head from 'next/head';
import styles from '../styles/About.module.css';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - FreshCart</title>
      </Head>
      <div className={styles.aboutPage}>

        <div className={styles.hero}>
          <h1>About FreshCart 🛒</h1>
          <p>Delivering freshness to your doorstep in 10 minutes</p>
        </div>

        <div className={styles.missionSection}>
          <div className={styles.missionCard}>
            <span>🎯</span>
            <h3>Our Mission</h3>
            <p>To make fresh, quality groceries accessible to every household with the fastest delivery in India.</p>
          </div>
          <div className={styles.missionCard}>
            <span>👁️</span>
            <h3>Our Vision</h3>
            <p>To become India's most trusted grocery platform by solving the two biggest problems — stock accuracy and smart reordering.</p>
          </div>
          <div className={styles.missionCard}>
            <span>💚</span>
            <h3>Our Values</h3>
            <p>Freshness, speed, transparency and customer delight in every single order we deliver.</p>
          </div>
        </div>

        <div className={styles.statsSection}>
          <div className={styles.statBox}>
            <h2>10 Min</h2>
            <p>Average Delivery Time</p>
          </div>
          <div className={styles.statBox}>
            <h2>10,000+</h2>
            <p>Products Available</p>
          </div>
          <div className={styles.statBox}>
            <h2>50,000+</h2>
            <p>Happy Customers</p>
          </div>
          <div className={styles.statBox}>
            <h2>4.8 ⭐</h2>
            <p>Average Rating</p>
          </div>
        </div>

      </div>
    </>
  );
}