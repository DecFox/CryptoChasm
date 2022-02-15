// react/next imports
import type { NextPage } from 'next';

// components
import Meta from '../components/utils/Meta';
import Nav from '../components/Navbar';
import CreateNFTForm from '../components/CreateNFTForm';

import { useEffect, useState } from 'react';

// styles
import styles from '../styles/createNFT.module.scss';

// Web3
import Web3 from 'web3';
import Loader from '../components/Loader';

// Globals declarations
const metaData = {
  title: 'Create NFT',
  description: 'Create NFT page for crypto chasm app.',
};

const CreateNFT: NextPage = () => {
  return (
    <>
      <Meta {...metaData} />
      <main className={`row ${styles.settings}`}>
        <Nav pageName="" />
        <h1>Create an item</h1>
        <p>
          You can set preferred display name, set your email and manage other
          personal settings
        </p>
        <CreateNFTForm />
      </main>
      <footer>&copy; Crypto Chasm. All right reserved</footer>
    </>
  );
};

export default CreateNFT;
