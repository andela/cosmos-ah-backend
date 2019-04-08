import Sequelize from 'sequelize';
import { findById } from '../utils/query';
import { Article } from '../models';

import {
  validateArticle,
  validateArticleRating,
  isOwnArticle
} from '../utils/article';

import {
  parseErrorResponse,
  sendResponse,
  createErrorResponse,
  responseHandler
} from '../utils';

/**
 *@name articleValidation
 *@description Middleware for validating article payload
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {function} next Calls the necxt function/action
 * @returns {object} Returns status code of 400 where validation fails
 * @returns {function} Calls next function/action
 */
const articleValidation = async (req, res, next) => {
  const validate = await validateArticle(req.body);
  if (validate.fails()) {
    return res.status(400).json({ status: 'fail', error: validate.errors.all() });
  }
  next();
};


/**
 *@name verifyArticle
 *@description Middleware for verifying that article exists
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {function} next Calls the necxt function/action
 * @returns {object} Returns status code of 404 where article is not found
 * @returns {function} Calls next function/action
 */
export const verifyArticle = async (req, res, next) => {
  const { id } = req.params;
  const article = await findById(Article, id);
  if (!article) { return responseHandler(res, 404, { status: 'fail', message: 'Article not found!', }); }
  const { dataValues: { userId: authorId } } = article;
  req.authorId = authorId;
  next();
};


/**
 *@name isAuthor
 *@description Middleware for checking if an author has the privilege to edit an article
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {function} next Calls the necxt function/action
 * @returns {object} Returns status code of 403 if author doesn't have permission
 * @returns {function} Calls next function/action
 */
export const isAuthor = async (req, res, next) => {
  const { id: userId, role } = req.user;
  const { authorId } = req;
  if (authorId !== userId && role !== 'admin') { return responseHandler(res, 403, { status: 'error', message: 'You don\'t have access to manage this article!', }); }
  next();
};
/**
 * @function validateRating
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @returns {Response | Function} Returns a validation error response
 */
export const validateRating = (req, res, next) => {
  const validator = validateArticleRating(req.body);
  if (validator.fails()) {
    return sendResponse(res, 400, {
      responseType: 'fail',
      data: parseErrorResponse(validator.errors.all()),
    });
  }
  next();
};

/**
 * @function checkIfAuthoredBySameUser
 * @param {*} ArticleModel Article model
 * @returns {function} Returns middleware function
 * @description checks if an article belongs to the
 * user who is about to rate it
 */
export const checkIfAuthoredBySameUser = ArticleModel => async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { id: userId } = req.user;
    const authoredByThisUser = await isOwnArticle(ArticleModel, {
      userId,
      articleId,
      searchUserId: req.user.id
    });
    if (authoredByThisUser) {
      return sendResponse(res, 409, {
        responseType: 'fail',
        data: 'You cannot rate your own article'
      });
    }
    next();
  } catch (e) {
    return sendResponse(res, 500, {
      status: 'error',
      data: createErrorResponse(e, Sequelize)
    });
  }
};

export default articleValidation;
