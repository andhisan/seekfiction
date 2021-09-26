import '../styles/globals.css';
import 'windi.css';
import initApp from '@/lib/firebase';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  initApp();
  return <Component {...pageProps} />;
}
export default MyApp;
