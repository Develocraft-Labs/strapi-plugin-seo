/**
 * Display error message.
 * @param {String} message - error message.
 */
const showErrorNotification = (message: string) => {
  // @ts-ignore
  strapi.notification.warning(message);
};

export default showErrorNotification;
