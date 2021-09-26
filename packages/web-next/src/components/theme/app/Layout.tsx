import Head from 'next/head';
import Version from '@/components/atoms/Version';
import Footer from './Footer';
import SwitchNsfwStyle from '~/components/molecules/nsfw/SwitchNsfwStyle';
import { useNsfw } from '~/lib/nsfw-hook';

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
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex flex-col gap-3 px-6 mx-auto w-screen min-h-screen py-8 text-center items-center">{children}</div>
        <Footer />
      </div>
      <Version />
      <SwitchNsfwStyle />
      {!nsfw && <div dangerouslySetInnerHTML={{ __html: `<style>.nsfw{opacity:0;}</style>` }} />}
    </>
  );
};
export default Layout;
