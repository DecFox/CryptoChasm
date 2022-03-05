// next/react imports
import Link from 'next/link';
import { useEffect, useState } from 'react';

// components

// vendor imports

// styles
import styles from '../styles/components/featured.module.scss';

function Featured() {
  // const [tokens, setTokens] = useState(Array(5).fill(''));

  // useEffect(() => {
  //   fetch('http://localhost:5050/token/all')
  //     .then((res) => res.json())
  //     .then(setTokens);
  // });

  const tokens = [
    {
      metaHash: 'QmcU596cAZgDWiZHjQRzPCDc9pTdJcBq4WxFfk11rUp8rN',
      tokenGateway: 'https://cryptotokens.s3.ap-south-1.amazonaws.com/token-0x0000000000000000000000000000000000000000-2022-02-17+13%3A35%3A44.040786555+%2B0530+IST+m%3D%2B369.528949953.jpg',
      listed: true,
      minter: '0x0000000000000000000000000000000000000000',
      mintedOn: '2022-02-17T08:02:06.904+00:00',
      name: 'Digital Art NFT',
      description: 'This is a test run for minting digital art NFTs',
      owners: null,
      royalty: null,
      bids: null,
      listing: [
        {
          listPrice: 1.99,
          listingTime: '2022-01-27T04:28:36.436Z',
        },
      ],
    },
    {
      metaHash: 'Qmdfd19V77g9uEgaH6PPoPALkZ8wwj3PRXWorcLLG8QF1y',
      tokenGateway: 'https://cryptotokens.s3.ap-south-1.amazonaws.com/token-0x0000000000000000000000000000000000000000-2022-02-17+13%3A33%3A35.106422589+%2B0530+IST+m%3D%2B240.594585991.jpg',
      listed: true,
      minter: '0x0000000000000000000000000000000000000000',
      mintedOn: '2022-01-27T04:23:52.403Z',
      name: 'Digital Art NFT',
      description: 'This is a test run for minting digital art NFTs',
      owners: null,
      royalty: null,
      bids: null,
      listing: [
        {
          listPrice: 2.35,
          listingTime: '2022-01-27T04:28:59.085Z',
        },
        {
          listPrice: 1.65,
          listingTime: '2022-01-27T04:29:07.556Z',
        },
      ],
    },
    {
      metaHash: 'QmeG145eyUSb7BuyVC2iunx7jvwBWeuw7jzmuixPrzd8WY',
      tokenGateway: 'https://cryptotokens.s3.ap-south-1.amazonaws.com/token-0x0000000000000000000000000000000000000000-2022-02-17+13%3A33%3A51.314386049+%2B0530+IST+m%3D%2B256.802549468.jpg',
      listed: true,
      minter: '0x0000000000000000000000000000000000000000',
      mintedOn: '2022-01-27T04:24:15.756Z',
      name: 'Digital Art NFT',
      description: 'This is a test run for minting digital art NFTs',
      owners: null,
      royalty: null,
      bids: null,
      listing: [
        {
          listPrice: 2.99,
          listingTime: '2022-01-27T04:29:30.458Z',
        },
        {
          listPrice: 1.55,
          listingTime: '2022-01-27T04:29:41.6Z',
        },
        {
          listPrice: 0.999,
          listingTime: '2022-01-27T04:29:58.702Z',
        },
      ],
    },
    {
      metaHash: 'QmTqke3XkkqWCtW4xSQfUV37EpFLrt7PEpuHz421YwiVoq',
      tokenGateway: 'https://cryptotokens.s3.ap-south-1.amazonaws.com/token-0x0000000000000000000000000000000000000000-2022-02-17+13%3A34%3A14.374159605+%2B0530+IST+m%3D%2B279.862323012.jpg',
      listed: true,
      minter: '0x0000000000000000000000000000000000000000',
      mintedOn: '2022-01-27T04:24:39.153Z',
      name: 'Digital Art NFT',
      description: 'This is a test run for minting digital art NFTs',
      owners: null,
      royalty: null,
      bids: null,
      listing: [
        {
          listPrice: 1.53,
          listingTime: '2022-01-27T04:30:15.939Z',
        },
      ],
    },
    {
      metaHash: 'QmSCFH2HmJTuDnvstsMZAEak4YvqGwoxvCnhXjQTySnb2u',
      tokenGateway: 'https://cryptotokens.s3.ap-south-1.amazonaws.com/token-0x0000000000000000000000000000000000000000-2022-02-17+13%3A34%3A30.244731743+%2B0530+IST+m%3D%2B295.732895142.jpg',
      listed: true,
      minter: '0x0000000000000000000000000000000000000000',
      mintedOn: '2022-01-27T04:26:08.564Z',
      name: 'Digital Art NFT',
      description: 'This is a test run for minting digital art NFTs',
      owners: null,
      royalty: null,
      bids: null,
      listing: [
        {
          listPrice: 0.56,
          listingTime: '2022-01-27T04:30:34.797Z',
        },
        {
          listPrice: 0.23,
          listingTime: '2022-01-27T04:30:38.861Z',
        },
      ],
    },
    {
      metaHash: 'QmWFbCnkYMstB59YjiwqiosjmPxx69oEyNFCh5ZTuuk2gn',
      tokenGateway: 'https://cryptotokens.s3.ap-south-1.amazonaws.com/token-0x0000000000000000000000000000000000000000-2022-02-17+13%3A34%3A47.439437643+%2B0530+IST+m%3D%2B312.927601053.png',
      listed: true,
      minter: '0x0000000000000000000000000000000000000000',
      mintedOn: '2022-01-27T04:26:31.394Z',
      name: 'Digital Art NFT',
      description: 'This is a test run for minting digital art NFTs',
      owners: null,
      royalty: null,
      bids: null,
      listing: [
        {
          listPrice: 1.32,
          listingTime: '2022-01-27T04:30:57.856Z',
        },
        {
          listPrice: 0.67,
          listingTime: '2022-01-27T04:31:04.772Z',
        },
      ],
    },
    {
      metaHash: 'QmVat7Cu7MBLweemQpHZNaUuoF1fN5aw1WP9nx3U1Xp6iM',
      tokenGateway: 'https://cryptotokens.s3.ap-south-1.amazonaws.com/token-0x0000000000000000000000000000000000000000-2022-02-17+13%3A35%3A26.329470972+%2B0530+IST+m%3D%2B351.817634383.jpeg',
      listed: true,
      minter: '0x0000000000000000000000000000000000000000',
      mintedOn: '2022-01-27T04:26:52.857Z',
      name: 'Digital Art NFT',
      description: 'This is a test run for minting digital art NFTs',
      owners: null,
      royalty: null,
      bids: null,
      listing: [
        {
          listPrice: 3.02,
          listingTime: '2022-01-27T04:31:25.023Z',
        },
      ],
    },
  ];

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
