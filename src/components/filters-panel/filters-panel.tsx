import React, { useEffect, useState } from "react";
import { getFields, filter } from '../../api';
import { ICardFields } from "../../interfaces";
import { ProductsSearch } from '../products-search/products-search';
import './filters-panel.css';

export function FiltersPanel() {
  const [fields, setFields] = useState<ICardFields>({ brand: [], product: [], price: [] });

  useEffect(() => {
    getFields('brand').then(response => setFields(last => ({
      ...last,
      brand: Array.from(new Set<string>(response.result).keys()),
    })));

    getFields('product').then(response => setFields(last => ({
      ...last,
      product: Array.from(new Set<string>(response.result).keys()),
    })));

    getFields('price').then(response => setFields(last => ({
      ...last,
      price: Array.from(new Set<number>(response.result).keys()).sort((a, b) => a - b),
    })));
  }, [])

  const filterBrand = (brand: string) => {
    filter(undefined, brand, undefined).then(response => console.log(response.result));
  }

  const filterPrice = (price: number) => {
    filter(undefined, undefined, price).then(response => console.log(response.result))};

  return (
    <div className="filters-panel">
      <div className="filter-block">
        <p className="filter-title">Выберите бренд:</p>
        <div className="filter-list">
          {fields.brand.map(it => {
            return (
              <div className="filter-item filter-item--brand" onClick={() => filterBrand(it)}>{it || 'Без бренда'}</div>
            )
          })}
        </div>
      </div>
      <div className="filter-block">
        <p className="filter-title">Укажите цену:</p>
        <div className="filter-list">
          {fields.price.map(it => {
            return (
              <div className="filter-item filter-item--price" onClick={() => filterPrice(it)}>{it}</div>
            )
          })}
        </div>
      </div>
      <ProductsSearch />
    </div>
  )
}