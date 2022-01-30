// next/react imports
import Link from 'next/link';
import { useEffect, useState } from 'react';

// components

// vendor imports

// styles
import styles from '../styles/components/featured.module.scss';

function Featured() {
  const [tokens, setTokens] = useState(Array(5).fill(''));

  useEffect(() => {
    fetch('http://localhost:5050/token/all')
      .then((res) => res.json())
      .then(setTokens);
  });

  return (
    <section className={`row ${styles.featured}`}>
      <h1 className={styles.heading}>Featured Art</h1>
      <div className={styles.artContainer}>
        {tokens.slice(0, 5).map((el) => {
          return (
            <Link href="#" passHref>
              <figure>
                <img src={el.tokenGateway} />
                <figcaption>{el.name}</figcaption>
              </figure>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Featured;
