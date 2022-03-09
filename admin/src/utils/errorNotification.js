/**
 * Display error message.
 * @param {String} message - error message.
 */
const showErrorNotification = (message) => {
  strapi.notification.warning(message);
};

export default showErrorNotification;
