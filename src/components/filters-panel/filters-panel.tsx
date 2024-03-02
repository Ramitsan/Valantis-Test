import React, { useEffect, useState } from "react";
import { getFields, filter } from '../../api';
import { ICardFields, IFiltersData } from "../../interfaces";
import { ProductsSearch } from '../products-search/products-search';
import { Select } from '../select/select';
import './filters-panel.css';

interface IFiltersPanelProps {
  onFilter: (filters: IFiltersData) => void
}

export function FiltersPanel({onFilter} : IFiltersPanelProps) {
  const [fields, setFields] = useState<ICardFields>({ brand: [], product: [], price: [] });
  const [filters, setFilters] = useState<IFiltersData>({brand: undefined, price: undefined, product: undefined});

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
  }, []);

  useEffect(() => {
    onFilter(filters);
  }, [filters]);

  const filterBrand = (brand: string) => {
    setFilters(last => ({...last, brand}))
  }

  const filterPrice = (price: number) => {
    setFilters(last => ({...last, price}))
  };

  const handleSearch = (product: string) => {
    setFilters(last => ({...last, product}))
  }

  const selectBrandsItems = fields.brand.map(it => it ? it : 'Без бренда');

  return (
    <div className="filters-panel">
      <div className="filter-block">
        <p className="filter-title">Выберите бренд:</p>
        <Select items={selectBrandsItems} onSelect={(index) => filterBrand(fields.brand[index])}/>
      </div>
      <div className="filter-block">
        <p className="filter-title">Укажите цену:</p>
        <Select items={fields.price} onSelect={(index) => filterPrice(fields.price[index])}/>
      </div>
      <div className="search-block">
      <p className="filter-title">Поиск по названию:</p>
        <ProductsSearch onSearch={handleSearch}/>
      </div>
    </div>
  )
}