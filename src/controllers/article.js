import { slug } from '../utils/article';
import { Article, Rating } from '../models';
import { getArticleAuthor, sendServerResponse } from '../utils';

/**
 * @name AddArticles
 * @description This is the method for inserting articles
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {int} Returns the inserted article after success
 */
export const AddArticles = async (req, res) => {
  const { body } = req;
  try {
    const article = await Article.create({ ...body, slug: slug(body.title) });
    return res.status(201).json({ status: true, message: 'Your article was successfully created!', data: article });
  } catch (error) {
    return res.status(500).json({ status: false, message: 'For some reason, We can\'t save your article, please try again!' });
  }
};

/**
 * @name UpdateArticle
 * @description This is the method for updating an article
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {int} Returns the updated article
 */
export const UpdateArticle = async () => true;

/**
 * @name DeleteArticle
 * @description This is the method for deleting an article
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {int} Returns true after deleting an article
 */
export const DeleteArticle = async () => true;

/**
 * @function rateArticle
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} Responds to the client
 * with a success or a failure response payload
 */
export const rateArticle = async (req, res) => {
  try {
    const userId = '979eaa2e-5b8f-4103-8192-4639afae2ba3'; // this will be a value from the user's decoded token
    const articleAuthor = await getArticleAuthor(Article, userId);
    if (articleAuthor.id === req.params.articleId) {
      // this is an article owned by the user
      return sendServerResponse(res, 409, {
        success: false,
        data: 'You cannot rate your own article'
      });
    }
    const rating = await Rating.create({
      userId,
      articleId: req.params.articleId,
      value: req.body.rating
    });
    return sendServerResponse(res, 201, ({
      success: true,
      data: rating
    }));
  } catch (e) {
    return sendServerResponse(res, 500, ({
      success: false,
      data: 'Invalid request'
    }));
  }
};
