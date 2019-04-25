import Validator from 'validatorjs';

/**
 * @description This is the method for validating comment before inserting
 * @param {object} payload The request object
 * @returns {function} Returns validation object
 */

export const validateComment = (payload) => {
  const rules = {
    body: 'required',
  };

  const errorMessages = {
    'required.body': 'comment body is required'

  };
  return new Validator(payload, rules, errorMessages);
};

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
