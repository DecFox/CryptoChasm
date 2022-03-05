// next/react imports
import Link from 'next/link';

// contexts

// vendor imports

// styles
import styles from '../styles/components/latest.module.scss';

function LatestCard() {
  return (
    <div className={styles.cardContainer}>
      <Link href="">
        <div className={styles.card}>
          <div className={styles.up}>
            <img
              src="https://cryptotokens.s3.ap-south-1.amazonaws.com/token-0x0000000000000000000000000000000000000000-2022-02-17+13%3A34%3A47.439437643+%2B0530+IST+m%3D%2B312.927601053.png"
              alt="Latest Nft Image"
            />
          </div>
          <div className={styles.down}>
            <figure>
              <img src="https://avatars.dicebear.com/api/pixel-art/jack.svg" />
            </figure>
            <h2>The Roman Classics</h2>
            <p>
              <span>by </span>Decfox
            </p>
            <div className={styles.price}>
              <figure>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="ethereum"
                  className="svg-inline--fa fa-ethereum fa-w-10"
                  role="img"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
                  ></path>
                </svg>
              </figure>
              <p>
                0.2 <span>( $6234.34 )</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default LatestCard;
