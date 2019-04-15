import { checkIDParamType, errorResponseFormat } from '../utils';

export const checkParam = (req, res, next) => {
  const { id } = req.params;
  if (!checkIDParamType(id)) {
    return res.status(400).json(errorResponseFormat({ message: 'Invalid parameter supplied!' }));
  }
  next();
};

export default checkParam;
