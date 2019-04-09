import jwt from 'jsonwebtoken';
import { responseFormat } from '../utils/index';

/**
 * @class AuthenticateUser
 * @description Authenticates a given user
 * @exports AuthenticateUser
 */
class Authenticator {
  /**
   * @static
   * @param {object} user The user
   * @returns {object} - JSON response object
   *
   * @memberOf Authenticator
   */
  static generateToken(user) { // { id, full_name, email , username , role }
    return jwt.sign(user, process.env.JWTKEY, { expiresIn: '1 day' });
  }

  /**
   * @method verifyToken
   * @description Verifies that user is authenticated
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The next function
   * @returns {object} - JSON response object
   */
  static async verifyToken(req, res, next) {
    let token = '';
    /* eslint-disable no-unused-vars */
    let str = '';
    if (req.get('Authorization').startsWith('Bearer')) {
      [str, token] = req.get('Authorization').split(' ');
    } else {
      token = req.get('Authorization') ? req.get('Authorization') : req.headers.token;
    }
    if (!token) {
      return res.status(401)
        .json(responseFormat({
          success: false,
          data: 'No token supplied',
        }));
    }
    jwt.verify(token, process.env.JWTKEY, (error, decodedToken) => {
      if (error) {
        return res.status(401)
          .json(responseFormat({ success: false, data: 'Invalid token supplied' }));
      }
      req.user = decodedToken;
    });
    next();
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
    const { role } = req.user;
    if (role === 'admin') {
      next();
    } else {
      return res.status(403).json(responseFormat({
        success: false,
        data: 'you are not authorised to access this route'
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
        data: 'you are not authorised to access this route'
      }));
    }
  }
}

export default Authenticator;
