import type { InferGetServerSidePropsType, InferGetStaticPropsType, NextPage } from 'next';
import Layout from '@/components/theme/app/Layout';

import { useAnimeId } from '@/lib/anime-id-hook';
import AnimeDetail from '@/components/molecules/anime/AnimeDetail';
import { useOpen } from '@/lib/open-hook';
import Logo from '@/components/atoms/Logo';

import AlgoliaSearchBox from '@/components/molecules/algolia/SearchBox';
import { useLoading } from '@/lib/loading-hook';
import { getIndexCount } from '@/lib/algolia';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = async () => {
  let indexCount: number | undefined;
  try {
    indexCount = await getIndexCount(process.env.ALGOLIA_ANIME_INDEX ?? 'anime');
  } catch (e) {
    console.error(e);
  }
  return {
    props: {
      indexCount,
    },
  };
};

const Home: NextPage<Props> = (props) => {
  const { animeId } = useAnimeId();
  const { open } = useOpen();
  const { loading } = useLoading();
  return (
    <Layout>
      <header className="fixed left-0 top-0 flex px-3 py-1 w-screen bg-white shadow-xl z-10">
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
            {props.indexCount && (
              <p className="font-bold text-xl">
                Anime count:{` `}
                <b className="text-2xl">{props.indexCount}</b>
              </p>
            )}
            <p>
              Manga search is currently unavailable. We encode anime romaji title and link data with same encoded title. If there is difference between romaji
              title, different data will be generated.
            </p>
          </>
        )}
      </div>
      {open && animeId && <AnimeDetail id={animeId} />}
    </Layout>
  );
};

export default Home;
