import { io } from '../utils/notification/brodcast';
import { extractFieldToArray, oneToManyFollowers } from './notificationHandler';

/**
 * @name notifyHandler
 * @description This is the method handles the emitting of the notifications
 * @param {array} notifies Should contain an array
 * @param {object|array|any} payload Should contain an object
 * @param {string} eventName Name of the event
 * @returns {function} Emits a notification to the selected collection
 */
export const notifyHandler = async (notifies, payload, eventName) => {
  if (typeof eventName !== 'string') { throw new Error('Event name must be of type string'); }
  try {
    await notifies.forEach(async (notify) => {
      await io.to(notify).emit(eventName, payload);
    });
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * @name notify
 * @description This is the method for emmiting events/notifications
 * @param {object|void} param Should contain an object
 * @param {string} eventName Title of the event
 * @returns {function} Emits a notification to the selected collection
 */
export const notify = async (param, eventName) => {
  const { userId } = param;
  let followers = await oneToManyFollowers({ userId });
  const { userFollowers } = followers.get({ plain: true });
  followers = extractFieldToArray(userFollowers, 'followerId');
  return notifyHandler(followers, param, eventName);
};

/**
 * @name clearNotifications
 * @description This is the method for clearing notifications
 * @param {object|array} payload Should contain an object
 * @param {string} socketId ID of the socket
 * @returns {boolean} Returns boolean.
 */
export const clearNotifications = async (payload, socketId) => {
  console.log(payload, socketId);
};
