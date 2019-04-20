import pusher from '../../config/pusherConfig';


/**
 * @description Function for emmitting pusher events
 * @param {string} channel The request object
 * @param {string} event The request object
 * @param {object|array|void} payload The request object
 * @returns {function} Returns pusher event
 */
export const trigger = (channel, event, payload) => pusher.trigger(channel, event, payload);
