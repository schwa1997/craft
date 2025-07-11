"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import data from '../../../../data/spanish.json';


export default function NounPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [category, setCategory] = useState<NounData | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);

  useEffect(() => {
    const foundCategory = data.nouns.find((cat: NounData) => cat.id === id);
    if (!foundCategory) {
      router.push("/");
      return;
    }
    setCategory(foundCategory);
    // Shuffle flashcards for random order
    setCategory({
      ...foundCategory,
      flashcards: [...foundCategory.flashcards].sort(() => Math.random() - 0.5)
    });
  }, [id, router]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = (remembered: boolean) => {
    // Here you would typically update spaced repetition stats
    // For now we'll just move to next card
    if (currentCardIndex < category!.flashcards.length - 1) {
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

  if (!category) return <LoadingSpinner />;

  if (sessionComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-emerald-700 mb-4">Session Complete!</h2>
          <p className="mb-6">You've reviewed all {category.flashcards.length} cards in this category.</p>
          <button
            onClick={restartSession}
            className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition"
          >
            Practice Again
          </button>
        </div>
      </div>
    );
  }

  const currentCard = category.flashcards[currentCardIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">
            {category.category} Practice
          </h1>
          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
            Card {currentCardIndex + 1} of {category.flashcards.length}
          </span>
        </div>

        {/* Flashcard */}
        <div 
          className={`relative w-full h-64 md:h-80 rounded-xl shadow-md cursor-pointer transition-all duration-300 ${isFlipped ? 'bg-emerald-50' : 'bg-white'}`}
          onClick={handleFlip}
        >
          <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 backface-visibility-hidden transition-all duration-500 ${isFlipped ? 'opacity-0 rotate-y-180' : 'opacity-100'}`}>
            {/* Front of card */}
            <h2 className="text-3xl font-bold text-center mb-4">{currentCard.word}</h2>
            {currentCard.hint && (
              <p className="text-gray-600 text-center mb-2">{currentCard.hint}</p>
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

          <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 backface-visibility-hidden transition-all duration-500 ${isFlipped ? 'opacity-100' : 'opacity-0 rotate-y-180'}`}>
            {/* Back of card */}
            <h3 className="text-2xl font-bold text-emerald-700 mb-2">{currentCard.translation}</h3>
            {currentCard.gender && (
              <span className={`text-sm px-2 py-1 rounded mb-2 ${currentCard.gender === 'm' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>
                {currentCard.gender === 'm' ? 'masculine' : 'feminine'}
                {currentCard.plural && ` | plural: ${currentCard.plural}`}
              </span>
            )}
            {currentCard.example && (
              <p className="text-gray-700 italic text-center mb-4">"{currentCard.example}"</p>
            )}
            {currentCard.explanation && (
              <p className="text-sm text-gray-600 text-center">Note: {currentCard.explanation}</p>
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