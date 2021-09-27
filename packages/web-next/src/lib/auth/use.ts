import { User } from 'firebase/auth';
import { atom, useRecoilState } from 'recoil';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useNsfw } from '../nsfw-hook';

const userState = atom<User | null>({
  key: 'user',
  default: null,

  // avoid "cannot freeze" error
  dangerouslyAllowMutability: true,
});

export const useUser = () => {
  const [user, setUser] = useRecoilState(userState);
  const { setNsfw } = useNsfw();

  useEffect(() => {
    if (user !== null) {
      return;
    }

    const auth = getAuth();

    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
        setNsfw(false);
      }
    });
  }, [user, setUser, setNsfw]);

  return { user };
};
