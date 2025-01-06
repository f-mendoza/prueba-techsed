"use client";

import { Plus, Minus } from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";
import UnitCounter from "./UnitCounter";
import CounterProps from "../interfaces/CounterProps";

// Luego declaro GroupCounter de tipo componente funcional que recibe como argumento la interfaz creada anteriormente
const GroupCounter: React.FC<CounterProps> = ({
  measurementUnit,
  unitValue,
  stock,
  value,
  onUpdate,
  className,
}) => {
  const [groups, setGroups] = useState(0);
  const [area, setArea] = useState(0);
  // const area = useMemo(() => groups * areaPerUnit, [groups]);

  useEffect(() => {
    if (onUpdate !== undefined) onUpdate(groups);
  }, [groups]);

  useEffect(() => {
    if (value <= stock) setGroups(value);
  }, [value]);

  const timeout = useRef<NodeJS.Timeout | null>(null);

  const handleAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (stock > 0) {
      setArea(Number(event.target.value));

      // Si ya existe un timeout lo elimino
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => {
        setGroups(
          // Elijo entre el stock maximo del producto o la cantidad necesaria para cubrir la superficie/distancia deseada
          Math.min(
            stock,
            // Divido la cantidad de superficie/distancia por el area/distancia cubierta por cada caja
            Math.ceil(Number(event.target.value) / (unitValue ?? 1))
          )
        );
        setArea(Number((groups * (unitValue ?? 1)).toFixed(2)));
      }, 2000);
    }
  };

  useEffect(() => {
    // Si cambia la cantidad de grupos, actualizo el area cubierta redondeado a 2 decimales
    setArea(Number((groups * (unitValue ?? 1)).toFixed(2)));
  }, [groups]);

  return (
    <div className={`${className} flex gap-3`}>
      <div className="flex flex-col items-center">
        <label className="text-sm font-bold">
          {measurementUnit === "m2"
            ? "Superficie (en m2)"
            : "Distancia cubierta (en m)"}
        </label>
        <div className="flex">
          <input
            type="number"
            className="border border-gray-100 w-16 text-center rounded-md"
            onChange={handleAreaChange}
            value={area}
            data-item="area-input"
          />
          <span className="ml-2 text-gray-400">{measurementUnit}</span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <UnitCounter
          label="Cantidad de cajas"
          value={groups}
          stock={stock}
          onUpdate={setGroups}
        ></UnitCounter>
      </div>
    </div>
  );
};

export default GroupCounter;
