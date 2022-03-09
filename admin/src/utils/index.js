import showErrorNotification from "./errorNotification";

/**
 * Check if Title field value has a length greater than 70.
 * @param {String} value - Title string.
 * @returns Void
 */
export const checkTitleLength = (value) => {
  if (!value || !value.length) return;

  const message = "Google Preview title has a maximum of 70 characters";
  const limit = 70;

  handleError({ value, limit, message });
};

/**
 * Check if Meta Description field value has a length greater than 160.
 * @param {String} value - Meta Description string.
 * @returns Void
 */
export const checkMetaDescriptionLength = (value) => {
  if (!value || !value.length) return;

  const message =
    "Google Preview Meta description has a maximum of 160 characters";
  const limit = 160;

  handleError({ value, limit, message });
};

const handleError = ({ value, limit, message }) => {
  const isCharacterLimit = value.length === limit;
  if (isCharacterLimit) showErrorNotification(message);
};
