import Image from 'next/image';

import { ApiType } from '@sasigume/seekfiction-commons';

const ImgBox: React.FC<{ type: ApiType; src?: string | null; id?: number | null; slug?: string | null }> = (props) => (
  <div className="block absolute top-0 left-0">
    <div className="w-[130px] h-[200px]">{props.src && <Image alt={`ID:${props.id}の画像`} src={props.src} width="130px" height="200px" />}</div>
  </div>
);
export default ImgBox;
