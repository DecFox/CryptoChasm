// next/react imports
import Link from 'next/link';

// vendor imports
import 'remixicon/fonts/remixicon.css';

// styles
import styles from '../styles/components/navbar.module.scss';
function Navbar() {
  return (
    <nav className={`row ${styles.navbar}`}>
      <Link href="/">
        <a className={styles.logo}>
          Crypto <span>Chasm</span>
        </a>
      </Link>
      <div className={styles.hamburger}>
        <i className="ri-menu-line" />
      </div>
    </nav>
  );
}

export default Navbar;
