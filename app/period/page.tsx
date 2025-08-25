"use client";

import { useState } from "react";
import data from "../../data/period.json"; 
import { Heart, Droplet, Flower, BarChart2 } from "lucide-react"; 
import { PeriodRecord } from "../types/period";
import PeriodStats from "./components/stats";

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const daysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

const getFirstDayOfMonth = (year: number, month: number) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // 周一为 0
};

export default function PeriodsPage() {
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [statsOpen, setStatsOpen] = useState(false);

  const periods: PeriodRecord[] = data.periods;

  const dailyMap: Record<string, { flow?: string; mood?: string }> = {};
  periods.forEach((period) => {
    period.days.forEach((day) => {
      dailyMap[day.date] = { flow: day.flow, mood: day.mood };
    });
  });

  const totalDays = daysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-20"></div>);
  }

  for (let day = 1; day <= totalDays; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    const info = dailyMap[dateStr];

    const flowIcon =
      info?.flow === "light" ? "🌸" :
      info?.flow === "medium" ? "💮" :
      info?.flow === "heavy" ? "🌺" : null;

    const moodIcon = info?.mood || "";

    calendarDays.push(
      <div
        key={`day-${day}`}
        className={`rounded-lg border p-1 flex flex-col items-center justify-start h-20 relative transition-all duration-200 ${
          info ? "bg-pink-50 border-pink-200 hover:scale-105" : "bg-white border-gray-100"
        }`}
      >
        <span className="text-xs font-medium text-pink-700">{day}</span>
        {info ? (
          <div className="flex flex-col items-center mt-1 text-lg">
            <span>{flowIcon}</span>
            <span>{moodIcon}</span>
          </div>
        ) : (
          <span className="text-xs text-gray-300 mt-2">—</span>
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-4 md:p-6">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-pink-600 mb-2">🌸 Period Tracker</h1>
      </header>

      {/* 日历卡片 */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-4 border border-pink-100 mb-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => handleMonthChange(-1)}
            className="p-2 rounded-full text-pink-600 border border-pink-100 hover:bg-pink-50 transition"
          >
            Last month
          </button>
          <h2 className="text-lg font-semibold text-pink-600">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button
            onClick={() => handleMonthChange(1)}
            className="p-2 rounded-full border border-pink-100 text-pink-600 hover:bg-pink-50 transition"
          >
            Next month
          </button>
        </div>

        {/* 星期标题 */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => (
            <div
              key={d}
              className="text-center text-xs font-medium text-pink-500 py-1"
            >
              {d}
            </div>
          ))}
        </div>

        {/* 日历格子 */}
        <div className="grid grid-cols-7 gap-1">{calendarDays}</div>

        {/* Stats 折叠按钮 */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setStatsOpen(!statsOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full text-pink-700 hover:bg-pink-200 transition"
          >
            <BarChart2 className="w-4 h-4" /> {statsOpen ? "Hide Stats" : "Show Stats"}
          </button>
        </div>

        {/* Stats 面板 */}
        {statsOpen && (
          <div className="mt-4">
            <PeriodStats data={periods} />
          </div>
        )}
      </div>
    </div>
  );
}
