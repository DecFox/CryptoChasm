// styles
import styles from '../styles/components/loader.module.scss';

// lottiefiles
import { Player } from '@lottiefiles/react-lottie-player';

function Loader() {
  return (
    <div className={styles.container}>
      <figure>
        <Player
          autoplay
          loop
          speed={1}
          src="./loader.json"
          style={{ height: 'auto', width: '100%' }}
        />
      </figure>
      <h2>Get ready to be lost in the depth... </h2>
    </div>
  );
}

export default Loader;
