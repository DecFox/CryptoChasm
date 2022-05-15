// next/react imports
import Link from 'next/link';
import { useState } from 'react';

// contexts

// components
import Button from '../components/Button';

// vendor imports

// styles
import styles from "../styles/components/tokeninfo.module.scss"

// mock data
import MockData from "./mocks/MockToken.json"
const tokendata = MockData;

function TokenData({name, owner, minter, bid, ownerAddress, bidAddress} 
    : {name: string, owner: string, minter: string, bid: number, ownerAddress: string, bidAddress: string}) {
    return (
        <div>
            <h1>{name}</h1>
            <div className='data'>
                <h3>Minter</h3>
                <h2>{minter}</h2>

                <h3>Owner</h3>
                <h2>{owner} <a href="#">( {ownerAddress.slice(0,6)}... )</a></h2>

                <h3>Last Bid</h3>
                <h2>
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

                    {bid} 
                    <span>( $890.23 )</span>
                </h2>

                <h3>Next Minimum Bid</h3>
                <h2 className={styles.curr}>
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

                    {(bid*(1.1)).toFixed(2)} 
                    <span>( $950.23 )</span>
                </h2>
            </div>
            <Button type="button" modifier="ghost" href="">
                Place Bid
            </Button>
        </div>
    );
}

function TokenInfo() {
    const [tokenData, setTokenData] = useState(tokendata);

    return (
        <div className={`row ${styles.tokeninfo}`}>
            <div className={styles.art}>
                <figure>
                    <img 
                    src={tokenData.link}
                    alt="Latest Nft Image" 
                    />
                    <figcaption>
                        <a href='#'>{tokenData.txnAddress.slice(0,6)}...{tokenData.txnAddress.slice(-3)}</a>
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
                    </figcaption>
                </figure>
                <div className={styles.description}>
                    <h2>Description</h2>
                    <p>{tokenData.description}</p>
                </div>
            </div>
            <div className={styles.info}>
                <TokenData {...tokenData} />
            </div>
        </div>
    );
}

export default TokenInfo;