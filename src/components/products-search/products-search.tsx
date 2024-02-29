import React, { useEffect, useState } from "react";
import { filter } from '../../api';
import './products-search.css';

export function ProductsSearch() {
  const [currentProduct, setCurrentProduct] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      console.log('update');
      filter(currentProduct, undefined, undefined).then(response => console.log(response.result));
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