import Avatar from '@/components/atoms/user/Avatar';
import SignInButton from '@/components/atoms/user/SignInButton';
import { useUser } from '@/hooks/use-user';
import { getUser } from '@/lib/firebase/firestore';
import { useState } from 'react';
import useSWR from 'swr';

const UserInfo = () => {
  const { user } = useUser();
  const { data, error } = useSWR(user ? user.uid : null, (uid) => getUser(uid), {
    refreshWhenOffline: false,
  });

  return (
    <div className="bg-white flex flex-col gap-2 rounded-tl-xl p-2 shadow-xl">
      <div className="flex gap-3 items-center justify-between relative">
        <div className="flex gap-2 items-center">
          <Avatar />
          <div>
            {data && <b>Lv. {data?.totalAddedAnimeCount}</b>}

            {error && <div>{error.message}</div>}
          </div>
        </div>

        <SignInButton />
      </div>
      {data && <b>You have added {data.totalAddedAnimeCount} anime so far!</b>}
    </div>
  );
};
export default UserInfo;
