"use client";

import { useState } from "react";

interface PracticeCardProps {
  template: string;
  slots: Record<string, string[]>;
  translation: string;
  verb: string;
}

export default function PracticeCard({
  template,
  slots,
  translation,
  verb,
}: PracticeCardProps) {
  const [userInput, setUserInput] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentExample, setCurrentExample] = useState(generateExample());

  function generateExample() {
    let example = template;
    let translated = translation;

    for (const [key, options] of Object.entries(slots)) {
      const randomValue = options[Math.floor(Math.random() * options.length)];
      example = example.replace(`__${key}__`, randomValue);
      translated = translated.replace(`__${key}__`, randomValue);
    }

    return {
      sentence: example.replace(`__${verb}__`, `[${verb}]`),
      fullSentence: example,
      translation: translated,
    };
  }

  const handleCheck = () => {
    setShowAnswer(true);
  };

  const handleNewExample = () => {
    setCurrentExample(generateExample());
    setUserInput("");
    setShowAnswer(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-green-100">
      <div className="mb-4">
        <p className="text-lg mb-2 text-green-700">Complete the sentence:</p>
        <p className="font-medium text-green-800">{currentExample.sentence}</p>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your answer here"
          className="w-full px-4 py-2 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleCheck}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Check Answer
        </button>
        <button
          onClick={handleNewExample}
          className="px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
        >
          New Example
        </button>
      </div>

      {showAnswer && (
        <div className="mt-6 p-4 bg-green-50 rounded-md border border-green-200">
          <p className="font-medium text-green-800">Correct answer:</p>
          <p className="text-green-700 mb-2">{currentExample.fullSentence}</p>
          <p className="text-green-600">{currentExample.translation}</p>

          {userInput.trim().toLowerCase() ===
          currentExample.fullSentence.toLowerCase() ? (
            <p className="text-green-600 mt-2 font-medium">
              ✓ Correct! Well done!
            </p>
          ) : (
            <p className="text-red-500 mt-2 font-medium">
              Try again! You can do it!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
