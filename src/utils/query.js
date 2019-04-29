/**
 * @name findById
 * @description This is function for getting records by primary key
 * @param {object} Model The object model
 * @param {object} id Containing the primary key
 * @param {object} conditions Containing optional conditions
 * @returns {object} Returns record query
 */
export const findById = async (Model, { id, articleId, }, conditions = null) => {
  id = !id ? articleId : id;
  const record = await Model.findByPk(id, { where: conditions });
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
