import htmlToText from 'html-to-text';
import { limit, } from 'stringz';
import { sendNotificationMail } from '../utils/email';
import { io } from '../utils/notification/brodcast';
import { oneToManyFollowers } from './notificationHandler';
import { compileTemplate } from '../templates';

const emailImages = [];

/**
 * @name notifyHandler
 * @description This is the method handles the emitting of the notifications
 * @param {array} notifies Should contain an array
 * @param {object|array|any} payload Should contain an object
 * @param {string} eventName Name of the event
 * @returns {function} Emits a notification to the selected collection
 */
export const notifyHandler = async (notifies, payload, eventName) => {
  try {
    if (typeof eventName !== 'string') { throw new Error('Event name must be of type string'); }
    await notifies.forEach(async (notify) => {
      const { 'following.id': id } = notify;
      await io.to(id).emit(eventName, payload);
    });
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * @name sendToEmail
 * @description This is the method for sending notifications to users via email
 * @param {object|void} followers Array of all followers
 * @param {string} param Message to be sent
 * @returns {function} Emits a notification to the selected collection
 */
export const sendToEmail = async (followers, param) => followers.forEach(async ({ 'following.email': email }) => {
  const appUrl = 'https://author-haven-stage.herokuapp.com/api/v1';
  const actionLink = `${process.env.AH_API_URL}/articles/${param.id}`;
  const text = htmlToText.fromString(param.body, {
    format: {
      paragraph: (elem, fn, options) => {
        const h = fn(elem.children, options);
        return h;
      },
      image: (elem) => {
        if (elem.attribs !== undefined || elem.attribs.src !== null) {
          emailImages.push(elem.attribs.src);
        }
        return '';
      },
    }
  });
  param.body = text.length > 250 ? `${limit(text, 250)} ...` : text;
  const [emailImage] = emailImages;
  param.images = emailImage;

  const html = await compileTemplate(
    '/mailer/notifyOnArticlePublish.hbs',
    { email, ...param, appUrl, actionLink, },
  );
  await sendNotificationMail({ email, subject: `${param.author.fullName} just published an article`, html });
});

/**
 * @name notify
 * @description This is the method for emmiting events/notifications
 * @param {object|void} param Should contain an object
 * @param {string} eventName Title of the event
 * @returns {function} Emits a notification to the selected collection
 */
export const notify = async (param, eventName) => {
  const { userId } = param;
  const followers = await oneToManyFollowers({ userId });
  await notifyHandler(followers, param, eventName);
  await sendToEmail(followers, param);
};

/**
 * @name clearNotifications
 * @description This is the method for clearing notifications
 * @param {object|array} payload Should contain an object
 * @param {string} socketId ID of the socket
 * @returns {boolean} Returns boolean.
 */
export const clearNotifications = async (payload, socketId) => console.log(payload, socketId);
