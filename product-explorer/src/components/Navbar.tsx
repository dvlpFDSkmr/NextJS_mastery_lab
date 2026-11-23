import { useContext } from "react";
import { useIsClient } from "usehooks-ts";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";

export default function Navbar() {
  const cartCTX = useContext(CartContext);
  const isClient = useIsClient();

  return (
    <header className={styles.header}>
      <Link href="/">Product Explorer</Link>

      <nav className={styles.navbar}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/products">Products</Link>
        <Link href="/cart" className={styles.cartLink}>
          Cart {isClient ? cartCTX?.itemCount : 0}
        </Link>
      </nav>
    </header>
  );
}
