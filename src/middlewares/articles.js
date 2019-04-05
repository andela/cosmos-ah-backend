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

export const verifyArticle = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const article = await findById(Article, id);
  if (!article) { return responseHandler(res, 404, { status: 'fail', message: 'Article not found!', }); }
  const { dataValues: { userId: authorId } } = article;
  const { role } = req.user;
  if (authorId !== userId && role !== 'author') { return responseHandler(res, 403, { status: 'error', message: 'You are don\'t have access to manage this article!', }); }
  next();
};

export default articleValidation;
