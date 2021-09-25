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
    <div className="flex flex-col gap-6 max-w-[300px] overflow-x-hidden">
      <div className="p-3 bg-gray-300 rounded-lg">Manga search is currently unavailable.</div>
      <InstantSearch indexName={process.env.ALGOLIA_ANIME_INDEX ?? 'anime'} searchClient={algolia}>
        <Configure hitsPerPage={5} />

        {updating ? (
          <b>Searching for {input}...</b>
        ) : (
          <>
            <SearchBox
              className="w-full"
              onChange={(e) => {
                setInput(e.currentTarget.value);
              }}
              onSubmit={(e) => {
                e.preventDefault();
                setUpdating(true);
                if (input.length > 0) {
                  router.push(`/update/?q=${input}`, '/update');
                } else {
                  setInput('');
                  setUpdating(false);
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
        <div className="text-left p-3 rounded-xl bg-gray-100">
          <PoweredBy />
        </div>
      </InstantSearch>
    </div>
  );
}
