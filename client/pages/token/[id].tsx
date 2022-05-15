// react/next imports
import type { NextPage } from 'next';

// components
import Meta from '../../components/utils/Meta';
import Nav from '../../components/Navbar';
import TokenInfo from '../../components/TokenInfo';
import TokenListing from '../../components/TokenListing';

import { useEffect, useState } from 'react';

// styles

// Web3
import Loader from '../../components/Loader';

// Globals declarations
const metaData = {
    title: "Token",
    description: "Info Page of NFTs for crypto chasm app"
};

const Token: NextPage = () => {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowLoader(false);
        }, 3500);
    }, []);

    return (
        <>
            <Meta {...metaData} />
            { showLoader && <Loader />}
            { !showLoader && (
                <>
                    <main>
                        <Nav pageName="Token" />
                        <TokenInfo />
                        <TokenListing />
                    </main>
                    <footer>&copy; Crypto Chasm. All right reserved</footer>
                </>
            )}
        </>
    )
}

export default Token