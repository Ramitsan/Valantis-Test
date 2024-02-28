import { MD5 } from 'crypto-js';

const getAuth = () => {
  const date = new Date();
  const month = date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1;
  const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate();
  const password = 'Valantis';

  return MD5(`${password}_${date.getUTCFullYear()}${month}${day}`).toString();
}

export const getIds = (offset = 0, limit: number = undefined) => {
  return fetch('http://api.valantis.store:40000/', {
    headers: {
      'X-Auth': getAuth(),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      action: "get_ids",
      params: { offset, limit }
    })
  })
    .then(res => res.json());
}

export const getItems = (ids: Array<string>) => {
  return fetch('http://api.valantis.store:40000/', {
    headers: {
      'X-Auth': getAuth(),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      action: "get_items",
      params: { ids }
    })
  })
    .then(res => res.json());
}


export const getFields = (field?: string, offset?: number, limit?: number) => {
  return fetch('http://api.valantis.store:40000/', {
    headers: {
      'X-Auth': getAuth(),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      action: "get_fields",
      params: { field, offset, limit }
    })
  })
    .then(res => res.json());
}

export const filter = (product: string, brand: string, price: number) => {
  return fetch('http://api.valantis.store:40000/', {
    headers: {
      'X-Auth': getAuth(),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      action: "filter",
      params: { product, brand, price }
    })
  })
    .then(res => res.json());
}


