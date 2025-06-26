"use client";

import { useState } from "react";


interface PracticeCardProps {
  template: string;
  slots: SlotData;
  translation: string;
  verb: string;
  isEven?: boolean;
}

export default function PracticeCard({
  template,
  slots,
  translation,
  verb,
  isEven = false,
}: PracticeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);

  const handleOptionClick = (option: string) => {
    const correct = option === slots.correct;
    setSelectedOption(option);
    setIsCorrect(correct);
    setAttempts(prev => prev + 1);
    
    if (correct) {
      setTimeout(() => {
        setIsFlipped(true);
      }, 500);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      // Reset only when flipping back to question side
      setSelectedOption(null);
      setIsCorrect(null);
      setAttempts(0);
    }
  };

  const generateSentenceWithBlank = () => {
    return template.replace(`__${verb}__`, `[${verb}]`);
  };

  const generateFullSentence = () => {
    const sentence = template.replace(`__${verb}__`, slots.correct);
    const translated = translation.replace(`__${verb}__`, slots.correct);
    return { sentence, translation: translated };
  };

  const { sentence: fullSentence, translation: fullTranslation } = generateFullSentence();
  const sentenceWithBlank = generateSentenceWithBlank();

  // Bubble container styles
  const bubbleContainerClasses = `relative max-w-[85%] p-4 rounded-2xl shadow-sm transition-all duration-300 ${
    isEven 
      ? "bg-gradient-to-br from-green-100 to-green-50 rounded-br-none ml-auto" 
      : "bg-gradient-to-br from-green-50 to-white rounded-bl-none mr-auto"
  } ${
    selectedOption !== null
      ? isCorrect 
        ? "ring-2 ring-green-300 shadow-md" 
        : "ring-2 ring-red-200 shadow-md"
      : "border border-green-100"
  }`;

  // Arrow styles
  const arrowClasses = `absolute w-3 h-3 ${
    isEven
      ? "right-0 -bottom-[6px] bg-gradient-to-br from-green-100 to-green-50 rotate-45 shadow-[2px_2px_2px_rgba(0,0,0,0.05)]"
      : "left-0 -bottom-[6px] bg-gradient-to-br from-green-50 to-white rotate-45 shadow-[2px_2px_2px_rgba(0,0,0,0.05)]"
  }`;

  // Option button styles
  const getOptionButtonClasses = (option: string) => {
    if (selectedOption === null) {
      return "bg-green-100 text-green-800 hover:bg-green-200";
    }
    if (option === slots.correct && selectedOption === option) {
      return "bg-green-600 text-white shadow-sm";
    }
    if (option === selectedOption && option !== slots.correct) {
      return "bg-red-400 text-white shadow-sm";
    }
    if (selectedOption !== null && option === slots.correct) {
      return "bg-green-200 text-green-800 border-2 border-green-400";
    }
    return "bg-gray-100 text-gray-400";
  };

  return (
    <div className={`w-full mb-6 ${isEven ? "text-right" : "text-left"}`}>
      <div 
        className={bubbleContainerClasses} 
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        aria-label={isFlipped ? "Flip back to question" : "Flip to answer"}
      >
        <div className={arrowClasses}></div>
        
        {!isFlipped ? (
          <div className="space-y-3">
            <p className={`text-gray-800 mb-2 ${isEven ? "text-green-900" : "text-gray-800"}`}>
              {sentenceWithBlank}
            </p>
            
            <div className="flex flex-wrap gap-2 justify-start">
              {slots.options.map((option) => (
                <button
                  key={option}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOptionClick(option);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${getOptionButtonClasses(option)}`}
                  disabled={isCorrect === true}
                  aria-label={`Select option: ${option}`}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {isCorrect === true && (
              <div className="flex items-center space-x-1 justify-end">
                <span className="text-green-600 text-xs">✓ Correct! Click to see answer</span>
              </div>
            )}
            
            {isCorrect === false && (
              <div className="flex items-center space-x-1 justify-end">
                <span className="text-red-500 text-xs">
                  {attempts > 1 ? "Try again" : "Not quite right, try another option"}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <p className={`font-medium ${isEven ? "text-green-900" : "text-gray-800"}`}>
              {fullSentence}
            </p>
            
            <div className={`p-2 rounded-lg ${isEven ? "bg-green-50" : "bg-white"} border border-green-100`}>
              <p className="text-green-700 text-sm italic">{fullTranslation}</p>
            </div>
            
            <div className="flex items-center justify-end space-x-1">
              <span className="text-green-500 text-xs">Click to practice again</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}