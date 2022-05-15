// next/react imports
import Link from 'next/link';
import { ReactComponentElement, useState } from 'react';

// contexts

// components
import Button from '../components/Button';

// vendor imports

// styles
import styles from "../styles/components/listing.module.scss"

// mock data
import MockData from './mocks/MockToken.json'
const tokendata = MockData

// declarations
const options: any = {
    offers: {
        initial: 0,
        final: 0,
        offer: 0,
        expiration: '',
        status: ''
    },
    listing: {
        price: 0,
        status: '',
        lister: '',
    },
    history: {
        event: '',
        to: '',
        from: '',
        price: 0,
        txn: '' 
    }
}

function TokenOption({optionData, option} : {optionData: any, option: string}) {
    return (
        <div className={styles.list}>
            <div className={styles.fields}>
                {Object.keys(options[option]).map((key: string) => (
                    <h2>{key}</h2>
                ))}
            </div>
            {optionData.map((entry: any) => {
                return (
                    <div className={styles.entry}>
                        {Object.keys(options[option]).map((key) => {
                            if(entry[key]) {
                                if(key == "txn") {
                                    return (
                                        <a href="#">{`${entry[key].slice(0,5)}...${entry[key].slice(-2)}`}</a>
                                    );
                                }
                                return (
                                    <h2>{entry[key]}</h2>
                                );
                            }
                            return (
                                <h2>--</h2>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

function TokenListing() {
    const [tokenData, setTokenData] = useState<any>(tokendata);
    const [option, setOption] = useState('listing');

    const options = ['listing', 'offers', 'history'];
    
    return (
        <div className={styles.listing}>
            <div className={styles.header}>
                {options.map((el) => {
                    if(option == el) {
                        return (
                            <button 
                            type="button"
                            className={`${styles.btn} ${styles.active}`} 
                            onClick={() => {setOption(el);}}
                            >{el.charAt(0).toUpperCase() + el.slice(1)}</button>
                        )
                    }
                    return (
                        <button 
                        type="button"
                        className={styles.btn}
                        onClick={() => {setOption(el);}}
                        >{el.charAt(0).toUpperCase() + el.slice(1)}</button>
                    );
                })}
            </div>
            <TokenOption optionData={tokenData[option]} option={option} />
        </div>
    );
}

export default TokenListing;