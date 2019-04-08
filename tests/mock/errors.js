
/**
 * @module
 * @description A collection of mock Sequelize error classes
 */

/**
 * @class
 * @description A mock DatabaseError class
 */
class DatabaseError extends Error { }

/**
 * @class
 * @description A mock ValidationError class
 */
class ValidationError extends Error {
  /**
     * @constructor
     * @description Initializes instances of `ValidationError`
     * @param {String} message
     */
  constructor(message) {
    super(message);
    this.errors = [];
  }
}

/**
 * @class
 * @description A mock  ValidationErrorItem class
 */
class ValidationErrorItem extends Error {}

/**
 * @class
 * @description A mock ForeignKeyConstraintError class
 */
class ForeignKeyConstraintError extends Error {}

const Sequelize = {
  DatabaseError,
  ValidationError,
  ValidationErrorItem,
  ForeignKeyConstraintError
};

export default Sequelize;
