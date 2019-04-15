import isUUID from 'validator/lib/isUUID';
import { Like } from '../models';
import { responseFormat, errorResponseFormat } from '../utils';

const likeArticle = async (req, res) => {
  const { id: userId } = req.user;
  const { articleid: articleId } = req.params;
  const condition = { userId, articleId };
  if (!isUUID(articleId, '4')) {
    return res.status(400).json(errorResponseFormat({ message: 'invalid Article Id' }));
  }

  try {
    const likedArticle = await Like.findOrCreate({ where: condition });
    if (!likedArticle[1]) {
      const unlikeArticle = await Like.destroy({ where: condition });
      if (unlikeArticle) {
        const articleLikeCount = await Like.count({ where: { articleId } });
        return res.status(200).json(
          responseFormat({
            status: 'success',
            data: { message: 'you successfully unliked the Article', Like: articleLikeCount },
          }),
        );
      }
    } else {
      const articleLikeCount = await Like.count({ where: { articleId } });
      return res.status(200).json(
        responseFormat({
          status: 'success',
          data: { message: 'you successfully liked the Article', Like: articleLikeCount },
        }),
      );
    }
  } catch (error) {
    if (error.parent.constraint === 'likes_articleId_fkey') {
      return res
        .status(400)
        .json(errorResponseFormat({ message: 'articleId is not on Article Table' }));
    }
  }
};
export default likeArticle;
