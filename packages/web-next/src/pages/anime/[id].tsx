import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next';
import Layout from '@/components/theme/app/Layout';
import ErrorPage from 'next/error';
import { AnimeOnFirestore, ErrorMessageObject } from '@sasigume/seekfiction-commons';
import IdBox from '~/components/atoms/IdBox';
import Image from 'next/image';

import { ApiType } from '@sasigume/seekfiction-commons';
import { useRouter } from 'next/router';

import { getApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { converter } from '@/lib/firestore';
import PreBox from '~/components/atoms/PreBox';

const ImgBox: React.FC<{ type: ApiType; src?: string | null; id?: number | null; slug?: string | null }> = (props) => (
  <>{props.src && <Image alt={`${props.type} image of ID:${props.id}`} src={props.src} width="300px" height="460px" />}</>
);

type Props = InferGetStaticPropsType<typeof getStaticProps>;
type Result = AnimeOnFirestore & ErrorMessageObject;

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
    const docRef = doc(db, 'algolia_anime', id).withConverter(converter);
    const docData = await getDoc(docRef);
    if (docData.data()) {
      return {
        props: {
          message,
          id,
          anime: docData.data(),
        },
      };
    } else {
      return {
        notFound: true,
        props: {
          message: 'Anime not found',
        },
      };
    }
  } else {
    return {
      notFound: true,
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
        <div>
          <h2 className="text-3xl font-bold">{props.anime.title_romaji}</h2>
        </div>
        <div
          style={{ background: props.anime.nsfw ? '#ffaaaa' : '' }}
          className={`flex gap-6 flex-col md:flex-row ${props.anime.nsfw ? 'filter blur-lg hover:filter-none' : ''}`}
        >
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
          Note that this data is retrieved from Firestore, not Algolia Index. There may be some difference between search result and the data here.
        </PreBox>
        <PreBox>
          Last update:
          {new Date(props.anime.lastUpdatedAt.seconds * 1000).toISOString()}
        </PreBox>
      </Layout>
    );
  }
  return <ErrorPage statusCode={404} title="Anime cannot fetched from database" />;
};

export default AnimePage;
