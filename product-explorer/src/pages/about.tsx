import PageHeading from "@/components/PageHeading";
import PageInformation from "@/components/PageInformation"; // Spelling fix ki hai
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function About() {
  const router = useRouter();

  return (
    <div className={styles.aboutContainer}>
      <PageHeading heading1="About" heading3="Free Fake REST API for Placeholder JSON Data" />

      <div className={styles.infoSection}>
        <PageInformation info="We help users browse products." />
        <PageInformation info="This is a simple learning project built with Next.js. All the product data you see is fetched from the DummyJSON API." />
      </div>

      <button className={styles.exploreBtn} onClick={() => router.push("/products")}>
        Explore our shop
      </button>
    </div>
  );
}
