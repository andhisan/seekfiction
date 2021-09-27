import Avatar from '@/components/atoms/user/Avatar';
import SignInButton from '@/components/atoms/user/SignInButton';
import { useUser } from '@/lib/firebase/auth/use';
import { getUser } from '@/lib/firebase/firestore';
import { useState } from 'react';
import useSWR from 'swr';

const UserInfo = () => {
  const { user } = useUser();
  const { data, error } = useSWR(user ? user.uid : null, (uid) => getUser(uid), {
    refreshInterval: 0,
    shouldRetryOnError: false,
    refreshWhenHidden: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="flex gap-3 items-center relative">
      <div className="flex w-[64px] flex-col items-center" onMouseEnter={() => setShowInfo(true)} onMouseOut={() => setShowInfo(false)}>
        <Avatar />
        {data && <b>Lv. {data?.totalAddedAnimeCount}</b>}
      </div>
      {data && showInfo && (
        <div className="absolute top-[70px] z-50 right-0 rounded-xl p-2 bg-white shadow-xl">You have added {data.totalAddedAnimeCount} anime so far!</div>
      )}
      {error && <div>{error.message}</div>}
      <SignInButton />
    </div>
  );
};
export default UserInfo;
