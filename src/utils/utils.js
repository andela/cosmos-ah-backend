import bcrypt from 'bcryptjs';

const utilsFunctions = {
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
