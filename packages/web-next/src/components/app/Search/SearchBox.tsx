import SearchResult from './SearchResult';
import { InstantSearch, SearchBox, Configure } from 'react-instantsearch-dom';
import { searchClient } from '@/lib/meili';

import { useState } from 'react';
import { useLoading } from '@/hooks/use-loading';
import AnimeDetail from '@/components/molecules/anime/AnimeDetail';
import { useAnimeId } from '@/hooks/use-anime-id';
import { useOpen } from '@/hooks/use-open';
import LoadingScreen from '@/components/atoms/LoadingScreen';
import { logSearch } from '@/lib/firebase/analytics';
import { useUser } from '@/hooks/use-user';
import PreBox from '@/components/atoms/PreBox';

import useSWR from 'swr';
import { asyncUpdater } from '@/lib/search/async-updater';
import ButtonWithOnClick from '@/components/atoms/button/ButtonWithOnClick';

/**
 * Search box
 *
 * @export
 * @return {*}
 */
export default function AlgoliaSearchBox() {
  // use hook to use loading state across pages
  const { loading, setLoading } = useLoading();
  const { animeId } = useAnimeId();
  const { open } = useOpen();
  // save what user type into this state
  const [input, setInput] = useState('');

  // IMPORTANT: update this state ONLY AFTER PRESSING ENTER
  const [inputToSend, setInputToSend] = useState('');
  const { user } = useUser();
  const { data, error } = useSWR([user, inputToSend], asyncUpdater, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    refreshWhenHidden: false,
    shouldRetryOnError: false,
  });

  return (
    <>
      <InstantSearch indexName={process.env.MEILI_ANIME_INDEX ?? 'anime'} searchClient={searchClient}>
        <Configure hitsPerPage={24} />

        <div className="w-full">
          <div className="w-full flex gap-1">
            <SearchBox
              // set relative to display loading indicator
              // also set CSS
              className="relative"
              showLoadingIndicator
              focusShortcuts={['K']}
              translations={{ placeholder: 'Press K to focus' }}
              onChange={(e) => {
                setInput(e.currentTarget.value);
              }}
              onSubmit={(e) => {
                e.preventDefault();
                if (input.length > 0) {
                  // Change only if pressed enter
                  setInputToSend(input);

                  setLoading(true);
                  logSearch(input);
                } else {
                  // cancel if search word is empty
                  setLoading(false);
                }
              }}
            />
          </div>
          {loading && (
            <LoadingScreen>
              <p>
                Requested update for: <b>{input}</b>
              </p>

              {data ? (
                <>
                  <p>
                    Sucessfully updated database for word <b>{input}</b>! <br />
                    Found <b>{data.foundAnimeCount}</b> anime and added <b>{data.addedAnimeCount}</b> anime to index!
                  </p>
                  <ButtonWithOnClick additionalClassNames="bg-blue-500" onClick={() => setLoading(false)}>
                    CLOSE
                  </ButtonWithOnClick>
                </>
              ) : (
                <p>Please wait a minute!</p>
              )}

              {error && (
                <>
                  <p>Woops! Error shown below:</p>
                  <PreBox>{error.message}</PreBox>
                  <ButtonWithOnClick additionalClassNames="bg-red-500" onClick={() => setLoading(false)}>
                    CLOSE
                  </ButtonWithOnClick>
                </>
              )}
            </LoadingScreen>
          )}
        </div>
        <SearchResult />
      </InstantSearch>

      {open && animeId && <AnimeDetail id={animeId} />}
    </>
  );
}
