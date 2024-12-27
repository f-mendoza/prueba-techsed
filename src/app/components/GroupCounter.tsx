"use client";

import { Plus, Minus } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import UnitCounter from "./UnitCounter";

// Declaro una interfaz con los props y sus respectivos tipos
interface GroupCounterProps {
  unitsPerGroup: number;
  maxStock: number;
  type?: string;
  value: number;
  onUpdate?: (newValue: number) => void;
  className?: string;
}

// Luego declaro GroupCounter de tipo componente funcional que recibe como argumento la interfaz creada anteriormente
const GroupCounter: React.FC<GroupCounterProps> = ({
  unitsPerGroup,
  maxStock,
  type,
  value,
  onUpdate,
  className,
}) => {
  const [groups, setGroups] = useState(value);
  const units = useMemo(() => groups * unitsPerGroup, [groups]);

  useEffect(() => {
    if (onUpdate !== undefined) onUpdate(groups);
  }, [groups]);

  useEffect(() => {
    if (value <= maxStock) setGroups(value);
  }, [value]);

  return (
    <div className={`${className} flex gap-3`}>
      <div className="flex flex-col items-center">
        <label className="text-sm font-bold">Cantidad de Unidades</label>
        <div className="flex">
          <input
            type="number"
            className="border border-gray-200 w-16 text-center rounded-md bg-gray-100 text-gray-500"
            disabled
            value={units}
            data-item="units-counter-input"
          />
          <span className="ml-2 text-gray-400">unidades</span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <UnitCounter
          label={`Cantidad de ${type === "pallet" ? "Pallets" : "Bolsones"}`}
          value={groups}
          maxUnits={maxStock}
          minUnits={0}
          steps={1}
          onUpdate={setGroups}
        ></UnitCounter>
      </div>
    </div>
  );
};

export default GroupCounter;
