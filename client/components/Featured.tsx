// next/react imports
import Link from 'next/link';

// components

// vendor imports

// styles
import styles from '../styles/components/featured.module.scss';

function Featured() {
  return (
    <section className={`row ${styles.featured}`}>
      <h1 className={styles.heading}>Featured Art</h1>
      <div className={styles.artContainer}></div>
    </section>
  );
}

export default Featured;
