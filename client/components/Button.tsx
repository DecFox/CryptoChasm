// next/react imports
import Link from 'next/link';
import { ReactElement } from 'react';

// styles
import styles from '../styles/components/button.module.scss';

function Button({
  type,
  modifier,
  children,
  href,
}: {
  type: 'button' | 'submit' | 'reset';
  modifier: string;
  children: string | ReactElement;
  href: string;
}) {
  if (type === 'submit') {
    return (
      <button className={`${styles.btn} ${styles[modifier]}`} type={type}>
        {children}
      </button>
    );
  } else {
    return (
      <Link href={href} passHref>
        <button className={`${styles.btn} ${styles[modifier]}`} type={type}>
          {children}
        </button>
      </Link>
    );
  }
}

export default Button;
