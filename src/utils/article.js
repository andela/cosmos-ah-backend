import Validator from 'validatorjs';
import slugify from 'slugify';

/**
 * @description This is the method for validating articles before inserting
 * @param {object} payload The request object
 * @returns {function} Returns validation object
 */
export const validateArticle = async (payload) => {
  const rules = {
    title: 'required|string',
    description: 'string|min:3|max:255',
    body: 'required|max:10000|string',
    imageUrl: ['regex:/^(https?|ftp|torrent|image|irc):\\/\\/(-\\.)?([^\\s\\/?\\.#-]+\\.?)+(\\/[^\\s]*)?$/i', 'string'],
    tags: ['array'],
  };
  const errorMessages = {
    'required.title': 'Without a :attribute your article cannot be found!',
    'string.title': 'Your :attribute field must be of string format!',
    'string.description': 'Your :attribute field must be of string format!',
    'string.body': 'Your :attribute field must be of string format!',
    'min.description': 'If your :attribute is less than 3 characters, it may not be taken to seriously',
    'max.description': 'If your :attribute exceeds 255 characters, it becomes too much to handle',
    'required.body': 'Your article needs a body field for it to be valid',
    'max.body': 'If your :attribute exceeds 10000 characters, it becomes too much to handle',
    'regex.imageUrl': 'The :attribute field requires a valid URL',
  };
  return new Validator(payload, rules, errorMessages);
};

/**
 * @function validateRating
 * @param {*} payload
 * @returns {*} Returns an instance of Validator
 */
export const validateArticleRating = (payload) => {
  const rules = {
    rating: 'integer|min:1|max:5'
  };

  const errorMessages = {
    'integer.rating': 'Your :attribute must be of integer format'
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
 *  @function ratingExist
 * @param {*} Rating
 * @param {*} criteria an hash of criteria to use
 * @returns {Promise<Boolean>} Resolves to true if rating for `articleId` exist, false otherwise
 */
export const ratingExist = async (Rating, { userId, articleId }) => {
  const rating = await Rating.findOne({
    where: { userId, articleId }
  });
  return rating !== null;
};

/**
 * @function isOwnArticle
 * @param {*} Article Article model
 * @param {*} criteria a hash of search criteria
 * @description this checks if article is authored by `criteria.userId`
 * @returns {Promise<boolean>} Resolves to true
 *  if `criteria.articleId` was authored by `criteria.userId`
 */
export const isOwnArticle = async (Article, { userId, articleId, searchUserId }) => {
  const article = await Article.findOne({
    where: {
      id: articleId,
      userId,
    }
  });
  if (article && article.userId === searchUserId) return true;
  return false;
};
