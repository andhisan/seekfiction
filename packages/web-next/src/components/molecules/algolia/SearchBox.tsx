import SearchResult from './SearchResult';
import { InstantSearch, SearchBox, Configure, PoweredBy } from 'react-instantsearch-dom';
import { algolia } from '@/lib/algolia';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function AlgoliaSearchBox() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [updating, setUpdating] = useState(false);
  return (
    <div>
      <InstantSearch indexName={process.env.ALGOLIA_ANIME_INDEX ?? 'anime'} searchClient={algolia}>
        <Configure hitsPerPage={5} />

        {updating ? (
          <b>Searching for {input}...</b>
        ) : (
          <>
            <SearchBox
              onChange={(e) => {
                setInput(e.currentTarget.value);
              }}
              onSubmit={(e) => {
                e.preventDefault();
                setUpdating(true);
                if (input.length > 0) {
                  router.push(`/update/?q=${input}`, '/update');
                }
              }}
            />

            <SearchResult />
            {input.length > 0 && (
              <p>
                Press enter to search more result for <b>{input}</b>
              </p>
            )}
          </>
        )}
        <div className="my-3 text-left p-3 rounded-xl bg-gray-100">
          <PoweredBy />
        </div>
      </InstantSearch>
    </div>
  );
}
