import { User, Follower } from '../models';
import { responseFormat } from '../utils';

/**
 * @name FollowUser
 * @description This is the method for indicationg a user to follow in the request body
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {int} Returns the followed user
 */
export const followUser = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const followee = await User.findOne({ where: { id } });
    if (!followee) {
      return res.status(404).json(responseFormat({
        status: 'fail',
        data: 'This user does not exist'
      }));
    }
    if (id === user.id) {
      return res.status(403).json(
        responseFormat({
          status: 'fail',
          data: 'Sorry, you can not follow yourself'
        })
      );
    }
    const [, created] = await Follower.findOrCreate(
      {
        where: { userId: user.id, followerId: id },
        defaults: { userId: user.id, followerId: id }
      }
    );
    if (!created) {
      await Follower.destroy({ where: { userId: user.id, id } });
      return res.status(200).json(
        responseFormat({
          status: 'success',
          data: 'You have successfully unfollowed this user'
        })
      );
    }
    return res.status(200).json(
      responseFormat({
        status: 'success',
        data: 'You are now following this user'
      })
    );
  } catch (error) {
    return res.status(500).json(
      responseFormat({
        status: 'error',
        message: 'Something went wrong, please try again later!'
      })
    );
  }
};
