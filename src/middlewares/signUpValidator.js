import { errorResponseFormat, validateParameters, parseErrorResponse } from '../utils';

const checkBody = async (req, res, next) => {
  const validate = await validateParameters(req.body);
  if (validate.fails()) {
    return res.status(400).json(errorResponseFormat({
      status: 'fail',
      message: parseErrorResponse(validate.errors.all())
    }));
  }
  next();
};

export default checkBody;
