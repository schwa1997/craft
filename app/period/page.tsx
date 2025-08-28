"use client";

import { useState } from "react";
import data from "../../data/period.json";
import { BarChart2 } from "lucide-react";
import { PeriodRecord } from "../types/period";
import PeriodStats from "./components/stats";

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
};

export default function PeriodsPage() {
    const currentDate = new Date();
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [statsOpen, setStatsOpen] = useState(false);
    const [showMonthPicker, setShowMonthPicker] = useState(false);

    const periods = data.periods as PeriodRecord[];

    const dailyMap: Record<string, { flow?: string }> = {};
    periods.forEach((period) => {
        period.days.forEach((day) => {
            dailyMap[day.date] = { flow: day.flow };
        });
    });

    const totalDays = daysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="h-15"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
            2,
            "0"
        )}-${String(day).padStart(2, "0")}`;
        const info = dailyMap[dateStr];
        const kittyImages = [
            "https://i.pinimg.com/736x/cc/82/12/cc82128aaa8e1387b665684dd5e63b21.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Gk-3Or6VWbWvEhBsD8X9r1bl7yzg6BvBN3YxZidAePoelNOp90LXJkNETKyGvdxROJA&usqp=CAU",
            "https://i.pinimg.com/736x/0c/7f/71/0c7f7117c72c8d72d1200d538ce1af92.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEj45aQN5MyaromlkApyOJKqjaZmk8xRRiDQ&s"
        ];

        const flowIndicator = info?.flow ? (
            <div className="flex items-center justify-center mt-1 space-x-1">
                {info.flow === "spotting" && (
                    <img
                        src={kittyImages[0]}
                        alt="Spotting"
                        className="w-10 h-10 rounded-full animate-bounce "
                        title="Spotting"
                    />
                )}
                {info.flow === "light" && (
                    <img
                        src={kittyImages[1]}
                        alt="Light"
                        className="w-10 h-10 rounded-full animate-pulse"
                        title="Light"
                    />
                )}
                {info.flow === "medium" && (
                    <img
                        src={kittyImages[2]}
                        alt="Medium"
                        className="w-10 h-10 rounded-full shadow-md animate-spin "
                        title="Medium"
                    />
                )}
                {info.flow === "heavy" && (
                    <img
                        src={kittyImages[3]}
                        alt="Heavy"
                        className="w-10 h-10 rounded-full shadow-lg animate-ping"
                        title="Heavy"
                    />
                )}
            </div>
        ) : null;


        calendarDays.push(
            <div
                key={`day-${day}`}
                className={`rounded-lg border p-1 flex flex-col items-center justify-start h-15 relative transition-all duration-200 ${info ? "bg-pink-50 border-pink-200 hover:scale-105" : "bg-white border-gray-100"
                    }`}
            >
                <span className="text-xs font-medium text-pink-700">{day}</span>
                {info && <div className="flex flex-col items-center mt-1">{flowIndicator}</div>}
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

    const yearOptions = Array.from({ length: 15 }, (_, i) => currentDate.getFullYear() - 14 + i);

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-4 md:p-6">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-pink-600 mb-2">🌸 Period Tracker</h1>
            </header>

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-4 border border-pink-100 mb-4">
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => handleMonthChange(-1)}
                        className="p-2 rounded-full text-pink-600 hover:bg-pink-50 transition"
                    >
                        &#8592;
                    </button>

                    {/* Month / Year Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setShowMonthPicker(!showMonthPicker)}
                            className="text-lg font-semibold text-pink-600 px-3 py-1 rounded-full hover:bg-pink-50 transition"
                        >
                            {monthNames[currentMonth]} {currentYear}
                        </button>

                        {showMonthPicker && (
                            <div className="absolute z-10 top-10 left-0 bg-white border border-pink-200 rounded-lg shadow-md p-3 flex flex-col gap-2">
                                <select
                                    className="border border-pink-200 rounded-full px-3 py-1 text-pink-700 font-semibold"
                                    value={currentMonth}
                                    onChange={(e) => {
                                        setCurrentMonth(Number(e.target.value));
                                        setShowMonthPicker(false);
                                    }}
                                >
                                    {monthNames.map((m, idx) => (
                                        <option key={m} value={idx}>{m}</option>
                                    ))}
                                </select>

                                <select
                                    className="border border-pink-200 rounded-full px-3 py-1 text-pink-700 font-semibold"
                                    value={currentYear}
                                    onChange={(e) => {
                                        setCurrentYear(Number(e.target.value));
                                        setShowMonthPicker(false);
                                    }}
                                >
                                    {yearOptions.map((y) => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => handleMonthChange(1)}
                        className="p-2 rounded-full border text-pink-600 hover:bg-pink-50 transition"
                    >
                        &#8594;
                    </button>
                </div>

                {/* Weekdays */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                        <div key={d} className="text-center text-xs font-medium text-pink-500 py-1">{d}</div>
                    ))}
                </div>

                {/* Calendar */}
                <div className="grid grid-cols-7 gap-1">{calendarDays}</div>

                <div className="mt-4 flex justify-center">
                    <button
                        onClick={() => setStatsOpen(!statsOpen)}
                        className="flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full text-pink-700 hover:bg-pink-200 transition"
                    >
                        <BarChart2 className="w-4 h-4" /> {statsOpen ? "Hide Stats" : "Show Stats"}
                    </button>
                </div>

                {statsOpen && (
                    <div className="mt-4">
                        <PeriodStats data={periods} />
                    </div>
                )}
            </div>
        </div>
    );
}
