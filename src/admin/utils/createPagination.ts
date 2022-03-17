/**
 * Create custom pagination.
 * @param response - Https response
 * @returns  Object.
 */
const createPagination = (response: any) => {
  const {
    pagination: { page, total },
  } = response;
  const pageSize = 5;
  const pageCount = Math.ceil(total / pageSize);

  return {
    page,
    total,
    pageSize: 5,
    pageCount,
  };
};

export default createPagination;
