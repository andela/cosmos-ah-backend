import Validator from 'validatorjs';
import slugify from 'slugify';
import { readingTime } from 'reading-time-estimator';


/**
 * @description This is the method for validating articles before inserting
 * @param {object} payload The request object
 * @returns {function} Returns validation object
 */
export const validateArticle = async (payload) => {
  const rules = {
    title: 'required|string',
    description: 'string|min:3|max:255',
    body: ['required', 'string', 'max:100000000000000', 'regex:/[a-zA-Z]/i'],
    imageUrl: 'array',
    // eslint-disable-next-line max-len
    // imageUrl: ['regex:/^(https?|ftp|torrent|image|irc):\\/\\/(-\\.)?([^\\s\\/?\\.#-]+\\.?)+(\\/[^\\s]*)?$/i', 'string'],
    tags: ['array'],
  };
  const errorMessages = {
    'required.title': 'Without a :attribute your article cannot be found!',
    'string.title': 'Your :attribute field must be of string format!',
    'string.description': 'Your :attribute field must be of string format!',
    'regex.body': 'Your :attribute should contain at least one alphabetical character!',
    'string.body': 'Your :attribute field must be of string format!',
    'min.description': 'If your :attribute is less than 3 characters, it may not be taken to seriously',
    'max.description': 'If your :attribute exceeds 255 characters, it becomes too much to handle',
    'required.body': 'Your article needs a body field for it to be valid',
    'max.body': 'If your :attribute exceeds 10000 characters, it becomes too much to handle',
    'array.imageUrl': 'The :attribute field must be an array type',
  };
  return new Validator(payload, rules, errorMessages);
};

/**
 * @description This is a function for slugifying a string
 * @param {object} payload The request object
 * @returns {string} Returns string
 */
export const slug = payload => `${slugify(payload, '-')}-${new Date().getTime()}`;

/**
 * @func computeArticleReadingTime
 * @param {string} words the words for estimating read time
 * @param {*} opts an hash of wordsPerMinute and locale options
 * @returns {number} Returns the total time (rounded to the nearest greater whole number)
 * it takes to read the article
 */
export const computeArticleReadingTime = (words, { wordsPerMinute = 250, locale = 'en' } = {}) => {
  const totalTime = readingTime(words, { wordsPerMinute, locale });
  return Math.ceil(totalTime.minutes);
};

export const getArticleReportValidator = (payload) => {
  const rules = {
    description: 'required|string|min:3',
    category: 'string|min:3'
  };
  const errorMessages = {
    'required.description': 'Please supply a :attribute of your report',
    'string.description': 'Your :attribute field must be of string format',
    'min.description': 'Your :attribute must be at least 3 characters long',
    'string.category': 'Your :attribute field must be of string format'
  };
  return new Validator(payload, rules, errorMessages);
};
/**
 * @description This is the method for validating article Tags before inserting
 * @param {object} payload The request object
 * @returns {function} Returns validation object
 */
export const validateArticleTag = (payload) => {
  const rules = {
    tags: ['array'],
  };
  return new Validator(payload, rules);
};

/**
 * @function validateArticleRating
 * @param {*} payload
 * @returns {Validator} Returns a validator for validating
 * article ratings
 */
export const validateArticleRating = async (payload) => {
  const rules = { rating: 'integer|min:1|max:5' };
  const errorMessages = {
    'min.rating': 'You cannot rate an article below 1',
    'max.rating': 'You cannot rate an article above 5',
  };
  return new Validator(payload, rules, errorMessages);
};

/**
 * @function userAuthoredThisArticle
 * @param {*} Article
 * @param {*} criteria An hash with `articleId` and `userId` props
 * @returns {Promise<Boolean>} Returns true if article with id: `articleId`
 * was authored by this user
 */
export const userAuthoredThisArticle = async (Article, { articleId, userId } = {}) => {
  try {
    const article = await Article.findOne({ where: { id: articleId, userId } });
    return article !== null;
  } catch (error) {
    return false;
  }
};

/**
 * @function getRawArticleResults
 * @param {Array} allArticles array of articles
 * @returns {Array} Returns the raw array object values
 */
export const getRawArticleResults = allArticles => allArticles.map(article => article.get());
