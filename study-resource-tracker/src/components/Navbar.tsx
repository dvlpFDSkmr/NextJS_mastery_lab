import Link from "next/link";
import styles from '../styles/Navbar.module.css'

export default function Navbar() {
  return (
    <div className={styles.header}>
      <Link href="./">Study Tracker</Link>

      <nav className={styles.Nav}>
        <Link href="./">Home</Link>
        <Link href="./about">About</Link>
      </nav>
    </div>
  );
}
