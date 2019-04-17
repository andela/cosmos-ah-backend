import { errorResponseFormat, validateEditParameters, parseErrorResponse } from '../utils/index';

const checkEditBody = async (req, res, next) => {
  const validate = await validateEditParameters(req.body);
  if (validate.fails()) {
    return res.status(400).json(errorResponseFormat({
      status: 'fail',
      message: parseErrorResponse(validate.errors.all())
    }));
  }
  next();
};

export default checkEditBody;
