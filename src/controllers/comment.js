import { Comment, CommentEditHistory } from '../models';
import { errorResponseFormat, sendResponse } from '../utils/index';
import { getLastComment, commentIsTheSame } from '../utils/comment';
/**
 * @function addComment
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
        status: 'error',
        message: 'invalid id of type UUID'
      }));
    }
  }
};

/**
 * @description Updates a comment
 * @function updateComment
 * @param {object} req request object
 * @param {object} res response object
 * @returns {Response} Returns a server success or error response
 */
export const editComment = async (req, res) => {
  try {
    const { articleId, commentId } = req.params;
    const { body } = req.body;
    const criteria = { articleId, id: commentId };
    const comment = await Comment.findOne({ where: criteria });
    if (!comment) return sendResponse(res, 404, { responseType: 'fail', data: 'Comment does not exist' });
    if (comment.userId !== req.user.id) {
      return sendResponse(res, 422, { responseType: 'fail', data: 'You can only edit your comment' });
    }
    const lastComment = await getLastComment(comment.id);
    // track comment edit history
    const commentIsSame = commentIsTheSame(lastComment, body);
    if (commentIsSame) {
      await CommentEditHistory.create({ commentId, commentBody: comment.body });
    }
    const updatedComment = await comment.update({
      body: body || comment.body
    }, { where: criteria }, { returning: true });
    return sendResponse(res, 200, { responseType: 'success', data: updatedComment });
  } catch (error) {
    return sendResponse(res, 500, { responseType: 'error', data: 'internal server error occurred' });
  }
};

/**
 * @description Retrieves all comments
 * @function getAllComments
 * @param {object} req request object
 * @param {object} res response object
 * @returns {Response} Returns a server success or error response
 */
export const getAllComments = async (req, res) => {
  try {
    const { articleId } = req.params;
    const comments = await Comment.findAll({ where: { articleId } });
    return sendResponse(res, 200, { responseType: 'success', data: comments });
  } catch (error) {
    return sendResponse(res, 500, { responseType: 'error', data: 'internal server error occurred' });
  }
};

/**
 * @description Retrieves a single comment
 * @function getAComment
 * @param {object} req request object
 * @param {object} res response object
 * @returns {Response} Returns a server success or error response
 */
export const getAComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findByPk(commentId);
    const editHistory = await CommentEditHistory.findAll({ where: { commentId: comment.id } });
    return sendResponse(res, 200, { responseType: 'success', data: { comment, history: editHistory } });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'internal server error occurred' });
  }
};
