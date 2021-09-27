import { MouseEventHandler, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  additionalClassNames?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const ButtonWithOnClick: React.FC<Props> = (props) => {
  return (
    <a className={`shadow-lg whitespace-nowrap text-white cursor-pointer inline-block p-3 rounded-lg ` + props.additionalClassNames} onClick={props.onClick}>
      {props.children}
    </a>
  );
};
export default ButtonWithOnClick;
