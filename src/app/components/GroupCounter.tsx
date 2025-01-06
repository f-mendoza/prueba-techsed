"use client";

import { Plus, Minus } from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";
import UnitCounter from "./UnitCounter";
import CounterProps from "../interfaces/CounterProps";

const GroupCounter: React.FC<CounterProps> = ({
  unitValue,
  stock,
  measurementUnit,
  value,
  onUpdate,
  className,
}) => {
  const [groups, setGroups] = useState(value);
  // En caso de que unitValue no se haya recibido en el componente se toma como valor por defecto 1
  const [units, setUnits] = useState(groups * (unitValue ?? 1));

  useEffect(() => {
    if (onUpdate !== undefined) onUpdate(groups);
    setUnits(groups * (unitValue ?? 1));
  }, [groups]);

  useEffect(() => {
    if (value <= stock) setGroups(value);
  }, [value]);

  const timeout = useRef<NodeJS.Timeout | null>(null);

  const handleGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (stock > 0) {
      setUnits(Number(event.target.value));

      // Si ya existe un timeout lo elimino
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => {
        let groupValue = Math.min(
          // Elijo entre el stock maximo del producto o la cantidad necesaria para completar el pallet/bolson
          stock,
          // Divido la cantidad de superficie/distancia por el area/distancia cubierta por cada caja
          Math.ceil(Number(event.target.value) / (unitValue ?? 1))
        );
        setGroups(groupValue);
        setUnits(groupValue * (unitValue ?? 1));
      }, 2000);
    }
  };

  return (
    <div className={`${className} flex gap-3`}>
      <div className="flex flex-col items-center">
        <label className="text-sm font-bold">Cantidad de Unidades</label>
        <div className="flex">
          <input
            type="number"
            className="border border-gray-200 w-16 text-center rounded-md"
            onChange={handleGroupChange}
            value={units}
            data-item="units-counter-input"
          />
          <span className="ml-2 text-gray-400">unidades</span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <UnitCounter
          label={`Cantidad de ${
            measurementUnit === "pallet" ? "Pallets" : "Bolsones"
          }`}
          value={groups}
          stock={stock}
          onUpdate={setGroups}
        ></UnitCounter>
      </div>
    </div>
  );
};

export default GroupCounter;
