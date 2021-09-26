import { atom, useRecoilState } from 'recoil';

const nsfwState = atom<boolean>({
  key: 'nsfw',
  default: false,
});
export const useNsfw = () => {
  const [nsfw, setNsfw] = useRecoilState(nsfwState);

  return { nsfw, setNsfw };
};
