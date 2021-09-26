import IdBox from '@/components/atoms/IdBox';
import Image from 'next/image';

import { AnimeRetrievedFromFirestoreClient, ApiType } from '@sasigume/seekfiction-commons';

import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { converter } from '@/lib/firestore';
import { decode } from 'url-safe-base64';

import PreBox from '@/components/atoms/PreBox';
import Close from '@/components/atoms/Close';
import initApp from '@/lib/firebase';
import useSWR from 'swr';

const ImgBox: React.FC<{ type: ApiType; src?: string | null; id?: number | null; slug?: string | null }> = (data) => (
  <>{data.src && <Image alt={`${data.type} image of ID:${data.id}`} src={data.src} width="300px" height="460px" />}</>
);

type Result = {
  anime?: AnimeRetrievedFromFirestoreClient | null;
  message?: string;
  id?: string;
  idDecoded?: string;
};

export const getAnime = async (id: string): Promise<Result> => {
  let message = '';
  const app = initApp();
  const db = getFirestore(app);

  const idDecoded = Buffer.from(decode(id ?? ''), 'base64').toString();
  const docRef = doc(db, 'algolia_anime', id).withConverter(converter);
  const docData = await getDoc(docRef);
  if (docData.data()) {
    return {
      message,
      id,
      idDecoded,
      anime: docData.data(),
    };
  } else {
    return {
      id,
      idDecoded,
      message: 'Anime not found',
    };
  }
};

interface Props {
  id: string;
}
const AnimeDetail: React.FC<Props> = (props) => {
  const { data, error } = useSWR(props.id, (id) => getAnime(id));

  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div className="fixed z-30 top-16 left-0 w-screen bg-gray-800 h-screen flex justify-center">
      <div className="max-w-[300px] md:max-w-sm lg:max-w-md bg-light-50 p-3 rounded-xl mx-auto">
        <Close />
        {data && data.anime ? (
          <div>
            <div>
              <h2 className="text-3xl font-bold">{data.anime.title_romaji}</h2>
            </div>
            <div style={{ background: data.anime.nsfw ? '#ffaaaa' : '' }} className={`flex gap-6 flex-col md:flex-row ${data.anime.nsfw ? 'nsfw' : ''}`}>
              <div>
                <ImgBox type="mal" id={data.anime.mal_id} src={data.anime.mal_image} />
                <IdBox type="mal" id={data.anime.mal_id} />
              </div>
              <div>
                <ImgBox type="aniList" id={data.anime.aniList_id} src={data.anime.aniList_image} />
                <IdBox type="aniList" id={data.anime.aniList_id} />
              </div>
              <div>
                <ImgBox type="kitsu" id={data.anime.kitsu_id} src={data.anime.kitsu_image} />
                <IdBox type="kitsu" id={data.anime.kitsu_id} slug={data.anime.slug} />
              </div>
              <div>
                <ImgBox type="simkl" id={data.anime.simkl_id} src={data.anime.simkl_image} />
                <IdBox type="simkl" id={data.anime.simkl_id} />
              </div>
            </div>
            <PreBox>
              We encode anime romaji title {data.idDecoded} to {data.id}, and link data with same encoded title. If there is difference between romaji title,
              different data will be generated.
            </PreBox>
            <PreBox>
              Last update:
              {new Date(data.anime.lastUpdatedAt.seconds * 1000).toISOString()}
            </PreBox>
          </div>
        ) : (
          <div>{data?.message ?? 'Unknown error'}</div>
        )}
      </div>
    </div>
  );
};

export default AnimeDetail;
