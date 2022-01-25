// react/next imports
import type { NextPage } from 'next';

// components
import Meta from '../components/utils/Meta';
import Nav from '../components/Navbar';
import Header from '../components/Header';
import Featured from '../components/Featured';
import { useEffect, useState } from 'react';

// Web3
import Web3 from 'web3';
import Loader from '../components/Loader';

// Globals declarations
const metaData = {
  title: 'Home',
  description: 'Home page for crypto chasm app.',
};

const Home: NextPage = () => {
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
          <main>
            <Nav pageName="Home" />
            <Header />
            <Featured />
          </main>
        </>
      )}
    </>
  );
};

export default Home;
