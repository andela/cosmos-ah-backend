export const likeDislike = async (Model, condition) => {
  const [, isNewRecord] = await Model.findOrCreate({ where: condition });
  const { userId, ...countCondition } = condition;
  if (!isNewRecord) {
    const deleteRecord = await Model.destroy({ where: condition });
    if (deleteRecord) {
      const likeCount = await Model.count({ where: countCondition });
      return { like: false, likeCount };
    }
  } else {
    const likeCount = await Model.count({ where: countCondition });
    return { like: true, likeCount };
  }
};
