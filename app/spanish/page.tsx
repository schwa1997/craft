"use client";
import { useState } from "react";
import Link from "next/link";
import data from "../../data/spanish.json";

export default function Home() {
  const { verbs, words, userStats } = data;
  const [showVerbs, setShowVerbs] = useState(true);
  const [showNouns, setShowNouns] = useState(true);
  const [showStats, setShowStats] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-4 md:p-6">
      {/* Header Section */}
      <header className="mb-6 md:mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-2">
          🌍 Spanish Learning Hub
        </h1>
        <p className="text-emerald-600 text-base md:text-lg">
          Master verbs and nouns with smart tracking
        </p>
      </header>

      {/* Main Content - Responsive Layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Left Sidebar - Stats */}
        <div className="lg:w-1/3 space-y-4 md:space-y-6 order-2 lg:order-1">
          <section className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
            <button
              onClick={() => setShowStats(!showStats)}
              className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-emerald-50 transition-colors"
            >
              <div className="flex items-center">
                <h2 className="text-lg md:text-xl font-bold text-emerald-700">
                  Learning Progress
                </h2>
                <span className="ml-2 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium bg-emerald-100 text-emerald-800">
                  Stats
                </span>
              </div>
              <svg
                className={`w-5 h-5 text-emerald-600 transition-transform ${
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
                {/* Summary Cards */}
                <div className="space-y-3 md:space-y-4">
                  <div className="bg-emerald-50 rounded-lg p-3 md:p-4 border border-emerald-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs md:text-sm font-medium text-emerald-700">
                        Verbs Mastered
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
                        {userStats.totalVerbsMastered} learned
                      </span>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-emerald-700">
                      {verbs.length}
                    </p>
                    <div className="w-full bg-emerald-100 rounded-full h-1.5 md:h-2 mt-2">
                      <div
                        className="h-1.5 md:h-2 rounded-full bg-emerald-500"
                        style={{
                          width: `${
                            (userStats.totalVerbsMastered / verbs.length) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-lg p-3 md:p-4 border border-amber-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs md:text-sm font-medium text-amber-700">
                        Nouns Mastered
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                        {userStats.totalNounsMastered} learned
                      </span>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-amber-700">
                      {words.length}
                    </p>
                    <div className="w-full bg-amber-100 rounded-full h-1.5 md:h-2 mt-2">
                      <div
                        className="h-1.5 md:h-2 rounded-full bg-amber-500"
                        style={{
                          width: `${
                            (userStats.totalNounsMastered / words.length) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 md:p-4 border border-blue-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs md:text-sm font-medium text-blue-700">
                        Daily Streak
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                        Current
                      </span>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-blue-700">
                      {userStats.dailyStreak} days
                    </p>
                    <div className="w-full bg-blue-100 rounded-full h-1.5 md:h-2 mt-2">
                      <div
                        className="h-1.5 md:h-2 rounded-full bg-blue-500"
                        style={{
                          width: `${Math.min(userStats.dailyStreak, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Weak Points Section */}
                {userStats.weakPoints.verbs.length > 0 ||
                userStats.weakPoints.nouns.length > 0 ? (
                  <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-red-100">
                    <h3 className="font-semibold text-red-700 mb-3 text-sm md:text-base">
                      Need Practice
                    </h3>
                    <div className="space-y-2">
                      {userStats.weakPoints.verbs.length > 0 && (
                        <div>
                          <h4 className="text-xs font-medium text-red-600 mb-1">
                            Verbs:
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {userStats.weakPoints.verbs
                              .slice(0, 5)
                              .map((verbId) => {
                                const verb = verbs.find((v) => v.id === verbId);
                                return verb ? (
                                  <span
                                    key={verbId}
                                    className="text-xs px-2 py-1 rounded-full bg-red-50 text-red-700 border border-red-100"
                                  >
                                    {verb.infinitive}
                                  </span>
                                ) : null;
                              })}
                          </div>
                        </div>
                      )}
                      {userStats.weakPoints.nouns.length > 0 && (
                        <div>
                          <h4 className="text-xs font-medium text-red-600 mb-1">
                            Nouns:
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {userStats.weakPoints.nouns
                              .slice(0, 5)
                              .map((wordId) => {
                                const noun = words.find((w) => w.id === wordId);
                                return noun ? (
                                  <span
                                    key={wordId}
                                    className="text-xs px-2 py-1 rounded-full bg-red-50 text-red-700 border border-red-100"
                                  >
                                    {noun.category}
                                  </span>
                                ) : null;
                              })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-emerald-100">
                    <h3 className="font-semibold text-emerald-700 mb-2 text-sm md:text-base">
                      Great Job!
                    </h3>
                    <p className="text-xs text-emerald-600">
                      No weak points detected. Keep up the good work!
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>

        {/* Main Content Area */}
        <div className="lg:w-2/3 space-y-4 md:space-y-6 order-1 lg:order-2">
          {/* Verbs Section */}
          <section className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
            <button
              onClick={() => setShowVerbs(!showVerbs)}
              className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-emerald-50 transition-colors"
            >
              <div className="flex items-center">
                <h2 className="text-lg md:text-xl font-bold text-emerald-700">
                  Spanish Verbs
                </h2>
                <span className="ml-2 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium bg-emerald-100 text-emerald-800">
                  {verbs.length} Total
                </span>
              </div>
              <svg
                className={`w-5 h-5 text-emerald-600 transition-transform ${
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
                      <div className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all h-full border-l-4 border-emerald-300 hover:border-emerald-500">
                        <h3 className="font-semibold text-emerald-600 hover:text-emerald-800">
                          {verb.infinitive}
                        </h3>
                        <p className="text-emerald-500 text-sm mt-1 italic">
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
        </div>
      </div>
    </div>
  );
}
