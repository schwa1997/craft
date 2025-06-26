"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ConjugationTable from "../components/ConjugationTable";
import LoadingSpinner from "../components/LoadingSpinner";
import PracticeCard from "../components/PracticeCard";

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
        <div className="flex flex-wrap gap-2 mb-6">
          {verb.practice_scenarios.map((scenario, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-full text-sm ${
                currentScenarioIndex === index
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-800 hover:bg-green-200"
              }`}
              onClick={() => setCurrentScenarioIndex(index)}
            >
              {scenario.scenario}
            </button>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-green-800">
            {currentScenario.scenario}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentScenario.sentences.map((sentence, index) => (
              <PracticeCard
                key={index}
                template={sentence.template}
                slots={sentence.slots}
                translation={sentence.translation}
                verb={verb.infinitive}
              />
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div className="space-y-8">
        {Object.entries(verb.conjugations).map(([tense, conjugations]) => (
          <div key={tense} className="bg-white p-6 rounded-lg shadow-md border border-green-100">
            <h3 className="text-xl font-semibold mb-4 capitalize text-green-700">
              {tense} tense
            </h3>
            <ConjugationTable conjugations={conjugations} />

            <div className="mt-6">
              <h4 className="font-medium mb-3 text-green-700">Example Sentences</h4>
              <div className="space-y-4">
                {Object.values(conjugations).flatMap((examples) =>
                  examples.map((example, idx) => (
                    <div
                      key={idx}
                      className="border-l-4 border-green-200 pl-4 py-2 bg-green-50"
                    >
                      <p className="font-medium text-green-800">{example.sentence}</p>
                      <p className="text-green-600 text-sm">
                        {example.translation}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  );
}
