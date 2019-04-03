import bcrypt from 'bcryptjs';
import 'dotenv/config';

const utilsFunctions = {
  /**
   * @static
   * @param {any} password - The user password to be hashed
   * @returns {object} - JSON response object
   *
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },

  /**
   * @param {any} password The user password
   * @param {any} hashPassword The hashed password
   * @returns {object} - JSON response object
   *
   */
  comparePassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  }
};

export default utilsFunctions;
