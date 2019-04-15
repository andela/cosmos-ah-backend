import { validateArticle } from '../utils/article';
import { findById } from '../utils/query';
import { Article } from '../models';
import { responseHandler } from '../utils';

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
  return next();
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
  console.log(`author${authorId}`);
  console.log(`user${userId}`);
  if (authorId !== userId && role !== 'admin') { return responseHandler(res, 403, { status: 'error', message: 'You don\'t have access to manage this article!', }); }
  next();
};

export default articleValidation;
