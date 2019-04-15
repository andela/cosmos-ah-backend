export const findById = async (Model, id) => {
  const record = await Model.findByPk(id);
  return record;
};

export default findById;
