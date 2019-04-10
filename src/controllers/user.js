/* eslint-disable camelcase */
import { User } from '../models/index';
import sendMail from '../utils/email';
import Auth from '../middlewares/authenticator';

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
    // const payload = {
    //   profile: User,
    // };
    try {
      const {
        fullName, email, username, bio, imageUrl, password,
      } = req.body;
      const token = await Auth.generateToken({ fullName, email, username });
      const createUser = await User.create({
        password,
        secretToken: token,
        fullName,
        email,
        username,
        bio,
        imageUrl,
      });

      if (createUser) {
        const emailPayload = {
          fullName,
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
