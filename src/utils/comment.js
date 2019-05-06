import Validator from 'validatorjs';
import { CommentEditHistory } from '../models';

/**
 * @description This is the method for validating comment before inserting
 * @param {object} payload The request object
 * @returns {function} Returns validation object
 */

export const validateComment = (payload) => {
  const rules = {
    body: 'required|string',
  };

  const errorMessages = {
    'required.body': 'comment body is required',
    'string.body': 'comment must be a string',

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

export const getLastComment = async (commentId) => {
  try {
    const histories = await CommentEditHistory.findAll({ where: { commentId }, raw: true });
    const lastHistory = histories[histories.length - 1];
    return lastHistory ? lastHistory.commentBody : '';
  } catch (error) {
    throw error;
  }
};

export const commentIsTheSame = (oldComment, newComment) => oldComment !== newComment;
