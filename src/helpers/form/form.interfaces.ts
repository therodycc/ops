export interface DataReturnValidationI {
  isValid: Boolean;
  errors: ObjectKeyStringReturnArrayOfStringI;
}

export interface ObjectKeyStringReturnArrayOfStringI {
  [key: string]: Array<string>;
}
