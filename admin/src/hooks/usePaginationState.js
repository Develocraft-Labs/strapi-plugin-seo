import { useState } from "react";
import createPagination from "../utils/createPagination";

const usePaginationState = ({ currentCount }) => {
  const { pageSize, pageCount } = createPagination({
    pagination: { page: 1, total: currentCount },
  });
  const [page, setPage] = useState(1);

  return {
    page,
    pageCount,
    pageSize,
    setPage,
    count: currentCount,
  };
};
export default usePaginationState;
