import Head from 'next/head';
import Version from '@/components/atoms/Version';
import Footer from './Footer';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>seekfiction</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A next-generation anime/manga database" />
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex flex-col gap-3 px-6 mx-auto w-screen min-h-screen py-8 text-center items-center">{children}</div>
        <Footer />
      </div>
      <Version />
    </>
  );
};
export default Layout;
