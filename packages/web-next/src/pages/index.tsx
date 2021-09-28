import type { NextPage } from 'next';
import Layout from '@/components/app/Layout';

import Logo from '@/components/atoms/Logo';
import StatsBox from '@/components/molecules/meili/StatsBox';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-6 text-center justify-center items-center">
        <div className="w-[300px]">
          <Logo />
        </div>
        <p>Cross-API anime search</p>
        <StatsBox indexName={process.env.MEILI_ANIME_INDEX ?? 'anime'} />
        <p>
          Manga search is currently unavailable. We encode anime romaji title and link data with same encoded title. If there is difference between romaji
          title, different data will be generated.
        </p>
        <p>
          <b>Type something and press enter to update anime database!</b>
        </p>
      </div>
    </Layout>
  );
};

export default Home;
