"use client";
import Link from "next/link";
import data from '../../data/goals.json';


export default function HappinessDashboard() {
  const goals = data.goals;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-900">Happiness Tracker</h1>
        <p className="text-green-700">Track your wellbeing journey</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Active Goals</h3>
          <p className="text-2xl font-bold text-teal-600">{goals.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Average Feeling</h3>
          <p className="text-2xl font-bold text-teal-600">
            {goals.length > 0
              ? (goals.reduce((sum, task) => sum + task.feeling, 0) / goals.length)
              : 0
            }/10
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((task) => (
          <Link
            key={task.id}
            href={`/goal/${task.id}`}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {task.title}
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>
            <div className="text-sm font-medium text-gray-700">
              Feeling: {task.feeling}/10
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
