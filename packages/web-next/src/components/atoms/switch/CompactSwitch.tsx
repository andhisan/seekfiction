import { useCompact } from '@/hooks/use-compact';

const CompactSwitch = () => {
  const { compact, setCompact } = useCompact();
  return (
    <div className="flex gap-1 items-center font-bold">
      <input
        onChange={() => {
          setCompact(!compact);
        }}
        type="checkbox"
        value="compact"
        checked={compact}
      />
      <label>Compact view</label>
    </div>
  );
};

export default CompactSwitch;
