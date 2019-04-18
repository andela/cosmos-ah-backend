import { Comment } from '../models';
import { errorResponseFormat } from '../utils/index';
/**
   * @method comment
   * @description enable authenticated users to comment on existing article
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} - JSON new comment response object
   */

export const addComment = async (req, res) => {
  const { articleId } = req.params;
  const { body } = req;
  const { id } = req.user;

  try {
    const comment = await Comment.create({ ...body, articleId, userId: id });

    return res.status(201).json({
      data: comment,
      status: 'success',
    });
  } catch (error) {
    if (error.parent.constraint === 'comments_articleId_fkey') {
      return res.status(404).json(errorResponseFormat({
        status: 'error',
        message: 'invalid article id'
      }));
    }
    if (error.parent.file === 'uuid.c') {
      return res.status(404).json(errorResponseFormat({
        status: 'fail',
        message: 'invalid id of type UUID'
      }));
    }
  }
};
