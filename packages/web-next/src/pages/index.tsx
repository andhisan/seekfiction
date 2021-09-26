import type { NextPage } from 'next';
import Layout from '@/components/theme/app/Layout';

import { useAnimeId } from '@/lib/anime-id-hook';
import AnimeDetail from '@/components/molecules/anime/AnimeDetail';
import { useOpen } from '@/lib/open-hook';
import Link from 'next/link';
import Logo from '@/components/atoms/Logo';
import Version from '@/components/atoms/Version';
import PreBox from '@/components/atoms/PreBox';

const Home: NextPage = () => {
  const { animeId } = useAnimeId();
  const { open } = useOpen();
  return (
    <Layout>
      <div>
        <div>
          <Link passHref href="/">
            <div className="w-[150px]">
              <Logo />
            </div>
          </Link>
          <p>A next-generation anime search engine</p>
          <PreBox>Manga search is currently unavailable.</PreBox>
          <Version />
        </div>
      </div>
      {open && <div className="fixed right-0 w-1/2 p-3">{animeId ? <AnimeDetail id={animeId} /> : <div>Select anime to view details</div>}</div>}
    </Layout>
  );
};

export default Home;
