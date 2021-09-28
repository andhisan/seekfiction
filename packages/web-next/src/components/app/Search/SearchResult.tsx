import { useEffect, useState, useCallback } from 'react';
import { Hit } from 'react-instantsearch-core';
import { Hits, connectSearchBox, Pagination } from 'react-instantsearch-dom';
import { AnimeOnMeili } from '@sasigume/seekfiction-commons';
import AnimeCard from '../../molecules/anime/AnimeCard';
import { useCompact } from '@/hooks/use-compact';
import AnimeCardCompact from '@/components/molecules/anime/AnimeCardCompact';

interface Props {
  hit: Hit<AnimeOnMeili>;
}

/**
 * Result component
 *
 * @see https://fwywd.com/tech/next-algolia
 */
const SearchResult = connectSearchBox(({ refine, currentRefinement }) => {
  const [isShow, setShow] = useState<boolean>(false);
  const { compact } = useCompact();
  // hide display if result is blank
  useEffect(() => {
    setShow(!!currentRefinement);
  }, [currentRefinement]);

  const handleResetSearchWords = useCallback(() => {
    refine('');
  }, [refine]);

  const hitComponent = ({ hit }: Props): JSX.Element => <AnimeCard hit={hit} onClick={handleResetSearchWords} />;
  const hitComponentCompact = ({ hit }: Props): JSX.Element => <AnimeCardCompact hit={hit} onClick={handleResetSearchWords} />;

  if (!isShow) return null;
  return (
    <div className={`fixed top-[80px] left-0 w-screen max-w-screen h-screen overflow-scroll px-3 pb-32 bg-white ${compact && 'seekfiction__compact'}`}>
      <Pagination />
      <Hits hitComponent={compact ? hitComponentCompact : hitComponent} />
    </div>
  );
});

export default SearchResult;
