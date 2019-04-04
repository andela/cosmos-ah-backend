import jwt from 'jsonwebtoken';

/**
 * @function generateMockToken
 * @returns {String} Returns a mock JWT string
 */
export const generateMockToken = () => jwt.sign({
  id: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
  role: 'admin'
}, 'jwt-secret-key');

/**
 * @function articleExist
 * @param {*} Article
 * @param {*} ratingInstance
 * @returns {Promise<Boolean>} Resolves to true if article exist, false otherwise
 */
export const articleExist = async (Article, ratingInstance) => {
  try {
    const article = await Article.findOne({
      where: {
        userId: ratingInstance.userId,
        articleId: ratingInstance.articleId
      }
    });
    return article !== null;
  } catch (e) {
    throw e;
  }
};

/**
 * @function getArticleAuthor
 * @param {*} Article
 * @param {*} userId
 * @returns {Promise} Resolves to an article author with id: `userId` or null
 */
export const getArticleAuthor = (Article, userId) => Article.findOne({ where: { userId } });

/**
 * @function sendServerResponse
 * @param {Response} res
 * @param {Number} status
 * @param {*} payload
 * @returns {res} Express response object
 */
export const sendServerResponse = (res, status, payload) => res.status(status)
  .json(payload);

export default {
  generateMockToken
};
