import { Like } from '../models';
import { responseFormat, errorResponseFormat } from '../utils';

const likeArticle = (req, res) => {
  const { id: userId } = req.user;
  const { articleid: articleId } = req.params;
  const condition = { userId, articleId };
  console.log(condition);
  Like.findOrCreate({ where: condition })
    .then((likedArticle) => {
      console.log(likedArticle);
      if (!likedArticle[1]) {
        Like.destroy({ where: condition }).then((result) => {
          if (result) {
            Like.count({ where: { articleId } }).then(articleLikeCount => res.status(200).json(
              responseFormat({
                status: 'success',
                data: { message: 'you successfully liked the Article', Like: articleLikeCount },
              }),
            ),
            );
          }
        });
      } else {
        Like.count({ where: { articleId } }).then(articleLikeCount => res.status(200).json(
          responseFormat({
            status: 'success',
            data: { message: 'you successfully liked the Article', Like: articleLikeCount },
          }),
        ),
        );
      }
    })
    .catch((error) => {
      if (error.parent.constraint === 'likes_articleId_fkey') {
        return res
          .status(400)
          .json(errorResponseFormat({ message: 'articleId is not in the database' }));
      }
    });
};
export default likeArticle;
