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
      replacements: { query: req.params.search },
    });

    if (searchResults) {
      return res.status(200).json(responseFormat({
        status: 'success',
        data: {
          searchResults
        },
      }));
    }
  } catch (error) {
    return res.status(500).json(errorResponseFormat({
      message: 'Something Went Wrong',
    }));
  }
};

export default search;
