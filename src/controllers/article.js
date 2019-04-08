import { slug } from '../utils/article';
import { sendResponse, responseHandler, omitProps } from '../utils';
import { Article, Rating } from '../models';

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
    const article = await Article.create({ userId, slug: slug(body.title), ...body, });
    return responseHandler(res, 201, { status: 'success', message: 'Your article was successfully created!', data: article });
  } catch (error) {
    const { name: errorName } = error;
    if (errorName === 'SequelizeForeignKeyConstraintError') { return responseHandler(res, 401, { status: 'fail', message: 'You are unauthorized!' }); }
    return responseHandler(res, 500, { status: 'error', message: 'For some reason, We can\'t save your article, please try again!' });
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
      return responseHandler(res, 202, { status: 'success', message: 'Article updated successfully!', data: updatedArticle });
    }
  } catch (error) {
    return responseHandler(res, 500, { status: 'error', message: 'We are responsible for failing to update your article, please try again!' });
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
    if (destroyArticle >= deleted) { return responseHandler(res, 202, { status: 'success', message: 'Your article has been removed.' }); }
  } catch (error) {
    return responseHandler(res, 500, { status: 'error', message: 'We are responsible for failing to update your article, please try again!' });
  }
};

/**
 * @function rateArticle
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} Returns server response to user
 */
export const rateArticle = async (req, res) => {
  const { user, params, body } = req;
  const { articleId, userId = user.id } = params;
  try {
    const [rating, created] = await Rating.findOrCreate({
      where: { userId, articleId },
      defaults: {
        userId,
        articleId,
        value: body.rating
      }
    });
    if (!created) {
      const updatedRating = await rating.update({
        value: body.rating
      }, { returning: true });
      return sendResponse(res, 200, {
        responseType: 'success',
        data: omitProps(updatedRating.dataValues, ['createdAt', 'updatedAt'])
      });
    }
    return sendResponse(res, 201, {
      responseType: 'success',
      data: omitProps(rating.dataValues, ['createdAt', 'updatedAt'])
    });
  } catch (error) {
    return sendResponse(res, 500, {
      responseType: 'error',
      data: 'Invalid request. Please check and try again'
    });
  }
};
