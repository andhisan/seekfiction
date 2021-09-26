import Head from 'next/head';

import Footer from './Footer';
import { useNsfw } from '@/lib/nsfw-hook';
import Header from './Header';

const Layout: React.FC = ({ children }) => {
  const { nsfw } = useNsfw();
  return (
    <>
      <Head>
        <title>seekfiction</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A next-generation anime search engine" />
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <div>
        <header className="w-screen fixed left-0 top-0 flex px-3 py-1 gap-3 bg-white shadow-xl z-10">
          <Header />
        </header>
        <main className="py-32 flex-grow flex flex-col gap-3 px-6 w-screen min-h-screen items-center">{children}</main>
        <footer
          className="w-screen fixed left-0 bottom-0 text-center border-t-8 border-primary text-white bg-gray-800 flex flex-col justify-center gap-6 py-2 z-30"
          aria-label="footerHeading"
        >
          <Footer />
        </footer>
      </div>

      {!nsfw && <div dangerouslySetInnerHTML={{ __html: `<style>.nsfw{opacity:0;}</style>` }} />}
    </>
  );
};
export default Layout;
