"use client";

import ConjugationTable from "./ConjugationTable";

interface ConjugationsSectionProps {
  conjugations: VerbConjugations;
}

export default function ConjugationsSection({ conjugations }: ConjugationsSectionProps) {
  return (
    <div className="space-y-8">
      {Object.entries(conjugations).map(([tense, conjugations]) => (
        <div
          key={tense}
          className="bg-white p-6 rounded-lg shadow-md border border-green-100"
        >
          <h3 className="text-xl font-semibold mb-4 capitalize text-green-700">
            {tense} tense
          </h3>
          <ConjugationTable conjugations={conjugations} />

          <div className="mt-6">
            <h4 className="font-medium mb-3 text-green-700">
              Example Sentences
            </h4>
            <div className="space-y-4">
              {Object.values(conjugations).flatMap((examples) =>
                examples.map((example, idx) => (
                  <div
                    key={idx}
                    className="border-l-4 border-green-200 pl-4 py-2 bg-green-50"
                  >
                    <p className="font-medium text-green-800">
                      {example.sentence}
                    </p>
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
  );
}