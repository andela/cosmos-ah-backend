import Validator from 'validatorjs';

/**
 * @description function for sending Response
 * @param {object} response response to be sent
 * @returns {function} Returns response object
 */
export const responseFormat = (response) => {
  const { data, success } = response;
  return {
    data,
    success,
  };
};

/**
 * @description validating incoming Request
 * @param {object} body The request
 * @returns {function} Returns validation object
 */
export const validateArticleTag = async (body) => {
  const rules = {
    tags: ['array'],
    userId: 'required'
  };
  return new Validator(body, rules);
};

/**
 * @description function for sending error response
 * @param {object} response error response to be sent
 * @returns {function} Returns error response object
 */
export const responseErrorFormat = (response) => {
  const { success, message } = response;
  return {
    success,
    message,
  };
};
