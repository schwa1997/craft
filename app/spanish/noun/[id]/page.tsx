"use client";

import { useEffect, useState } from "react";
import data from '../../../../data/spanish.json';


export default function NounPage() {
  const [categories, setCategories] = useState<NounData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<NounData | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);

  useEffect(() => {
    // Load all categories initially
    setCategories(data.nouns);
  }, []);

  const handleCategorySelect = (category: NounData) => {
    // Shuffle flashcards for random order
    setSelectedCategory({
      ...category,
      flashcards: [...category.flashcards].sort(() => Math.random() - 0.5)
    });
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setSessionComplete(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = (remembered: boolean) => {
    if (currentCardIndex < selectedCategory!.flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      setSessionComplete(true);
    }
  };

  const restartSession = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setSessionComplete(false);
  };

  const returnToCategories = () => {
    setSelectedCategory(null);
    setSessionComplete(false);
  };

  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold text-emerald-700 mb-8 text-center">Spanish Nouns Practice</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id}
              onClick={() => handleCategorySelect(category)}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
            >
              <div className="h-40 bg-emerald-100 flex items-center justify-center">
                <h2 className="text-2xl font-bold text-emerald-700 text-center p-4">
                  {category.category}
                </h2>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">
                  {category.flashcards.length} flashcards
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {category.flashcards.slice(0, 3).map((card) => (
                    <span 
                      key={card.id}
                      className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded"
                    >
                      {card.word}
                    </span>
                  ))}
                  {category.flashcards.length > 3 && (
                    <span className="text-gray-400 text-xs">+{category.flashcards.length - 3} more</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-emerald-700 mb-4">Session Complete!</h2>
          <p className="mb-6">
            You've reviewed all {selectedCategory.flashcards.length} cards in the{" "}
            <span className="font-semibold">{selectedCategory.category}</span> category.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={restartSession}
              className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition"
            >
              Practice Again
            </button>
            <button
              onClick={returnToCategories}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition"
            >
              Choose Another Category
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = selectedCategory.flashcards[currentCardIndex];

  return (
    <div className="min-h-screen flex flex-col items-start md:justify-center justify-start bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={returnToCategories}
            className="flex items-center text-emerald-600 hover:text-emerald-800"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Categories
          </button>
          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
            {selectedCategory.category} - Card {currentCardIndex + 1} of {selectedCategory.flashcards.length}
          </span>
        </div>

        {/* Flashcard */}
        <div
          className={`relative w-full h-64 md:h-80 rounded-xl shadow-md cursor-pointer transition-all duration-300 ${
            isFlipped ? "bg-emerald-50" : "bg-white"
          }`}
          onClick={handleFlip}
        >
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center p-6 backface-visibility-hidden transition-all duration-500 ${
              isFlipped ? "opacity-0 rotate-y-180" : "opacity-100"
            }`}
          >
            {/* Front of card */}
            <h2 className="text-3xl font-bold text-emerald-700 text-center mb-4">
              {currentCard.word}
            </h2>
            {currentCard.hint && (
              <p className="text-gray-600 text-center mb-2">
                {currentCard.hint}
              </p>
            )}
            {currentCard.image && (
              <img
                src={currentCard.image}
                alt={currentCard.word}
                className="max-h-32 object-contain mb-4"
              />
            )}
            <p className="text-sm text-gray-500 mt-auto">Click to flip</p>
          </div>

          <div
            className={`absolute inset-0 flex flex-col items-center justify-center p-6 backface-visibility-hidden transition-all duration-500 ${
              isFlipped ? "opacity-100" : "opacity-0 rotate-y-180"
            }`}
          >
            {/* Back of card */}
            <h3 className="text-2xl font-bold text-emerald-700 mb-2">
              {currentCard.translation}
            </h3>
            {currentCard.gender && (
              <span
                className={`text-sm px-2 py-1 rounded mb-2 ${
                  currentCard.gender === "m"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-pink-100 text-pink-800"
                }`}
              >
                {currentCard.gender === "m" ? "masculine" : "feminine"}
                {currentCard.plural && ` | plural: ${currentCard.plural}`}
              </span>
            )}
            {currentCard.example && (
              <p className="text-gray-700 italic text-center mb-4">
                "{currentCard.example}"
              </p>
            )}
            {currentCard.explanation && (
              <p className="text-sm text-gray-600 text-center">
                Note: {currentCard.explanation}
              </p>
            )}
          </div>
        </div>

        {/* Navigation buttons (shown after first flip) */}
        {isFlipped && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => handleNext(false)}
              className="bg-red-100 text-red-700 px-6 py-2 rounded-md hover:bg-red-200 transition"
            >
              Need Practice
            </button>
            <button
              onClick={() => handleNext(true)}
              className="bg-emerald-100 text-emerald-700 px-6 py-2 rounded-md hover:bg-emerald-200 transition"
            >
              Got It!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}