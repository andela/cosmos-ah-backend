import jwt from 'jsonwebtoken';
import responseFormat from '../utils/index';

/**
 * @class AuthenticateUser
 * @description Authenticates a given user
 * @exports AuthenticateUser
 */
class Authenticator {
  /**
   * @static
   * @param {any} id The user
   * @returns {object} - JSON response object
   *
   * @memberOf Authenticator
   */
  static generateToken(id) {
    return jwt.sign({ id }, process.env.JWTKEY, { expiresIn: '24h' });
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
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401)
          .json(responseFormat({
            success: false,
            data: 'No token supplied',
          }));
      }
      jwt.verify(authorization, process.env.JWTKEY, (error, decodedToken) => {
        if (error) {
          return res.status(401)
            .json(responseFormat({ success: false, data: 'Invalid token supplied' }));
        }
        req.user = decodedToken;
      });
      next();
    } catch (err) {
      return res.status(401).json(responseFormat({ success: false, data: err }));
    }
  }

  /**
   * @method verifyUser
   * @description Verifies that user is authorised
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The next function
   * @returns {object} - JSON response object
   */
  static async verifyUser(req, res, next) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json(responseFormat({
          success: false,
          data: 'No token supplied',
        }));
      }
      const data = await jwt.verify(token, process.env.JWTKEY);
      console.log(data);
      next();
    } catch (error) {
      return res.status(401).json(responseFormat({ success: false, data: error }));
    }
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
