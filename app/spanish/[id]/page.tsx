"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ScenarioCard from "../components/ScenarioCard";
import ConjugationsSection from "../components/ConjugationsSection";
import data from '../../../data/spanish.json';

export default function VerbPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [verb, setVerb] = useState<VerbData>();
  const [activeTab, setActiveTab] = useState<"practice" | "conjugations">(
    "practice"
  );
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);

  useEffect(() => {
    const foundVerb = data.verbs.find((v: VerbData) => v.id === id);
    
    if (!foundVerb) {
      router.push("/");
      return;
    }
    
    setVerb(foundVerb);
  }, [id, router]);

  if (!verb) return <LoadingSpinner />;

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
