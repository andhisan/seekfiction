import React from 'react';

/**
 * wrap children with pre
 *
 * @param {*} { children }
 * @return {*}
 */
const PreBox: React.FC = ({ children }) => {
  return <pre className="p-3 rounded-lg bg-gray-300 whitespace-normal break-all">{children}</pre>;
};
export default PreBox;
