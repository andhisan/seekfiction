import { useUser } from '@/lib/firebase/auth/use';
import Image from 'next/image';
const Avatar = () => {
  const { user } = useUser();

  if (!user) {
    return <div></div>;
  } else {
    if (user.providerData[0]?.photoURL) {
      return (
        <div className="overflow-hidden rounded-full w-10 h-10">
          <Image src={user.providerData[0]?.photoURL} width="40px" height="40px" alt={`${user.displayName}'s profile picture`} />
        </div>
      );
    } else {
      return <div>NO IMAGE</div>;
    }
  }
};

export default Avatar;
