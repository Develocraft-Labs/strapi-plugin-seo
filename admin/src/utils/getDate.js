/**
 * Generate Date having format i.e Friday, December 10th 2021 10:54
 * @param {String} dateString - date string
 * @returns {String} Date
 */
const getDate = (dateString) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  // i.e Friday, December 10th 2021 10:54

  const date = new Date(dateString);
  const hours = date.getHours();
  const mins = date.getMinutes();

  return `${new Date(date).toLocaleDateString("en", options)} ${hours}:${mins}`;
};

export default getDate;
