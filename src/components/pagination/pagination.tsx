import React, { useEffect, useState } from "react";

interface IPaginationProps {
  onChange: (value: number) => void,
  currentPage: number,
  maxPage: number
}

export function Pagination({onChange, currentPage, maxPage} : IPaginationProps) {
  return (
    <div className="pagination">
          <button onClick={() => onChange(Math.max(currentPage - 1, 0))}>Back</button>
          <button onClick={() => onChange(Math.min(currentPage + 1, maxPage))}>Next</button>
        </div>
  )
}