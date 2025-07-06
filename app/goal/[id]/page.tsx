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
    return <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-4 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-4 flex flex-col items-center">
      <header className="mb-6 text-center w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-emerald-700">🌱 {currentGoal.title}</h1>
        <p className="text-emerald-600">{currentGoal.description}</p>
        <div className="mt-2 flex justify-center items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            currentGoal.status === "completed" 
              ? "bg-emerald-100 text-emerald-800" 
              : "bg-amber-100 text-amber-800"
          }`}>
            {currentGoal.status}
          </span>
          <span className="text-xs text-emerald-500">
            {new Date(currentGoal.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </header>

      {/* Metrics Summary */}
      {currentGoal.reflections?.[0]?.metrics && (
        <section className="w-full max-w-5xl mb-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {currentGoal.reflections[0].metrics.map((metric, index) => (
            <div key={index} className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100">
              <p className="text-xs text-emerald-500">{metric.type}</p>
              <p className="text-lg font-bold text-emerald-700">
                {metric.value} <span className="text-sm font-normal">{metric.unit}</span>
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Latest Reflection */}
      {currentGoal.reflections?.length > 0 && (
        <section className="w-full max-w-5xl mb-6 p-5 bg-white rounded-xl shadow-sm border border-emerald-100">
          <h2 className="text-lg font-semibold text-emerald-800 mb-3">Latest Note</h2>
          <div className="p-3 bg-emerald-50 rounded-lg">
            <p className="text-emerald-800">{currentGoal.reflections[0].text}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-emerald-500">
                {new Date(currentGoal.reflections[0].date).toLocaleDateString()}
              </span>
              <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
                {currentGoal.reflections[0].status.text}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Timeline Section */}
      <section className="w-full max-w-5xl">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-emerald-800">Growth Journey</h2>
          <span className="text-xs text-emerald-500">
            Created: {new Date(currentGoal.createdAt).toLocaleDateString()}
          </span>
        </div>
        <GrowthPath timeline={currentGoal.timeline} />
      </section>
    </div>
  );
}