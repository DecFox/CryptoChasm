// react/next imports
import type { NextPage } from 'next';

// components
import Meta from '../components/utils/Meta';
import Nav from '../components/Navbar';
import SettingsForm from '../components/SettingsForm';

import { useEffect, useState } from 'react';

// styles
import styles from '../styles/settings.module.scss';

// Web3
import Web3 from 'web3';
import Loader from '../components/Loader';

// Globals declarations
const metaData = {
  title: 'Edit Profile',
  description: 'Edit profile page for crypto chasm app.',
};

const Settings: NextPage = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 2500);
  }, []);
  return (
    <>
      <Meta {...metaData} />
      {showLoader && <Loader />}
      {!showLoader && (
        <>
          <main className={`row ${styles.settings}`}>
            <Nav pageName="Settings" />
            <h1>Edit Profile</h1>
            <p>You can set preferred display name, set your email and manage other personal settings</p>
            <SettingsForm />
          </main>
          <footer>&copy; Crypto Chasm. All right reserved</footer>
        </>
      )}
    </>
  );
};

export default Settings;
