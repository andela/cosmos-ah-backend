/* eslint-disable max-len */
import db, { User, Article } from '../models';

import {
  responseHandler,
} from '../utils';

export const getFeeds = async (req, res) => {
  try {
    const { user: { id } } = req;
    const followersFeeds = await db.sequelize.query('SELECT "users"."id" AS "primaryId", "users"."fullName", "users"."imageUrl" AS "userImage", "users"."email", "users"."bio", "articles"."id" AS "articleId", "articles"."userId", "articles"."title", "articles"."slug", "articles"."description", "articles"."body", "articles"."imageUrl", "articles"."published", "articles"."tags", "articles"."favouritesCount","articles". "readCount", "articles"."totalReadTime", "articles"."isDeletedByAuthor", "articles"."createdAt", "articles"."updatedAt" FROM "users" LEFT JOIN "followers" ON "followers"."followerId" = "users"."id" RIGHT JOIN "articles" ON "articles"."userId" = "users"."id" WHERE "followers"."userId" = (:id) AND "articles"."published" = true ORDER BY "articles"."createdAt" DESC', {
      replacements: { id, },
      model: User,
      mapToModel: true,
      raw: true,
    });
    const newArticleFeeds = await Article.findAll({
      where: { published: true },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'author'
        }
      ],
      limit: 5,
    });
    const mostReadArticleFeeds = await Article.findAll({
      where: { published: true },
      order: [['favouritesCount', 'DESC'], ['readCount', 'DESC']],
      include: [
        {
          model: User,
          as: 'author'
        }
      ],
      plain: true,
    });
    return responseHandler(res, 202, { data: {
      followersFeeds,
      newArticleFeeds,
      mostReadArticleFeeds
    } });
  } catch (error) {
    return responseHandler(res, 500, {
      status: 'error',
      message: 'Your feeds could not be loaded at this moment',
    });
  }
};
