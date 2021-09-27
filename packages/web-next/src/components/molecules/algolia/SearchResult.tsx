import { useEffect, useState, useCallback } from 'react';
import { Hit } from 'react-instantsearch-core';
import { Hits, connectSearchBox, Pagination, PoweredBy } from 'react-instantsearch-dom';
import { AnimeOnAlgolia } from '@sasigume/seekfiction-commons';
import HitComponent from './HitComponent';

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

  // hide display if result is blank
  useEffect(() => {
    setShow(!!currentRefinement);
  }, [currentRefinement]);

  const handleResetSearchWords = useCallback(() => {
    refine('');
  }, [refine]);

  const hitComponent = ({ hit }: Props): JSX.Element => <HitComponent hit={hit} onClick={handleResetSearchWords} />;

  if (!isShow) return null;
  return (
    <div className="w-screen max-w-screen h-screen overflow-scroll pb-32">
      <div className="inline-block">
        <PoweredBy />
      </div>
      <Pagination />
      <Hits hitComponent={hitComponent} />
    </div>
  );
});

export default SearchResult;
