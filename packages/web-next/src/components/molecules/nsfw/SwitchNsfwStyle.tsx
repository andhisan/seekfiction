import React, { useState } from 'react';
import { useNsfw } from '@/lib/nsfw-hook';

const SwitchNsfwStyle: React.FC = () => {
  const { nsfw, setNsfw } = useNsfw();
  return (
    <>
      <button onClick={() => setNsfw(!nsfw)} className={`p-3 rounded-xl text-white font-bold uppercase ${nsfw ? 'bg-pink-500' : 'bg-blue-500'}`}>
        NSFW: {nsfw ? 'SHOW' : 'HIDE'}
      </button>
    </>
  );
};
export default SwitchNsfwStyle;
