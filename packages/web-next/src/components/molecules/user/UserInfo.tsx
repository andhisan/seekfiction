import Avatar from '@/components/atoms/user/Avatar';
import SignInButton from '@/components/atoms/user/SignInButton';
import { useUser } from '@/lib/firebase/auth/use';
import { getUser } from '@/lib/firebase/firestore';
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

  return (
    <div className="flex gap-3 items-center ">
      <Avatar />
      {data && <div>You have added {data.totalAddedAnimeCount} anime so far!</div>}
      {error && <div>{error.message}</div>}
      <SignInButton />
    </div>
  );
};
export default UserInfo;
