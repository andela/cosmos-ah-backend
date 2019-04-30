import { LikeArticle } from '../models';
import { responseFormat, errorResponseFormat } from '../utils';
import { likeDislike } from '../utils/comment';

const likeArticle = async (req, res) => {
  const { id: userId } = req.user;
  const { id: articleId } = req.params;
  const condition = { userId, articleId };

  try {
    const likeCommentResult = await likeDislike(LikeArticle, condition);
    const { like, likeCount } = likeCommentResult;
    if (like) {
      return res.status(200).json(
        responseFormat({
          status: 'success',
          data: { message: 'you successfully liked the article', Like: likeCount },
        }),
      );
    }
    return res.status(200).json(
      responseFormat({
        status: 'success',
        data: { message: 'you successfully un-liked the article', Like: likeCount },
      }),
    );
  } catch (error) {
    if (error.parent.constraint === 'like_articles_articleId_fkey') {
      return res
        .status(400)
        .json(errorResponseFormat({ message: 'ArticleId is not on Article Table' }));
    }
  }
};

export default likeArticle;
