import { User } from '../models';
import { responseFormat, errorResponseFormat } from '../utils';

const getAuthors = async (req, res) => {
  try {
    const authors = User.findAll({
      where: { role: 'author' },
    });

    if (authors) {
      return res.status(200).json(responseFormat({ status: 'success', data: authors }));
    }
  } catch (error) {
    return res.status(500).json(errorResponseFormat({ status: 'error', message: 'Something went wrong' }));
  }
};
export default getAuthors;
