export default function Version() {
  const v = require('../../../package.json').version;
  return <div className="fixed top-3 left-3 z-50 opacity-50 font-mono">client: v{v.toString()}</div>;
}
