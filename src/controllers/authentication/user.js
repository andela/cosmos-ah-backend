import { User } from '../../models';
import Auth from '../../middlewares/authenticator';
import { responseFormat, errorResponseFormat } from '../../utils/index';
/**
 * @description user will be able to create their profile.
 * @param {object} req
 * @param {object}  res
 * @param {object}  next
 * @returns {object|void} response object
 */
export const login = (req, res) => {
  const {
    id, fullName, bio, email, username, role
  } = req.user;
  return res.status(200).json(responseFormat({
    status: 'success',
    data: {
      token: Auth.generateToken({
        id, fullName, bio, email, username, role
      })
    },
  }));
};

export const createUser = async (req, res) => {
  try {
    const { body } = req;
    const user = await User.create({ ...body });
    const { id, username, email, role, fullName, bio } = user;

    if (user) {
      const token = Auth.generateToken({
        id, username, email, role, fullName, bio
      });
      return res.status(201).json(responseFormat({
        status: 'success',
        data: {
          token,
        },
      }));
    }
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      if (error.fields.email) {
        return res.status(409).json(errorResponseFormat({
          message: 'This Email Already Exist',
        }));
      }

      if (error.fields.username) {
        return res.status(409).json(errorResponseFormat({
          message: 'This Username Already Exist',
        }));
      }
    }

    return res.status(500).json(errorResponseFormat({
      message: 'Something Went Wrong',
    }));
  }
};
