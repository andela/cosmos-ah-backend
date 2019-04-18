import Validator from 'validatorjs';

/**
 * @description This is the method for validating comment before inserting
 * @param {object} payload The request object
 * @returns {function} Returns validation object
 */

export const validateComment = (payload) => {
  const rules = {
    body: 'required',
  };

  const errorMessages = {
    'required.body': 'comment body is required'

  };
  return new Validator(payload, rules, errorMessages);
};
