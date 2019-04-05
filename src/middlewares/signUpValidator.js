import { errorResponseFormat, validateParameters, } from '../utils';

const checkBody = async (req, res, next) => {
  const validate = await validateParameters(req.body);
  if (validate.fails()) {
    return res.status(400).json(errorResponseFormat({
      message: validate.errors.all(),
    }));
  }
  next();
};

export default checkBody;
