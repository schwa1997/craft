"use client";
import { useState } from "react";
import Link from "next/link";
import data from "../../data/spanish.json";

export default function Home() {
  const { verbs, words, diaries, userStats } = data;
  const [showVerbs, setShowVerbs] = useState(false);
  const [showNouns, setShowNouns] = useState(false);
  const [showDiaries, setShowDiaries] = useState(false);
  const [showStats, setShowStats] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-4 md:p-6">
      {/* Header Section */}
      <header className="mb-6 md:mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-2">
          🌍 Spanish Learning Hub
        </h1>
        <p className="text-pink-600 text-base md:text-lg">
          Master verbs and nouns with smart tracking
        </p>
      </header>

      {/* Main Content - Responsive Layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Left Sidebar - Stats */}
        <div className="lg:w-1/3 space-y-4 md:space-y-6 order-2 lg:order-1">
          <section className="bg-white rounded-xl shadow-sm border border-pink-100 overflow-hidden">
            <button
              onClick={() => setShowStats(!showStats)}
              className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-pink-50 transition-colors"
            >
              <div className="flex items-center">
                <h2 className="text-lg md:text-xl font-bold text-pink-700">
                  Learning Progress
                </h2>
                <span className="ml-2 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium bg-pink-100 text-pink-800">
                  Stats
                </span>
              </div>
              <svg
                className={`w-5 h-5 text-pink-600 transition-transform ${
                  showStats ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showStats && (
              <div className="p-4 md:p-6 pt-0 space-y-4">
                <div className="space-y-3 md:space-y-4">
                  {Object.entries(userStats).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-pink-50 rounded-lg p-3 md:p-4 border border-pink-200"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs md:text-sm font-medium text-pink-700">
                          {key}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-800">
                          Current
                        </span>
                      </div>
                      <p className="text-2xl md:text-3xl font-bold text-pink-700">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Main Content Area */}
        <div className="lg:w-2/3 space-y-4 md:space-y-6 order-1 lg:order-2">
          {/* Verbs Section */}
          <section className="bg-white rounded-xl shadow-sm border border-pink-100 overflow-hidden">
            <button
              onClick={() => setShowVerbs(!showVerbs)}
              className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-pink-50 transition-colors"
            >
              <div className="flex items-center">
                <h2 className="text-lg md:text-xl font-bold text-pink-700">
                  Spanish Verbs
                </h2>
                <span className="ml-2 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium bg-pink-100 text-pink-800">
                  {verbs.length} Total
                </span>
              </div>
              <svg
                className={`w-5 h-5 text-pink-600 transition-transform ${
                  showVerbs ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showVerbs && (
              <div className="p-4 md:p-6 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {verbs.map((verb) => (
                    <Link
                      key={verb.id}
                      href={`/spanish/verb/${verb.id}`}
                      className="block transition-transform hover:scale-105"
                    >
                      <div className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all h-full border-l-4 border-pink-300 hover:border-pink-500">
                        <h3 className="font-semibold text-pink-600 hover:text-pink-800">
                          {verb.infinitive}
                        </h3>
                        <p className="text-pink-500 text-sm mt-1 italic">
                          {verb.translation}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Nouns Section */}
          <section className="bg-white rounded-xl shadow-sm border border-amber-100 overflow-hidden">
            <button
              onClick={() => setShowNouns(!showNouns)}
              className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-amber-50 transition-colors"
            >
              <div className="flex items-center">
                <h2 className="text-lg md:text-xl font-bold text-amber-700">
                  Vocaburary Anki
                </h2>
                <span className="ml-2 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium bg-amber-100 text-amber-800">
                  {words.length} Total
                </span>
              </div>
              <svg
                className={`w-5 h-5 text-amber-600 transition-transform ${
                  showNouns ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showNouns && (
              <div className="p-4 md:p-6 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {words.map((word) => (
                    <Link
                      key={word.id}
                      href={`/spanish/word/${word.id}`}
                      className="block transition-transform hover:scale-105"
                    >
                      <div className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all h-full border-l-4 border-amber-300 hover:border-amber-500">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-amber-600 hover:text-amber-800">
                            {word.category}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Diaries Section */}
          <section className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
            <button
              onClick={() => setShowDiaries(!showDiaries)}
              className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-red-50 transition-colors"
            >
              <div className="flex items-center">
                <h2 className="text-lg md:text-xl font-bold text-red-700">
                  Diaries En Espanol
                </h2>
                <span className="ml-2 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium bg-red-100 text-red-800">
                  {diaries.length} Total
                </span>
              </div>
              <svg
                className={`w-5 h-5 text-red-600 transition-transform ${
                  showDiaries ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showDiaries && (
              <div className="p-4 md:p-6 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {diaries.map((diary) => (
                    <Link
                      key={diary.id}
                      href={`/spanish/dairy/${diary.id}`}
                      className="block transition-transform hover:scale-105"
                    >
                      <div className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all h-full border-l-4 border-red-300 hover:border-red-500">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-red-600 hover:text-red-800">
                            {diary.date}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
