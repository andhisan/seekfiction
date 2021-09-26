import { Hit } from 'react-instantsearch-core';
import { AnimeOnAlgolia } from '@sasigume/seekfiction-commons';
import { Highlight } from 'react-instantsearch-dom';
import ImgBox from '@/components/atoms/ImgBox';
import IdBox from '@/components/atoms/IdBox';
interface Props {
  hit: Hit<AnimeOnAlgolia>;
  onClick: () => void;
}

export default function HitComponent(props: Props) {
  return (
    <div>
      {props.hit.nsfw && <div className="absolute top-4 right-0 p-3 bg-red-500 z-50 rounded-l-xl text-white">NSFW</div>}

      {/* Open in new tab to keep search result */}
      <a
        target="_blank"
        href={`/anime/${props.hit.objectID}`}
        rel="noreferrer"
        style={{ background: props.hit.nsfw ? '#ffaaaa' : '' }}
        className="relative text-left p-3 flex align-center flex-col gap-3"
        title={props.hit.title_romaji ?? ''}
      >
        <div style={{ background: props.hit.nsfw ? '#ffaaaa' : '' }} className="flex">
          {/* Set size to place things correctly */}
          <div className="w-[140px] h-[200px]">
            {/* Left */}
            <div className={`relative p-3 ${props.hit.nsfw ? 'filter blur-sm hover:filter-none' : ''}`}>
              <ImgBox type="mal" id={props.hit.mal_id} src={props.hit.mal_image} />
              <ImgBox type="aniList" id={props.hit.aniList_id} src={props.hit.aniList_image} />
              <ImgBox type="kitsu" id={props.hit.kitsu_id} src={props.hit.kitsu_image} />
              <ImgBox type="simkl" id={props.hit.simkl_id} src={props.hit.simkl_image} />
            </div>
          </div>
          <div className="flex-grow rounded-xl flex flex-col gap-1">
            {/* Right */}
            <IdBox type="mal" id={props.hit.mal_id} />
            <IdBox type="aniList" id={props.hit.aniList_id} />
            <IdBox type="kitsu" id={props.hit.kitsu_id} slug={props.hit.slug} />
            <IdBox type="simkl" id={props.hit.simkl_id} />
          </div>
        </div>
        <div className="text-lg">
          <Highlight attribute="title_romaji" hit={props.hit} />
        </div>
      </a>
    </div>
  );
}
