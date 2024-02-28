import React, { useEffect, useState } from "react";
import { getIds, getItems, getFields, filter } from './api';
import { CardsList } from './components/cards-list/cards-list';
import { ICardFields } from "./interfaces";
import './style.css';

export default function App() {
  const [ids, setIds] = useState<Array<string>>([]);
  const [pageItems, setPageItems] = useState<Array<any>>([]);
  const [page, setPage] = useState(0);
  const [fields, setFields] = useState<ICardFields>({ brand: [], product: [], price: [] });

  useEffect(() => {
    getIds().then(response => setIds(response.result));
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
      price: Array.from(new Set<number>(response.result).keys()),
    })));

  }, []);

  useEffect(() => {
    getItems(ids.slice(page * 50, (page + 1) * 50)).then(response => setPageItems(response.result));
  }, [ids, page]);

  // console.log(ids);
  // console.log(pageItems);

  const filterBrand = (brand: string) => {
    filter(undefined, brand, undefined).then(response => console.log(response.result));
  }

  const filterPrice = (price: number) => {
    filter(undefined, undefined, price ).then(response => console.log(response.result));
  }

  return (
    <>
      <div className="wrapper">
        <div className="filter-list">{fields.brand.map(it => <div onClick={() => filterBrand(it)}>{it || 'Без бренда'}</div>)}</div>
        <div className="filter-list">{fields.price.map(it => <div onClick={() => filterPrice(it)}>{it}</div>)}</div>
        <CardsList cardItems={pageItems} />

        <div className="pagination">
          <button onClick={() => setPage(last => Math.max(last - 1, 0))}>Back</button>
          <button onClick={() => setPage(last => Math.min(last + 1, Math.ceil(ids.length / 50)))}>Next</button>
        </div>
      </div>
    </>
  )
}