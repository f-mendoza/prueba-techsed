"use client";

import { Plus, Minus } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import UnitCounter from "./UnitCounter";

// Declaro una interfaz con los props y sus respectivos tipos
interface GroupCounterProps {
  unitsPerGroup: number;
  maxStock: number;
  onUpdate?: (newValue: number) => void;
  className?: string;
}

// Luego declaro GroupCounter de tipo componente funcional que recibe como argumento la interfaz creada anteriormente
const GroupCounter: React.FC<GroupCounterProps> = ({
  unitsPerGroup,
  maxStock,
  onUpdate,
  className,
}) => {
  const [groups, setGroups] = useState(0);
  const units = useMemo(() => groups * unitsPerGroup, [groups]);

  useEffect(() => {
    if (onUpdate !== undefined) onUpdate(groups);
  }, [groups]);

  return (
    <div className={`${className} flex gap-3`}>
      <div className="flex flex-col items-center">
        <label className="text-sm font-bold">Cantidad de Unidades</label>
        <div className="flex">
          <input
            type="number"
            className="border border-gray-100 w-16 text-center rounded-md"
            disabled
            value={units}
          />
          <span className="ml-2 text-gray-400">unidades</span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <UnitCounter
          label="Cantidad de Pallets"
          value={0}
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
