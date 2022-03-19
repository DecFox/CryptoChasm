import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

// global declarations
declare let window: any;

const useCheckWeb3Support = () => {
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    async function fetchAccount() {
      if (typeof window.ethereum !== 'undefined') {
        const [account] = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        dispatch({
          type: 'Set_Wallet_Address',
          user: { walletAddress: account },
        });

        fetch(`http://localhost:5050/user/init/${account}`)
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
          })
          .catch((err) => { console.log(err); })

        window.ethereum.on('accountsChanged', function (accounts: string[]) {
          // Time to reload your interface with accounts[0]!

          dispatch({
            type: 'Set_Wallet_Address',
            user: { walletAddress: accounts[0] },
          });

          fetch(`http://localhost:5050/user/init/${accounts[0]}`)
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
          })
          .catch((err) => { console.log(err); })

          console.log(accounts[0]);
        });
      } else {
        console.log('Please download metamask');
        dispatch({
          type: 'Set_Wallet_Address',
          user: { walletAddress: '' },
        });
      }
    }

    fetchAccount();
  }, []);
};

export default useCheckWeb3Support;
