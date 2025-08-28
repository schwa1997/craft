"use client";

import Link from "next/link";
import data from "../../data/goals.json";
import { GoalCard } from "./components/GoalCard";

export default function HappinessDashboard() {
  // Separate goals by status
  const activeGoals = data.goals.filter((goal) => goal.status === "going");
  const completedGoals = data.goals.filter(
    (goal) => goal.status === "completed"
  );
  const ClosedGoals = data.goals.filter(
    (goal) => goal.status === "closed"
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-4 md:p-6">
      {/* Header Section */}
      <header className="mb-6 md:mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-2">
          🌈 Goals Tracker
        </h1>
        <p className="text-pink-600 text-base md:text-lg">
          Track your happiness journey
        </p>
      </header>

      {/* Main Content - Responsive Layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Left Sidebar - Stats - Hidden on mobile if no space */}
        <div className="lg:w-1/3 space-y-4 md:space-y-6 order-2 lg:order-1">
          {/* Summary Cards - Compact on mobile */}
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-pink-100">
            <h3 className="font-semibold text-pink-700 mb-3 text-sm md:text-base">
              Progress Overview
            </h3>
            <div className="space-y-4">
              {/* Active Goals */}
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200 shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-emerald-800">Active Goals</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-medium">
                    In Progress
                  </span>
                </div>
                <p className="text-3xl font-bold text-emerald-800">{activeGoals.length}</p>
                <div className="w-full bg-emerald-200 rounded-full h-2 mt-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                    style={{
                      width: `${(activeGoals.length /
                        (activeGoals.length + completedGoals.length + ClosedGoals.length)) *
                        100
                        }%`,
                    }}
                  />
                </div>
              </div>

              {/* Completed Goals */}
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200 shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-amber-800">Completed Goals</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-medium">
                    Achieved
                  </span>
                </div>
                <p className="text-3xl font-bold text-amber-800">{completedGoals.length}</p>
                <div className="w-full bg-amber-200 rounded-full h-2 mt-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600"
                    style={{
                      width: `${(completedGoals.length /
                        (activeGoals.length + completedGoals.length + ClosedGoals.length)) *
                        100
                        }%`,
                    }}
                  />
                </div>
              </div>

              {/* Closed Goals */}
              <div className="bg-gradient-to-r from-rose-50 to-rose-100 rounded-xl p-4 border border-rose-200 shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-rose-800">Closed Goals</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-rose-200 text-rose-900 font-medium">
                    Closed
                  </span>
                </div>
                <p className="text-3xl font-bold text-rose-800">{ClosedGoals.length}</p>
                <div className="w-full bg-rose-200 rounded-full h-2 mt-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-rose-500 to-rose-600"
                    style={{
                      width: `${(ClosedGoals.length /
                        (activeGoals.length + completedGoals.length + ClosedGoals.length)) *
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
            <section className="bg-gradient-to-br from-emerald-50 to-white rounded-xl shadow-md p-4 md:p-6 border border-emerald-200">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-bold text-emerald-700">
                  🌱 Active Goals
                </h2>
                <span className="px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium bg-emerald-200 text-emerald-900">
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
            <section className="bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-md p-4 md:p-6 border border-amber-200">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-bold text-amber-700">
                  🏆 Completed Goals
                </h2>
                <span className="px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium bg-amber-200 text-amber-900">
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

          {/* Closed Goals Section */}
          {ClosedGoals.length > 0 && (
            <section className="bg-gradient-to-br from-rose-50 to-white rounded-xl shadow-md p-4 md:p-6 border border-rose-200">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-bold text-rose-700">
                  🛑 Closed Goals
                </h2>
                <span className="px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium bg-rose-200 text-rose-900">
                  {ClosedGoals.length} Closed
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {ClosedGoals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} isCompleted={true} />
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div >
  );
}


