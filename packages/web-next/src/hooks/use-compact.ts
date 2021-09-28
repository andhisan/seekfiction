import { atom, useRecoilState } from 'recoil';

const compactState = atom<boolean>({
  key: 'compact',
  default: true,
});

/**
 * State whether use compact layout or not
 * @returns
 */
export const useCompact = () => {
  const [compact, setCompact] = useRecoilState(compactState);

  return { compact, setCompact };
};
