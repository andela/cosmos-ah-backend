import validate from '../../utils/auth/login';

const checkFields = async (req, res, next) => {
  const checkLoginField = await validate(req.body);
  if (checkLoginField.fails()) return res.status(400).json(checkLoginField.errors.all());
  return next();
};

export default checkFields;
