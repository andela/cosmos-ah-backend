import { errorResponseFormat, parseErrorResponse, validateSearchParams } from '../utils/index';

const checkSearchBody = async (req, res, next) => {
  const validate = await validateSearchParams(req.body);
  if (validate.fails()) {
    return res.status(400).json(errorResponseFormat({
      status: 'fail',
      message: parseErrorResponse(validate.errors.all())
    }));
  }
  next();
};

export default checkSearchBody;
