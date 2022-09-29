export function printF(template: string, ...args: any[]) {
  return template.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != 'undefined' ? args[number] : match;
  });
}

const isRequired = (field: any, fields: any, { message }: any) => {
  let response = { error: '', valid: true };

  if (!fields[field].trim()) {
    response.valid = false;
    response.error = message;
  }

  return response;
};

const isValidEmail = (field: any, fields: any, { message }: any) => {
  let response = { error: '', valid: true };

  const regex = /\S+@\S+\.\S+/; // anystring@anystring.anystring
  if (!regex.test(fields[field])) {
    response.valid = false;
    response.error = message;
  }

  return response;
};
const isPasswordValid = (
  field: any,
  fields: any,
  { minLengthMessage, hasDigitMessage, hasSpecialCharacterMessage, hasLowerOrUpperMessage }: any
) => {
  if (fields[field].length < 6) {
    return { error: minLengthMessage, valid: false };
  } else if (!/\d/.test(fields[field])) {
    return { error: hasDigitMessage, valid: false };
  } else if (!/[!@#$%^&*]/.test(fields[field])) {
    return { error: hasSpecialCharacterMessage, valid: false };
  } else if (!/^(?=.*[a-z])(?=.*[A-Z]).*$/gm.test(fields[field])) {
    return { error: hasLowerOrUpperMessage, valid: false };
  } else {
    return { error: '', valid: true };
  }
};

const isEqualPassword = (field: any, fields: any, { message }: any) => {
  if (fields[field] !== fields['password']) {
    return { error: message, valid: false };
  } else {
    return { error: '', valid: true };
  }
};

const isCheck = (field: any, fields: any, { message }: any) => {
  if (!fields[field]) {
    return { error: message, valid: false };
  } else {
    return { error: '', valid: true };
  }
};

export const hasDigit = (field: any, fields: any, { message }: any) => {
  if (/\d/.test(fields[field])) {
    return { error: message, valid: false };
  } else {
    return { error: '', valid: true };
  }
};

const SpecifDigits = (field: any, fields: any, { message, value }: any) => {
  let response = { error: '', valid: true };

  if (value) {
    if (fields[field].trim().length !== value) {
      response.valid = false;
      response.error = printF(message, value);
    }
  }

  return response;
};

const customValidation = (field: any, fields: any, { message, value }: any) => {
  let response = { error: '', valid: true };
  if (!value) {
    response.valid = false;
    response.error = printF(message, value);
  }
  return response;
};

const rulesFuncs: any = {
  isRequired,
  isValidEmail,
  isPasswordValid,
  isEqualPassword,
  hasDigit,
  isCheck,
  SpecifDigits,
  customValidation
};

export default rulesFuncs;
