const packageJson = require('../../package.json');

export const getVersion = (): string => {
  return packageJson.version ?? '';
};
