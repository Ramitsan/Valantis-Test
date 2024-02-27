import React, { useEffect } from "react";
import { MD5 } from 'crypto-js';
// import './style.css';

export default function App() {
 
  useEffect(() => {
    const date = new Date(); 
    const month = date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1;
    const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate();
    
    console.log(`Valantis_${date.getUTCFullYear()}${month}${day}`);

    fetch('http://api.valantis.store:40000/', {
      headers: {
        'X-Auth': MD5(`Valantis_${date.getUTCFullYear()}${month}${day}`).toString(),
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        "action": "get_ids",
	      "params": {"offset": 0, "limit": 50}
      })
    })
      .then(res => res.text())
      .then((data) => console.log(data))
  }, []);

  return (
    <>
      <div className="wrapper">  <p>12345</p>
      </div>
    </>
  )
}