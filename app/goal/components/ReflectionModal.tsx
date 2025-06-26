"use client";
import { useState } from "react";

interface ReflectionModalProps {
  initialText: string;
  onClose: () => void;
  onSave: (reflection: string) => void;
}

export function ReflectionModal({
  initialText,
  onClose,
  onSave,
}: ReflectionModalProps) {
  const [newReflection, setNewReflection] = useState(initialText);

  const reflectionOptions = [
    {
      id: 1,
      text: "Executed well",
      emoji: "🌟",
      defaultText: "I followed through on my intentions today",
    },
    {
      id: 2,
      text: "Mixed day",
      emoji: "🌤",
      defaultText: "Some wins, some struggles - progress isn't linear",
    },
    {
      id: 3,
      text: "Off track",
      emoji: "🌧",
      defaultText: "Today didn't go as planned, and that's okay",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold text-teal-800 mb-4">
          Honest Reflection
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Today's status
            </label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {reflectionOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setNewReflection(option.defaultText)}
                  className={`p-2 rounded-lg border flex flex-col items-center ${
                    newReflection.includes(option.defaultText)
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-xl">{option.emoji}</span>
                  <span className="text-xs mt-1">{option.text}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  const customText = prompt(
                    "Edit status message:",
                    newReflection || ""
                  );
                  if (customText !== null) setNewReflection(customText);
                }}
                className="text-xs text-teal-600 hover:text-teal-800 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Customize
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How's it really going?
            </label>
            <textarea
              value={newReflection}
              onChange={(e) => setNewReflection(e.target.value)}
              placeholder="The good, the bad, the unexpected..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(newReflection)}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Save Reflection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
