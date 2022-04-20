const getPageCount = (total, pageSize) => {
  const pageCount = total / pageSize;

  if (pageCount < 1) {
    return 1;
  }

  if (total % pageSize !== 0) {
    return Math.round(pageCount) + 1;
  }

  return Math.round(pageCount);
};

export default getPageCount;
