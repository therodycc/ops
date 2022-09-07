import React, { useCallback, useState } from 'react';

export const usePagination = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(event => {
    setSize(parseInt(event.target.value));
    setPage(0);
  }, []);

  return { page, size, handleChangePage, handleChangeRowsPerPage };
};
