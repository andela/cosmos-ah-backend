import models from '../models';
import { responseFormat, errorResponseFormat } from '../utils/index';

const search = async (req, res) => {
  try {
    const searchResults = await models.sequelize.query(`
    SELECT id, title
    FROM articles
    WHERE _search @@ plainto_tsquery('english', :query);
  `, {
      model: models.Article,
      replacements: { query: req.body.search },
    });

    if (searchResults[0]) {
      return res.status(200).json(responseFormat({
        status: 'success',
        data: searchResults
      }));
    }

    return res.status(404).json(responseFormat({
      status: 'fail',
      data: {
        message: 'No Search Record found'
      }
    }));
  } catch (error) {
    console.log(error);
    return res.status(500).json(errorResponseFormat({
      message: 'Server error. Please Try again Later. Thanks'
    }));
  }
};

export default search;
