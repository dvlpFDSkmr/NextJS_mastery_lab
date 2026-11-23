import styles from "../styles/Navbar.module.css";
import Link from "next/link";

export function Navbar() {
  return (
    <header className={styles.header}>
      <Link href="/">Sophize</Link>

      <nav className={styles.navbar}>
        <Link href="/">Home</Link>
        <Link href="/employees">Employees</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
