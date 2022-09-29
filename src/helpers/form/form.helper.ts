export interface ObjectKeyStringI {
  [key: string]: any;
}

export const inputFormToJSON = (target: HTMLFormElement): any => {
  let items = [
    ...Array.from(target?.querySelectorAll('input')),
    ...Array.from(target.querySelectorAll('select'))
  ];

  return items?.reduce((a: ObjectKeyStringI, b) => {
    let name = b.name;
    let names = name.split('.');
    let value = getValueTypeOfInput(b);

    if (names.length > 1) {
      a[names[0]] = {
        ...a[names[0]],
        ...(name.indexOf('.') !== -1
          ? JSON.parse(assignValueToObject(name, value, a[names[0]]))
          : value)
      };
    } else if (name) {
      a[name] = value;
    }

    return a;
  }, {});
};

export const getValueTypeOfInput = (target: any) => {
  const values: { checkbox: string } = {
    checkbox: target.checked
  };
  return Object.keys(values).includes(target.type)
    ? values[target.type as 'checkbox']
    : target.value;
};

export const assignValueToObject = (text: string, value: any, data: object) => {
  let keys = text.split('.');
  keys.shift();

  let len = keys.length - 1;
  // data[b]
  return keys.reduce((a, b, i) => {
    a += `{"${b}"${i > len - 1 ? `:${value}` : ''}${i == len ? '}'.repeat(len + 1) : ''}${
      i < len ? ':' : ''
    }`;
    return a;
  }, '');
};
