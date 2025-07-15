"use client";

import { useState } from "react";
import data from "../../data/energy.json";
import ReactMarkdown from "react-markdown";

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

// Updated to make Monday the first day (0)
const getFirstDayOfMonth = (year: number, month: number) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Convert Sunday (0) to 6, Monday (1) to 0, etc.
};

export default function StaticEnergyGarden() {
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [selectedDay, setSelectedDay] = useState<{
    date: string;
    data?: DailyEnergyRecord;
  } | null>(null);

  const yearlyData: any = data.records;
  const yearlyGoals: Record<
    number,
    Record<number, MonthlyGoals>
  > = data.monthlyGoals || {};
  const weeklyReport: WeeklyReport = data.weeklyReport || {};
  const settings: EnergySettings = data.settings;

  // Get current month's energy data (month is 1-indexed in JSON)
  const energyData: DailyEnergyRecord[] =
    yearlyData[currentYear]?.[currentMonth + 1] || [];

  // Get current month's goals with proper fallback
  const currentMonthGoal: MonthlyGoals = yearlyGoals[currentYear]?.[
    currentMonth + 1
  ] || {
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

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-20"></div>);
  }

  for (let day = 1; day <= totalDays; day++) {
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
        onClick={() => {
          setSelectedDay({
            date: dayData.date,
            data: dayData,
          });
        }}
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
    let newYear = currentYear;
    let newMonth = currentMonth + offset;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedDay(null);
  };

  // Helper function to get Monday of the week for a given date string
  const getMondayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    return new Date(date.setDate(diff));
  };

  // Helper function to get the Monday date string in YYYY-MM-DD format
  const getMondayString = (dateString: string) => {
    const monday = getMondayOfWeek(dateString);
    return monday.toISOString().split("T")[0];
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-4 md:p-6">
      {/* Header Section */}

      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-emerald-700 mb-2">
          🌱 Energy Garden
        </h1>
        <p className="text-emerald-600 text-lg">
          Track your daily energy distribution across work, life, and goals
        </p>
      </header>

      {/* Main Content - Two Column Layout on Desktop */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Stats & Controls (hidden on mobile) */}
        <div className="lg:col-span-1 space-y-6 hidden md:block">
          {/* Month Navigation */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-emerald-100">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => handleMonthChange(-1)}
                className="p-2 rounded-full hover:bg-emerald-50 transition"
              >
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h2 className="text-lg font-semibold text-emerald-700">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <button
                onClick={() => handleMonthChange(1)}
                className="p-2 rounded-full hover:bg-emerald-50 transition"
              >
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Progress Summary */}
            <div className="space-y-4">
              {(["work", "life", "goals"] as EnergyCategory[]).map((type) => (
                <div key={type} className="flex items-center">
                  <div
                    className="flex-shrink-0 w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: getCategoryColor(type) }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">
                        {settings.categories[type].name}
                      </span>
                      <span className="text-emerald-600">
                        {progress[type]}/{currentMonthGoal[type]}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mt-1">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${getPlantHeight(type)}%`,
                          backgroundColor: getCategoryColor(type),
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Legend */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-emerald-100">
            <h3 className="font-semibold text-emerald-700 mb-3">Categories</h3>
            <div className="space-y-3">
              {Object.entries(settings.categories).map(([type, category]) => (
                <div key={type} className="flex items-start">
                  <div
                    className="flex-shrink-0 w-3 h-3 rounded-full mt-1 mr-2"
                    style={{ backgroundColor: category.color }}
                  />
                  <div>
                    <h4 className="font-medium text-gray-700">
                      {category.name}
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {settings.subcategories[type as EnergyCategory].map(
                        (sub) => (
                          <span
                            key={sub.name}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                            style={{
                              backgroundColor: `${sub.color}20`,
                              color: sub.color,
                            }}
                          >
                            {sub.name}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Calendar Area */}
        <div className="lg:col-span-2">
          {/* Mobile Header (visible only on mobile) */}
          <div className="md:hidden bg-white rounded-xl shadow-sm p-4 mb-4 border border-emerald-100">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => handleMonthChange(-1)}
                className="p-2 rounded-full hover:bg-emerald-50 transition"
              >
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h2 className="text-lg font-semibold text-emerald-700">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <button
                onClick={() => handleMonthChange(1)}
                className="p-2 rounded-full hover:bg-emerald-50 transition"
              >
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Progress Summary */}
            <div className="grid grid-cols-3 gap-2">
              {(["work", "life", "goals"] as EnergyCategory[]).map((type) => (
                <div key={type} className="text-center">
                  <div className="text-xs text-gray-500 mb-1">
                    {settings.categories[type].name}
                  </div>
                  <div className="text-sm font-semibold text-emerald-700">
                    {progress[type]}/{currentMonthGoal[type]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-emerald-100">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-emerald-600 py-1"
                >
                  {day.substring(0, 3)}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">{calendarDays}</div>
          </div>
        </div>
      </div>

      {/* Weekly Report Modal */}
      {selectedDay && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-emerald-700">
                Weekly Report - Week of{" "}
                {getMondayOfWeek(selectedDay.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              <button
                onClick={() => setSelectedDay(null)}
                className="text-gray-600 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Weekly Report Modal */}
            {selectedDay && (
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-white/90 backdrop-blur-lg rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto border border-white/20 shadow-xl">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-emerald-800">
                        Weekly Report
                      </h3>
                      <p className="text-sm text-emerald-600">
                        Week of{" "}
                        {getMondayOfWeek(selectedDay.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedDay(null)}
                      className="p-1 rounded-full hover:bg-emerald-50 transition-colors"
                      aria-label="Close"
                    >
                      <svg
                        className="w-5 h-5 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* 内容区 */}
                  <div className="space-y-6">
                    {weeklyReport[getMondayString(selectedDay.date)] ? (
                      <>
                        <div className="bg-white/70 p-4 rounded-lg border border-white shadow-sm">
                          <h4 className="font-semibold text-emerald-700 mb-3 flex items-center">
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                              />
                            </svg>
                            Plan
                          </h4>
                          <div className="prose prose-sm max-w-none text-gray-700 pl-6">
                            <ReactMarkdown>
                              {
                                weeklyReport[getMondayString(selectedDay.date)]
                                  .plan
                              }
                            </ReactMarkdown>
                          </div>
                        </div>

                        {weeklyReport[getMondayString(selectedDay.date)]
                          .review && (
                          <div className="bg-white/70 p-4 rounded-lg border border-white shadow-sm">
                            <h4 className="font-semibold text-emerald-700 mb-3 flex items-center">
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              Review
                            </h4>
                            <div className="prose prose-sm max-w-none text-gray-700 pl-6">
                              <ReactMarkdown>
                                {
                                  weeklyReport[
                                    getMondayString(selectedDay.date)
                                  ].review
                                }
                              </ReactMarkdown>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <svg
                          className="w-12 h-12 mx-auto text-emerald-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="mt-3 text-gray-500">
                          No weekly report found for this week.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
