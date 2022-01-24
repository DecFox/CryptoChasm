import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import UserContextProvider, { UserContext } from '../contexts/UserContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}

export default MyApp;
