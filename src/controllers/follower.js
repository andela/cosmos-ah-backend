import { User, Follower } from '../models';
import { responseFormat, errorResponseFormat } from '../utils';

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
      await Follower.destroy({ where: { userId: user.id, followerId: id } });
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
    return res.status(400).json(
      errorResponseFormat({
        status: 'error',
        message: 'Something aint right, please try again later!'
      })
    );
  }
};

/**
 * @description Get all following users
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {followerId} person following a user
 * @param {user} user to be followed
 * @returns {int} Returns the list of followers
 */
export const getFollowing = async (req, res) => {
  try {
    const { user } = req;
    const details = await User.findAll(
      {
        where: {
          id: user.id
        },
        include: [{
          model: Follower,
          as: 'followers',
        }]
      }
    );
    if (details < 1) {
      return res.status(200).json(
        responseFormat({
          status: 'fail',
          data: 'Sorry, you are currently not following any user'
        })
      );
    }
    return res.status(200).json(
      responseFormat({
        status: 'fail',
        message: details
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json(
      errorResponseFormat({
        status: 'error',
        message: 'Something aint right, please try again later!'
      })
    );
  }
};
