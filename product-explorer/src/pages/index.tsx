import { useRouter } from "next/router";
import styles from "../styles/Home.module.css"; 

export default function Home() {
  const router = useRouter();
  return (
    <main className={styles.mainContainer}>
      <div className={styles.content}>
        <button className={styles.exploreBtn} onClick={() => router.push("/products")}>
          Explore our shop
        </button>
      </div>
    </main>
  );
}