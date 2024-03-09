import React, { useEffect, useMemo, useState } from "react";
import { getFields, getIds, getItems, filter } from './api';
import { CardsList } from './components/cards-list/cards-list';
import { FiltersPanel } from './components/filters-panel/filters-panel';
import { Pagination } from './components/pagination/pagination';
import './style.css';
import { ICardFields, IFiltersData } from "./interfaces";

export default function App() {
  const [ids, setIds] = useState<Array<string>>([]);
  const [pageItems, setPageItems] = useState<Array<any>>([]);
  const [page, setPage] = useState(0); 
  const [fields, setFields] = useState<ICardFields>({ brand: [], product: [], price: [] });
  const [productFilters, setProductFilters] = useState<IFiltersData>({brand: undefined, price: undefined, product: ''});

  const notDublicatedIds = useMemo(() => {
    return Array.from(new Set<string>(ids).keys());
  }, [ids])

  useEffect(() => {
    const filters = productFilters;
    if(filters.brand == undefined && filters.price == undefined && (filters.product == '' || filters.product == undefined) ) {
      getIds().then(response => setIds(response.result));
    } else {
      filter(filters.product == '' ? undefined : filters.product, filters.brand, filters.price).then(response => setIds(response.result));
    }
    // getIds().then(response => setIds(response.result));
  }, [productFilters]);

  useEffect(() => {
    if(!notDublicatedIds.length) {
      setPageItems([]);
      return;
    }
    getItems(notDublicatedIds.slice(page * 50, (page + 1) * 50)).then(response => setPageItems(response.result));
  }, [notDublicatedIds, page]);

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

  return (
    <>
      <div className="main-wrapper">
        <FiltersPanel initialFilters={productFilters} fields={fields} onFilter={filters => {
          setProductFilters(filters);      
        }} />           
        <CardsList cardItems={pageItems} />
        <Pagination onChange={(value) => setPage(value)} currentPage={page} maxPage={Math.ceil(notDublicatedIds.length / 50)} />
      </div>
    </>
  )
}