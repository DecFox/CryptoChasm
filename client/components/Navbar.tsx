// next/react imports
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';

// vendor imports
import 'remixicon/fonts/remixicon.css';
import { UserContext } from '../contexts/UserContext';
import useCheckWeb3Support from '../Hooks/useCheckWeb3Support';

// styles
import styles from '../styles/components/navbar.module.scss';

// global declarations
declare let window: any;

function Navbar({ pageName }: { pageName: string }) {
  const [hamburger, toggleHamburger] = useState(false);
  const [scrollState, setScrollState] = useState<false | 'up' | 'down'>(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    let lastScroll = 0;

    const scrollCheck = () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        setScrollState(false);
        return;
      }

      if (currentScroll > lastScroll) {
        setScrollState('down');
      } else if (currentScroll < lastScroll) {
        setScrollState('up');
      }
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', scrollCheck);
    return () => {
      window.removeEventListener('scroll', scrollCheck);
    };
  }, []);

  useCheckWeb3Support();

  return (
    <nav
      className={`noselect ${styles.navbar} ${
        scrollState ? styles[scrollState] : ''
      }`}
    >
      <div className={`row ${styles.container}`}>
        <Link href="/">
          <a className={styles.logo}>
            Crypto <span>Chasm</span>
          </a>
        </Link>
        <div
          className={styles.hamburger}
          onClick={() => {
            toggleHamburger(!hamburger);
          }}
        >
          {hamburger ? (
            <i className="ri-close-fill" />
          ) : (
            <i className="ri-menu-line" />
          )}
        </div>
        <ul className={styles.mainLinks}>
          <Link href="/" passHref>
            <li className={pageName == 'Home' ? styles.active : ''}>Home</li>
          </Link>
          <Link href="/marketplace" passHref>
            <li className={pageName == 'Marketplace' ? styles.active : ''}>
              Marketplace
            </li>
          </Link>
          <Link href="#" passHref>
            <li className={styles.profile}>
              {user.walletAddress ? (
                <figure>
                  <img
                    src={`https://avatars.dicebear.com/api/pixel-art/${user.walletAddress}.svg`}
                    alt="avatar"
                  />
                </figure>
              ) : (
                <figure>
                  <i className="ri-account-circle-line" />
                </figure>
              )}

              <ul className={styles.options}>
                <Link href="/collections" passHref>
                  <li
                    className={pageName == 'Collections' ? styles.active : ''}
                  >
                    Collections
                  </li>
                </Link>
                <Link href="/settings" passHref>
                  <li className={pageName == 'Settings' ? styles.active : ''}>
                    Settings
                  </li>
                </Link>
              </ul>
            </li>
          </Link>
        </ul>
        <aside className={hamburger ? styles.active : ''}>
          <ul className={styles.asideMain}>
            {user.walletAddress ? (
              <figure>
                <img
                  src={`https://avatars.dicebear.com/api/pixel-art/${user.walletAddress}.svg`}
                  alt="avatar"
                />
                <p>Anonymous</p>
              </figure>
            ) : (
              <figure>
                <i className="ri-account-circle-line" />
                <p>Anonymous</p>
              </figure>
            )}

            <Link href="/" passHref>
              <li className={pageName == 'Home' ? styles.active : ''}>Home</li>
            </Link>
            <Link href="/marketplace" passHref>
              <li className={pageName == 'Marketplace' ? styles.active : ''}>
                Marketplace
              </li>
            </Link>
            <Link href="/collections" passHref>
              <li className={pageName == 'Collections' ? styles.active : ''}>
                Collections
              </li>
            </Link>
            <Link href="/settings" passHref>
              <li className={pageName == 'Settings' ? styles.active : ''}>
                Settings
              </li>
            </Link>
          </ul>
        </aside>
      </div>
    </nav>
  );
}

export default Navbar;
