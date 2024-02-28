import React from "react";
import { ICardData } from "../../interfaces";
import './card.css';

type CardPropsType = {
  item:ICardData
}

export function Card({item} : CardPropsType) {
  return (
    <li className="card">
      <div className="card__id"><span>ID: </span>{item.id}</div>
      <div className="card__title"><span>Название: </span>{item.product}</div>
      <div className="card__brand"><span>Брэнд: </span>{item.brand}</div>
      <div className="card__price"><span>Стоимость: </span>{item.price}</div>     
   </li >
  )
}