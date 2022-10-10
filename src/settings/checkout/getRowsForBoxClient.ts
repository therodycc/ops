import { AddressI, ProfileI } from '../../interfaces/client/client.interface';
import { getNameOfKeys } from '../getKeyNames';

export const getRowsForBoxClient = (data, removeLastLine: boolean = false) => {
  let elements = [];
  Object.keys(data).forEach(section => {
    Object.keys(data[section]).forEach(key => {
      data[section][key] &&
        elements.push({ title: getNameOfKeys(key), description: data[section][key] });
    });
    elements.push({ divider: true });
  });
  if (removeLastLine) elements = elements.slice(0, elements.length - 1);
  return elements;
};

export const formatDataClientToForm = (data: { profile?: ProfileI; address?: AddressI }) => {
  let clientDataToForm = Object.values(data || {}).reduce((acc, item) => {
    acc = {
      ...acc,
      ...item,
      ...{
        showDirection:
          data?.address && !Object.values(data?.address).every(item => item.length === 0)
      }
    };
    return acc;
  }, {});
  return clientDataToForm;
};
