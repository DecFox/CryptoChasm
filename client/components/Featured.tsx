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
      tokenGateway: 'https://gateway.pinata.cloud/ipfs/QmXEyswvvuQdv6AUwmkCdNtsYvaGJkd5eDp369pMkjQFv7',
      listed: true,
      minter: '0x0000000000000000000000000000000000000000',
      mintedOn: '2022-01-26T11:09:56.394Z',
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
      tokenGateway: 'https://gateway.pinata.cloud/ipfs/QmWamac2VoZ468LNRPoP1z6t4E8Df1KgM7BXBt7GWJDeWG',
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
      tokenGateway: 'https://gateway.pinata.cloud/ipfs/QmNZ8YfadK5pJWjhX8QvAbRQXy1onJ8TG3iSjVjSr8pZch',
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
      tokenGateway: 'https://gateway.pinata.cloud/ipfs/QmcXtxgTehQZ2w6SZtpr4o5HhVNcm4hzD5g6Wwzq2h9AMs',
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
      tokenGateway: 'https://gateway.pinata.cloud/ipfs/QmYykudfuu1nzHG8tiwt1HNnwzZ7ixvvokuVWsjNo3ngMk',
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
      tokenGateway: 'https://gateway.pinata.cloud/ipfs/Qma4BYAfkGv4eS8nAdLMiuhc5x786U1dJLq1tEGZdRSQfJ',
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
      tokenGateway: 'https://gateway.pinata.cloud/ipfs/QmX2r11Fd4tFGshLNqKxT8cTV5NcqrvAQRQnbLUinBrCVg',
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
