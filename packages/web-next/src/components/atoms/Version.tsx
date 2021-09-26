/**
 * Display client ver
 *
 * @return {*}
 */
const Version = () => {
  const v = require('../../../package.json').version;
  return <div className="opacity-50 font-mono">client: v{v.toString()}</div>;
};

export default Version;
