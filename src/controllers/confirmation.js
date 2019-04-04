import { User } from '../models/index';

const verifyController = {
  /**
   * @description user will be able to create their profile.
   * @param {object} req
   * @param {object}  res
   * @param {object}  next
   * @returns {object|void} response object
   */

  async userVerification(req, res, next) {
    try {
      const { secretToken } = req.params;
      const user = await User.findOne({
        where: { secretToken }
      },);
      if (!user) {
        console.log('You have been verified, please login');
        console.log(user);
      }

      if (user) {
        await user.update({
          verified: true,
          secretToken: null,
        });
        return res.status(200).json({
          data: User,
        });
      }
    } catch (error) {
      next(error);
    }
  },
};

export default verifyController;
