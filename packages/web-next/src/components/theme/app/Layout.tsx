import Head from 'next/head';

import Footer from './Footer';
import { useNsfw } from '@/lib/nsfw-hook';
import SwitchNsfwStyle from '@/components/molecules/nsfw/SwitchNsfwStyle';
import AlgoliaSearchBox from '@/components/molecules/algolia/SearchBox';
import Logo from '@/components/atoms/Logo';

const Layout: React.FC = ({ children }) => {
  const { nsfw } = useNsfw();
  return (
    <>
      <Head>
        <title>seekfiction</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A next-generation anime/manga database" />
        <meta name="og:image" content="https://sf.sasigu.me/ogp-1200x630.png" />
        <meta name="twitter:image" content="https://sf.sasigu.me/ogp-1200x630.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="format-detection" content="telephone=no" />
        <meta property="og:site_name" content="seekfiction" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <header className="fixed left-0 top-0 flex px-3 py-3 h-[86px] gap-3 items-center w-screen shadow-xl z-10">
          <div className="w-[150px]">
            <Logo />
          </div>
          <AlgoliaSearchBox />
        </header>
        <main className="pt-64 pb-32 flex-grow flex flex-col gap-3 px-6 w-screen items-center">{children}</main>
        <footer className="w-screen text-center border-t-8 text-white bg-gray-800 flex flex-col justify-center gap-3 py-3" aria-label="footerHeading">
          <Footer />
        </footer>
      </div>
      <div className="fixed z-50 bottom-0">
        <SwitchNsfwStyle />
      </div>

      {!nsfw && <div dangerouslySetInnerHTML={{ __html: `<style>.nsfw img{filter:blur(20px)}</style>` }} />}
    </>
  );
};
export default Layout;
