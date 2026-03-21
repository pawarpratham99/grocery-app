import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Products.module.css';

export default function VegetablesPage({ products }) {
  return (
    <>
      <Head>
        <title>Vegetables - FreshCart</title>
      </Head>

      <div className={styles.page}>

        <div className={styles.pageHeader}>
          <h1>🥬 Fresh Vegetables</h1>
          <p>Showing {products.length} fresh vegetables — delivered in 10 mins</p>
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className={styles.card}
            >
              <div className={styles.cardEmoji}>{product.emoji}</div>

              <div className={styles.cardBody}>
                <span className={styles.category}>{product.category}</span>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.unit}>{product.unit}</p>

                <div className={styles.rating}>
                  ⭐ {product.rating}
                  <span>({product.reviews})</span>
                </div>

                <div className={styles.priceRow}>
                  <span className={styles.price}>₹{product.price}</span>
                  {product.price < product.originalPrice && (
                    <span className={styles.originalPrice}>
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                {product.inStock ? (
                  <button className={styles.addBtn}>+ Add to Cart</button>
                ) : (
                  <button className={styles.outOfStock} disabled>
                    Out of Stock
                  </button>
                )}
              </div>
            </Link>
          ))}
        </div>

      </div>
    </>
  );
}

// SSR - runs on every request on the server
export async function getServerSideProps() {
  const fs = require('fs');
  const path = require('path');
  const productsPath = path.join(process.cwd(), 'data', 'Products.json');
  const allProducts = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  const products = allProducts.filter(p => p.category === 'Vegetables');

  return {
    props: {
      products,
    },
  };
}

