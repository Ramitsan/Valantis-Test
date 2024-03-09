import { MD5 } from 'crypto-js';
import { ICardData } from './interfaces';

const url = 'https://api.valantis.store:41000/';

const getAuth = () => {
  const date = new Date();
  const month = date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1;
  const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate();
  const password = 'Valantis';

  return MD5(`${password}_${date.getUTCFullYear()}${month}${day}`).toString();
}

export const getIds = (offset = 0, limit: number = undefined): Promise<{ result: Array<string> }> => {
  return fetch(url, {
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
    .then(res => {
      if (res.status == 500) {
        return res.text().then(text => {
          return getIds(offset, limit);
        })
      } else {
        return res.json();
      }
    });
}

export const getItems = (ids: Array<string>): Promise<{ result: Array<ICardData> }> => {
  return fetch(url, {
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
    .then(res => {
      if (res.status == 500) {
        return res.text().then(text => {
          return getItems(ids);
        })
      } else {
        return res.json();
      }
    });
}

type FieldsTypeMap = {
  brand: string,
  price: number,
  product: string
}

export const getFields = <T extends keyof FieldsTypeMap>(field?: T, offset?: number, limit?: number): Promise<{ result: Array<FieldsTypeMap[T]> }> => {
  return fetch(url, {
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
    .then(res => {
      if (res.status == 500) {
        return res.text().then(text => {
          return getFields(field, offset, limit);
        })
      } else {
        return res.json();
      }
    });

}

export const filter = (product: string, brand: string, price: number): Promise<{ result: Array<string> }> => {
  return fetch(url, {
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
    .then(res => {
      if (res.status == 500) {
        return res.text().then(text => {
          return filter(product, brand, price);
        })
      } else {
        return res.json();
      }
    });
}


