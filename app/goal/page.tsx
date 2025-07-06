"use client";
import Link from "next/link";
import data from "../../data/goals.json";

export default function HappinessDashboard() {
  // Separate goals by status
  const activeGoals = data.goals.filter((goal) => goal.status !== "completed");
  const completedGoals = data.goals.filter(
    (goal) => goal.status === "completed"
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-4 md:p-6">
      {/* Header Section */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-emerald-700 mb-2">
          🌈 Goals Tracker
        </h1>
        <p className="text-emerald-600 text-lg">Track your happiness journey</p>
      </header>

      {/* Main Content - Two Column Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Summary Cards */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-emerald-100">
            <h3 className="font-semibold text-emerald-700 mb-4">
              Progress Overview
            </h3>
            <div className="space-y-4">
              <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-emerald-700">
                    Active Goals
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    In Progress
                  </span>
                </div>
                <p className="text-3xl font-bold text-emerald-700">
                  {activeGoals.length}
                </p>
                <div className="w-full bg-emerald-100 rounded-full h-2 mt-2">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
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

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Completed Goals
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                    Achieved
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-700">
                  {completedGoals.length}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="h-2 rounded-full bg-gray-500"
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

        {/* Main Goals Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Goals Section */}
          {activeGoals.length > 0 && (
            <section className="bg-white rounded-xl shadow-sm p-6 border border-emerald-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-emerald-700">
                  Active Goals
                </h2>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                  {activeGoals.length} Ongoing
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeGoals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            </section>
          )}

          {/* Completed Goals Section */}
          {completedGoals.length > 0 && (
            <section className="bg-white rounded-xl shadow-sm p-6 border border-emerald-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-700">
                  Completed Goals
                </h2>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {completedGoals.length} Achieved
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

function GoalCard({
  goal,
  isCompleted = false,
}: {
  goal: any;
  isCompleted?: boolean;
}) {
  return (
    <Link
      href={`/goal/${goal.id}`}
      className={`group rounded-lg p-4 border-2 transition-all hover:shadow-md ${
        isCompleted
          ? "bg-gray-50 border-gray-200 hover:border-gray-300"
          : "bg-white border-emerald-200 hover:border-emerald-300"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h2
          className={`text-lg font-semibold ${
            isCompleted ? "text-gray-700 line-through" : "text-emerald-800"
          }`}
        >
          {goal.title}
        </h2>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            isCompleted
              ? "bg-gray-100 text-gray-600"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {isCompleted ? "✓ Completed" : "In Progress"}
        </span>
      </div>

      <p
        className={`text-sm mb-3 ${
          isCompleted ? "text-gray-500" : "text-emerald-600"
        }`}
      >
        {goal.description}
      </p>

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span
            className={`text-xs font-medium ${
              isCompleted ? "text-gray-400" : "text-emerald-500"
            }`}
          >
            Feeling:
          </span>
          <div className="flex ml-2">
            {[...Array(goal.feeling)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full mx-0.5 ${
                  isCompleted ? "bg-gray-300" : "bg-emerald-400"
                }`}
              />
            ))}
          </div>
        </div>

        <span
          className={`text-xs font-medium ${
            isCompleted ? "text-gray-400" : "text-emerald-500"
          }`}
        >
          {new Date(goal.createdAt).toLocaleDateString()}
        </span>
      </div>
    </Link>
  );
}
