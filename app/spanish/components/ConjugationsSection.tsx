"use client";

import { useState } from "react";
import ConjugationTable from "./ConjugationTable";

interface ConjugationsSectionProps {
  conjugations: VerbConjugations;
}

export default function ConjugationsSection({
  conjugations,
}: ConjugationsSectionProps) {
  const [activeTense, setActiveTense] = useState<string>(
    Object.keys(conjugations)[0]
  );

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-green-100 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto">
      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 border-b border-green-200">
        {Object.keys(conjugations).map((tense) => (
          <button
            key={tense}
            className={`px-3 py-1.5 text-sm sm:text-base font-medium rounded-md transition-colors ${
              activeTense === tense
                ? "text-green-700 border-b-2 border-green-600"
                : "text-green-500 hover:text-green-700 hover:bg-green-50"
            }`}
            onClick={() => setActiveTense(tense)}
          >
            {tense.charAt(0).toUpperCase() + tense.slice(1)}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-green-700">
          {activeTense.charAt(0).toUpperCase() + activeTense.slice(1)} Tense
        </h3>
        <ConjugationTable conjugations={conjugations[activeTense].examples} />
      </div>
    </div>
  );
}
