import type { NextPage } from 'next';
import Layout from '@/components/theme/app/Layout';

import { useAnimeId } from '@/lib/anime-id-hook';
import AnimeDetail from '@/components/molecules/anime/AnimeDetail';
import { useOpen } from '@/lib/open-hook';
import Logo from '@/components/atoms/Logo';

import AlgoliaSearchBox from '@/components/molecules/algolia/SearchBox';
import { useLoading } from '@/lib/loading-hook';

import StatsBox from '@/components/molecules/meili/StatsBox';
import { useNsfw } from '@/lib/nsfw-hook';

const Home: NextPage = () => {
  const { animeId } = useAnimeId();
  const { open } = useOpen();
  const { loading } = useLoading();
  const { nsfw } = useNsfw();
  return (
    <Layout>
      {/* Search box must not be placed on Layout component */}
      <header className={`fixed left-0 top-0 flex px-3 py-1 w-screen shadow-xl z-10 ${nsfw ? 'bg-pink-300' : 'bg-white '}`}>
        <AlgoliaSearchBox />
      </header>
      <div className="flex flex-col gap-6 text-center justify-center items-center">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="w-[300px]">
              <Logo />
            </div>
            <p>A next-generation anime/manga database</p>
            <StatsBox indexName={process.env.MEILI_ANIME_INDEX ?? 'anime'} />
            <p>
              Manga search is currently unavailable. We encode anime romaji title and link data with same encoded title. If there is difference between romaji
              title, different data will be generated.
            </p>
          </>
        )}
      </div>
      {/* Detail must not be placed on layout component */}
      {open && animeId && <AnimeDetail id={animeId} />}
    </Layout>
  );
};

export default Home;
