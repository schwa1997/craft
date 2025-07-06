"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { GrowthPath } from "../components/GrowthPath";
import data from '../../../data/goals.json';

export default function GrowthTracker() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const goalId = Number(id);
    const goal = data.goals.find((g: any) => 
      typeof g.id === 'number' ? g.id === goalId : g.id === id
    );
    
    if (!goal) {
      console.error("Goal not found");
      router.push("/");
      return;
    }
    
    setCurrentGoal(goal as Goal);
    setLoading(false);
  }, [id, router]);

  if (loading || !currentGoal) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-4 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-4 md:p-6">
      {/* Header Section */}
      <header className="mb-6 md:mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-2">
          🌱 {currentGoal.title}
        </h1>
        <p className="text-emerald-600 text-base md:text-lg">
          {currentGoal.description}
        </p>
        <div className="mt-3 flex justify-center items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
            currentGoal.status === "completed" 
              ? "bg-emerald-100 text-emerald-800" 
              : "bg-amber-100 text-amber-800"
          }`}>
            {currentGoal.status}
          </span>
          <span className="text-xs md:text-sm text-emerald-500">
            Last updated: {new Date(currentGoal.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </header>

      {/* Main Content - Responsive Layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Left Column - Metrics and Reflection - Full width on mobile */}
        <div className="lg:w-2/3 space-y-4 md:space-y-6">
          {/* Metrics Summary - Responsive grid */}
          {currentGoal.reflections?.[0]?.metrics && (
            <section className="w-full bg-white p-4 md:p-6 rounded-xl shadow-sm border border-emerald-100">
              <h2 className="text-lg md:text-xl font-semibold text-emerald-800 mb-4 md:mb-6">
                Progress Metrics
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                {currentGoal.reflections[0].metrics.map((metric, index) => (
                  <div key={index} className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-emerald-100">
                    <p className="text-xs md:text-sm text-emerald-500">{metric.type}</p>
                    <p className="text-lg md:text-xl font-bold text-emerald-700">
                      {metric.value} <span className="text-sm md:text-base font-normal">{metric.unit}</span>
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Latest Reflection */}
          {currentGoal.reflections?.length > 0 && (
            <section className="w-full bg-white p-4 md:p-6 rounded-xl shadow-sm border border-emerald-100">
              <h2 className="text-lg md:text-xl font-semibold text-emerald-800 mb-4 md:mb-6">
                Latest Reflection
              </h2>
              <div className="p-4 md:p-5 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-emerald-800 text-sm md:text-base">
                  {currentGoal.reflections[0].text}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs md:text-sm text-emerald-500">
                    {new Date(currentGoal.reflections[0].date).toLocaleDateString()}
                  </span>
                  <span className="text-xs md:text-sm px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
                    {currentGoal.reflections[0].status.text}
                  </span>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Timeline - Full width on mobile */}
        <div className="lg:w-1/3 space-y-4 md:space-y-6">
          <section className="w-full bg-white p-4 md:p-6 rounded-xl shadow-sm border border-emerald-100">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-emerald-800">
                Growth Journey
              </h2>
              <span className="text-xs md:text-sm text-emerald-500">
                Created: {new Date(currentGoal.createdAt).toLocaleDateString()}
              </span>
            </div>
            <GrowthPath timeline={currentGoal.timeline} />
          </section>
        </div>
      </div>
    </div>
  );
}