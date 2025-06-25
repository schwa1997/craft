"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type EnergyType = "work" | "side" | "life";
type EnergyData = { day: number } & Record<EnergyType, number>;
type MonthlyData = Record<number, EnergyData[]>; // key = month (0-11)

const DAILY_ENERGY = 10;
const MIN_ENERGY = 0;

const generateMonthData = (month: number): EnergyData[] => {
  const daysInMonth = new Date(2023, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    work: MIN_ENERGY,
    side: MIN_ENERGY,
    life: MIN_ENERGY,
  }));
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const LOCAL_STORAGE_KEY = "energy_garden_data";

// Green color palette
const greenPalette = {
  background: "bg-emerald-50",
  text: {
    primary: "text-emerald-900",
    secondary: "text-emerald-700",
    light: "text-emerald-600",
  },
  button: {
    base: "bg-emerald-500 hover:bg-emerald-600",
    light: "bg-emerald-100 hover:bg-emerald-200",
    disabled: "bg-emerald-300 cursor-not-allowed",
  },
  energyTypes: {
    work: {
      light: "bg-emerald-300",
      medium: "bg-emerald-500",
      dark: "bg-emerald-700",
    },
    side: {
      light: "bg-teal-300",
      medium: "bg-teal-500",
      dark: "bg-teal-700",
    },
    life: {
      light: "bg-lime-300",
      medium: "bg-lime-500",
      dark: "bg-lime-700",
    },
  },
  border: "border-emerald-200",
  shadow: "shadow-md",
  highlight: "ring-2 ring-emerald-500",
};

export default function EnergyGarden() {
  const currentRealMonth = new Date().getMonth();
  const currentRealDay = new Date().getDate();

  const [currentMonth, setCurrentMonth] = useState(currentRealMonth);
  const [monthlyData, setMonthlyData] = useState<MonthlyData>({});
  const [goals] = useState({ work: 100, side: 60, life: 80 });
  const [progress, setProgress] = useState({ work: 0, side: 0, life: 0 });
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showWatering, setShowWatering] = useState(false);
  const [lastWatered, setLastWatered] = useState<EnergyType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [tempEnergy, setTempEnergy] = useState<EnergyData | null>(null);
  const [remainingEnergy, setRemainingEnergy] = useState(DAILY_ENERGY);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setMonthlyData(JSON.parse(saved));
    } else {
      setMonthlyData({ [currentMonth]: generateMonthData(currentMonth) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(monthlyData));
  }, [monthlyData]);

  const energyData =
    monthlyData[currentMonth] || generateMonthData(currentMonth);

  useEffect(() => {
    setMonthlyData((prev) => {
      if (prev[currentMonth]) return prev;
      return { ...prev, [currentMonth]: generateMonthData(currentMonth) };
    });

    const daysInMonth = new Date(2023, currentMonth + 1, 0).getDate();
    if (selectedDay && selectedDay > daysInMonth) {
      setSelectedDay(null);
    }
  }, [currentMonth]);

  useEffect(() => {
    setProgress({
      work: energyData.reduce((sum, day) => sum + day.work, 0),
      side: energyData.reduce((sum, day) => sum + day.side, 0),
      life: energyData.reduce((sum, day) => sum + day.life, 0),
    });
  }, [energyData]);

  useEffect(() => {
    if (tempEnergy) {
      const usedEnergy = tempEnergy.work + tempEnergy.side + tempEnergy.life;
      setRemainingEnergy(DAILY_ENERGY - usedEnergy);
    }
  }, [tempEnergy]);

  const handleMonthChange = (increment: number) => {
    setCurrentMonth((prev) => (prev + increment + 12) % 12);
  };

  const generateDailyCSV = (dayData: EnergyData) => {
    const headers =
      "Date,Work Energy,Side Projects Energy,Life Energy,Total Energy\n";
    const dateStr = new Date(2023, currentMonth, dayData.day)
      .toISOString()
      .split("T")[0];
    const row = [
      dateStr,
      dayData.work,
      dayData.side,
      dayData.life,
      dayData.work + dayData.side + dayData.life,
    ].join(",");

    return headers + row;
  };

  const downloadCSV = () => {
    if (!selectedDay) return;

    setExportLoading(true);
    const dayData = energyData.find((d) => d.day === selectedDay);
    if (!dayData) return;

    const csvContent = generateDailyCSV(dayData);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `energy-garden-${
        new Date(2023, currentMonth, selectedDay).toISOString().split("T")[0]
      }.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(url);
      setExportLoading(false);
    }, 100);
  };
  const waterPlant = (type: EnergyType) => {
    if (!selectedDay) return;

    const selectedDayData = energyData.find((d) => d.day === selectedDay);
    if (!selectedDayData) return;

    // Check if total energy would exceed limit
    const currentTotal =
      selectedDayData.work + selectedDayData.side + selectedDayData.life;
    if (currentTotal >= DAILY_ENERGY) return;

    setShowWatering(true);
    setLastWatered(type);

    setMonthlyData((prev) => {
      const monthCopy = { ...prev };
      const newData = [
        ...(monthCopy[currentMonth] || generateMonthData(currentMonth)),
      ];
      const dayIndex = newData.findIndex((d) => d.day === selectedDay);
      if (dayIndex >= 0) {
        newData[dayIndex][type] += 1;
        monthCopy[currentMonth] = newData;
      }
      return monthCopy;
    });

    setTimeout(() => setShowWatering(false), 1000);
  };

  const getPlantHeight = (type: EnergyType) => {
    const ratio = progress[type] / goals[type];
    return Math.min(100, ratio * 80 + 20);
  };

  const isCurrentMonth = currentMonth === currentRealMonth;
  const isToday = (day: number) => isCurrentMonth && day === currentRealDay;
  const selectedDayData = energyData.find((d) => d.day === selectedDay) || {
    work: 0,
    side: 0,
    life: 0,
  };

  const getEnergyTypeColor = (
    type: EnergyType,
    shade: "light" | "medium" | "dark" = "medium"
  ) => {
    return greenPalette.energyTypes[type][shade];
  };

  const adjustEnergy = (type: EnergyType, delta: number) => {
    if (!tempEnergy) return;

    const current = tempEnergy[type];
    const newTotal =
      tempEnergy.work + tempEnergy.side + tempEnergy.life + delta;

    if (delta > 0 && remainingEnergy <= 0) return;
    if (delta < 0 && current <= MIN_ENERGY) return;

    const newValue = current + delta;

    setTempEnergy({
      ...tempEnergy,
      [type]: newValue,
    });
  };

  return (
    <div
      className={`min-h-screen ${greenPalette.background} p-4 font-sans relative`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-6 relative">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`text-3xl font-bold ${greenPalette.text.primary} mb-2`}
          >
            Energy Garden
          </motion.h1>
          <p className={greenPalette.text.light}>
            Water your plants with energy to help them grow!
          </p>
          <button
            onClick={() => setShowInfoModal(true)}
            className="absolute top-0 right-0 p-2 text-emerald-500 hover:text-emerald-700"
            aria-label="How to use"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </header>

        {/* Garden Section */}
        <section className="grid grid-cols-3 gap-4 mb-8">
          {(["work", "side", "life"] as EnergyType[]).map((type) => (
            <motion.div
              key={type}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`bg-white p-4 rounded-xl ${greenPalette.shadow} border ${greenPalette.border} text-center`}
            >
              <h3
                className={`capitalize font-medium ${greenPalette.text.secondary} mb-2`}
              >
                {type} Tree
              </h3>

              {/* Progress */}
              <div className="flex justify-between items-center mb-2 text-sm">
                <span className={greenPalette.text.light}>
                  Water: {progress[type]}/{goals[type]}
                </span>
                <span className={greenPalette.text.light}>
                  {Math.min(
                    100,
                    Math.floor((progress[type] / goals[type]) * 100)
                  )}
                  % grown
                </span>
              </div>

              {/* Plant Visualization */}
              <div className="relative h-40 flex justify-center items-end mb-3">
                <div className="absolute bottom-0 w-16 bg-amber-700 rounded-b-lg z-10" />

                <motion.div
                  animate={{ height: `${getPlantHeight(type)}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                  className="relative w-12 origin-bottom"
                >
                  <div
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 ${
                      progress[type] >= goals[type]
                        ? getEnergyTypeColor(type, "dark")
                        : getEnergyTypeColor(type, "medium")
                    } h-full rounded-t-full`}
                  />

                  {progress[type] > 0 && (
                    <div
                      className={`absolute top-1/4 left-1/2 w-4 h-4 ${getEnergyTypeColor(
                        type,
                        "light"
                      )} rounded-full transform -translate-x-1/2`}
                    />
                  )}
                  {progress[type] > goals[type] * 0.3 && (
                    <div
                      className={`absolute top-1/2 left-1/4 w-3 h-3 ${getEnergyTypeColor(
                        type,
                        "light"
                      )} rounded-full`}
                    />
                  )}
                  {progress[type] > goals[type] * 0.6 && (
                    <div
                      className={`absolute top-1/2 right-1/4 w-3 h-3 ${getEnergyTypeColor(
                        type,
                        "light"
                      )} rounded-full`}
                    />
                  )}

                  {progress[type] >= goals[type] && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-0 left-1/2 transform -translate-x-1/2"
                    >
                      <div className="w-6 h-6 bg-yellow-300 rounded-full" />
                      <div className="absolute top-0 left-0 w-6 h-6 bg-yellow-200 rounded-full opacity-70" />
                    </motion.div>
                  )}
                </motion.div>

                <AnimatePresence>
                  {showWatering && lastWatered === type && (
                    <motion.div
                      initial={{ y: -20, opacity: 1 }}
                      animate={{ y: -60, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-0 text-emerald-400 text-2xl"
                    >
                      💧
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => waterPlant(type)}
                disabled={!selectedDay}
                className={`px-4 py-2 rounded-lg text-white ${
                  !selectedDay
                    ? greenPalette.button.disabled
                    : getEnergyTypeColor(type, "medium")
                } transition`}
              >
                Water {selectedDay ? `Day ${selectedDay}` : "Today"}
              </motion.button>
            </motion.div>
          ))}
        </section>

        {/* Calendar */}
        <section
          className={`bg-white rounded-xl ${greenPalette.shadow} p-4 mb-6`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2
              className={`text-xl font-semibold ${greenPalette.text.secondary}`}
            >
              {monthNames[currentMonth]} Garden
            </h2>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMonthChange(-1)}
                className={`px-3 py-1 ${greenPalette.button.light} ${greenPalette.text.secondary} rounded-lg transition`}
              >
                ←
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMonthChange(1)}
                className={`px-3 py-1 ${greenPalette.button.light} ${greenPalette.text.secondary} rounded-lg transition`}
              >
                →
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div
                key={`${day}-${index}`}
                className={`text-center text-sm font-medium ${greenPalette.text.light} p-1`}
              >
                {day}
              </div>
            ))}

            {energyData.map((day) => {
              const total = day.work + day.side + day.life;
              const today = isToday(day.day);
              const selected = selectedDay === day.day;
              return (
                <motion.div
                  key={day.day}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setSelectedDay(day.day);
                    setTempEnergy({ ...day });
                    setShowModal(true);
                  }}
                  className={`aspect-square rounded-lg cursor-pointer transition-all flex flex-col ${
                    today ? greenPalette.highlight : ""
                  } ${
                    selected
                      ? "bg-emerald-200"
                      : total > 0
                      ? "bg-emerald-100"
                      : "bg-gray-50"
                  }`}
                >
                  <div
                    className={`text-xs font-medium p-1 ${greenPalette.text.light}`}
                  >
                    {day.day}
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-0.5 p-0.5">
                    {day.work > 0 && (
                      <div
                        className={`${getEnergyTypeColor(
                          "work",
                          "light"
                        )} rounded-sm`}
                        style={{
                          gridColumn: "1 / 3",
                          height: `${day.work * 5}%`,
                        }}
                      />
                    )}
                    {day.side > 0 && (
                      <div
                        className={`${getEnergyTypeColor(
                          "side",
                          "light"
                        )} rounded-sm`}
                        style={{ height: `${day.side * 5}%` }}
                      />
                    )}
                    {day.life > 0 && (
                      <div
                        className={`${getEnergyTypeColor(
                          "life",
                          "light"
                        )} rounded-sm`}
                        style={{ height: `${day.life * 5}%` }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Selected Day's Stats */}
        {selectedDay && (
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`bg-white rounded-xl ${greenPalette.shadow} p-4`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-medium ${greenPalette.text.secondary} mb-3`}>
                Energy for Day {selectedDay}
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadCSV}
                disabled={exportLoading}
                className={`px-3 py-1 text-sm rounded-lg ${
                  exportLoading
                    ? greenPalette.button.disabled
                    : greenPalette.button.light
                } ${greenPalette.text.secondary}`}
              >
                {exportLoading ? "Exporting..." : "Export CSV"}
              </motion.button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {(["work", "side", "life"] as EnergyType[]).map((type) => (
                <div key={type} className="text-center">
                  <div
                    className={`h-3 rounded-full mb-2 ${getEnergyTypeColor(
                      type,
                      "light"
                    )}`}
                    style={{ width: `${selectedDayData[type] * 20}%` }}
                  />
                  <div
                    className={`capitalize text-sm ${greenPalette.text.light}`}
                  >
                    {type}
                  </div>
                  <div className="text-lg font-bold text-green-500">
                    {selectedDayData[type]}
                    <span className="text-xs  ml-1">energy</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        <div className={`mt-6 text-center text-sm ${greenPalette.text.light}`}>
          <p>
            ✨ Select a day and water your plants to grow your energy garden!
          </p>
          <p className="mt-1">
            🌱 Reach monthly goals to see your plants bloom
          </p>
        </div>
      </div>

      {/* Modal - now appears without dimming the background */}
      <AnimatePresence>
        {showModal && tempEnergy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 bg-white rounded-xl p-6 w-[320px] shadow-lg z-50 border border-emerald-200"
          >
            <h2
              className={`text-lg font-semibold mb-4 ${greenPalette.text.secondary}`}
            >
              Allocate Energy for Day {tempEnergy.day}
            </h2>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className={greenPalette.text.light}>
                  Remaining Energy:
                </span>
                <span
                  className={`font-bold ${
                    remainingEnergy === 0
                      ? "text-emerald-600"
                      : "text-emerald-400"
                  }`}
                >
                  {remainingEnergy} / {DAILY_ENERGY}
                </span>
              </div>
              <div className="h-2 bg-emerald-100 rounded-full mb-4">
                <div
                  className={`h-full rounded-full ${
                    remainingEnergy === 0 ? "bg-emerald-500" : "bg-emerald-300"
                  }`}
                  style={{
                    width: `${
                      ((DAILY_ENERGY - remainingEnergy) / DAILY_ENERGY) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            {(["work", "side", "life"] as EnergyType[]).map((type) => (
              <div
                key={type}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${getEnergyTypeColor(
                      type,
                      "medium"
                    )}`}
                  />
                  <span className={`capitalize ${greenPalette.text.secondary}`}>
                    {type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className={`px-3 py-1 rounded-lg ${
                      tempEnergy[type] <= MIN_ENERGY
                        ? "bg-gray-200 cursor-not-allowed"
                        : greenPalette.button.light
                    }`}
                    onClick={() => adjustEnergy(type, -1)}
                    disabled={tempEnergy[type] <= MIN_ENERGY}
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{tempEnergy[type]}</span>
                  <button
                    className={`px-3 py-1 rounded-lg ${
                      remainingEnergy <= 0
                        ? "bg-gray-200 cursor-not-allowed"
                        : greenPalette.button.light
                    }`}
                    onClick={() => adjustEnergy(type, 1)}
                    disabled={remainingEnergy <= 0}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 flex justify-between">
              <button
                className={`px-4 py-2 ${greenPalette.button.light} rounded-lg  text-white`}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 ${greenPalette.button.base} text-white rounded-lg`}
                onClick={() => {
                  setMonthlyData((prev) => {
                    const updated = [...(prev[currentMonth] || [])];
                    const index = updated.findIndex(
                      (d) => d.day === tempEnergy.day
                    );
                    if (index !== -1) {
                      updated[index] = { ...tempEnergy };
                    }
                    return { ...prev, [currentMonth]: updated };
                  });
                  setShowModal(false);
                }}
              >
                Save Allocation
              </button>
            </div>
          </motion.div>
        )}
        {showInfoModal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-30"
              onClick={() => setShowInfoModal(false)}
            />
            <motion.div className="bg-white rounded-xl p-6 max-w-md w-full relative">
              <h2
                className={`text-xl font-semibold mb-4 ${greenPalette.text.secondary}`}
              >
                How to Use Energy Garden
              </h2>

              <div className="space-y-3">
                <div className="flex items-start">
                  <div
                    className={`flex-shrink-0 h-5 w-5 rounded-full ${greenPalette.energyTypes.work.medium} mr-3 mt-1`}
                  />
                  <p className={greenPalette.text.light}>
                    <strong>Work Tree:</strong> Represents your professional
                    energy. Allocate energy to track your work focus.
                  </p>
                </div>

                <div className="flex items-start">
                  <div
                    className={`flex-shrink-0 h-5 w-5 rounded-full ${greenPalette.energyTypes.side.medium} mr-3 mt-1`}
                  />
                  <p className={greenPalette.text.light}>
                    <strong>Side Tree:</strong> Represents side projects or
                    learning. Track your personal development energy.
                  </p>
                </div>

                <div className="flex items-start">
                  <div
                    className={`flex-shrink-0 h-5 w-5 rounded-full ${greenPalette.energyTypes.life.medium} mr-3 mt-1`}
                  />
                  <p className={greenPalette.text.light}>
                    <strong>Life Tree:</strong> Represents personal life energy.
                    Balance your personal time and relationships.
                  </p>
                </div>

                <div className="pt-3 border-t border-emerald-100">
                  <p className={greenPalette.text.light}>
                    <strong>Daily Energy:</strong> You have {DAILY_ENERGY}{" "}
                    energy points to allocate each day. Distribute them across
                    the three categories to grow your garden.
                  </p>
                </div>

                <div className="pt-3 border-t border-emerald-100">
                  <p className={greenPalette.text.light}>
                    <strong>Goals:</strong> Each tree has a monthly growth goal.
                    Reach the goal to see your tree flourish!
                  </p>
                </div>
              </div>

              <button
                className={`mt-6 px-4 py-2 ${greenPalette.button.base} text-white rounded-lg w-full`}
                onClick={() => setShowInfoModal(false)}
              >
                Got it!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
