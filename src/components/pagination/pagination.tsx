import React, { useEffect, useState } from "react";
import './pagination.css';

interface IPaginationProps {
  onChange: (value: number) => void,
  currentPage: number,
  maxPage: number
}

export function Pagination({onChange, currentPage, maxPage} : IPaginationProps) {
  return (
    <div className="pagination">
          <button className="pagination__button pagination__button--back" onClick={() => onChange(Math.max(currentPage - 1, 0))}>Back</button>
          <button className="pagination__button pagination__button--next" onClick={() => onChange(Math.min(currentPage + 1, maxPage))}>Next</button>
        </div>
  )
}