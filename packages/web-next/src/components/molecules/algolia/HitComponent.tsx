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
        style={{ background: props.hit.nsfw ? '#ffaaaa' : '' }}
        className="h-full bg-light-50 rounded-xl cursor-pointer relative w-[280px] p-3 flex align-center flex-col gap-3 shadow-xl"
        title={props.hit.title_romaji ?? ''}
      >
        {/* Set size to place things correctly */}
        <div className="w-[140px] h-[200px]">
          {/* Left */}
          <div className={`relative p-3 ${props.hit.nsfw && 'nsfw'}`}>
            <ImgBox type="mal" id={props.hit.mal_id} src={props.hit.mal_image} />
            <ImgBox type="aniList" id={props.hit.aniList_id} src={props.hit.aniList_image} />
            <ImgBox type="kitsu" id={props.hit.kitsu_id} src={props.hit.kitsu_image} />
            <ImgBox type="simkl" id={props.hit.simkl_id} src={props.hit.simkl_image} />
          </div>
        </div>

        <div className="text-lg">
          <Highlight attribute="title_romaji" hit={props.hit} />
        </div>
      </a>
    </>
  );
}
