import { MD5 } from 'crypto-js';

const getAuth = () => {
  const date = new Date();
  const month = date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1;
  const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate();

  return MD5(`Valantis_${date.getUTCFullYear()}${month}${day}`).toString();
}

export const getIds = (offset = 0, limit: number = undefined) => {
  return fetch('http://api.valantis.store:40000/', {
    headers: {
      'X-Auth': getAuth(),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      "action": "get_ids",
      "params": { "offset": offset, "limit": limit }
    })
  })
    .then(res => res.json())
    // .then((data) => console.log(data))
}

export const getItems = (ids: Array<string>) => {
  return fetch('http://api.valantis.store:40000/', {
    headers: {
      'X-Auth': getAuth(),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      "action": "get_items",
      "params": { ids }
    })
  })
    .then(res => res.json())
    // .then((data) => console.log(data))
}

