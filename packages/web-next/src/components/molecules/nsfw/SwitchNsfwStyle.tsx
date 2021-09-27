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
      <button onClick={() => setNsfw(!nsfw)} className={`p-3 rounded-tr-xl text-white font-bold uppercase ${nsfw ? 'bg-pink-500' : 'bg-blue-500'}`}>
        NSFW: {nsfw ? 'ON' : 'OFF'}
      </button>
    </>
  );
};
export default SwitchNsfwStyle;
