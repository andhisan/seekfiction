import CompactSwitch from '@/components/atoms/switch/CompactSwitch';
import Avatar from '@/components/atoms/user/Avatar';
import SignInButton from '@/components/atoms/user/SignInButton';
import { useUser } from '@/hooks/use-user';
import { getUser } from '@/lib/firebase/firestore';
import useSWR from 'swr';

const UserInfo = () => {
  const { user } = useUser();
  const { data, error } = useSWR(user ? user.uid : null, (uid) => getUser(uid), {
    refreshWhenOffline: false,
  });

  return (
    <div className="bg-white flex items-center gap-4 rounded-tl-xl p-2 shadow-xl">
      {user && (
        <div className="flex flex-col gap-3 relative">
          <Avatar />
        </div>
      )}
      <div>
        {data && <b>Lv. {data?.totalAddedAnimeCount}</b>}
        {error && <div>{error.message}</div>}
      </div>
      <CompactSwitch />
      <SignInButton />
    </div>
  );
};
export default UserInfo;
