import Avatar from '@/components/atoms/user/Avatar';
import SignInButton from '@/components/atoms/user/SignInButton';

const UserInfo = () => {
  return (
    <div className="flex gap-3 items-center ">
      <Avatar />
      <SignInButton />
    </div>
  );
};
export default UserInfo;
