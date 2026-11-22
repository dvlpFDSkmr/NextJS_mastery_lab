import { useContext } from "react";
import { useIsClient } from 'usehooks-ts' 
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";



export default function Navbar() {
  const cartCTX = useContext(CartContext);
  const isClient = useIsClient(); // 2. Ab yeh kaam karega

  return (
    <header className={styles.header}>
      <Link href="/">Product Explorer</Link>

      <nav className={styles.navbar}>
        <Link href="/"><i>Home</i></Link>
        <Link href="/about">About</Link>
        <Link href="/products"><i>Products</i></Link>
        <Link href="/cart" style={{ color: "#82090d" }}>
          <b>
            <i>Cart {isClient ? cartCTX?.itemCount : 0}</i>
          </b>
        </Link>
      </nav>
    </header>
  );
}