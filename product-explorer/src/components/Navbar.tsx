import { useContext } from "react";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";

export default function Navbar() {
  const cartCTX = useContext(CartContext);
  return (
    <header className={styles.header}>
      <Link href="/">Product Explorer</Link>

      <nav className={styles.navbar}>
        <Link href="/"><i>Home</i></Link>
        <Link href="/about">About</Link>
        <Link href="/products"><i>Products</i></Link>
        <Link href="/cart" style={{color:"#82090d"}}><b><i>Cart {cartCTX?.itemCount}</i></b></Link>
      </nav>
    </header>
  );
}
