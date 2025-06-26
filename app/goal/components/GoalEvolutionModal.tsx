"use client";

interface GoalEvolutionModalProps {
  onClose: () => void;
  onContinue: () => void;
}

export function GoalEvolutionModal({ onClose, onContinue }: GoalEvolutionModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold text-teal-800 mb-4">
          Evolve Your Goal
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          How would you like to adjust your current goal?
        </p>

        <div className="space-y-3">
          <button className="w-full p-3 bg-green-50 rounded-lg border border-green-200 text-green-700 text-left">
            Adjust focus (keep same direction)
          </button>
          <button className="w-full p-3 bg-green-50 rounded-lg border border-green-200 text-green-700 text-left">
            Pivot completely (new direction)
          </button>
          <button className="w-full p-3 bg-green-50 rounded-lg border border-green-200 text-green-700 text-left">
            Archive and start fresh
          </button>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button 
            onClick={onContinue}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}