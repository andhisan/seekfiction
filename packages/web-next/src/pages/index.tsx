import type { NextPage } from 'next';
import Layout from '@/components/theme/app/Layout';
import Link from 'next/link';
import Logo from '@/components/atoms/Logo';
import AlgoliaSearchBox from '@/components/molecules/algolia/SearchBox';
const Home: NextPage = () => {
  return (
    <Layout>
      <div>
        <Link passHref href="/">
          <Logo />
        </Link>
        <p>A next-generation anime search engine</p>
      </div>
      <AlgoliaSearchBox />
    </Layout>
  );
};

export default Home;
