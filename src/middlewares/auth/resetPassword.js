import { validateResetField } from '../../utils/auth/resetPassword';
/**
 *@name resetFieldValidation
 *@description Middleware for validating password reset field
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {function} next Calls the next function/action
 * @returns {object} Returns status code of 400 where validation fails
 * @returns {function} Calls next function/action
 */
const resetFieldValidation = async (req, res, next) => {
  const validate = await validateResetField(req.body);
  if (validate.fails()) {
    return res.status(400).json({ status: 'fail', error: validate.errors.all() });
  }
  return next();
};

export default resetFieldValidation;
