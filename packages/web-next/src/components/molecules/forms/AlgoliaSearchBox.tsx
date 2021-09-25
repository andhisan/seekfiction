import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import { algolia } from '@/lib/algolia';

const AlgoliaSearchBox: React.FC = () => {
  return (
    <InstantSearch indexName={process.env.ALGOLIA_ANIME_INDEX ?? 'anime'} searchClient={algolia}>
      <SearchBox />
      <Hits />
    </InstantSearch>
  );
};

export default AlgoliaSearchBox;
