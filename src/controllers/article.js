import { validateArticle, slug } from '../utils/article';
import { Article } from '../models';

/**
 * @name AddArticles
 * @description This is the method for inserting articles
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {int} Returns the inserted article after success
 */
export const AddArticles = async (req, res) => {
  const validate = await validateArticle(req.body);
  if (validate.fails()) return res.status(400).json(validate.errors.all());
  req.body.slug = slug(req.body.title);
  const article = await Article.create(req.body);
  return res.status(201).json(article);
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
