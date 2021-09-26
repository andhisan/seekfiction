import { urlConverter } from '~/lib/api';
import { ApiType } from '@sasigume/seekfiction-commons';

/**
 * Display website name and ID as link
 * @param props
 * @returns
 */
const IdBox: React.FC<{ type: ApiType; id?: number | null; slug?: string | null }> = (props) => {
  const url = urlConverter(props.type, props.id, props.slug);
  if ((props.id && props.type !== 'kitsu') || (props.slug && props.type == 'kitsu')) {
    return (
      <a className="p-1 flex justify-between bg-gray-800 text-white rounded-lg font-mono" target="_blank" href={url} rel="noreferrer">
        <b className="uppercase">{props.type.replace('aniList', 'al')}: </b>
        <b>{props.id}</b>
      </a>
    );
  } else {
    return <b className="flex p-1 uppercase bg-gray-300 text-white rounded-lg font-mono">{props.type.replace('aniList', 'al')}</b>;
  }
};

export default IdBox;
