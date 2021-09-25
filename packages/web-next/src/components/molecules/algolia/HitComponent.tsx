import { Hit } from 'react-instantsearch-core';
interface AnimeForFirestore {
  mal_id?: number | null;
  aniList_id?: number | null;
  kitsu_id?: number | null;
  simkl_id?: number | null;
  title_romaji: string | null;
  mal_image?: string | null;
  aniList_image?: string | null;
  kitsu_image?: string | null;
  simkl_image?: string | null;
}

interface AnimeOnAlgolia extends AnimeForFirestore {
  objectID: string;
}
interface Props {
  hit: Hit<AnimeOnAlgolia>;
}

export default function HitComponent(props: Props) {
  return <div className="p-3">{props.hit.title_romaji}</div>;
}
