import Validator from 'validatorjs';
/**
 * @description This is the method for validating password reset field
 * @param {object} body The request object
 * @returns {function} Returns validation object
 */
export const validateResetField = async (body) => {
  const rules = {
    password: ['required', 'confirmed', 'string', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/i'],
  };
  const errorMessages = {
    'confirmed.password': 'Passwords do not match',
  };
  return new Validator(body, rules, errorMessages);
};

export default validateResetField;
