import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

/**
 * @class AuthenticateUser
 * @description Authenticates a given user
 * @exports AuthenticateUser
 */
class Authenticator {
  /**
   * @static
   * @param {any} password - The user password to be hashed
   * @returns {object} - JSON response object
   *
   * @memberOf Authenticator
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  /**
   * @static
   * @param {any} password The user password
   * @param {any} hashPassword The hashed password
   * @returns {object} - JSON response object
   *
   * @memberOf Authenticator
   */
  static comparePassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  }

  /**
   * @static
   * @param {any} user The user object
   * @returns {object} - JSON response object
   *
   * @memberOf Authenticator
   */
  static generateToken(user) {
    const token = jwt.sign({ user }, process.env.JWTKEY, { expiresIn: '24h' });
    return token;
  }

  /**
   * @method isAuthenticated
   * @description Verifies that user is authenticated
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The next function
   * @returns {object} - JSON response object
   */
  static isAuthenticated(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      res.status(403).json({
        status: 403,
        error: 'Missing x-access-token in the request header',
      });
    } else {
      jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
        if (err) {
          return res.status(403).json({
            status: 403,
            message: 'Invalid token supplied',
          });
        }
        req.user = decoded.user;
        next();
      });
    }
  }

  /**
   * @method isAuthorised
   * @description Verifies that user is authorised
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The next function
   * @returns {object} - JSON response object
   */
  static isAuthorised(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      res.status(403).json({
        status: 404,
        message: 'Missing x-access-token in the request header',
      });
    } else {
      jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
        if (err) {
          return res.status(403).json({
            status: 403,
            error: 'Invalid token supplied',
          });
        }
        if (decoded.user.isadmin !== true) {
          return res.status(403).json({
            status: 403,
            error: 'Unauthorised User',
          });
        }
        req.user = decoded.user;
        next();
      });
    }
  }
}

export default Authenticator;
