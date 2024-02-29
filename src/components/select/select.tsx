import React, { useEffect, useState } from "react";
import './select.css';

interface ISelectProps {
  items: Array<string | number>,
  onSelect: (value: string | number) => void,
  currentValue?: string | number,
}

export function Select({ items, onSelect, currentValue }: ISelectProps) {
  const [selected, setSelected] = useState<string | number>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelected(currentValue || null);
  }, [currentValue]);

  useEffect(() => {
    onSelect(selected);
  }, [selected]);

  return (
    <div className="select">
      <input className="select__input" type="text" value={selected}
        onFocus={() => { setOpen(true) }}
        onBlur={() => { setOpen(false) }}
      />
      <div className={`select__container ${open ? "select__container--open" : ""}`}>
        {items.map((it, index) => {
          return (
            <div className="select__item" key={index} onClick={() => setSelected(it)}>{it || 'Без бренда'}</div>
          )
        })}
      </div>
    </div>
  )
}