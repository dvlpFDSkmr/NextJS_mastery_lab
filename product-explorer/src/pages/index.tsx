import { useRouter } from "next/router";
import PageHeading from "@/components/PageHeading";
import PageInformation from "@/components/PageInformation"; 
import styles from "../styles/Home.module.css"; 

export default function Home() {
  const router = useRouter();
  return (
    <main className={styles.mainContainer}>
      <div className={styles.homecontent}>
        <PageHeading heading1="Home" heading3="Next JS 16, TypeScript, Page Router, Moudle.css, Dynmic Routing, ContextAPI" />

      <div className={styles.homeinfoSection}>
        <PageInformation info="We help users browse products." />
        <PageInformation info="DummyJSON Products is a free, fake REST API dataset from DummyJSON that provides sample e-commerce product records—including names, prices, descriptions, images, and categories—for frontend development, prototyping, and testing without building a backend. It includes over 190 product items and supports standard querying and simulated write operations." />
      </div>
        <button className={styles.exploreBtn} onClick={() => router.push("/products")}>
          Explore our shop
        </button>
      </div>
    </main>
  );
}