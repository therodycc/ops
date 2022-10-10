import keyNames from './key-names.json';
export const getNameOfKeys = (keyName: string) => keyNames?.[keyName] || keyName;
