import type { NextPage } from 'next';
import Layout from '@/components/theme/app/Layout';

import { useAnimeId } from '@/lib/anime-id-hook';
import AnimeDetail from '@/components/molecules/anime/AnimeDetail';
import { useOpen } from '@/lib/open-hook';
import Logo from '@/components/atoms/Logo';
import Version from '@/components/atoms/Version';
import PreBox from '@/components/atoms/PreBox';
import AlgoliaSearchBox from '@/components/molecules/algolia/SearchBox';
import { useLoading } from '@/lib/loading-hook';

const Home: NextPage = () => {
  const { animeId } = useAnimeId();
  const { open } = useOpen();
  const { loading } = useLoading();
  return (
    <Layout>
      <header className="fixed overflow-x-scroll left-0 top-0 flex px-3 py-1 gap-3 bg-white shadow-xl z-10">
        <AlgoliaSearchBox />
      </header>
      <>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div>
              <div className="w-[150px]">
                <Logo />
              </div>
              <p>A next-generation anime search engine</p>
              <PreBox>Manga search is currently unavailable.</PreBox>
              <PreBox>
                We encode anime romaji title and link data with same encoded title. If there is difference between romaji title, different data will be
                generated.
              </PreBox>{' '}
              <Version />
            </div>
          </div>
        )}
      </>
      {open && animeId && <AnimeDetail id={animeId} />}
    </Layout>
  );
};

export default Home;
