import styles from '../styles/Navbar.module.css'
import Link from "next/link";

export default function Navbar(){
    return(
        <header className={styles.header}>
              <Link href="/">Product Explorer</Link>

              <nav className={styles.navbar}>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/products">Products</Link>
                <p>Categories</p>
                <p>Cart</p>
              </nav>
        </header>
    )
}