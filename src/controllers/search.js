import { Op } from 'sequelize';
import { responseFormat, errorResponseFormat } from '../utils';
import { Article } from '../models';

export const searchArticle = async (req, res) => {
  try {
    const { search } = req.body;
    const articleSearch = await Article.findAll({ limit: 10,
      where: { [Op.or]:
      { title: { [Op.iLike]: `%${search}%` },
        body: { [Op.iLike]: `%${search}%` },
        description: { [Op.iLike]: `%${search}%` } } },
      raw: true,
      attributes: ['id', 'title']
    });

    if (articleSearch.length > 0) {
      return res.status(200).json(responseFormat({
        status: 'success',
        data: articleSearch,
      }));
    }

    return res.status(404).json(errorResponseFormat({
      status: 'fail',
      message: 'No Search Record Found'
    }));
  } catch (error) {
    return res.status(500).json(errorResponseFormat({
      status: 'error',
      message: 'Server Error, Please try again Later'
    }));
  }
};
