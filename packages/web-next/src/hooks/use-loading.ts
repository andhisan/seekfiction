import { atom, useRecoilState } from 'recoil';

const loadingState = atom<boolean>({
  key: 'loading',
  default: false,
});

/**
 * State if loading or not
 * @returns
 */
export const useLoading = () => {
  const [loading, setLoading] = useRecoilState(loadingState);

  return { loading, setLoading };
};
