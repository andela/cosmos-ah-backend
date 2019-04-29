/* eslint-disable max-len */
import { User, Follower, Notification } from '../models';

/**
 * @name extractFieldToArray
 * @description Resolve an object into an array
 * @param {object|void} payload Should contain an object
 * @param {string} key Should be a string
 * @returns {function} Returns an array
 */
export const extractFieldToArray = (payload, key) => {
  if (!Array.isArray(payload)) { throw new Error('Payload supplied is not of type array'); }
  return payload.map(obj => obj[key]);
};

/**
 * @name oneToManyFollowers
 * @description This is the method for grasping collections done in a query
 * @param {object|void} userId Should be a string
 * @returns {function} Returns a collection
 */
export const oneToManyFollowers = async ({ userId }) => {
  const userFollowers = await Follower.findAll({
    where: { followerId: userId, },
    include: [{
      model: User,
      as: 'following',
    }],
    raw: true,
  });
  return userFollowers;
};

/**
 * @name transformArrayToObject
 * @description This is the method for inserting articles
 * @param {array} userFollowers The array element
 * @param {object} meta The object containing meta data
 * @returns {object} Returns the collection of saved notifications
 */
export const transformArrayToObject = (userFollowers, meta) => {
  const result = extractFieldToArray(userFollowers, 'following.id');
  return result.map(prop => ({ userId: prop, ...meta }));
};

/**
 * @name saveNotifications
 * @description This is the method for inserting articles
 * @param {object} user The containing user details
 * @param {object} payload The containing article/comment details
 * @param {object} meta The containing meta details
 * @returns {object} Returns the collection of saved notifications
 */
export const saveNotifications = async (user, payload, meta) => {
  try {
    const { userId, } = payload;
    const followers = await oneToManyFollowers({ userId });
    await Notification.bulkCreate(
      transformArrayToObject(followers, meta),
      { hooks: true, individualHooks: true, validate: false, },
    );
    return followers;
  } catch (error) {
    throw new Error('Notification save failed.');
  }
};
