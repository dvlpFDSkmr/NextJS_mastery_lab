import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.name}>
      <h1>Welcome to Sophize</h1>
      <p>Software development team information, employee directory and company details</p>

      <button>View Employees</button>
      <button>About US</button>
    </div>
  );
}
