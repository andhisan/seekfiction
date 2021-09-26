import { atom, useRecoilState } from 'recoil';

const openState = atom<boolean>({
  key: 'open',
  default: false,
});

/**
 * State if detail box is open or not
 * @returns
 */
export const useOpen = () => {
  const [open, setOpen] = useRecoilState(openState);

  return { open, setOpen };
};
