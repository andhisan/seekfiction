import Logo from './Logo';

const LoadingScreen: React.FC = ({ children }) => {
  return (
    <div className="fixed z-50 text-lg bg-white top-0 left-0 flex flex-col gap-6 justify-center text-center items-center w-screen h-screen">
      <div className="w-[200px]">
        <Logo />
      </div>
      {children}
    </div>
  );
};

export default LoadingScreen;
