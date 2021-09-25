import SearchResult from './SearchResult';
import { InstantSearch, SearchBox, Configure } from 'react-instantsearch-dom';
import { algolia } from '@/lib/algolia';

export default function AlgoliaSearchBox(): JSX.Element {
  return (
    <div>
      <InstantSearch indexName={process.env.ALGOLIA_ANIME_INDEX ?? 'anime'} searchClient={algolia}>
        <Configure hitsPerPage={5} />

        <SearchBox />

        <SearchResult />
      </InstantSearch>
    </div>
  );
}
