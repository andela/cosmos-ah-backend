import { validateArticle } from '../utils/article';

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
    return res.status(400).json({ status: false, error: validate.errors.all() });
  }
  return next();
};

export default articleValidation;
