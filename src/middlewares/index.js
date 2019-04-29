/* eslint-disable no-restricted-syntax */

/**
 * @description Trims request body
 * @function trimBody
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {function} next next middleware function
 * @returns {void}
 */
export const trimBody = (req, res, next) => {
  const trimmedBody = {};
  for (const key in req.body) {
    if (Object.prototype.hasOwnProperty.call(req.body, key)) {
      const value = req.body[key];
      trimmedBody[key] = typeof value === 'string' ? value.trim() : value;
    }
  }
  req.body = { ...trimmedBody };
  next();
};

export default { trimBody };
