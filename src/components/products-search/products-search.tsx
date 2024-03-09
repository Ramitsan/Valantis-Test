import React, { useEffect, useState } from "react";
import './products-search.css';

interface IProductSearchProps {
  onSearch: (value: string) => void,
  initialProduct: string
}

export function ProductsSearch({onSearch, initialProduct} : IProductSearchProps) {
  const [currentProduct, setCurrentProduct] = useState(initialProduct);

  useEffect(() => {
    setCurrentProduct(initialProduct);
  }, [initialProduct]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      onSearch(currentProduct);
    }, 2000);
  
    return () => {
      clearTimeout(timerId);
    }
  }, [currentProduct]);
  return (
    <input className="search-input" type="text" placeholder="Search product"
    onChange={(evt) => {
      setCurrentProduct(evt.target.value);
    }} />
  )
}