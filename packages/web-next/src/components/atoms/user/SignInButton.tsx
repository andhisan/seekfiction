import { useUser } from '@/lib/auth/use';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import ButtonWithOnClick from '../button/ButtonWithOnClick';

const SignInButton = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const { user } = useUser();
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.debug(`Auth result: `, result);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const handleSignOut = () => {
    signOut(auth);
  };

  if (!user) {
    return (
      <ButtonWithOnClick additionalClassNames="bg-blue-500" onClick={handleSignIn}>
        Sign in
      </ButtonWithOnClick>
    );
  } else {
    return (
      <div>
        <ButtonWithOnClick additionalClassNames="bg-red-500" onClick={handleSignOut}>
          Sign out
        </ButtonWithOnClick>
      </div>
    );
  }
};

export default SignInButton;
