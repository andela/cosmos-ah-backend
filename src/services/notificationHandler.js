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
 * @param {object|void} param Should contain an object
 * @returns {function} Returns a collection
 */
export const oneToManyFollowers = async ({ userId: id }) => {
  const userFollowers = await User.findOne({
    where: { id },
    include: [
      {
        model: Follower,
        as: 'userFollowers',
        attributes: ['followerId'],
      },
    ],
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
  const result = extractFieldToArray(userFollowers, 'followerId');
  return result.map(prop => ({ userId: prop, ...meta }));
};

/**
 * @name saveNotifications
 * @description This is the method for inserting articles
 * @param {object} payload The containing user details
 * @param {object} meta The containing meta details
 * @returns {object} Returns the collection of saved notifications
 */
export const saveNotifications = async ({ userId, }, meta) => {
  try {
    const followers = await oneToManyFollowers({ userId });
    const { userFollowers } = followers.get({ plain: true });
    await Notification.bulkCreate(
      transformArrayToObject(userFollowers, meta),
      { hooks: true, individualHooks: true, validate: false, },
    );
    return true;
  } catch (error) {
    throw new Error(error);
  }
};
