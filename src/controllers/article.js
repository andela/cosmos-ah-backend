import { slug } from '../utils/article';
import { Article } from '../models';

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
