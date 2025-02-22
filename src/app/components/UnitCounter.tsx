"use client";

import { Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import CounterProps from "../interfaces/CounterProps";

const UnitCounter: React.FC<CounterProps> = ({
  label,
  value,
  stock,
  className,
  onUpdate,
}) => {
  const [units, setUnits] = useState(0);

  const handleUpdate = (newValue: number) => {
    setUnits(newValue);
    if (onUpdate !== undefined) onUpdate(newValue);
  };

  useEffect(() => setUnits(Math.min(value, stock)), [value]);

  return (
    <div className={`${className} flex flex-col`}>
      {label !== undefined && (
        <label className="text-sm font-bold">{label}</label>
      )}

      <div className="flex gap-2 items-center">
        <button
          className="border rounded p-1.5 hover:bg-gray-100"
          onClick={() => {
            if (units > 0) handleUpdate(units - 1);
          }}
          data-action="subtract-unit"
        >
          <Minus size={10} />
        </button>
        <input
          type="number"
          className="border border-gray-100 rounded-md w-16 text-center"
          disabled
          value={units}
          data-item="unit-counter-input"
        />
        <button
          className="border rounded p-1.5 hover:bg-gray-100"
          onClick={() => {
            if (units < stock) handleUpdate(units + 1);
          }}
          data-action="add-unit"
        >
          <Plus size={10} />
        </button>
      </div>
    </div>
  );
};

export default UnitCounter;
