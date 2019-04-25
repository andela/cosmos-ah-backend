import { likeDislike } from '../utils/likeDislike';
import { LikeComment } from '../models';
import { responseFormat, errorResponseFormat } from '../utils';

export const likeComment = async (req, res) => {
  const { id: userId } = req.user;
  const { id: commentId } = req.params;
  const condition = { userId, commentId };
  try {
    const likeCommentResult = await likeDislike(LikeComment, condition);
    const { like, likeCount } = likeCommentResult;
    if (like) {
      return res.status(200).json(
        responseFormat({
          status: 'success',
          data: { message: 'you successfully liked the comment', Like: likeCount },
        }),
      );
    }
    return res.status(200).json(
      responseFormat({
        status: 'success',
        data: { message: 'you successfully un-liked the comment', Like: likeCount },
      }),
    );
  } catch (error) {
    if (error.parent.constraint === 'like_comments_commentId_fkey') {
      return res
        .status(400)
        .json(errorResponseFormat({ message: 'commentId is not on comment Table' }));
    }
  }
};
