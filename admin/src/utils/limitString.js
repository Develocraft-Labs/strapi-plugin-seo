/**
 * Shorten a given string.
 * @param {String} string - String to be shortened.
 * @param {Number} start - Start index.
 * @param {Number} end - End index.
 * @returns {String} Shortened String.
 */
const limitString = (string, start, end) => {
  const shortendString = `${string.slice(start, end)}...`;
  return shortendString;
};
export default limitString;
