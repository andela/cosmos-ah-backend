import { Op } from 'sequelize';
import { User, Article, Comment, LikeArticle, LikeComment } from '../models';
import { responseHandler } from '../utils';

export const getAllLikes = async (req, res) => {
  try {
    const {
      user: { id },
    } = req;
    const article = await Article.findAll({
      where: { userId: id, published: true, isDeletedByAuthor: false },
      attributes: ['id', 'title', 'slug'],
      groupBy: ['likes', 'comments'],
      raw: true,
      include: [
        {
          model: LikeArticle,
          as: 'article_likes',
          where: {
            id: {
              [Op.ne]: null,
            },
          },
          attributes: ['createdAt'],
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: User,
              as: 'user',
              attributes: [
                'id',
                'fullName',
                'email',
                'username',
                'imageUrl',
              ],
            },
          ],
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['createdAt'],
          order: [['createdAt', 'DESC']],
          where: {
            id: {
              [Op.ne]: null,
            },
          },
          include: [
            {
              model: LikeComment,
              as: 'liked_comments',
              order: [['createdAt', 'DESC']],
              attributes: ['createdAt'],
              where: {
                id: {
                  [Op.ne]: null,
                },
              },
              include: [
                {
                  model: User,
                  as: 'user',
                  attributes: [
                    'id',
                    'fullName',
                    'email',
                    'username',
                    'imageUrl',
                  ],
                },
              ],
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return responseHandler(res, 200, {
      status: 'success',
      article,
      data: article,
    });
  } catch (error) {
    console.log(error);
    return responseHandler(res, 500, {
      status: 'error',
      message: 'An internal server occured!',
    });
  }
};
