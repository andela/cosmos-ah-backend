import { Article } from '../models/index';
import { responseFormat, responseErrorFormat, validateArticleTag } from '../utils/index';

const articleTag = async (req, res) => {
  try {
    const { tags, userId } = req.body;
    const validate = await validateArticleTag(req.body);
    if (validate.fails()) return res.status(400).json(validate.errors.all());
    const articleUpdate = await Article.update(
      {
        tags
      },
      {
        where: {
          id: req.params.id,
          userId
        },
      },
    );
    if (articleUpdate) {
      return res.status(200).json(responseFormat({
        success: true,
        data: { message: 'Tags Updated successfully' },
      }));
    }
  } catch (error) {
    return res.status(500).json(responseErrorFormat({
      success: false,
      message: 'Something Went Wrong'
    }));
  }
};

export default articleTag;
