import { useEffect, useState, useCallback } from 'react';
import { Hit } from 'react-instantsearch-core';
import { Hits, connectSearchBox, Pagination } from 'react-instantsearch-dom';
import { AnimeOnAlgolia } from '@sasigume/seekfiction-commons';
import AnimeCard from '../../molecules/anime/AnimeCard';
import { useNsfw } from '@/hooks/use-nsfw';

interface Props {
  hit: Hit<AnimeOnAlgolia>;
}

/**
 * Result component
 *
 * @see https://fwywd.com/tech/next-algolia
 */
const SearchResult = connectSearchBox(({ refine, currentRefinement }) => {
  const [isShow, setShow] = useState<boolean>(false);
  const { nsfw } = useNsfw();
  // hide display if result is blank
  useEffect(() => {
    setShow(!!currentRefinement);
  }, [currentRefinement]);

  const handleResetSearchWords = useCallback(() => {
    refine('');
  }, [refine]);

  const hitComponent = ({ hit }: Props): JSX.Element => <AnimeCard hit={hit} onClick={handleResetSearchWords} />;

  if (!isShow) return null;
  return (
    <div className={`fixed top-[80px] left-0 w-screen max-w-screen h-screen overflow-scroll px-3 pb-32 ${nsfw ? 'bg-pink-300' : 'bg-white'}`}>
      <Pagination />
      <Hits hitComponent={hitComponent} />
    </div>
  );
});

export default SearchResult;
