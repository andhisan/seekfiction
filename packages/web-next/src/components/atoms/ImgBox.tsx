import { ApiType } from '@sasigume/seekfiction-commons';

/**
 * Display optimized image
 *
 * @param {*} props
 */
const ImgBox: React.FC<{ type: ApiType; src?: string | null; id?: number | null; slug?: string | null }> = (props) => (
  <div className="block relative">
    <div className="absolute top-0 left-0 w-[212px] h-[300px]">
      {props.src && <img alt={`${props.type} ID:${props.id}`} src={props.src} width="212px" height="300px" />}
    </div>
  </div>
);
export default ImgBox;
