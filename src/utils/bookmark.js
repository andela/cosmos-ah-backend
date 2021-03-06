import Validator from 'validatorjs';

/**
 * @description This is the method for validating bookmark before inserting
 * @param {object} payload The request object
 * @returns {function} Returns validation object
 */

export const validateBookmark = async (payload) => {
  const rules = {
    articleId: 'required'
  };

  const errorMessage = {
    'required.articleId': 'article id is required'
  };
  return new Validator(payload, rules, errorMessage);
};
