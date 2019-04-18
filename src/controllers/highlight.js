import { Highlight } from '../models';
import { errorResponseFormat, responseFormat } from '../utils';

const highlightArticle = async (req, res) => {
  const { id: userId } = req.user;
  const { id: articleId } = req.params;
  const { startIndex, stopIndex, comment } = req.body;
  const condition = { userId, articleId };

  if (!startIndex || !stopIndex) {
    return res.status(403).json(
      errorResponseFormat({
        status: 'fail',
        message: 'Start Index and stop index is required'
      })
    );
  }

  try {
    const highlightedText = await Highlight.findOrCreate({
      where: condition,
      defaults: { highlightedTextIndex: { startIndex, stopIndex }, comment }
    });
    const { isNewRecord } = highlightedText;
    if (!isNewRecord) {
      const updateHighlightedText = await Highlight.update(
        {
          userId,
          articleId,
          highlightedTextIndex: JSON.stringify({ startIndex, stopIndex }),
          comment
        },

        { returning: true, where: condition }
      );
      if (updateHighlightedText) {
        return res.status(201).json(
          responseFormat({
            status: 'success',
            message: 'Article Successfully highlighted'
          })
        );
      }
    }
  } catch (error) {
    if (error.parent.constraint === 'highlights_articleId_fkey') {
      return res
        .status(400)
        .json(
          errorResponseFormat({
            status: 'fail',
            message: 'articleId is not on Article Table'
          })
        );
    }
  }
};

export default highlightArticle;
