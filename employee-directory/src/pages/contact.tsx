import styles from '../styles/Contact.module.css'

export default function Contact(){
    return(
        <div className={styles.contact}>
            <div className={styles.box}>
                <h2>Email</h2>
                <a href="mailto:hello@example.com">Send us an email</a>
            </div>

            <div className={styles.box}>
                <h2>Office Location</h2>
                <p>N-002, Sumadhura Soham, ECC Road Whitefield, Bengaluru, Karnataka, India</p>
            </div>
        </div>
    )
}