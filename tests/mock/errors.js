/**
 * @class
 * @description mocks Sequelize ForiegnConstraintError class
 */
class ForeignKeyConstraintError extends Error { }

/**
 * @class
 * @description mocks Sequelize DatabaseError
 */
class DatabaseError extends Error { }

const Sequelize = {
  ForeignKeyConstraintError,
  DatabaseError
};

export default Sequelize;
