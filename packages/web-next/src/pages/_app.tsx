import '../styles/globals.css';
import 'windi.css';
import initApp from '@/lib/firebase';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { useNsfw } from '~/lib/nsfw-hook';
function MyApp({ Component, pageProps }: AppProps) {
  initApp();

  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
export default MyApp;
