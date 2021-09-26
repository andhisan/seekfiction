import { Hit } from 'react-instantsearch-core';
import { AnimeOnAlgolia } from '@sasigume/seekfiction-commons';
import { Highlight } from 'react-instantsearch-dom';
import ImgBox from '@/components/atoms/ImgBox';
import IdBox from '@/components/atoms/IdBox';
import { useAnimeId } from '@/lib/anime-id-hook';
import { useOpen } from '@/lib/open-hook';

interface Props {
  hit: Hit<AnimeOnAlgolia>;
  onClick: () => void;
}

export default function HitComponent(props: Props) {
  const { setAnimeId } = useAnimeId();
  const { open, setOpen } = useOpen();
  return (
    <>
      {/* Open in new tab to keep search result */}
      <a
        onClick={() => {
          setAnimeId(props.hit.objectID);
          setOpen(!open);
        }}
        className="block overflow-hidden relative h-full bg-black rounded-xl cursor-pointer w-[200px] h-[300px] shadow-xl"
        title={props.hit.title_romaji ?? ''}
      >
        <div className={`relative ${props.hit.nsfw && 'nsfw'}`}>
          <ImgBox type="mal" id={props.hit.mal_id} src={props.hit.mal_image} />
          <ImgBox type="aniList" id={props.hit.aniList_id} src={props.hit.aniList_image} />
          <ImgBox type="kitsu" id={props.hit.kitsu_id} src={props.hit.kitsu_image} />
          <ImgBox type="simkl" id={props.hit.simkl_id} src={props.hit.simkl_image} />
        </div>

        <div style={{ background: props.hit.nsfw ? '#aa3344' : '#000' }} className="absolute z-10 text-lg bottom-0 bg-black text-white w-full p-3">
          <Highlight attribute="title_romaji" hit={props.hit} />
        </div>
      </a>
    </>
  );
}
