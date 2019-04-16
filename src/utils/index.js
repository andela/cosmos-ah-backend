import Validator from 'validatorjs';
import isUUID from 'validator/lib/isUUID';

export const responseFormat = (response) => {
  const { data, status, message } = response;
  return {
    status,
    message,
    data,
  };
};

/**
 * @description This is the method for validating articles before inserting
 * @param {object} body The request object
 * @returns {function} Returns validation object
 */
export const validateParameters = async (body) => {
  const rules = {
    fullName: 'required|string',
    email: 'required|email',
    password: ['required', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/i'],
    username: ['required', 'string', 'regex:/^[a-z]+$/'],
  };
  const errorMessages = {
    'string.fullName': 'The:attribute must be a string!',
    'email.email': 'The :attribute must be valid!',
    'min.password': 'Your :attribute must have a minimum of six characters!',
    'alpha_num.password': 'Your :attribute must consist of alphabets and numbers!',
    'regex.password': 'At least a lowercase character, uppercase character, numeric character, special character and eight characters long.',
  };
  return new Validator(body, rules, errorMessages);
};

/**
 * @name responseFormat
 * @description This is a response handler
 * @param {object} res The response object
 * @param {object} code Valid HTTP code
 * @param {object} payload The response data to the user
 * @returns {object} Returns the response object
 */
export const responseHandler = (res, code, payload) => {
  const { data, status, message } = payload;
  return res.status(code).json({
    status,
    message,
    data,
  });
};

/**
 * @function errorResponseFormat
 * @param {*} response
 * @returns {object} Returns an error response object
 */
export const errorResponseFormat = (response) => {
  const { message } = response;
  return {
    status: 'error',
    message
  };
};

/**
 * @function parseErrorResponse
 * @param {object} responses
 * @returns {object} Returns an hash of each field name to response messages
 */
export const parseErrorResponse = (responses) => {
  const errorMessages = {};

  const errorFieldNames = Object.keys(responses);
  errorFieldNames.forEach((errorFieldName) => {
    errorMessages[errorFieldName] = responses[errorFieldName].join('');
  });

  return errorMessages;
};

/**
 * @function checkIDParamType
 * @param {void|string} param
 * @returns {object} Returns an hash of each field name to response messages
 */
export const checkIDParamType = (param) => {
  if (!isUUID(param, '4')) { return false; }
  return true;
};
