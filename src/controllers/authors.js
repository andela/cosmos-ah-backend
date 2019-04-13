import { User } from '../models';

const getAuthors = (req, res) => {
  User.findAll({
    where: { role: 'author' },
  }).then((authors) => {
    res.status(200).json({ status: 'success', data: authors });
  });
};
export default getAuthors;
