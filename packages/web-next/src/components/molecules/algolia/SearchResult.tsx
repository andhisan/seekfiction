import { useEffect, useState, useCallback } from 'react';
import { Hit } from 'react-instantsearch-core';
import { Hits, connectSearchBox, Pagination, PoweredBy } from 'react-instantsearch-dom';
import { AnimeOnAlgolia } from '@sasigume/seekfiction-commons';
import HitComponent from './HitComponent';

interface Props {
  hit: Hit<AnimeOnAlgolia>;
}

// https://fwywd.com/tech/next-algolia
const SearchResult = connectSearchBox(({ refine, currentRefinement }) => {
  const [isShow, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(!!currentRefinement);
  }, [currentRefinement]);

  const handleResetSearchWords = useCallback(() => {
    refine('');
  }, [refine]);

  const hitComponent = ({ hit }: Props): JSX.Element => <HitComponent hit={hit} onClick={handleResetSearchWords} />;

  if (!isShow) return null;
  return (
    <div className="max-w-screen h-screen overflow-scroll pb-32">
      <PoweredBy />
      <Pagination />
      <Hits hitComponent={hitComponent} />
    </div>
  );
});

export default SearchResult;
