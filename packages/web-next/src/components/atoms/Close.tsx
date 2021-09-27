import { useOpen } from '@/hooks/use-open';

/**
 * Component to close detail window
 *
 * @return {*}
 */
const Close: React.FC = () => {
  const { setOpen } = useOpen();
  const handleClick = () => {
    setOpen(false);
  };
  return (
    <button onClick={handleClick} className="p-3 rounded-xl bg-red-500 text-white font-bold uppercase">
      Close
    </button>
  );
};
export default Close;
