import { ApiType } from '@sasigume/seekfiction-commons';

interface Props {
  type: ApiType;
  enabled: boolean;
}

const ApiInfo: React.FC<Props> = (props) => (
  <div className={`capitalize text-white border-r-2 border-gray-300 p-1 px-1 font-mono ${props.enabled ? 'bg-black' : 'bg-gray-300'}`}>{props.type}</div>
);
export default ApiInfo;
