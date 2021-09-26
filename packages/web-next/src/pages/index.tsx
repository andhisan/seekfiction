import type { NextPage } from 'next';
import Layout from '@/components/theme/app/Layout';

import { useAnimeId } from '@/lib/anime-id-hook';
import AnimeDetail from '@/components/molecules/anime/AnimeDetail';
import { useOpen } from '@/lib/open-hook';
import Logo from '@/components/atoms/Logo';

import PreBox from '@/components/atoms/PreBox';
import AlgoliaSearchBox from '@/components/molecules/algolia/SearchBox';
import { useLoading } from '@/lib/loading-hook';

const Home: NextPage = () => {
  const { animeId } = useAnimeId();
  const { open } = useOpen();
  const { loading } = useLoading();
  return (
    <Layout>
      <header className="fixed overflow-x-scroll left-0 top-0 flex px-3 py-1 gap-3 rounded-br-xl bg-white shadow-xl z-10">
        <AlgoliaSearchBox />
      </header>
      <div className="max-w-[300px] flex flex-col gap-6 text-center justify-center items-center">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="w-[300px]">
              <Logo />
            </div>
            <p>A next-generation anime search engine</p>
            <div>
              <PreBox>
                Manga search is currently unavailable. We encode anime romaji title and link data with same encoded title. If there is difference between romaji
                title, different data will be generated.
              </PreBox>
            </div>
          </>
        )}
      </div>
      {open && animeId && <AnimeDetail id={animeId} />}
    </Layout>
  );
};

export default Home;
