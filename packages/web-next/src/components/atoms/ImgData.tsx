import Image from 'next/image';

import { ApiType } from '@sasigume/seekfiction-commons';
import { urlConverter } from '@/lib/api';

/**
 * Display optimized image and data
 *
 * @param {*} props
 */
const ImgData: React.FC<{ type: ApiType; src?: string | null; id?: number | null; slug?: string | null }> = (props) => {
  const url = urlConverter(props.type, props.id, props.slug);
  if (url) {
    return (
      <a className="flex flex-col p-3 w-[200px] justify-between bg-gray-800 text-white rounded-lg font-mono" target="_blank" href={url} rel="noreferrer">
        <div>
          <b className="uppercase">{props.type.replace('aniList', 'al')}: </b>
          <b>{props.id}</b>
        </div>
        <div>{props.src ? <Image alt={`${props.type} ID:${props.id}`} src={props.src} width="200px" height="300px" /> : <b>Image not found</b>}</div>
      </a>
    );
  } else {
    return (
      <div className="flex flex-col w-[200px] p-3 bg-gray-800 text-white rounded-lg font-mono">
        {props.type} : Not available. Check other entries in case romaji title varies.
      </div>
    );
  }
};
export default ImgData;
