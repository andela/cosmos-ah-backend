import jwt from 'jsonwebtoken';
import { responseFormat } from '../utils';

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
   * @method authenticateUser
   * @description Verifies that user is authenticated
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The next function
   * @returns {object} - JSON response object
   */
  static async authenticateUser(req, res, next) {
    let token = '';
    /* eslint-disable no-unused-vars */
    let str = '';
    const authorizationHeader = req.get('Authorization');
    if (!authorizationHeader) return res.status(400).json(responseFormat({ status: 'error', message: 'No authorization token present in header', }));
    if (authorizationHeader.startsWith('Bearer')) {
      [str, token] = req.get('Authorization').split(' ');
    } else {
      token = req.get('Authorization') ? req.get('Authorization') : req.headers.token;
    }
    if (!token) {
      return res.status(401)
        .json(responseFormat({
          status: 'error',
          message: 'No token supplied',
        }));
    }
    jwt.verify(token, process.env.JWTKEY, (error, decodedToken) => {
      if (error) {
        return res.status(401)
          .json(responseFormat({ status: 'error', message: 'Invalid token supplied' }));
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
        status: 'fail',
        data: 'you are not authorised to access this route'
      }));
    }
  }
}

export default Authenticator;
