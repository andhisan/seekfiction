import { InstantSearch, SearchBox, Hits, PoweredBy } from 'react-instantsearch-dom';
import { algolia } from '@/lib/algolia';
import HitComponent from './HitComponent';

export default function AlgoliaSearchBox() {
  return (
    <InstantSearch indexName={process.env.ALGOLIA_ANIME_INDEX ?? 'anime'} searchClient={algolia}>
      <SearchBox />
      <Hits hitComponent={HitComponent} />
      <PoweredBy />
    </InstantSearch>
  );
}
