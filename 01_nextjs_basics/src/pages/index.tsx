import styles from '../styles/index.module.css'

export default function Home() {
  return (
    <main>
      <h1>Welcome to Product Explorer</h1>
      <p>browse products from dummy JSON</p>

      <div className={styles.navigation}>
        <section className={styles.products}>
          <h1>Products</h1>
          <button>Browse</button>
        </section>

        <section className={styles.categories}>
          <h1>Categories</h1>
          <button>Explore</button>
        </section>

        <section className={styles.cart}>
          <h1>Shopping Cart</h1>
          <button>Open</button>
        </section>
      </div>
    </main>
  );
}