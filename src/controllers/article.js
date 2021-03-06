import sequelize from 'sequelize';
import {
  Article,
  Comment,
  Bookmark,
  Report,
  Rating,
  Sequelize,
  ArticleReadHistory,
  User,
} from '../models';
import { slug, userAuthoredThisArticle, getRawArticleResults } from '../utils/article';
import {
  responseHandler,
  responseFormat,
  errorResponseFormat,
  omitProps,
  sendResponse,
  handleDBErrors,
  addArticleToReadHistory,
  addRatingAverageToArticles
} from '../utils';
import { findAndCount } from '../utils/query';
import { notify } from '../services/notifyFollowers';
import { saveNotifications } from '../services/notificationHandler';

/**
 * @name addArticle
 * @description This is the method for inserting articles
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} Returns the inserted article after success
 */
export const addArticle = async (req, res) => {
  try {
    const { body, user } = req;
    const { id: userId, fullName, email, imageUrl, username, } = req.user;
    delete body.isDeletedByAuthor;
    let article = await Article.create({ userId, slug: slug(body.title), ...body });
    const { dataValues } = article;
    article = { author: { id: userId, fullName, email, imageUrl, username, }, ...dataValues };
    responseHandler(res, 201, {
      status: 'success',
      message: 'Your article was successfully created!',
      data: article,
    });
    if (article.published) {
      await saveNotifications(user, article, {
        message: `${fullName} just published an article`,
        subjectUrl: article.slug,
      });
      await notify(article, 'article-created');
    }
  } catch (error) {
    const { name: errorName } = error;
    if (errorName === 'SequelizeForeignKeyConstraintError') {
      return responseHandler(res, 401, { status: 'fail', message: 'You are unauthorized!' });
    }
    return responseHandler(res, 500, {
      status: 'error',
      message: "For some reason, We can't save your article, please try again!",
    });
  }
};

/**
 * @name editArticle
 * @description This is the method for updating an article
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} Returns the updated article
 */
export const editArticle = async (req, res) => {
  const success = 1;
  const { body, user } = req;
  const { id: userId, fullName, email, imageUrl, username, } = user;
  delete body.isDeletedByAuthor;
  try {
    const { id } = req.params;
    const article = await Article.update(body, { where: { id }, returning: true });
    if (success === article[0]) {
      const [, [updatedArticle]] = article;
      return responseHandler(res, 202, {
        status: 'success',
        message: 'Article updated successfully!',
        data: {
          ...updatedArticle.get({ plain: true }),
          author: { id: userId, fullName, email, imageUrl, username, },
          },
      });
    }
  } catch (error) {
    return responseHandler(res, 500, {
      status: 'error',
      message: 'We are responsible for failing to update your article, please try again!',
    });
  }
};

/**
 * @name editArticleTag
 * @description This is the method for updating Tags of an article
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} Returns the updated Tags.
 */
export const editArticleTag = async (req, res) => {
  const success = 1;
  try {
    const { id } = req.params;
    const { tags } = req.body;
    const { id: userId } = req.user;
    const articleTag = await Article.update({ tags }, { where: { id, userId }, returning: true });
    if (success === articleTag[0]) {
      const [, [updatedArticleTag]] = articleTag;
      return responseHandler(res, 200, { status: 'success', message: 'Article Tags Updated Successfully!', data: { tags: updatedArticleTag.tags } });
    }
    return responseHandler(res, 404, { status: 'error', message: 'This Article does not exist' });
  } catch (error) {
    if (error.name === 'SequelizeDatabaseError') {
      if (error.parent.file === 'uuid.c') {
        return responseHandler(res, 400, { status: 'error', message: 'Invalid articleId supplied' });
      }
    }
    return responseHandler(res, 500, { status: 'error', message: 'Something Went Wrong. Please Retry later.' });
  }
};

/**
 * @name deleteArticle
 * @description This is the method for deleting an article
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {int} Returns true after deleting an article
 * @returns {object} Returns boolean
 */
export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = 1;
    const destroyArticle = await Article.update(
      { isDeletedByAuthor: true },
      { where: { id }, },
    );
    if (destroyArticle >= deleted) {
      return responseHandler(res, 200, {
        status: 'success',
        message: 'Your article has been removed.',
      });
    }
  } catch (error) {
    return responseHandler(res, 500, {
      status: 'error',
      message: 'We are responsible for failing to update your article, please try again!',
    });
  }
};

export const bookmarkArticle = async (req, res) => {
  const { id } = req.user;
  const { articleId } = req.params;

  try {
    const [, isNewRecord] = await Bookmark.findOrCreate({
      where: { articleId, userId: id },
    });

    if (!isNewRecord) {
      const unbookmarked = await Bookmark.destroy({ where: { articleId, userId: id } });
      if (unbookmarked) {
        return res.status(200).json(
          responseFormat({
            status: 'success',
            message: 'Your article has been unbookmarked',
          }),
        );
      }
    } else {
      return res.status(201).json(
        responseFormat({
          status: 'success',
          message: 'Your article has been bookmarked',
        }),
      );
    }
  } catch (error) {
    if (error.parent.constraint === 'bookmarks_articleId_fkey') {
      return res.status(404).json(
        errorResponseFormat({
          message: 'invalid article id',
        }),
      );
    }
    if (error.parent.file === 'uuid.c') {
      return res.status(404).json(
        errorResponseFormat({
          message: 'invalid artcile id of type UUID',
        }),
      );
    }
  }
};

/**
 * @function reportArticle
 * @param {Request} req The request object
 * @param {Response} res The response object
 * @returns {Object} Returns the server response
 * @description This reports the article
 */
export const reportArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const { description, category } = req.body;
    const { id: reporterId } = req.user;
    await Report.create({
      articleId,
      reporterId,
      description,
      reportCategory: category,
    });
    return res.status(200).json({
      status: 'success',
      data: {
        message: 'Your report has been sent successfully',
      },
    });
  } catch (error) {
    handleDBErrors(error, { req, Sequelize }, message => sendResponse(res, 500, {
      responseType: 'error',
      data: message
    }));
  }
};


/**
 * @function rateArticle
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} Returns server response to user
 */
export const rateArticle = async (req, res) => {
  try {
    const { rating: userRating } = req.body;
    const { articleId } = req.params;
    const { id: userId } = req.user;
    const articleBelongsToUser = await userAuthoredThisArticle(Article, { articleId, userId });
    if (articleBelongsToUser) {
      return sendResponse(res, 409, {
        responseType: 'fail',
        data: 'You cannot rate your article'
      });
    }
    const [rating, created] = await Rating.findOrCreate({
      where: { userId, articleId },
      defaults: {
        userId,
        articleId,
        value: userRating
      },
      attributes: ['id', 'articleId', 'userId', 'value']
    });

    if (!created) {
      const updatedRating = await rating.update({ value: userRating }, { returning: true });
      return sendResponse(res, 200, {
        responseType: 'success',
        data: omitProps(updatedRating.get({ plain: true }), ['createdAt', 'updatedAt']),
      });
    }
    return sendResponse(res, 201, {
      responseType: 'success',
      data: rating,
    });
  } catch (error) {
    handleDBErrors(error, { req, Sequelize }, message => sendResponse(res, 500, {
      responseType: 'error',
      data: message
    }));
  }
};

/**
 * @name getAllArticles
 * @description This is the method for deleting an article
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {int} Returns true after deleting an article
 * @returns {object} Returns response object
 */
export const getAllArticles = async (req, res) => {
  try {
    let { query: { page, limit } } = req;
    const regex = new RegExp('^\\d+$');
    page = regex.test(page) ? parseInt(page, 10) : 1;
    limit = regex.test(limit) ? parseInt(limit, 10) : 10;
    const { count } = await findAndCount(Article, { where: {} });
    const pages = Math.ceil(count / limit);
    const offset = limit * (page - 1);
    const paginate = { limit, offset, subQuery: false };

    const articles = await Article.findAll({
      where: { published: true, isDeletedByAuthor: false, },
      order: [['createdAt', 'ASC']],
      group: ['Article.id', 'comments.id', 'author.id', 'ratings.id'],
      ...paginate,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'fullName', 'username', 'imageUrl']
        },
        {
          model: Comment,
          as: 'comments',
          attributes: [
            [sequelize.fn('COUNT', sequelize.col('comments.id')), 'all'],
          ],
        },
        {
          model: Rating,
          as: 'ratings',
          attributes: ['id', 'value', 'userId'],
          raw: true
        }
      ]
    });
    const parsedArticles = addRatingAverageToArticles(getRawArticleResults(articles));
    return responseHandler(res, 200, { status: 'success', data: parsedArticles, pages, });
  } catch (error) {
    return responseHandler(res, 500, { status: 'error', message: 'An internal server error occured!' });
  }
};

/**
 * @name getArticle
 * @description This is the method for deleting an article
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {boolean} Returns true after deleting an article
 * @returns {object} Returns response object
 */
export const getAnArticleByID = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findOne({
      where: { id, isDeletedByAuthor: false, },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'fullName', 'username', 'imageUrl']
        },
        {
          model: Comment,
          as: 'comments',
          limit: 10,
          offset: 0,
        }
      ],
    });
    let altMessage = null;
    if (article && article.published === false) {
      altMessage = 'The article you are trying to access has not yet been publshed';
    }
    if (!article || (article && article.published === false)) { return responseHandler(res, 404, { status: 'fail', type: altMessage ? 'publish' : null, message: altMessage || 'Article not found!' }); }
    // This article will be added to this user read history
    if (req.user) {
      await addArticleToReadHistory(id, req.user.id);
    }
    return responseHandler(res, 200, { status: 'success', data: article });
  } catch (error) {
    return responseHandler(res, 500, { status: 'error', message: 'An internal server error occured!' });
  }
};

/**
 * @name publishArticle
 * @description This is the method for deleting an article
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {boolean} Returns true after deleting an article
 * @returns {object} Returns response object
 */
export const publishArticle = async (req, res) => {
  try {
    const { articleId: id, } = req.params;
    const article = await Article.update({ published: true, }, { where: { id, }, returning: true });
    if (!article) { return responseHandler(res, 404, { status: 'fail', message: 'Article not found!' }); }
    const [, [publishedArticle]] = article;
    return responseHandler(res, 200, {
      status: 'success',
      message: 'Your article has been published!',
      data: publishedArticle,
    });
  } catch (error) {
    return responseHandler(res, 500, { status: 'error', message: 'An internal server error occured!' });
  }
};

/* @description This gets the reading stats of the user
 * @function getReadingStats
 * @param {Request} req
 * @param {Response} res
 * @returns {object} Returns response object
*/
export const getReadingStats = async (req, res) => {
  try {
    const userReadHistory = await ArticleReadHistory.findAll({
      where: { userId: req.user.id },
      include: [{
        model: Article,
        as: 'article',
        attributes: ['id', 'title', 'slug']
      }],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    const readArticles = userReadHistory.map(history => history.article);

    return res.status(200).json({
      status: 'success',
      data: {
        totalArticleReadCount: readArticles.length,
        articles: readArticles,
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'internal server error occurred'
    });
  }
};
