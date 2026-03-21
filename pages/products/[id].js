import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/ProductDetail.module.css';

export default function ProductDetail({ product }) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <>
      <Head>
        <title>{product.name} - FreshCart</title>
      </Head>

      <div className={styles.page}>

        {/* Back Button */}
        <Link href="/products" className={styles.backBtn}>
          ← Back to Products
        </Link>

        <div className={styles.detailCard}>

          {/* Left - Image */}
          <div className={styles.imageSection}>
            <div className={styles.emojiBox}>{product.emoji}</div>
            {discount > 0 && (
              <span className={styles.discountBadge}>{discount}% OFF</span>
            )}
          </div>

          {/* Right - Info */}
          <div className={styles.infoSection}>
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.unit}>Unit: {product.unit}</p>

            <div className={styles.rating}>
              ⭐ {product.rating}
              <span className={styles.reviews}>
                {product.reviews} reviews
              </span>
            </div>

            <p className={styles.description}>{product.description}</p>

            <div className={styles.tags}>
              {product.tags.map((tag) => (
                <span key={tag} className={styles.tag}>#{tag}</span>
              ))}
            </div>

            <div className={styles.priceSection}>
              <span className={styles.price}>₹{product.price}</span>
              {discount > 0 && (
                <span className={styles.originalPrice}>
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            <div className={styles.stockStatus}>
              {product.inStock ? (
                <span className={styles.inStock}>✅ In Stock</span>
              ) : (
                <span className={styles.outOfStock}>❌ Out of Stock</span>
              )}
            </div>

            <div className={styles.actions}>
              <button
                className={styles.addBtn}
                disabled={!product.inStock}
              >
                🛒 Add to Cart
              </button>
              <button className={styles.wishlistBtn}>
                🤍 Wishlist
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

// SSR - fetches individual product by ID
export async function getServerSideProps({ params }) {
const fs = require('fs');
const path = require('path');
const productsPath = path.join(process.cwd(), 'data', 'Products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  const product = products.find((p) => p.id === parseInt(params.id));

  // If product not found redirect to products page
  if (!product) {
    return {
      redirect: {
        destination: '/products',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
}