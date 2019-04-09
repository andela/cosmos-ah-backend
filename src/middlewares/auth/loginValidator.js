import validate from '../../utils/auth/login';
import { responseFormat, parseErrorResponse } from '../../utils';

const checkFields = async (req, res, next) => {
  const checkLoginField = await validate(req.body);
  if (checkLoginField.fails()) {
    const validationErrors = checkLoginField.errors.all();
    const errorMessages = parseErrorResponse(validationErrors);
    return res.status(400).json(responseFormat({
      status: 'fail',
      data: errorMessages
    }));
  }
  return next();
};

export default checkFields;
