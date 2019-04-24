import { User, Follower } from '../models';
import { responseFormat, errorResponseFormat } from '../utils';

/**
 * @name FollowUser
 * @description This is the method for indicationg a user to follow in the request body
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {int} Returns the followed user
 */
export const followAndUnfollowUser = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    if (id === user.id) {
      return res.status(403).json(
        responseFormat({
          status: 'fail',
          data: 'Sorry, you can not follow yourself'
        })
      );
    }
    const [, created] = await Follower.findOrCreate({
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
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(404).json(responseFormat({
        status: 'fail',
        data: 'This user does not exist'
      }));
    }
    return res.status(500).json(
      errorResponseFormat({
        status: 'error',
        message: 'Something went wrong, please try again later!'
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
    const { user: { id } } = req;
    const userDetails = (await User.findOne(
      {
        where: { id },
        include: [{
          model: Follower,
          as: 'following',
          include: {
            model: User,
            as: 'followers',
            attributes: ['id', 'fullName', 'email']
          } }],
        attributes: ['id', 'fullName']
      })).toJSON();

    userDetails.following = userDetails.following.map(user => user.followers);
    return res.status(200).json(
      responseFormat({
        status: 'success',
        data: userDetails
      })
    );
  } catch (error) {
    return res.status(500).json(
      errorResponseFormat({
        status: 'error',
        message: 'Something went wrong, please try again later!'
      })
    );
  }
};

/**
 * @description Get all followers of a user
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {followerId} person following a user
 * @param {user} user to be followed
 * @returns {int} Returns the list of followers
 */
export const getFollowers = async (req, res) => {
  try {
    const { user: { id } } = req;
    const userDetails = (await User.findOne({
      where: { id },
      include: [{
        model: Follower,
        as: 'followers',
        include: {
          model: User,
          as: 'following',
          attributes: ['id', 'fullName', 'email']
        } }],
      attributes: ['id', 'fullName']
    })).toJSON();

    userDetails.followers = userDetails.followers.map(user => user.following);
    return res.status(200).json(
      responseFormat({
        status: 'success',
        data: userDetails
      })
    );
  } catch (error) {
    return res.status(500).json(
      errorResponseFormat({
        status: 'error',
        message: 'Something went wrong, please try again later!'
      })
    );
  }
};
