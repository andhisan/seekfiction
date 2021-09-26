import { atom, useRecoilState } from 'recoil';

const animeIdState = atom<string | undefined>({
  key: 'animeId',
  default: undefined,
});
export const useAnimeId = () => {
  const [animeId, setAnimeId] = useRecoilState(animeIdState);

  return { animeId, setAnimeId };
};
