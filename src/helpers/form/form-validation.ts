import { DataReturnValidationI, ObjectKeyStringReturnArrayOfStringI } from './form.interfaces';
import rulesFuncs from './form-rules';

const formValidation = (fields: any, rules: any): DataReturnValidationI => {
  let errors: ObjectKeyStringReturnArrayOfStringI = {};
  let isValid = true;

  for (const field in fields) {
    if (rules?.hasOwnProperty(field)) {
      for (const rule of Object.keys(rules?.[field])) {
        const { valid, error } = rulesFuncs?.[rule]?.(field, fields, rules?.[field]?.[rule]);

        if (error && !valid) {
          if (!errors?.[field]) errors[field] = [];
          errors?.[field]?.push(error);
          isValid = valid;
        }
      }
    }
  }

  return {
    isValid,
    errors
  };
};
export default formValidation;
