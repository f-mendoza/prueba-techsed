"use client";

import { Plus, Minus } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import UnitCounter from "./UnitCounter";

// Declaro una interfaz con los props y sus respectivos tipos
interface GroupCounterProps {
  unit: string;
  areaPerUnit: number;
  maxStock: number;
  className?: string;
}

// Luego declaro GroupCounter de tipo componente funcional que recibe como argumento la interfaz creada anteriormente
const GroupCounter: React.FC<GroupCounterProps> = ({
  unit,
  areaPerUnit,
  maxStock,
  className,
}) => {
  const [groups, setGroups] = useState(0);
  const [area, setArea] = useState(0);
  // const area = useMemo(() => groups * areaPerUnit, [groups]);

  const handleAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArea(Number(event.target.value));
    const timeoutId = setTimeout(
      () =>
        setGroups(
          // Elijo entre el stock maximo del producto o la cantidad necesaria para cubrir la superficie/distancia deseada
          Math.min(
            maxStock,
            // Divido la cantidad de superficie/distancia por el area/distancia cubierta por cada caja
            Math.ceil(Number(event.target.value) / areaPerUnit)
          )
        ),
      2000
    );
    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    setArea(Number((groups * areaPerUnit).toFixed(2)));
  }, [groups]);

  return (
    <div className={`${className} flex gap-3`}>
      <div className="flex flex-col items-center">
        <label className="text-sm font-bold">
          {unit === "m2" ? "Superficie (en m2)" : "Distancia cubierta (en m)"}
        </label>
        <div className="flex">
          <input
            type="number"
            className="border border-gray-100 w-16 text-center rounded-md"
            onChange={handleAreaChange}
            value={area}
          />
          <span className="ml-2 text-gray-400">{unit}</span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <UnitCounter
          label="Cantidad de cajas"
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
