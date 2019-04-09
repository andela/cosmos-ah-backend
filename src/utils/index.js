export const responseFormat = (response) => {
  const { data, status } = response;
  return {
    status,
    data,
  };
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
