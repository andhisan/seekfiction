import { useUser } from '@/hooks/use-user';
const Avatar = () => {
  const { user } = useUser();

  if (!user) {
    return <div></div>;
  } else {
    if (user.providerData[0]?.photoURL) {
      return (
        <div className="overflow-hidden rounded-full w-10 h-10">
          <img src={user.providerData[0]?.photoURL} width="40px" height="40px" alt={`${user.displayName}'s profile picture`} />
        </div>
      );
    } else {
      return <div>NO IMAGE</div>;
    }
  }
};

export default Avatar;
