import type { NextPage } from 'next';
import Layout from '@/components/theme/app/Layout';
import Link from 'next/link';
import Logo from '@/components/atoms/Logo';
const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-3 w-screen py-64 text-center items-center justify-center">
        <Link passHref href="/">
          <Logo />
        </Link>
        <p>A next-generation anime/manga database</p>
      </div>
    </Layout>
  );
};

export default Home;
