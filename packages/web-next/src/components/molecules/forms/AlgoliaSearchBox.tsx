import { InstantSearch, SearchBox, Hits, PoweredBy } from 'react-instantsearch-dom';
import { algolia } from '@/lib/algolia';

const AlgoliaSearchBox: React.FC = () => {
  return (
    <InstantSearch indexName={process.env.ALGOLIA_ANIME_INDEX ?? 'anime'} searchClient={algolia}>
      <SearchBox />
      <Hits />
      <PoweredBy />
    </InstantSearch>
  );
};

export default AlgoliaSearchBox;
