import jwt from 'jsonwebtoken';
import 'dotenv/config';
import responseFormat from '../utils/index';

/**
 * @class AuthenticateUser
 * @description Authenticates a given user
 * @exports AuthenticateUser
 */
class Authenticator {
  /**
   * @static
   * @param {any} payload The payload
   * @returns {object} - JSON response object
   *
   * @memberOf Authenticator
   */
  static generateToken(payload) {
    const token = jwt.sign(payload, process.env.JWTKEY, { expiresIn: '24h' });
    return token;
  }

  /**
   * @method verifyToken
   * @description Verifies that user is authenticated
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The next function
   * @returns {object} - JSON response object
   */
  static verifyToken(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json(responseFormat({
        success: false,
        data: 'No token supplied',
      }));
    }
    token = token.slice(7);

    jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
      if (err) {
        return res.status(401).json(responseFormat({
          success: false,
          data: 'invalid token supplied',
        }));
      }
      req.user = decoded;
      next();
    });
  }

  /**
   * @method verifyUser
   * @description Verifies that user is authorised
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The next function
   * @returns {object} - JSON response object
   */
  static verifyUser(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json(responseFormat({
        success: false,
        data: 'No token supplied',
      }));
    }
    token = token.slice(7);

    jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
      if (err) {
        return res.status(403).json(responseFormat({
          success: false,
          data: 'invalid token supplied',
        }));
      }
      if (decoded.user.isadmin !== true) {
        return res.status(403).json(responseFormat({
          success: false,
          data: 'unauthorized user',
        }));
      }
      req.user = decoded.user;
      next();
    });
  }

  /**
   * @method isAdmin
   * @description Verifies that user is admin
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The next function
   * @returns {object} - JSON response object
   */
  static isAdmin(req, res, next) {
    const { role } = req.decoded;
    if (role === 'admin') {
      next();
    } else {
      return res.status(403).json(responseFormat({
        success: false,
        data: 'Admin privileges is needed'
      }));
    }
  }

  /**
   * @method isAuthor
   * @description Verifies that user is an author
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The next function
   * @returns {object} - JSON response object
   */
  static isAuthor(req, res, next) {
    const { role } = req.decoded;
    if (role === 'author') {
      next();
    } else {
      return res.status(403).json(responseFormat({
        success: false,
        data: 'Authors privileges is needed'
      }));
    }
  }
}

export default Authenticator;
