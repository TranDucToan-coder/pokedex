import React, { useCallback } from "react";
import style from "../Css/Paginate.module.css"

const Pagination = ({ page, totalPages, setPage }) => {
  const handlePrev = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, [setPage]);

  const handleNext = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }, [setPage, totalPages]);

  return (
    <div className={style.wrapper}>
      <button className={style.button} onClick={handlePrev} disabled={page === 1}>Previous</button>
      <span className={style.title}>Page {page} of {totalPages}</span>
      <button className={style.button} onClick={handleNext} disabled={page === totalPages}>Next</button>
    </div>
  );
};

export default React.memo(Pagination);
