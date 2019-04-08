import Validator from 'validatorjs';

/**
 * @description This is the method for validating articles before inserting
 * @param {object} payload The request object
 * @returns {function} Returns validation object
 */
const validateField = async (payload) => {
  const rules = {
    email: 'required|email',
    password: 'required|min:6'
  };
  const errorMessages = {
    'required.email': 'The :attribute field is required!',
    'email.email': 'The :attribute field is supposed to be valid email!',
    'required.password': 'The :attribute field is required!',
    'min.email': 'The :attribute characters can not be below 6 characters',
  };
  return new Validator(payload, rules, errorMessages);
};

export default validateField;
