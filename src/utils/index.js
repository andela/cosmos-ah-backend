import Validator from 'validatorjs';
import isUUID from 'validator/lib/isUUID';
import { ArticleReadHistory } from '../models';
import { extractRatingValues } from './rating';

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
 * @param {void|string} param Valid UUID string
 * @param {void|string} key UUID format version
 * @returns {object} Returns an hash of each field name to response messages
 */
export const checkIDParamType = (param, key = '4') => {
  if (!isUUID(param, key)) { return false; }
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

/**
 * @description Handles Database errors thrown during a DB operation
 * @function handleDBErrors
 * @param {object} error A Database error instance
 * @param {object} opts An hash of request and Sequelize object
 * @param {function} cb callback function that sends back the error response
 * @returns {*} Returns the result of calling the `cb` function
 */
export const handleDBErrors = (error, { req, Sequelize }, cb) => {
  let errorResponseMessage = '';
  if (error instanceof Sequelize.ForeignKeyConstraintError) {
    errorResponseMessage = `userId:${req.user.id} is not present in table "users" or article:${req.params.articleId} is not present in table "articles"`;
  } else {
    errorResponseMessage = error.message;
  }
  return cb(errorResponseMessage);
};

/**
 * @function addToReadHistory
 * @param {string} articleId id of the article to be added
 * @param {string} userId id of the user read stats to be added
 * @returns {ArticleReadHistory} returns a the newly created article read history
 */
export const addArticleToReadHistory = async (articleId, userId) => {
  try {
    let articleReadHistory = await ArticleReadHistory.findOne({ where: { articleId, userId } });
    if (!articleReadHistory) {
      articleReadHistory = await ArticleReadHistory.create({ articleId, userId });
      return articleReadHistory;
    }
    return articleReadHistory;
  } catch (error) {
    throw error;
  }
};

/**
 * @function computeArticleRatingTotal
 * @param {*} ratings
 * @returns {number} returns rating total for an article
 */
export const computeArticleRatingTotal = (ratings) => {
  const ratingValues = extractRatingValues(ratings);
  return ratingValues.reduce(
    (prevRating, curRating) => prevRating + curRating, 0);
};

/**
 * @function computeArticleAverageRating
 * @param {object} ratings
 * @param {function} calculateTotalRatings
 * @return {number} Returns average rating for an article
 */
export const computeArticleAverageRating = (ratings) => {
  const totalRatings = computeArticleRatingTotal(ratings);
  return totalRatings / ratings.length;
};

// export const addRatingAverageToArticle = (article, rating) => {
//  article.averageRating = computeArticleAverageRating(article.ratings);
//  return article;
// };

export const addRatingAverageToArticle = (article, rating) => {
  const newArticle = { ...article };
  newArticle.averageRating = rating;
  return newArticle;
 };

/**
 * @function addRatingAverageToArticles
 * @param {Array} articles
 * @returns {Array} Returns an array of article with new prop 'averageRating'
 */
// export const addRatingAverageToArticles = articles => articles.map((article) => {
//   article.averageRating = computeArticleAverageRating(article.ratings);
//   return article;
// });

export const addRatingAverageToArticles = articles => articles.map(addRatingAverageToArticle);
