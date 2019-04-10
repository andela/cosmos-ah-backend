import Validator from 'validatorjs';

export const responseFormat = (response) => {
  const { data, status } = response;
  return {
    status,
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
    fullName: 'required',
    email: 'required',
    password: 'required',
    username: 'required',
  };
  return new Validator(body, rules);
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
