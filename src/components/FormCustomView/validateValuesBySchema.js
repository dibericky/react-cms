import AjvModule from 'ajv';

import schemas from './schemas';

const ajv = new AjvModule({ allErrors: true });

export default function validate(values) {
  const schema = schemas[values.type];
  if (!schema) {
    return { isValid: false, errors: [{ message: 'type is not valid' }] };
  }
  const validator = ajv.compile(schema);
  const isValid = validator(values);
  return { isValid, errors: validator.errors || [] };
}
