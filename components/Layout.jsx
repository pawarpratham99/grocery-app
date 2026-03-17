import styles from '../styles/Layout.module.css';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
}