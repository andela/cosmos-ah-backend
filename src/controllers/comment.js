import { Comment } from '../models';
import { responseFormat, errorResponseFormat } from '../utils/index';
/**
   * @method comment
   * @description enable authenticated users to comment on existing article
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} - JSON new comment response object
   */

export const addComment = async (req, res) => {
  const { body } = req;
  const { id } = req.user;

  try {
    const comment = await Comment.create({ ...body, userId: id });
    return res.status(201).json(responseFormat({
      data: { comment },
      status: 'success'
    }));
  } catch (error) {
    console.log(error);

    if (error.parent.constraint === 'comments_userId_fkey') {
      return res.status(409).json(errorResponseFormat({
        message: 'invalid user id'
      }));
    }
    if (error.parent.constraint === 'comments_articleId_fkey') {
      return res.status(409).json(errorResponseFormat({
        message: 'invalid article id'
      }));
    }
    if (error.parent.file === 'uuid.c') {
      return res.status(409).json(errorResponseFormat({
        message: 'invalid id of type UUID'
      }));
    }
  }
};
