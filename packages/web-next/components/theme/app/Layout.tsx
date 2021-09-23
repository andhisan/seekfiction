import Head from 'next/head';
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
      <div className="flex flex-col h-screen">
        {children}
        <Footer />
      </div>
    </>
  );
};
export default Layout;
