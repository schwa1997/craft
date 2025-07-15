"use client";

import Link from "next/link";
import data from "../../data/goals.json";
import { GoalCard } from "./components/GoalCard";

export default function HappinessDashboard() {
  // Separate goals by status
  const activeGoals = data.goals.filter((goal) => goal.status !== "completed");
  const completedGoals = data.goals.filter(
    (goal) => goal.status === "completed"
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-4 md:p-6">
      {/* Header Section */}
      <header className="mb-6 md:mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-2">
          🌈 Goals Tracker
        </h1>
        <p className="text-emerald-600 text-base md:text-lg">
          Track your happiness journey
        </p>
      </header>

      {/* Main Content - Responsive Layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Left Sidebar - Stats - Hidden on mobile if no space */}
        <div className="lg:w-1/3 space-y-4 md:space-y-6 order-2 lg:order-1">
          {/* Summary Cards - Compact on mobile */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-emerald-100">
            <h3 className="font-semibold text-emerald-700 mb-3 text-sm md:text-base">
              Progress Overview
            </h3>
            <div className="space-y-3 md:space-y-4">
              <div className="bg-emerald-50 rounded-lg p-3 md:p-4 border border-emerald-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs md:text-sm font-medium text-emerald-700">
                    Active Goals
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    In Progress
                  </span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-emerald-700">
                  {activeGoals.length}
                </p>
                <div className="w-full bg-emerald-100 rounded-full h-1.5 md:h-2 mt-2">
                  <div
                    className="h-1.5 md:h-2 rounded-full bg-emerald-500"
                    style={{
                      width: `${
                        (activeGoals.length /
                          (activeGoals.length + completedGoals.length)) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 md:p-4 border border-gray-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs md:text-sm font-medium text-gray-700">
                    Completed Goals
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                    Achieved
                  </span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-gray-700">
                  {completedGoals.length}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2 mt-2">
                  <div
                    className="h-1.5 md:h-2 rounded-full bg-gray-500"
                    style={{
                      width: `${
                        (completedGoals.length /
                          (activeGoals.length + completedGoals.length)) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Goals Area - Takes full width on mobile */}
        <div className="lg:w-2/3 space-y-4 md:space-y-6 order-1 lg:order-2">
          {/* Active Goals Section */}
          {activeGoals.length > 0 && (
            <section className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-emerald-100">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-bold text-emerald-700">
                  Active Goals
                </h2>
                <span className="px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium bg-emerald-100 text-emerald-800">
                  {activeGoals.length} Ongoing
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {activeGoals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            </section>
          )}

          {/* Completed Goals Section */}
          {completedGoals.length > 0 && (
            <section className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-emerald-100">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-700">
                  Completed Goals
                </h2>
                <span className="px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium bg-gray-100 text-gray-800">
                  {completedGoals.length} Achieved
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {completedGoals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} isCompleted={true} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}


