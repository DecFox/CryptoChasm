// react/next imports
import type { NextPage } from 'next';
import Head from 'next/head';

// components
import Meta from '../components/utils/Meta';
import Nav from '../components/Navbar';
import Header from '../components/Header';

// Globals declarations
const metaData = {
  title: 'Home',
  description: 'Home page for crypto chasm app.',
};

const Home: NextPage = () => {
  return (
    <>
      <Meta {...metaData} />
      <main>
        <Nav />
        <Header />
      </main>

      <footer></footer>
    </>
  );
};

export default Home;
