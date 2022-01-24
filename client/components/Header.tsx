// next/react imports
import Link from 'next/link';
import { useContext } from 'react';

// components
import Button from '../components/Button';

// contexts

import { UserContext } from '../contexts/UserContext';

// vendor imports

// styles
import styles from '../styles/components/header.module.scss';

function Header() {
  const { walletAddress, setWalletAddress } = useContext(UserContext);

  return (
    <header className={`row ${styles.header}`}>
      <div className={styles.textBox}>
        <h1 className={styles.heading}>
          Dive Deep into the <span>Chasm</span> of Crypto Art
        </h1>
        <div className={styles.btnContainer}>
          <Button type="button" modifier="" href="/">
            Explore the Depths
          </Button>
          <Button type="button" modifier="ghost" href="/">
            Create
          </Button>
        </div>
      </div>
      <figure className={styles.headerImage}>
        <img src="/hero-final-min.png" alt="Art hero image" />
      </figure>
    </header>
  );
}

export default Header;
