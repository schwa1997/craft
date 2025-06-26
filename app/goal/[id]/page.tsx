"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { GrowthPath } from "../components/GrowthPath";


export default function GrowthTracker() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await fetch(`/api/goals/${id}`);
        if (!response.ok) throw new Error("Failed to fetch goal");
        setCurrentGoal(await response.json());
      } catch (error) {
        console.error("Error fetching goal:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, [id, router]);

  if (loading || !currentGoal) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50 p-6 flex items-center justify-center">
        <div className="animate-pulse text-teal-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-900">Growth Garden</h1>
        <p className="text-green-700">Nurture your evolving goals</p>
      </header>

      <section className="mb-10 p-6 bg-white rounded-2xl shadow-lg border border-green-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-teal-800">Current Goal</h2>
          <button className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition">
            Edit Goal
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-teal-50 rounded-xl border border-green-200">
            <h3 className="font-medium text-teal-900">{currentGoal.title}</h3>
            <p className="text-sm text-teal-700 mt-1">
              {currentGoal.description}
            </p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {currentGoal.status.text}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-10 p-6 bg-white rounded-2xl shadow-lg border border-green-100">
        <h2 className="text-xl font-semibold text-teal-800 mb-4">
          Progress Tracking
        </h2>

        <div className="space-y-4">
          {currentGoal.reflections?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-teal-800 mb-2">
                Recent Notes
              </h3>
              <div className="space-y-2">
                {currentGoal.reflections
                  .slice(0, 2)
                  .map((reflection, index) => (
                    <div
                      key={index}
                      className="p-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <p className="text-sm text-green-800">
                        {reflection.text}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        {reflection.date}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section>
        <GrowthPath timeline={currentGoal.timeline} />
      </section>
    </div>
  );
}
