import Image from 'next/image';

import { AnimeRetrievedFromFirestoreClient, ApiType } from '@sasigume/seekfiction-commons';

import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { converter } from '@/lib/firestore';
import { decode } from 'url-safe-base64';

import { useOpen } from '@/lib/open-hook';
import PreBox from '@/components/atoms/PreBox';
import initApp from '@/lib/firebase';
import useSWR from 'swr';
import Close from '@/components/atoms/Close';
import ImgData from '@/components/atoms/ImgData';

type Result = {
  anime?: AnimeRetrievedFromFirestoreClient | null;
  message?: string;
  id?: string;
  idDecoded?: string;
};

export const getAnime = async (id: string): Promise<Result> => {
  let message = 'Loading...';
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
  const { setOpen } = useOpen();
  const handleClose = () => {
    setOpen(false);
  };
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <>
      <div className="fixed top-3 z-50 bg-[#fff] p-3 pb-32 lg:max-w-lg rounded-xl shadow-xl m-4 h-screen overflow-y-scroll flex flex-col gap-6">
        <Close />
        {data && data.anime ? (
          <>
            <PreBox>
              Last update:
              {new Date(data.anime.lastUpdatedAt.seconds * 1000).toISOString()}
            </PreBox>
            <div>
              <h2 className="text-3xl font-bold">{data.anime.title_romaji}</h2>
            </div>
            <p>NSFW image is hidden by default.</p>
            <div className={`flex gap-6 flex-wrap ${data.anime.nsfw ? 'nsfw' : ''}`}>
              <ImgData type="mal" id={data.anime.mal_id} src={data.anime.mal_image} />
              <ImgData type="aniList" id={data.anime.aniList_id} src={data.anime.aniList_image} />
              <ImgData type="kitsu" id={data.anime.kitsu_id} src={data.anime.kitsu_image} slug={data.anime.slug} />
              <ImgData type="simkl" id={data.anime.simkl_id} src={data.anime.simkl_image} />
            </div>
          </>
        ) : (
          <div>{data?.message}</div>
        )}
      </div>
      <div onClick={handleClose} className="fixed z-20 bg-[rgba(0,0,0,0.5)] top-0 left-0 w-screen h-screen"></div>
    </>
  );
};

export default AnimeDetail;
