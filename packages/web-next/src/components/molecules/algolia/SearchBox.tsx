import SearchResult from './SearchResult';
import { InstantSearch, SearchBox, Configure } from 'react-instantsearch-dom';
import { algolia } from '@/lib/algolia';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useLoading } from '@/lib/loading-hook';

export default function AlgoliaSearchBox() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const { loading, setLoading } = useLoading();
  return (
    <InstantSearch indexName={process.env.ALGOLIA_ANIME_INDEX ?? 'anime'} searchClient={algolia}>
      <Configure hitsPerPage={12} />

      {loading ? (
        <b>Searching for {input}...</b>
      ) : (
        <div className="w-full">
          <SearchBox
            onChange={(e) => {
              setInput(e.currentTarget.value);
            }}
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              if (input.length > 0) {
                router.push(`/update/?q=${input}`, '/update');
              } else {
                setInput('');
                setLoading(false);
              }
            }}
          />
          {input.length > 0 && (
            <p>
              Press enter to search more result for <b>{input}</b>
            </p>
          )}
          <SearchResult />
        </div>
      )}
    </InstantSearch>
  );
}
