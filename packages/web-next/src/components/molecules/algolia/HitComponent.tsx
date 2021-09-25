import { Hit } from 'react-instantsearch-core';
import Image from 'next/image';
import { urlConverter } from '~/lib/api';
import { ApiType, AnimeOnAlgolia } from '@sasigume/seekfiction-commons';
import { Highlight } from 'react-instantsearch-dom';
interface Props {
  hit: Hit<AnimeOnAlgolia>;
  onClick: () => void;
}

const IdBox: React.FC<{ type: ApiType; id?: number | null; slug?: string | null }> = (props) => {
  const url = urlConverter(props.type, props.id, props.slug);
  if ((props.id && props.type !== 'kitsu') || (props.slug && props.type == 'kitsu')) {
    return (
      <a className="p-1 flex justify-between bg-gray-800 text-white rounded-lg font-mono" target="_blank" href={url} rel="noreferrer">
        <b className="uppercase">{props.type.replace('aniList', 'al')}: </b>
        <b>{props.id}</b>
      </a>
    );
  } else {
    return <b className="p-1 uppercase bg-gray-300 text-white rounded-lg font-mono">{props.type.replace('aniList', 'al')}</b>;
  }
};

const ImgBox: React.FC<{ type: ApiType; src?: string | null; id?: number | null; slug?: string | null }> = (props) => (
  <div className="block absolute top-0 left-0">
    <div className="w-[130px] h-[200px] p-3 flex flex-col gap-3">
      {props.src && <Image alt={`ID:${props.id}の画像`} src={props.src} width="130px" height="200px" />}
    </div>
  </div>
);

export default function HitComponent(props: Props) {
  return (
    <div style={{ background: props.hit.nsfw ? '#ffaaaa' : '' }} className="rounded-xl shadow-xl relative text-left p-3 flex align-center flex-col gap-3">
      {props.hit.nsfw && <div className="absolute top-4 right-0 p-3 bg-red-500 z-50 rounded-l-xl text-white">NSFW</div>}{' '}
      <div className="">
        <div className={`h-[200px] relative ${props.hit.nsfw ? 'filter blur-sm hover:filter-none' : ''}`}>
          <ImgBox type="mal" id={props.hit.mal_id} src={props.hit.mal_image} />
          <ImgBox type="aniList" id={props.hit.aniList_id} src={props.hit.aniList_image} />
          <ImgBox type="kitsu" id={props.hit.kitsu_id} src={props.hit.kitsu_image} />
          <ImgBox type="simkl" id={props.hit.simkl_id} src={props.hit.simkl_image} />
        </div>
        <div className="text-lg">
          <Highlight attribute="title_romaji" hit={props.hit} />
        </div>
      </div>
      <div className="grid gap-1 grid-cols-2 grid-rows-2">
        <IdBox type="mal" id={props.hit.mal_id} />
        <IdBox type="aniList" id={props.hit.aniList_id} />
        <IdBox type="kitsu" id={props.hit.kitsu_id} slug={props.hit.slug} />
        <IdBox type="simkl" id={props.hit.simkl_id} />
      </div>
    </div>
  );
}
