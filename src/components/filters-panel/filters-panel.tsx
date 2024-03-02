import React, { useEffect, useState } from "react";
import { getFields } from '../../api';
import { ICardFields, IFiltersData } from "../../interfaces";
import { ProductsSearch } from '../products-search/products-search';
import { Select } from '../select/select';
import './filters-panel.css';

interface IFiltersPanelProps {
  onFilter: (filters: IFiltersData) => void,
  fields: ICardFields,
  initialFilters: IFiltersData
}

export function FiltersPanel({onFilter, fields, initialFilters} : IFiltersPanelProps) {  
  const [filters, setFilters] = useState<IFiltersData>(initialFilters);

  useEffect(() => {
    onFilter(filters);
  }, [filters]);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const filterBrand = (brand: string) => {
    if(brand == filters.brand) {
      return;
    }
    setFilters(last => ({...last, brand}))
  }

  const filterPrice = (price: number) => {
    if(price == filters.price) {
      return;
    }
    setFilters(last => ({...last, price}))
  };

  const handleSearch = (product: string) => {
    if(product == filters.product) {
      return;
    }
    setFilters(last => ({...last, product}))
  }

  const selectBrandsItems = fields.brand.filter(it => it);

  return (
    <div className="filters-panel">
      <div className="filter-block">
        <p className="filter-title">Выберите бренд:</p>
        <Select items={selectBrandsItems} onSelect={(index) => filterBrand(selectBrandsItems[index])}/>
      </div>
      <div className="filter-block">
        <p className="filter-title">Укажите цену:</p>
        <Select items={fields.price} onSelect={(index) => filterPrice(fields.price[index])}/>
      </div>
      <div className="search-block">
      <p className="filter-title">Поиск по названию:</p>
        <ProductsSearch onSearch={handleSearch} initialProduct={filters.product}/>
      </div>
    </div>
  )
}