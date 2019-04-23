/**
 * @name findById
 * @description This is function for getting records by primary key
 * @param {object} Model The object model
 * @param {string} id The primary key
 * @returns {object} Returns record query
 */
export const findById = async (Model, id) => {
  const record = await Model.findByPk(id);
  return record;
};

/**
 * @name findAndCount
 * @description This is function for counting records via query
 * @param {object} Model The object model
 * @param {object|null|void} param The certain conditionals for the query to run
 * @returns {object} Returns record query
 */
export const findAndCount = async (Model, param = null) => {
  const record = await Model.findAndCountAll(param);
  return record;
};

export default findById;
