"use client";
import Link from "next/link";

export default function HappinessDashboardLanding() {
  return (
    <main className="min-h-svh bg-gradient-to-b from-emerald-50 to-white p-4 md:p-8 flex flex-col justify-center">
      <div className="mx-auto w-full max-w-4xl px-4">
        {/* Hero Section */}
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-2">
            Personal Growth Hub
          </h1>
          <p className="text-emerald-600 md:text-lg">
            Choose an area to focus on today
          </p>
        </div>

        {/* Card Container - Changed to flex-col on mobile */}
        <div className="flex flex-col space-y-4 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
          {/* Goals Tracker Card */}
          <Link
            href="/goal"
            className="group relative flex flex-col h-full rounded-xl bg-white p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-emerald-100 hover:border-emerald-300"
          >
            {/* Card content remains the same */}
            <div className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-emerald-800 mb-2 md:mb-3">
              Goals Tracker
            </h2>
            <p className="text-sm md:text-base text-emerald-600 mb-4 flex-grow">
              Track and achieve your personal objectives
            </p>
            <div className="text-xs md:text-sm text-emerald-500 font-medium flex items-center">
              Get started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </Link>

          {/* Energy Garden Card */}
          <Link
            href="/energy"
            className="group relative flex flex-col h-full rounded-xl bg-white p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-emerald-100 hover:border-emerald-300"
          >
            {/* Card content remains the same */}
            <div className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-emerald-800 mb-2 md:mb-3">
              Energy Garden
            </h2>
            <p className="text-sm md:text-base text-emerald-600 mb-4 flex-grow">
              Manage your energy levels and productivity
            </p>
            <div className="text-xs md:text-sm text-emerald-500 font-medium flex items-center">
              Boost energy
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </Link>

          {/* Spanish Practice Card */}
          <Link
            href="/spanish"
            className="group relative flex flex-col h-full rounded-xl bg-white p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-emerald-100 hover:border-emerald-300"
          >
            {/* Card content remains the same */}
            <div className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-emerald-800 mb-2 md:mb-3">
              Spanish Practice
            </h2>
            <p className="text-sm md:text-base text-emerald-600 mb-4 flex-grow">
              Improve your language skills daily
            </p>
            <div className="text-xs md:text-sm text-emerald-500 font-medium flex items-center">
              Start learning
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}