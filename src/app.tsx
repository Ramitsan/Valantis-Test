import React, { useEffect, useState } from "react";
import { getIds, getItems } from './api';
import { CardsList } from './components/cards-list/cards-list';
import { FiltersPanel } from './components/filters-panel/filters-panel';
import './style.css';

export default function App() {
  const [ids, setIds] = useState<Array<string>>([]);
  const [pageItems, setPageItems] = useState<Array<any>>([]);
  const [page, setPage] = useState(0); 

  useEffect(() => {
    getIds().then(response => setIds(response.result));
  }, []);

  useEffect(() => {
    getItems(ids.slice(page * 50, (page + 1) * 50)).then(response => setPageItems(response.result));
  }, [ids, page]);

  return (
    <>
      <div className="wrapper">
        <FiltersPanel />           
        <CardsList cardItems={pageItems} />

        <div className="pagination">
          <button onClick={() => setPage(last => Math.max(last - 1, 0))}>Back</button>
          <button onClick={() => setPage(last => Math.min(last + 1, Math.ceil(ids.length / 50)))}>Next</button>
        </div>
      </div>
    </>
  )
}