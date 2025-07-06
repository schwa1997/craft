"use client";

import { useState } from "react";
import data from "../../data/energy.json";

// Type definitions
type EnergyCategory = "work" | "life" | "goals";
type EnergyEntry = { value: number; notes?: string };
type DailyEnergyRecord = {
  date: string;
  work: Record<string, EnergyEntry>;
  life: Record<string, EnergyEntry>;
  goals: Record<string, EnergyEntry>;
};
type YearlyEnergyData = Record<number, Record<number, DailyEnergyRecord[]>>;
type MonthlyGoals = Record<
  number,
  Record<number, Record<EnergyCategory, number>>
>;

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

const daysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export default function StaticEnergyGarden() {
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [selectedDay, setSelectedDay] = useState<DailyEnergyRecord | null>(
    null
  );

  const yearlyData: YearlyEnergyData = data.records;
  const yearlyGoals: MonthlyGoals = data.monthlyGoals;
  const settings = data.settings;

  const energyData = yearlyData[currentYear]?.[currentMonth] || [];
  const currentMonthGoal = yearlyGoals[currentYear]?.[currentMonth] || {
    work: 0,
    life: 0,
    goals: 0,
  };

  // Calculate progress for each main category
  const progress = {
    work: energyData.reduce((sum, day) => {
      return (
        sum +
        Object.values(day.work).reduce(
          (subSum, entry) => subSum + entry.value,
          0
        )
      );
    }, 0),
    life: energyData.reduce((sum, day) => {
      return (
        sum +
        Object.values(day.life).reduce(
          (subSum, entry) => subSum + entry.value,
          0
        )
      );
    }, 0),
    goals: energyData.reduce((sum, day) => {
      return (
        sum +
        Object.values(day.goals).reduce(
          (subSum, entry) => subSum + entry.value,
          0
        )
      );
    }, 0),
  };

  const getPlantHeight = (type: EnergyCategory) => {
    const goal = currentMonthGoal[type] || 1;
    const ratio = progress[type] / goal;
    return Math.min(100, ratio * 80 + 20);
  };

  const getCategoryColor = (type: EnergyCategory) => {
    return settings.categories[type].color;
  };

  const getSubcategoryColor = (type: EnergyCategory, subcategory: string) => {
    const sub = settings.subcategories[type].find(
      (s) => s.name === subcategory
    );
    return sub?.color || "#cccccc";
  };

  const getSubcategoryName = (type: EnergyCategory, subcategory: string) => {
    const sub = settings.subcategories[type].find(
      (s) => s.name === subcategory
    );
    return sub?.name || subcategory;
  };

  const calendarDays = [];
  const totalDays = daysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-20"></div>);
  }

  for (let day = 1; day <= totalDays; day++) {
    // Update the day data lookup to properly handle month indexing:
    const dayData = energyData.find((d) => {
      const date = new Date(d.date);
      return (
        date.getDate() === day &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    }) || {
      date: `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`,
      work: {},
      life: {},
      goals: {},
    };

    const totalEnergy =
      Object.values(dayData.work).reduce((sum, e) => sum + e.value, 0) +
      Object.values(dayData.life).reduce((sum, e) => sum + e.value, 0) +
      Object.values(dayData.goals).reduce((sum, e) => sum + e.value, 0);

    calendarDays.push(
      <div
        key={`day-${day}`}
        className={`bg-white rounded-lg shadow-sm border border-emerald-100 p-1 flex flex-col items-center justify-between h-20 hover:shadow-md transition cursor-pointer ${
          totalEnergy > 0 ? "opacity-100" : "opacity-60"
        }`}
        onClick={() => setSelectedDay(dayData)}
      >
        <span className="text-xs text-emerald-700">{day}</span>

        {totalEnergy > 0 ? (
          <div className="w-full flex flex-col gap-1 mt-1">
            {/* Work Energy */}
            {Object.entries(dayData.work).length > 0 && (
              <div className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getCategoryColor("work") }}
                />
                <div className="flex-1 flex gap-0.5">
                  {Object.entries(dayData.work).map(([subcategory, entry]) => (
                    <div
                      key={`work-${subcategory}`}
                      className="rounded-sm h-2 transition-all relative group"
                      style={{
                        width: `${Math.min(entry.value * 10, 100)}%`,
                        backgroundColor: getSubcategoryColor(
                          "work",
                          subcategory
                        ),
                      }}
                    >
                      <div className="absolute hidden group-hover:block z-10 bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded bg-gray-800 text-white whitespace-nowrap">
                        {getSubcategoryName("work", subcategory)}: {entry.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Life Energy */}
            {Object.entries(dayData.life).length > 0 && (
              <div className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getCategoryColor("life") }}
                />
                <div className="flex-1 flex gap-0.5">
                  {Object.entries(dayData.life).map(([subcategory, entry]) => (
                    <div
                      key={`life-${subcategory}`}
                      className="rounded-sm h-2 transition-all relative group"
                      style={{
                        width: `${Math.min(entry.value * 10, 100)}%`,
                        backgroundColor: getSubcategoryColor(
                          "life",
                          subcategory
                        ),
                      }}
                    >
                      <div className="absolute hidden group-hover:block z-10 bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded bg-gray-800 text-white whitespace-nowrap">
                        {getSubcategoryName("life", subcategory)}: {entry.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Goals Energy */}
            {Object.entries(dayData.goals).length > 0 && (
              <div className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getCategoryColor("goals") }}
                />
                <div className="flex-1 flex gap-0.5">
                  {Object.entries(dayData.goals).map(([subcategory, entry]) => (
                    <div
                      key={`goals-${subcategory}`}
                      className="rounded-sm h-2 transition-all relative group"
                      style={{
                        width: `${Math.min(entry.value * 10, 100)}%`,
                        backgroundColor: getSubcategoryColor(
                          "goals",
                          subcategory
                        ),
                      }}
                    >
                      <div className="absolute hidden group-hover:block z-10 bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded bg-gray-800 text-white whitespace-nowrap">
                        {getSubcategoryName("goals", subcategory)}:{" "}
                        {entry.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-xs text-gray-400 mt-2">No data</div>
        )}
      </div>
    );
  }

  const handleMonthChange = (offset: number) => {
    const newMonth = currentMonth + offset;
    if (newMonth < 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else if (newMonth > 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(newMonth);
    }
    setSelectedDay(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-emerald-700 mb-6">
        🌱 Energy Garden
      </h1>

      {/* Category Legend */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        {Object.entries(settings.categories).map(([type, category]) => (
          <div key={type} className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: category.color }}
            />
            <span className="text-sm font-medium text-gray-700">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      {/* Subcategory Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 w-full max-w-4xl">
        {(["work", "life", "goals"] as EnergyCategory[]).map((type) => (
          <div
            key={type}
            className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100"
          >
            <h3 className="font-semibold text-emerald-700 mb-2 flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: getCategoryColor(type) }}
              />
              {settings.categories[type].name} Subcategories
            </h3>
            <div className="flex flex-wrap gap-2">
              {settings.subcategories[type].map((sub) => (
                <div
                  key={sub.name}
                  className="flex items-center text-sm text-gray-600"
                >
                  <div
                    className="w-2 h-2 rounded-full mr-1"
                    style={{ backgroundColor: sub.color }}
                  />
                  {sub.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Plants */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-5xl mb-8">
        {(["work", "life", "goals"] as EnergyCategory[]).map((type) => (
          <div
            key={type}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center border border-emerald-100"
          >
            <h2 className="capitalize text-lg font-semibold text-emerald-700 mb-1">
              {settings.categories[type].name}
            </h2>
            <p className="text-sm text-emerald-500 mb-2">
              {progress[type]} / {currentMonthGoal[type]}
            </p>
            <div className="relative w-12 h-40 bg-emerald-100 rounded-full overflow-hidden">
              <div
                className="absolute bottom-0 w-full rounded-full transition-all duration-700 ease-out"
                style={{
                  height: `${getPlantHeight(type)}%`,
                  backgroundColor: getCategoryColor(type),
                }}
              />
            </div>
            <div className="mt-3 w-full">
              <h3 className="text-xs font-medium text-gray-500 mb-1">
                Subcategory Progress
              </h3>
              <div className="space-y-1">
                {settings.subcategories[type].map((sub) => {
                  const subProgress = energyData.reduce((sum, day) => {
                    return sum + (day[type][sub.name]?.value || 0);
                  }, 0);
                  const subGoal =
                    currentMonthGoal[type] /
                    settings.subcategories[type].length;
                  const percentage = Math.min(
                    100,
                    (subProgress / subGoal) * 100
                  );

                  return (
                    <div key={sub.name} className="flex items-center">
                      <div
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: sub.color }}
                      />
                      <div className="flex-1 text-xs text-gray-700">
                        {sub.name}
                      </div>
                      <div className="text-xs font-medium">
                        {subProgress}{" "}
                        <span className="text-gray-400">
                          / {Math.round(subGoal)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Month Navigation */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => handleMonthChange(-1)}
          className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition"
        >
          ←
        </button>
        <h2 className="text-xl font-semibold text-emerald-700">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button
          onClick={() => handleMonthChange(1)}
          className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition"
        >
          →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 w-full max-w-5xl mb-8">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-emerald-600"
          >
            {day}
          </div>
        ))}
        {calendarDays}
      </div>

      {/* Day Detail Modal */}
      {selectedDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-emerald-700">
                {new Date(selectedDay.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              <button
                onClick={() => setSelectedDay(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {(["work", "life", "goals"] as EnergyCategory[]).map((type) => (
              <div key={type} className="mb-4">
                <h4 className="font-medium text-emerald-700 flex items-center mb-2">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: getCategoryColor(type) }}
                  />
                  {settings.categories[type].name}
                </h4>

                {Object.entries(selectedDay[type]).length > 0 ? (
                  <div className="space-y-2">
                    {Object.entries(selectedDay[type]).map(
                      ([subcategory, entry]) => (
                        <div key={subcategory} className="flex items-center">
                          <div
                            className="w-2 h-2 rounded-full mr-2"
                            style={{
                              backgroundColor: getSubcategoryColor(
                                type,
                                subcategory
                              ),
                            }}
                          />
                          <div className="flex-1">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">
                                {getSubcategoryName(type, subcategory)}
                              </span>
                              <span className="text-gray-600">
                                {entry.value} energy
                              </span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2 mt-1">
                              <div
                                className="h-2 rounded-full"
                                style={{
                                  width: `${Math.min(entry.value * 10, 100)}%`,
                                  backgroundColor: getSubcategoryColor(
                                    type,
                                    subcategory
                                  ),
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">
                    No {type.toLowerCase()} recorded
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
