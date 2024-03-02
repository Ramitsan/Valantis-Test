import React, { useEffect, useMemo, useState } from "react";
import { getIds, getItems, filter } from './api';
import { CardsList } from './components/cards-list/cards-list';
import { FiltersPanel } from './components/filters-panel/filters-panel';
import { Pagination } from './components/pagination/pagination';
import './style.css';

export default function App() {
  const [ids, setIds] = useState<Array<string>>([]);
  const [pageItems, setPageItems] = useState<Array<any>>([]);
  const [page, setPage] = useState(0); 

  const notDublicatedIds = useMemo(() => {
    return Array.from(new Set<string>(ids).keys());
  }, [ids])

  useEffect(() => {
    getIds().then(response => setIds(response.result));
  }, []);

  useEffect(() => {
    console.log(notDublicatedIds);
    getItems(notDublicatedIds.slice(page * 50, (page + 1) * 50)).then(response => setPageItems(response.result));
  }, [notDublicatedIds, page]);

  return (
    <>
      <div className="main-wrapper">
        <FiltersPanel onFilter={filters => {
          console.log(125, JSON.stringify(filters));
          if(filters.brand == undefined && filters.price == undefined && (filters.product == '' || filters.product == undefined) ) {
            getIds().then(response => setIds(response.result));
          } else {
            filter(filters.product == '' ? undefined : filters.product, filters.brand, filters.price).then(response => setIds(response.result));
          }
        }} />           
        <CardsList cardItems={pageItems} />
        <Pagination onChange={(value) => setPage(value)} currentPage={page} maxPage={Math.ceil(notDublicatedIds.length / 50)} />
      </div>
    </>
  )
}