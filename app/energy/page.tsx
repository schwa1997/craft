"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import data from "../../data/energy.json";

type EnergyType = "work" | "side" | "life";
type EnergyData = { day: number } & Record<EnergyType, number>;
type MonthlyData = Record<number, EnergyData[]>;

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const goals = { work: 100, side: 60, life: 80 };

export default function StaticEnergyGarden() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const monthlyData: MonthlyData = data.energy;

  const energyData = monthlyData[currentMonth] || [];
  const progress = {
    work: energyData.reduce((sum, d) => sum + d.work, 0),
    side: energyData.reduce((sum, d) => sum + d.side, 0),
    life: energyData.reduce((sum, d) => sum + d.life, 0),
  };

  const getPlantHeight = (type: EnergyType) => {
    const ratio = progress[type] / goals[type];
    return Math.min(100, ratio * 80 + 20);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Energy Garden (Static)</h1>

      {/* Trees */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {(["work", "side", "life"] as EnergyType[]).map((type) => (
          <div key={type} className="p-4 border rounded">
            <h2 className="capitalize mb-2">{type} Tree</h2>
            <p>
              {progress[type]} / {goals[type]}
            </p>
            <div className="h-40 bg-gray-100 relative">
              <div
                className="absolute bottom-0 w-full bg-green-500"
                style={{ height: `${getPlantHeight(type)}px` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="mb-4 flex justify-between items-center">
        <button onClick={() => setCurrentMonth((prev) => (prev - 1 + 12) % 12)}>
          ←
        </button>
        <h2 className="text-xl font-semibold">{monthNames[currentMonth]}</h2>
        <button onClick={() => setCurrentMonth((prev) => (prev + 1) % 12)}>
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {energyData.map((day) => (
          <div key={day.day} className="p-2 border rounded text-center">
            <p className="text-xs">{day.day}</p>
            <div className="flex flex-col gap-0.5">
              {day.work > 0 && (
                <div className="bg-green-400 h-1" style={{ width: `${day.work * 10}%` }} />
              )}
              {day.side > 0 && (
                <div className="bg-teal-400 h-1" style={{ width: `${day.side * 10}%` }} />
              )}
              {day.life > 0 && (
                <div className="bg-lime-400 h-1" style={{ width: `${day.life * 10}%` }} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
