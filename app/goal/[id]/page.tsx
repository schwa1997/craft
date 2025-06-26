"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { GoalEvolutionModal } from "../components/GoalEvolutionModal";
import { ReflectionModal } from "../components/ReflectionModal";
import { EnergyMomentModal } from "../components/EnergyMomentModal";
import { GrowthPath } from "../components/GrowthPath";

const statusOptions: Status[] = [
  { id: "initial", text: "Initial", editable: false },
  { id: "evolving", text: "Evolving", editable: true },
  { id: "completed", text: "Completed", editable: true },
  { id: "archived", text: "Archived", editable: true },
  { id: "restarted", text: "Restarted", editable: true },
  { id: "executed-well", text: "Executed well", editable: false },
  { id: "needs-improvement", text: "Needs improvement", editable: false },
];

export default function GrowthTracker() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentGoal, setCurrentGoal] = useState<Goal| null>(null);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showReflectionModal, setShowReflectionModal] = useState(false);
  const [showEnergyModal, setShowEnergyModal] = useState(false);
  const [showStatusSelector, setShowStatusSelector] = useState(false);
  const [newReflection, setNewReflection] = useState("");
  const [energyMoments, setEnergyMoments] = useState<EnergyMoment[]>([]);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await fetch(`/api/goals/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch goal");
        }
        const data = await response.json();
        setCurrentGoal(data);
      } catch (error) {
        console.error("Error fetching goal:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, [id, router]);

  const updateGoalStatus = async (newStatus: Status) => {
    if (!currentGoal) return;

    try {
      const updatedGoal = {
        ...currentGoal,
        status: newStatus,
      };

      const response = await fetch(`/api/goals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGoal),
      });

      if (!response.ok) {
        throw new Error("Failed to update goal status");
      }

      setCurrentGoal(updatedGoal);
      setShowStatusSelector(false);
    } catch (error) {
      console.error("Error updating goal status:", error);
    }
  };

  const saveReflection = async (reflection: string) => {
    // Implementation with status
    const newReflection: Reflection = {
      date: new Date().toISOString().split("T")[0],
      text: reflection,
      status: statusOptions.find((s) => s.id === "executed-well")!,
      metrics: [],
    };

    // Update state and API
    setShowReflectionModal(false);
  };

  const logEnergyMoment = (moment: string) => {
    // Implementation
    setShowEnergyModal(false);
  };

  if (loading || !currentGoal) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50 p-6 flex items-center justify-center">
        <div className="animate-pulse text-teal-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-900">Growth Garden</h1>
        <p className="text-green-700">Nurture your evolving goals</p>
      </header>

      {/* Current Focus */}
      <section className="mb-10 p-6 bg-white rounded-2xl shadow-lg border border-green-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-teal-800">Current Goal</h2>
          <div className="flex space-x-2">
            <div className="relative">
              <button
                onClick={() => setShowStatusSelector(!showStatusSelector)}
                className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium hover:bg-teal-200 transition flex items-center"
              >
                {currentGoal.status.text}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showStatusSelector && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="py-1">
                    {statusOptions
                      .filter(
                        (option) =>
                          option.editable || option.id === currentGoal.status.id
                      )
                      .map((option) => (
                        <button
                          key={option.id}
                          onClick={() => updateGoalStatus(option)}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            option.id === currentGoal.status.id
                              ? "bg-teal-100 text-teal-900"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {option.text}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowGoalModal(true)}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition"
            >
              Evolve Goal
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-teal-50 rounded-xl border border-green-200">
            <h3 className="font-medium text-teal-900">{currentGoal.title}</h3>
            <p className="text-sm text-teal-700 mt-1">
              {currentGoal.description}
            </p>
            <div className="mt-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  currentGoal.status.id === "completed"
                    ? "bg-green-100 text-green-800"
                    : currentGoal.status.id === "archived"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {currentGoal.status.text}
              </span>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setShowReflectionModal(true)}
              className="flex-1 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              Log Progress
            </button>
            <button
              onClick={() => setShowEnergyModal(true)}
              className="flex-1 py-2 bg-white border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition"
            >
              Energy Spark
            </button>
          </div>
        </div>
      </section>

      {/* Daily Check-in */}
      <section className="mb-10 p-6 bg-white rounded-2xl shadow-lg border border-green-100">
        <h2 className="text-xl font-semibold text-teal-800 mb-4">
          Today's Growth
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How does this goal feel today?
            </label>
            <div className="flex justify-between text-xs text-gray-500 px-2">
              <span>Forced</span>
              <span>Natural</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={currentGoal.feeling}
              className="w-full accent-teal-600"
            />
          </div>

          {currentGoal.reflections.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-teal-800 mb-2">
                Recent Reflections
              </h3>
              <div className="space-y-2">
                {currentGoal.reflections.slice(-2).map((reflection, index) => (
                  <div
                    key={index}
                    className="p-3 bg-green-50 rounded-lg border border-green-200"
                  >
                    <p className="text-sm text-green-800">{reflection.text}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-green-600">
                        {reflection.date}
                      </p>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                          reflection.status.id === "executed-well"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {reflection.status.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Energy Moments */}
      <section className="p-6 bg-white rounded-2xl shadow-lg border border-green-100">
        <h2 className="text-xl font-semibold text-teal-800 mb-4">
          Recent Energy
        </h2>
        {energyMoments.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {energyMoments.slice(-4).map((moment, index) => (
              <div
                key={index}
                className="p-3 bg-green-50 rounded-lg border border-green-200"
              >
                <p className="text-sm text-green-800">{moment.activity}</p>
                <p className="text-xs text-green-600 mt-1">{moment.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No energy moments logged yet</p>
        )}
      </section>
      {/* Timeline */}
      <section>
        <GrowthPath timeline={currentGoal.timeline} />
      </section>
      {/* Modals */}
      {showGoalModal && (
        <GoalEvolutionModal
          onClose={() => setShowGoalModal(false)}
          onContinue={() => {
            setShowGoalModal(false);
          }}
        />
      )}

      {showReflectionModal && (
        <ReflectionModal
          initialText={newReflection}
          onClose={() => setShowReflectionModal(false)}
          onSave={saveReflection}
        />
      )}

      {showEnergyModal && (
        <EnergyMomentModal
          onClose={() => setShowEnergyModal(false)}
          onLogMoment={logEnergyMoment}
        />
      )}
    </div>
  );
}
