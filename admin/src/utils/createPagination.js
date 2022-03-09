/**
 * Create custom pagination.
 * @param response - Https response
 * @returns  Object.
 */
const createPagination = (response) => {
  const {
    pagination: { page, total },
  } = response;
  const pageSize = 5;
  const pageCount = Math.ceil(total / pageSize);

  return {
    page: page,
    total: total,
    pageSize: 5,
    pageCount: pageCount,
  };
};

export default createPagination;
