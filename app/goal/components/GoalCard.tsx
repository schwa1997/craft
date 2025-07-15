"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function GoalCard({
  goal,
  isCompleted = false,
}: {
  goal: any;
  isCompleted?: boolean;
}) {
  const [progress, setProgress] = useState(0);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const startDate = new Date(goal.createdAt);
    const endDate = new Date(goal.endedAt);

    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = currentDate.getTime() - startDate.getTime();
    const calculatedProgress = Math.min(
      100,
      Math.max(0, (elapsedDuration / totalDuration) * 100)
    );
    setProgress(calculatedProgress);
    setFormattedDate(
      `${startDate.toLocaleDateString()} 🚀 ${endDate.toLocaleDateString()}`
    );
  }, [goal.createdAt, goal.endedAt]);

  return (
    <Link
      href={`/goal/${goal.id}`}
      className={`group rounded-lg p-3 md:p-4 border-2 transition-all hover:shadow-md ${
        isCompleted
          ? "bg-gray-50 border-gray-200 hover:border-gray-300"
          : "bg-white border-emerald-200 hover:border-emerald-300"
      }`}
    >
      <div className="flex justify-between items-start mb-1 md:mb-2">
        <h2
          className={`text-base md:text-lg font-semibold ${
            isCompleted ? "text-gray-700 line-through" : "text-emerald-800"
          }`}
        >
          {goal.title}
        </h2>
        <span
          className={`text-xs px-2 py-0.5 md:px-2 md:py-1 rounded-full ${
            isCompleted
              ? "bg-gray-100 text-gray-600"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {isCompleted ? "✓ Completed" : "In Progress"}
        </span>
      </div>

      <p
        className={`text-xs md:text-sm mb-2 md:mb-3 ${
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
          <div className="flex ml-1 md:ml-2">
            {[...Array(goal.feeling)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mx-0.5 ${
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
          {goal.createdAt}-🚀-{goal.endedAt}
        </span>
      </div>
      <div className="w-full bg-emerald-100 rounded-full h-1.5 md:h-2 mt-2">
        <div
          className="h-1.5 md:h-2 rounded-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </Link>
  );
}
