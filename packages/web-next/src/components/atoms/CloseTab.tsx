const CloseTab: React.FC = () => {
  const handleClick = () => {
    if (typeof window !== 'undefined') window.close();
  };
  return (
    <button onClick={handleClick} className="p-3 rounded-xl bg-red-500 text-white font-bold uppercase">
      Close tab
    </button>
  );
};
export default CloseTab;
