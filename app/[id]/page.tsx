"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { GoalEvolutionModal } from "./components/GoalEvolutionModal";
import { ReflectionModal } from "./components/ReflectionModal";
import { EnergyMomentModal } from "./components/EnergyMomentModal";
import { GrowthPath } from "./components/GrowthPath";

export default function GrowthTracker() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showReflectionModal, setShowReflectionModal] = useState(false);
  const [showEnergyModal, setShowEnergyModal] = useState(false);
  const [newReflection, setNewReflection] = useState("");
  const [energyMoments, setEnergyMoments] = useState([]);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

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

  const saveReflection = async (reflection: string) => {
    // Implementation
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50 p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-900">Growth Garden</h1>
        <p className="text-green-700">Nurture your evolving goals</p>
      </header>

      {/* Current Focus */}
      <section className="mb-10 p-6 bg-white rounded-2xl shadow-lg border border-green-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-teal-800">Current Goal</h2>
          <button
            onClick={() => setShowGoalModal(true)}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition"
          >
            Evolve Goal
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-teal-50 rounded-xl border border-green-200">
            <h3 className="font-medium text-teal-900">{currentGoal.title}</h3>
            <p className="text-sm text-teal-700 mt-1">
              {currentGoal.description}
            </p>
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
              //   onChange={handleFeelingChange}
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

      <GrowthPath timeline={currentGoal.timeline} />

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
