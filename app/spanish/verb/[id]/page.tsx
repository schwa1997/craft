"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ScenarioCard from "../../components/ScenarioCard";
import ConjugationsSection from "../../components/ConjugationsSection";
import data from "../../../../data/spanish.json";

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
  const currentVerbIndex = data.verbs.findIndex((v) => v.id === id);
  const hasPrevious = currentVerbIndex > 0;
  const hasNext = currentVerbIndex < data.verbs.length - 1;

  const navigateToVerb = (direction: "previous" | "next") => {
    const newIndex =
      direction === "previous" ? currentVerbIndex - 1 : currentVerbIndex + 1;
    if (newIndex >= 0 && newIndex < data.verbs.length) {
      router.push(`/spanish/verb/${data.verbs[newIndex].id}`);
    }
  };

  const returnToSpanishPage = () => {
    router.push("/spanish");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-4 md:p-6">

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateToVerb("previous")}
          disabled={!hasPrevious}
          className={`p-2 rounded-full ${hasPrevious
              ? "text-green-700 hover:bg-green-100"
              : "text-gray-400 cursor-default"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <h1 className="text-3xl font-bold text-green-800 text-center">
          {verb.infinitive}{" "}
          <span className="text-green-600">({verb.translation})</span>
          <span className="ml-2 text-sm font-normal px-2 py-1 bg-green-100 text-green-800 rounded-full">
            {verb.difficulty}
          </span>
        </h1>

        <button
          onClick={() => navigateToVerb("next")}
          disabled={!hasNext}
          className={`p-2 rounded-full ${hasNext
              ? "text-green-700 hover:bg-green-100"
              : "text-gray-400 cursor-default"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="flex mb-6 border-b border-green-200">
        <button
          className={`px-4 py-2 font-medium ${activeTab === "practice"
              ? "text-green-700 border-b-2 border-green-600"
              : "text-green-500 hover:text-green-700"
            }`}
          onClick={() => setActiveTab("practice")}
        >
          Practice
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "conjugations"
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
