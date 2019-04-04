/* eslint-disable camelcase */
import { User } from '../models/index';
import sendMail from '../utils/email';

const SignupController = {
  /**
   * @description user will be able to create their profile.
   * @param {object} req
   * @param {object}  res
   * @param {object}  next
   * @returns {object|void} response object
   */

  async userSignup(req, res, next) {
    User.password = null;
    const payload = {
      profile: User,
    };
    const token = await User.generateJWT(payload);

    try {
      const {
        full_name, email, username, bio, image_url
      } = req.body;
      const createUser = await User.create({
        password: User.hashPassword(req.body.password),
        secretToken: token,
        full_name,
        email,
        username,
        bio,
        image_url,
      });

      if (createUser) {
        const emailPayload = {
          full_name,
          email,
          token,
        };

        // Sends email to User
        sendMail(emailPayload);
        return res.status(200).json({
          success: true,
          data: token,
        });
      }
    } catch (error) {
      console.log(error);
      if (error.message === 'Validation error') {
        return res.status(409).json({
          success: false,
          message: 'User Already Exist'
        });
      }
      next(error);
    }
  },
};

export default SignupController;
