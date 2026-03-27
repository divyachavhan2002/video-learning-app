import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3>🎓 LearnHub</h3>
            <p>Your gateway to quality online education.</p>
          </div>

          <div className={styles.section}>
            <h4>Quick Links</h4>
            <ul className={styles.links}>
              <li><a href="/courses">Browse Courses</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4>Follow Us</h4>
            <ul className={styles.links}>
              <li><a href="#" target="_blank">LinkedIn</a></li>
              <li><a href="#" target="_blank">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>&copy; {currentYear} LearnHub. All rights reserved.</p>
          <p className={styles.madeBy}>Built with ❤️ by Divya Chavhan</p>
        </div>
      </div>
    </footer>
  );
}
