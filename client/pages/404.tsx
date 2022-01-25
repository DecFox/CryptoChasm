// next/react imports
import { useEffect, useState } from 'react';
import Router from 'next/router';

// components
import Meta from '../components/utils/Meta';
import Loader from '../components/Loader';

//
import styles from '../styles/components/loader.module.scss';

// lottiefiles
import { Player } from '@lottiefiles/react-lottie-player';

const metaData = {
  title: '404',
  description: 'Next Gen Greens 404 Page',
};

function custom404() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 2000);
  }, []);

  return (
    <>
      <Meta {...metaData} />
      {showLoader && <Loader />}
      {!showLoader && <Animation404 />}
    </>
  );
}

function Animation404() {
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    let redirectInterval = setInterval(() => {
      if (timer !== 1) {
        setTimer((timer) => timer - 1);
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(redirectInterval);
      Router.push('/');
    }, 4500);
  }, []);

  return (
    <div className={`${styles.container} ${styles.custom404}`}>
      <figure>
        <Player
          autoplay
          loop
          speed={1}
          src="./404.json"
          style={{ height: 'auto', width: '100%' }}
        />
      </figure>

      <h2>Redirecting you to the homepage in {timer}... </h2>
    </div>
  );
}

export default custom404;
