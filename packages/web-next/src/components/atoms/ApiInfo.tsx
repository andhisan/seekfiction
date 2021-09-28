import { ApiType } from '@sasigume/seekfiction-commons';

interface Props {
  type: ApiType;
  enabled: boolean;
}

const ApiInfo: React.FC<Props> = (props) => <div className={`text-white p-1 font-mono ${props.enabled ? 'bg-black' : 'bg-gray-300'}`}>{props.type}</div>;
export default ApiInfo;
