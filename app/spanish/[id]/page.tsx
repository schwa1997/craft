"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ScenarioCard from "../components/ScenarioCard";
import ConjugationsSection from "../components/ConjugationsSection";

export default function VerbPage() {
  const params = useParams();
  const [verb, setVerb] = useState<VerbData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"practice" | "conjugations">(
    "practice"
  );
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);

  useEffect(() => {
    const fetchVerb = async () => {
      try {
        const response = await fetch(`/api/spanish/${params.id}`);
        if (!response.ok) throw new Error("Verb not found");
        const data = await response.json();
        setVerb(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch verb data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVerb();
  }, [params.id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!verb) return <div className="p-4">No verb found</div>;

  const currentScenario = verb.practice_scenarios[currentScenarioIndex];

  return (
    <div className="container mx-auto p-4 min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold mb-6 text-green-800">
        {verb.infinitive}{" "}
        <span className="text-green-600">({verb.translation})</span>
        <span className="ml-2 text-sm font-normal px-2 py-1 bg-green-100 text-green-800 rounded-full">
          {verb.difficulty}
        </span>
      </h1>

      <div className="flex mb-6 border-b border-green-200">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "practice"
              ? "text-green-700 border-b-2 border-green-600"
              : "text-green-500 hover:text-green-700"
          }`}
          onClick={() => setActiveTab("practice")}
        >
          Practice
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "conjugations"
              ? "text-green-700 border-b-2 border-green-600"
              : "text-green-500 hover:text-green-700"
          }`}
          onClick={() => setActiveTab("conjugations")}
        >
          Conjugations
        </button>
      </div>

      {activeTab === "practice" ? (
        <div className="space-y-8">
          <div>
            {verb.practice_scenarios.length > 0 && (
              <ScenarioCard
                scenarios={verb.practice_scenarios}
                verb={verb.infinitive}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
         <ConjugationsSection conjugations={verb.conjugations} />
        </div>
      )}
    </div>
  );
}
