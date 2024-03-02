import React, { useEffect, useState } from "react";
import { filter } from '../../api';
import './products-search.css';

interface IProductSearchProps {
  onSearch: (value: string) => void
}

export function ProductsSearch({onSearch} : IProductSearchProps) {
  const [currentProduct, setCurrentProduct] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      console.log('update');
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