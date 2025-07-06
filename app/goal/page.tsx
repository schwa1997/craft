"use client";
import Link from "next/link";
import data from '../../data/goals.json';

export default function HappinessDashboard() {
  const goals = data.goals;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-4 flex flex-col items-center">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-emerald-700"> Happiness Tracker</h1>
        <p className="text-emerald-600">Track your wellbeing journey</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-5xl mb-8">
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center border border-emerald-100">
          <h3 className="text-sm font-medium text-emerald-500">Active Goals</h3>
          <p className="text-2xl font-bold text-emerald-600">{goals.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center border border-emerald-100">
          <h3 className="text-sm font-medium text-emerald-500">Average Feeling</h3>
          <p className="text-2xl font-bold text-emerald-600">
            {goals.length > 0
              ? (goals.reduce((sum, task) => sum + task.feeling, 0) / goals.length).toFixed(1)
              : 0
            }/10
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
        {goals.map((goal) => (
          <Link
            key={goal.id}
            href={`/goal/${goal.id}`}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all border border-emerald-100"
          >
            <h2 className="text-lg font-semibold text-emerald-700 mb-2">
              {goal.title}
            </h2>
            <p className="text-emerald-600 text-sm mb-3 line-clamp-2">{goal.description}</p>
            <div className="text-xs font-medium text-emerald-500">
              Feeling: <span className="font-bold">{goal.feeling}/10</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}