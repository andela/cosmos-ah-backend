import tokenizer from '../../helpers/tokenizer';
import responseFormat from '../../utils';

/**
   * @description Login users
   * @param {object} req
   * @param {object} res
   * @returns {object} Returns users
   */

const login = (req, res) => {
  const { id, email } = req.user;
  return res.status(200).json(responseFormat({
    success: true,
    data: {
      user: req.user,
      token: tokenizer({ id, email })
    },
  }));
};

export default login;
