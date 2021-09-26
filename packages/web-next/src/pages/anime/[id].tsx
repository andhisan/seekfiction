import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next';
import Layout from '@/components/theme/app/Layout';
import ErrorPage from 'next/error';
import { AnimeOnFirestore, ErrorMessageObject } from '@sasigume/seekfiction-commons';
import IdBox from '~/components/atoms/IdBox';
import Image from 'next/image';

import { ApiType } from '@sasigume/seekfiction-commons';
import { useRouter } from 'next/router';

const ImgBox: React.FC<{ type: ApiType; src?: string | null; id?: number | null; slug?: string | null }> = (props) => (
  <>{props.src && <Image alt={`ID:${props.id}の画像`} src={props.src} width="300px" height="460px" />}</>
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
  let anime = {} as Result;
  let message = '';
  let status = 500;
  const id = context.params?.id ?? null;
  if (typeof id == 'string') {
    await fetch(process.env.FUNCTIONS + '/get-anime?id=' + id, {
      method: 'GET',
      headers: {
        Authorization: process.env.FUNCTIONS_AUTH ?? '',
      },
    })
      .then(async (res) => {
        anime = (await res.json()) ?? null;
        message = anime.message ?? null;
        status = res.status ?? null;
      })
      .catch((e) => console.error(e));

    if (status == 200) {
      return {
        props: {
          message,
          status,
          id,
          anime,
        },
      };
    } else {
      return {
        notFound: true,
        props: {},
      };
    }
  } else {
    return {
      props: {
        message: 'ワードを指定してください',
      },
    };
  }
};

const AnimePage: NextPage<Props> = (props) => {
  const router = useRouter();

  if (!props.id && router.isFallback) {
    return <Layout>Loading...</Layout>;
  }
  if (props.anime) {
    return (
      <Layout>
        <div>
          <h2 className="text-3xl font-bold">{props.anime.title_romaji}</h2>
        </div>
        <div style={{ background: props.anime.nsfw ? '#ffaaaa' : '' }} className="flex gap-6 flex-col md:flex-row">
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
        <div>Last update: {new Date(props.anime.lastUpdatedAt._seconds * 1000).toISOString()}</div>
        <pre className="p-3 rounded-lg bg-gray-300 whitespace-normal break-all">{JSON.stringify(props.anime)}</pre>
      </Layout>
    );
  }
  return <ErrorPage statusCode={404} title="Anime cannot fetched from database" />;
};

export default AnimePage;
