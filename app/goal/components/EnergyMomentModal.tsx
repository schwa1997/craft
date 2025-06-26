"use client";

interface EnergyMomentModalProps {
  onClose: () => void;
  onLogMoment: (moment: string) => void;
}

export function EnergyMomentModal({ onClose, onLogMoment }: EnergyMomentModalProps) {
  const energyOptions = [
    "Creative flow",
    "Nature time",
    "Deep work",
    "Good conversation",
    "Learned something",
    "Physical activity",
    "Helping others",
    "Quiet moment",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold text-teal-800 mb-4">
          What Sparked Joy?
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Tap to record what gave you energy today
        </p>

        <div className="grid grid-cols-2 gap-3">
          {energyOptions.map((item) => (
            <button
              key={item}
              onClick={() => onLogMoment(item)}
              className="py-3 px-2 bg-green-50 text-green-800 rounded-lg text-sm font-medium hover:bg-green-100 transition"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <button
            onClick={onClose}
            className="w-full py-2 text-gray-600 hover:text-gray-800"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}