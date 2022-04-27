/**
 * Create custom pagination.
 * @param response - Https response
 * @returns  Object.
 */
const createPagination = (response) => {
  const {
    pagination: { page, total },
  } = response;
  const pageSize = 10;
  const pageCount = Math.ceil(total / pageSize);

  return {
    page,
    total,
    pageSize,
    pageCount,
  };
};

export default createPagination;
