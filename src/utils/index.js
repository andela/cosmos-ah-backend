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
export const responseHandler = (res, code, payload) => res.status(code).json({
  ...payload,
});

/**
 * @function errorResponseFormat
 * @param {*} response
 * @returns {object} Returns an error response object
 */
export const errorResponseFormat = (response) => {
  const { message, status } = response;
  return {
    status,
    message
  };
};

/**
 * @function parseErrorResponse
 * @param {object} responses
 * @returns {object} Returns an hash of each field name to response messages
 * @description This util function parses validation errors and returns them
 * in a neater and more usable format
 */
export const parseErrorResponse = (responses) => {
  const errorMessages = {};

  const errorFieldNames = Object.keys(responses);
  errorFieldNames.forEach((errorFieldName) => {
    errorMessages[errorFieldName] = responses[errorFieldName].join('');
  });

  return errorMessages;
};

export const validateEditParameters = (body) => {
  const rules = {
    fullName: 'required',
    notification: 'required',
    bio: 'required',
    imageUrl: 'required'
  };
  return new Validator(body, rules);
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
/**
 * @function generateDummyWords
 * @param {string} word
 * @param {number} number
 * @returns {string} Returns `word` duplicated `number` times
 */
export const generateDummyWords = (word, number = 10) => {
  let newParagraph = '';
  let count = 1;
  while (count < number) {
    newParagraph += ` ${word}`;
    count += 1;
  }
  return newParagraph;
};

/*
 * @function parseResponse
 * @param {*} payload
 * @returns {*} parses and returns new response
*/
const parseResponse = (payload) => {
  const { data, responseType } = payload;
  return {
    status: responseType,
    [`${responseType === 'error' ? 'message' : 'data'}`]: data
  };
};

/**
 * @function sendResponse
 * @param {Response} res
 * @param {Number} statusCode
 * @param {*} payload  A hash of data and responseType.
 * ResponseType is an enum of strings [fail, success, error]
 * @returns {Response} Returns a response from the server
 * based on the `responseType` property in `payload`
 */
export const sendResponse = (res, statusCode, payload) => {
  const parsedResponse = parseResponse(payload);
  return res.status(statusCode).json(parsedResponse);
};

/**
 * @function omitProps
 * @param {*} obj A hash of props and values from which to omit props from
 * @param {Array<String>} props An array of props to omit
 * @returns {*} A hash of the omitted props
 */
export const omitProps = (obj, props) => {
  const filtered = {};
  const filteredKeys = Object.keys(obj).filter(key => !props.includes(key));
  /* eslint-disable no-restricted-syntax */
  for (const key of filteredKeys) {
    filtered[key] = obj[key];
  }
  return filtered;
};

export const handleDBErrors = (error, { req, Sequelize }, cb) => {
  let errorResponseMessage = '';
  if (error instanceof Sequelize.ForeignKeyConstraintError) {
    errorResponseMessage = `userId:${req.user.id} is not present in table "users" or article:${req.params.articleId} is not present in table "articles"`;
  } else {
    errorResponseMessage = error.message;
  }
  return cb(errorResponseMessage);
};

export const validateSearchParams = (body) => {
  const rules = {
    search: 'required'
  };
  return new Validator(body, rules);
};
