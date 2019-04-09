import Auth from '../../middlewares/authenticator';
import responseFormat from '../../utils';

/**
   * @description Login users
   * @param {object} req
   * @param {object} res
   * @returns {object} Returns users
   */

const login = (req, res) => {
  const {
    id, email, username, role
  } = req.user;
  return res.status(200).json(responseFormat({
    success: true,
    data: {
      user: req.user,
      token: Auth.generateToken({
        id, email, username, role
      })
    },
  }));
};


export default login;
