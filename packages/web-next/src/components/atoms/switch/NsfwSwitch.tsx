import { useNsfw } from '@/hooks/use-nsfw';

const NsfwSwitch = () => {
  const { nsfw, setNsfw } = useNsfw();
  return (
    <div className="flex gap-1 items-center font-bold">
      <input
        onChange={() => {
          setNsfw(!nsfw);
        }}
        type="checkbox"
        value="compact"
        checked={!nsfw}
      />
      <label>Blur NSFW image</label>
    </div>
  );
};

export default NsfwSwitch;
