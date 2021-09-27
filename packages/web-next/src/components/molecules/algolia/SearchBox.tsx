import SearchResult from './SearchResult';
import { InstantSearch, SearchBox, Configure } from 'react-instantsearch-dom';
import { searchClient } from '@/lib/meili';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useLoading } from '@/lib/loading-hook';
import AnimeDetail from '@/components/molecules/algolia/anime/AnimeDetail';
import { useAnimeId } from '@/lib/anime-id-hook';
import { useOpen } from '@/lib/open-hook';
import LoadingScreen from '@/components/atoms/LoadingScreen';

/**
 * Search box
 *
 * @export
 * @return {*}
 */
export default function AlgoliaSearchBox() {
  const router = useRouter();
  const { animeId } = useAnimeId();
  const { open } = useOpen();
  // save what user type into this state
  const [input, setInput] = useState('');

  // use hook to use loading state across pages
  const { loading, setLoading } = useLoading();
  return (
    <>
      <InstantSearch indexName={process.env.MEILI_ANIME_INDEX ?? 'anime'} searchClient={searchClient}>
        <Configure hitsPerPage={12} />

        {/* When pressed enter, server side rendering is not completed.
          We wait until load finish by showing fullscreen message */}
        {router.pathname == '/' ? (
          <>
            {loading ? (
              <LoadingScreen>
                <b>Searching for: {input}</b>
              </LoadingScreen>
            ) : (
              <div className="w-full">
                <div className="w-full flex gap-1">
                  <SearchBox
                    showLoadingIndicator
                    onChange={(e) => {
                      setInput(e.currentTarget.value);
                    }}
                    onSubmit={(e) => {
                      e.preventDefault();

                      if (input.length > 0) {
                        setLoading(true);
                        // We need to use Server Side Rendering to avoid CORS error
                        // IMPORTANT: set 'as' param to clear query from url
                        router.push(`/update/?q=${encodeURIComponent(input)}`, '/update', { shallow: true });
                      } else {
                        // cancel if search word is empty
                        setInput('');
                        setLoading(false);
                      }
                    }}
                  />
                </div>
                <p>
                  Press enter to update anime database{` `}
                  {input.length > 0 && (
                    <>
                      {`for `}
                      <b>{input}</b>
                    </>
                  )}
                </p>
                <SearchResult />
              </div>
            )}
          </>
        ) : (
          <div>Updated index.</div>
        )}
      </InstantSearch>

      {open && animeId && <AnimeDetail id={animeId} />}
    </>
  );
}
