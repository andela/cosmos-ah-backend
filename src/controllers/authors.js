import { User } from '../models';

const getAuthors = async (req, res) => {
  try {
    const authors = User.findAll({
      where: { role: 'author' },
    });

    if (authors) {
      res.status(200).json({ status: 'success', data: authors });
    }

    if (authors.length === 0) {
      res.status(200).json({ status: 'success', message: 'The is no Author on the database' });
    }
  } catch (error) {
    console.log(error);
  }
};
export default getAuthors;
