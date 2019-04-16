import { validateBookmark } from '../utils/bookmark';
import { responseFormat, parseErrorResponse } from '../utils';
/**
 *@name bookmarkValidation
 *@description Middleware for validating bookmark payload
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {function} next Calls the necxt function/action
 * @returns {object} Returns status code of 400 where validation fails
 * @returns {function} Calls next function/action
 */

const bookmarkValidation = async (req, res, next) => {
  const validate = await validateBookmark({ ...req.body, articleId: req.params.articleId });
  if (validate.fails()) {
    const validationErrors = validate.errors.all();
    const errorMessages = parseErrorResponse(validationErrors);
    return res.status(400).json(responseFormat({
      status: 'fail',
      message: errorMessages
    }));
  }
  return next();
};

export default bookmarkValidation;
