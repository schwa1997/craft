"use client";

import { useState, useEffect } from "react";
import PracticeCard from "./PracticeCard";
import LoadingSpinner from "../../components/LoadingSpinner";

interface ScenarioCardProps {
  scenarios: PracticeScenario[];
  verb: string;
}

export default function ScenarioCard({ scenarios, verb }: ScenarioCardProps) {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [currentScenario, setCurrentScenario] =
    useState<PracticeScenario | null>(null);
  useEffect(() => {
    if (scenarios.length > 0) {
      setCurrentScenario(scenarios[currentScenarioIndex]);
    }
  }, [scenarios, currentScenarioIndex]);

  if (!scenarios.length)
    return <div className="p-4 text-gray-500">No scenarios available</div>;
  if (!currentScenario) return <LoadingSpinner />; 

  return (
    <div className="w-full">
      {/* Scenario selector buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Scenario buttons */}
        <div className="flex flex-wrap gap-2 mb-2">
          {scenarios.map((scenario, index) => (
            <button
              key={`${scenario.scenario}-${index}`}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${currentScenarioIndex === index
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
              onClick={() => {
                setCurrentScenarioIndex(index);
                setCurrentScenario(null);
              }}
            >
              {scenario.scenario}
            </button>
          ))}
        </div>
        {currentScenarioIndex !== null && (
          <div className="p-3 bg-gray-50 rounded-md text-sm text-gray-700 mt-2">
            <p>{scenarios[currentScenarioIndex].description}</p>
          </div>
        )}
      </div>

      {/* Scenario content with animation */}
      <div className="overflow-hidden mb-6">
        <div
          key={currentScenario.scenario} // 添加 key 强制重新渲染
          className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn"
        >
          {currentScenario.sentences.map((sentence, index) => (
            <PracticeCard
              key={`${currentScenario.scenario}-${index}`}
              template={sentence.template}
              slots={sentence.slots}
              translation={sentence.translation}
              verb={verb}
              isEven={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// 添加简单的动画效果
const animateFadeIn = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;

// 在全局样式中添加
// 可以在你的全局CSS文件中添加这部分
