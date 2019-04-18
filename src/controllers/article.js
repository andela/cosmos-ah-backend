import sequelize from 'sequelize';
import { slug } from '../utils/article';
import { responseHandler, responseFormat, errorResponseFormat } from '../utils';
import { Article, Comment, Bookmark, Report, Sequelize } from '../models';

/**
 * @name addArticle
 * @description This is the method for inserting articles
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} Returns the inserted article after success
 */
export const addArticle = async (req, res) => {
  const { body } = req;
  const { id: userId } = req.user;
  try {
    const article = await Article.create({ userId, slug: slug(body.title), ...body });
    return responseHandler(res, 201, {
      status: 'success',
      message: 'Your article was successfully created!',
      data: article,
    });
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
  try {
    const { id } = req.params;
    const article = await Article.update(req.body, { where: { id }, returning: true });
    if (success === article[0]) {
      const [, [updatedArticle]] = article;
      return responseHandler(res, 202, {
        status: 'success',
        message: 'Article updated successfully!',
        data: updatedArticle,
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
    const destroyArticle = await Article.destroy({ where: { id } });
    if (destroyArticle >= deleted) {
      return responseHandler(res, 202, {
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
    if (error instanceof Sequelize.ForeignKeyConstraintError) {
      return res.status(500).json({
        status: 'error',
        message: error.parent.detail,
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Invalid request. Please check and try again',
    });
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
    const articles = await Article.findAll({
      where: { published: true },
      order: [['createdAt', 'ASC']],
      group: ['Article.id', 'comments.id'],
      include: [{
        model: Comment,
        as: 'comments',
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('comments.id')), 'all'],
        ],
        group: 'comments.id',
      }]
    });
    return responseHandler(res, 200, { status: 'success', data: articles });
  } catch (error) {
    return responseHandler(res, 500, { status: 'error', message: 'An internal server error occured!' });
  }
};

/**
 * @name getArticle
 * @description This is the method for deleting an article
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {int} Returns true after deleting an article
 * @returns {object} Returns response object
 */
export const getAnArticleByID = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findOne({
      where: { id, published: true },
      group: ['Article.id'],
      include: [{
        model: Comment,
        as: 'comments',
        limit: 10,
        offset: 0,
      }]
    });
    if (!article) { return responseHandler(res, 404, { status: 'fail', message: 'Article not found!' }); }
    return responseHandler(res, 200, { status: 'success', data: article });
  } catch (error) {
    return responseHandler(res, 500, { status: 'error', message: 'An internal server error occured!' });
  }
};
