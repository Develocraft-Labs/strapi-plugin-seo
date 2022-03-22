/**
 * Check if array has length greater than 0.
 * @param {Array} array
 * @returns {Boolean} true | false.
 */
const isValidLength = (array: any[]) =>
  !!(array && Array.isArray(array) && array.length && array.length > 0);
export default isValidLength;
