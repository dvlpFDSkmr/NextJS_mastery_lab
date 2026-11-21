import styles from '../styles/Navbar.module.css'
import Link from "next/link";

export default function Navbar(){
    return(
        <header className={styles.header}>
              <Link href="/">Product Explorer</Link>

              <nav className={styles.navbar}>
                <p>Home</p>
                <p>Products</p>
                <p>Categories</p>
                <p>Cart</p>
              </nav>
        </header>
    )
}