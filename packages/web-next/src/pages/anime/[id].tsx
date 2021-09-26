import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next';
import Layout from '@/components/theme/app/Layout';
import ErrorPage from 'next/error';
import IdBox from '@/components/atoms/IdBox';
import Image from 'next/image';

import { ApiType } from '@sasigume/seekfiction-commons';
import { useRouter } from 'next/router';

import { getApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { converter } from '@/lib/firestore';
import { decode } from 'url-safe-base64';

import PreBox from '@/components/atoms/PreBox';
import CloseTab from '@/components/atoms/CloseTab';

const ImgBox: React.FC<{ type: ApiType; src?: string | null; id?: number | null; slug?: string | null }> = (props) => (
  <>{props.src && <Image alt={`${props.type} image of ID:${props.id}`} src={props.src} width="300px" height="460px" />}</>
);

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  let message = '';

  const currentApp = getApp();
  const db = getFirestore(currentApp);
  const id = context.params?.id ?? null;

  if (typeof id == 'string') {
    const idDecoded = Buffer.from(decode(id ?? ''), 'base64').toString();
    const docRef = doc(db, 'algolia_anime', id).withConverter(converter);
    const docData = await getDoc(docRef);
    if (docData.data()) {
      return {
        props: {
          message,
          id,
          idDecoded,
          anime: docData.data(),
        },
      };
    } else {
      return {
        props: {
          id,
          idDecoded,
          message: 'Anime not found',
        },
      };
    }
  } else {
    return {
      props: {
        message: 'Specify id',
      },
    };
  }
};

const AnimePage: NextPage<Props> = (props) => {
  const router = useRouter();

  if (!props.id && router.isFallback) {
    console.info('Loading...');
    return <Layout>Loading anime data. This may take seconds.</Layout>;
  }
  if (props.anime) {
    console.info('Loaded anime data');
    console.debug(`Debug info: retrieved data from firestore: `, props.anime);

    return (
      <Layout>
        <div className="mr-auto">
          <CloseTab />
        </div>
        <div>
          <h2 className="text-3xl font-bold">{props.anime.title_romaji}</h2>
        </div>
        <div style={{ background: props.anime.nsfw ? '#ffaaaa' : '' }} className={`flex gap-6 flex-col md:flex-row ${props.anime.nsfw ? 'nsfw' : ''}`}>
          <div>
            <ImgBox type="mal" id={props.anime.mal_id} src={props.anime.mal_image} />
            <IdBox type="mal" id={props.anime.mal_id} />
          </div>
          <div>
            <ImgBox type="aniList" id={props.anime.aniList_id} src={props.anime.aniList_image} />
            <IdBox type="aniList" id={props.anime.aniList_id} />
          </div>
          <div>
            <ImgBox type="kitsu" id={props.anime.kitsu_id} src={props.anime.kitsu_image} />
            <IdBox type="kitsu" id={props.anime.kitsu_id} slug={props.anime.slug} />
          </div>
          <div>
            <ImgBox type="simkl" id={props.anime.simkl_id} src={props.anime.simkl_image} />
            <IdBox type="simkl" id={props.anime.simkl_id} />
          </div>
        </div>
        <PreBox>
          We encode anime romaji title {props.idDecoded} to {props.id}, and link data with same encoded title. If there is difference between romaji title,
          different data will be generated.
        </PreBox>
        <PreBox>
          Last update:
          {new Date(props.anime.lastUpdatedAt.seconds * 1000).toISOString()}
        </PreBox>
      </Layout>
    );
  }
  const errorMessage = `Could not get anime data. Decoded romaji title: ${props.idDecoded}`;
  return <ErrorPage statusCode={404} title={errorMessage} />;
};

export default AnimePage;
