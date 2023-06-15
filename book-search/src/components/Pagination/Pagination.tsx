import { Button } from "antd";
import React, { useCallback } from "react";

interface PaginationProps {
  current: number;
  total: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  pageSize = 20,
  onPageChange,
}) => {
  // Can not use useCallback
  //   const handleChangePage = useCallback((page: number) => {
  //     if (page >= 1 && page <= total && page !== current) {
  //       onPageChange(page);
  //       console.log("Page change", { page, current });
  //     }
  //   }, []);

  const handleChangePage = (page: number) => {
    if (page >= 1 && page <= total && page !== current) {
      onPageChange(page);
    }
  };

  const indexArray = calcIndexArray(total, current);

  return (
    <div
      style={{
        marginTop: 20,
        display: "flex",
        gap: 10,
        justifyContent: "center",
      }}
    >
      <Button
        onClick={() => handleChangePage(current - 1)}
        disabled={current === 1}
      >
        prev
      </Button>
      {indexArray.map((page, index) => {
        return page == null ? (
          <Button
            key={index}
            style={{
              border: "none",
              pointerEvents: "none",
            }}
          >
            ...
          </Button>
        ) : (
          <Button
            key={index}
            type={page === current ? "primary" : "default"}
            onClick={() => handleChangePage(page)}
          >
            {page}
          </Button>
        );
      })}
      <Button
        onClick={() => handleChangePage(current + 1)}
        disabled={current === total}
      >
        next
      </Button>
    </div>
  );
};

export default Pagination;

function calcIndexArray(total: number, current: number): Array<number | null> {
  let indexArray: Array<number | null> = [];

  if (total <= 7) {
    indexArray = new Array(total).fill(null).map((_, index) => index + 1);
  } else if (current <= 4) {
    indexArray = [1, 2, 3, 4, 5];
  } else if (current >= total - 3) {
    indexArray = [total - 4, total - 3, total - 2, total - 1, total];
  } else {
    indexArray = [current - 1, current, current + 1];
  }

  if (indexArray[0] !== 1) {
    indexArray = [1, null].concat(indexArray);
  }
  if (indexArray[indexArray.length - 1] !== total) {
    indexArray = indexArray.concat([null, total]);
  }

  return indexArray;
}
