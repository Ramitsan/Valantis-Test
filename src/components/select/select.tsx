import React, { useEffect, useState } from "react";
import './select.css';

interface ISelectProps {
  items: Array<string | number>,
  onSelect: (index: number) => void,
  currentIndex?: number,
}

export function Select({ items, onSelect, currentIndex }: ISelectProps) {
  const [selected, setSelected] = useState<number>(-1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelected(currentIndex != null ? currentIndex : -1);
  }, [currentIndex]);

  useEffect(() => {
    onSelect(selected);
  }, [selected]);

  return (
    <div className="select">
      <input className="select__input" type="text" value={items[selected] || 'Not selected'}
        onChange={(evt) => evt.preventDefault()}
        onFocus={() => { setOpen(true) }}
        onBlur={() => { setOpen(false) }}
      />
      <div className={`select__container ${open ? "select__container--open" : ""}`}>
      <div className={`select__item ${-1 == selected ? "select__item--selected" : ""} `} key={'-1'} onMouseDown={() => {
              setSelected(-1);
            }}>{'Not selected'}</div>
        {items.map((it, index) => {
          return (
            <div className={`select__item ${index == selected ? "select__item--selected" : ""} `} key={index} onMouseDown={() => {
              setSelected(index);
            }}>{it || 'Без бренда'}</div>
          )
        })}
      </div>
    </div>
  )
}