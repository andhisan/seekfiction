import { atom, useRecoilState } from 'recoil';

const openState = atom<boolean>({
  key: 'open',
  default: false,
});
export const useOpen = () => {
  const [open, setOpen] = useRecoilState(openState);

  return { open, setOpen };
};
