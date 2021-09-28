import { Hit } from 'react-instantsearch-core';
import { AnimeOnAlgolia } from '@sasigume/seekfiction-commons';
import { Highlight } from 'react-instantsearch-dom';
import ImgBox from '@/components/atoms/ImgBox';
import { useAnimeId } from '@/hooks/use-anime-id';
import { useOpen } from '@/hooks/use-open';
import ApiInfo from '@/components/atoms/ApiInfo';

interface Props {
  hit: Hit<AnimeOnAlgolia>;
  onClick: () => void;
}

/**
 * Component to show one anime result
 *
 * @param {Props} props
 * @return {*}
 */
export default function AnimeCardCompact(props: Props) {
  const { setAnimeId } = useAnimeId();
  const { open, setOpen } = useOpen();
  return (
    <>
      {/* Open detail window */}
      <a
        onClick={() => {
          setAnimeId(props.hit.objectID);
          setOpen(!open);
        }}
        className={`flex relative overflow-hidden justify-between cursor-pointer border-b-2 border-gray-400 ${props.hit.nsfw && 'nsfw'} `}
        title={props.hit.title_romaji ?? ''}
        style={{ background: props.hit.nsfw ? 'rgb(244 190 255)' : '#fff' }}
      >
        <div className="text-lg p-1 flex-grow">
          {/* Highlight search word in title */}
          <Highlight attribute="title_romaji" hit={props.hit} />
        </div>
        <div className="flex-grow-0 grid grid-cols-4">
          <ApiInfo type="mal" enabled={props.hit.mal_id !== null} />
          <ApiInfo type="aniList" enabled={props.hit.aniList_id !== null} />
          <ApiInfo type="kitsu" enabled={props.hit.kitsu_id !== null} />
          <ApiInfo type="simkl" enabled={props.hit.simkl_id !== null} />
        </div>
      </a>
    </>
  );
}
