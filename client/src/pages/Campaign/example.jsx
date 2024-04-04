import React, { useState } from 'react';

export default function BulkMailTable() {
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([0, 1, 2, 3]);
  const [right, setRight] = useState([4, 5, 6, 7]);

  const leftChecked = checked.filter((value) => left.includes(value));
  const rightChecked = checked.filter((value) => right.includes(value));

  const handleToggle = (value) => () => {
    if (checked.includes(value)) {
      setChecked(checked.filter((item) => item !== value));
    } else {
      setChecked([...checked, value]);
    }
  };

  const numberOfChecked = (items) => checked.filter((value) => items.includes(value)).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(checked.filter((value) => !items.includes(value)));
    } else {
      setChecked([...checked, ...items.filter((value) => !checked.includes(value))]);
    }
  };

  const handleCheckedRight = () => {
    setRight([...right, ...leftChecked]);
    setLeft(left.filter((value) => !leftChecked.includes(value)));
    setChecked(checked.filter((value) => !leftChecked.includes(value)));
  };

  const handleCheckedLeft = () => {
    setLeft([...left, ...rightChecked]);
    setRight(right.filter((value) => !rightChecked.includes(value)));
    setChecked(checked.filter((value) => !rightChecked.includes(value)));
  };

  const customList = (title, items) => (
    <div className="max-w-xs">
      <div className="bg-white border rounded p-2">
        <div className="flex justify-between items-center mb-2">
          <input
            type="checkbox"
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            className="form-checkbox h-5 w-5 text-blue-500"
            disabled={items.length === 0}
          />
          <div>
            <div className="font-semibold">{title}</div>
            <div className="text-gray-500 text-sm">{`${numberOfChecked(items)}/${items.length} selected`}</div>
          </div>
        </div>
        <hr className="my-2" />
        <ul className="overflow-auto max-h-36">
          {items.map((value) => (
            <li key={value} className="flex items-center mb-1">
              <input
                type="checkbox"
                checked={checked.includes(value)}
                onChange={handleToggle(value)}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span className="ml-2 text-sm">{`List item ${value + 1}`}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center space-x-4">
      {customList('Choices', left)}
      <div className="flex flex-col justify-center items-center space-y-4">
        <button
          className="border border-blue-500 rounded px-2 py-1"
          onClick={handleCheckedRight}
          disabled={leftChecked.length === 0}
        >
          &gt;
        </button>
        <button
          className="border border-blue-500 rounded px-2 py-1"
          onClick={handleCheckedLeft}
          disabled={rightChecked.length === 0}
        >
          &lt;
        </button>
      </div>
      {customList('Chosen', right)}
    </div>
  );
}




















