import React from 'react';
import { useNsfw } from '@/hooks/use-nsfw';
import { useUser } from '@/hooks/use-user';

/**
 * Component to switch nsfw state
 *
 * @return {*}
 */
const SwitchNsfwStyle: React.FC = () => {
  const { nsfw, setNsfw } = useNsfw();
  const { user } = useUser();
  if (!user) {
    return <div className="font-bold text-lg bg-purple-700 text-white p-3 rounded-tr-xl">Sign in to enable NSFW</div>;
  }
  return (
    <>
      <button
        aria-label={nsfw ? 'BLUR NSFW IMAGE' : 'SHOW NSFW IMAGE'}
        onClick={() => {
          // never allow nsfw when signed out
          user ? setNsfw(!nsfw) : setNsfw(false);
        }}
        className={`p-3 rounded-tr-xl text-white font-bold uppercase ${nsfw ? 'bg-pink-500' : 'bg-blue-500'}`}
      >
        SAFE FOR WORK:{` `}
        {nsfw ? `NO` : `YES`}
      </button>
    </>
  );
};
export default SwitchNsfwStyle;
