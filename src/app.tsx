import React, { useEffect, useState } from "react";
import { getIds, getItems } from './api';

// import './style.css';

export default function App() {
  const [ids, setIds] = useState<Array<string>>([]);
  const [pageItems, setPageItems] = useState<Array<any>>([]);
 
  useEffect(() => {
    getIds().then(response => setIds(response.result));

  }, []);

  useEffect(() => {
    getItems(ids.slice(0, 50)).then(response => setPageItems(response.result));

  }, [ids]);

  console.log(ids);
  console.log(pageItems);

  return (
    <>
      <div className="wrapper">  <p>12345</p>
      </div>
    </>
  )
}