import SearchResult from './SearchResult';
import { InstantSearch, SearchBox, Configure } from 'react-instantsearch-dom';
import { searchClient } from '@/lib/meili';

import { useEffect, useState } from 'react';
import { useLoading } from '@/lib/loading-hook';
import AnimeDetail from '@/components/molecules/algolia/anime/AnimeDetail';
import { useAnimeId } from '@/lib/anime-id-hook';
import { useOpen } from '@/lib/open-hook';
import LoadingScreen from '@/components/atoms/LoadingScreen';
import { logSearch } from '@/lib/firebase/analytics';
import { useUser } from '@/lib/firebase/auth/use';
import PreBox from '@/components/atoms/PreBox';

import useSWR from 'swr';
import { asyncUpdater } from '@/lib/update/async-updater';
import { updateUser } from '@/lib/firebase/firestore';
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
  const { user } = useUser();
  const { data, error } = useSWR([user, input], asyncUpdater, {
    refreshInterval: 0,
  });
  useEffect(() => {
    if (user && data && data.addedAnimeCount) {
      updateUser(user.uid, {
        addedAnimeCount: data.addedAnimeCount,
      });
    }
  }, [user, data]);

  return (
    <>
      <InstantSearch indexName={process.env.MEILI_ANIME_INDEX ?? 'anime'} searchClient={searchClient}>
        <Configure hitsPerPage={12} />

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
              {data && (
                <p>
                  Sucessfully updated database for word <b>{input}</b>! <br />
                  Found <b>{data.foundAnimeCount}</b> anime and added <b>{data.addedAnimeCount}</b> anime to index!
                </p>
              )}

              {error && (
                <div>
                  <p>Woops! Error shown below:</p>
                  <PreBox>{error.message}</PreBox>
                </div>
              )}
              <ButtonWithOnClick additionalClassNames="bg-blue-500" onClick={() => setLoading(false)}>
                OK
              </ButtonWithOnClick>
            </LoadingScreen>
          )}
        </div>
        <SearchResult />
      </InstantSearch>

      {open && animeId && <AnimeDetail id={animeId} />}
    </>
  );
}
