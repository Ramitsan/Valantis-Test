import React from "react";
import { Card } from '../card/card';
import { ICardData } from "../../interfaces";
import './cards-list.css';

type CardListPropsType = {
  cardItems: Array<ICardData>
}

export function CardsList({cardItems}: CardListPropsType) {
  return (
    <div className="cards-wrapper">
      <ul className="cards-list">
        {cardItems.map((it, index) => <Card key={index} item={it}/>)}
      </ul>
    </div>
  )
}