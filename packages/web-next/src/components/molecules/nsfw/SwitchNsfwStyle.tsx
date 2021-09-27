import React from 'react';
import { useNsfw } from '@/lib/nsfw-hook';

/**
 * Component to switch nsfw state
 *
 * @return {*}
 */
const SwitchNsfwStyle: React.FC = () => {
  const { nsfw, setNsfw } = useNsfw();
  return (
    <>
      <button
        aria-label={nsfw ? 'BLUR NSFW IMAGE' : 'SHOW NSFW IMAGE'}
        onClick={() => setNsfw(!nsfw)}
        className={`p-3 rounded-tr-xl text-white font-bold uppercase ${nsfw ? 'bg-black' : 'bg-pink-500'}`}
      >
        {nsfw ? `NO MORE HORNY` : `PRESS IF HORNY`}
      </button>
    </>
  );
};
export default SwitchNsfwStyle;
