'use client';

import { useEffect, useState } from "react";
import data from "../../../../data/spanish.json";

interface FormatedContent {
  foodOfTheDay: string;
  thingOfTheDay: string;
  moodOfTheDay: string;
}

interface DairyData {
  id: number;
  date: string;
  freeContent: string;
}

export default function NounPage() {
  const [diaries, setDiaries] = useState<DairyData[]>([]);
  const [selectedDiary, setSelectedDiary] = useState<DairyData | null>(null);
  const [currentDiaryIndex, setCurrentDiaryIndex] = useState(0);

  useEffect(() => {
    setDiaries(data.diaries);
    if (data.diaries.length > 0) {
      setSelectedDiary(data.diaries[0]);
    }
  }, []);

  const goToPreviousDay = () => {
    if (currentDiaryIndex > 0) {
      const newIndex = currentDiaryIndex - 1;
      setCurrentDiaryIndex(newIndex);
      setSelectedDiary(diaries[newIndex]);
    }
  };

  const goToNextDay = () => {
    if (currentDiaryIndex < diaries.length - 1) {
      const newIndex = currentDiaryIndex + 1;
      setCurrentDiaryIndex(newIndex);
      setSelectedDiary(diaries[newIndex]);
    }
  };

  // Función para formatear la fecha en español
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('es-ES', options);
  };

  // Obtener icono según el estado de ánimo
  const getMoodIcon = (mood: string) => {
    const moodIcons: Record<string, string> = {
      "feliz": "😊",
      "triste": "😢",
      "emocionado": "😆",
      "tranquilo": "😌",
      "enojado": "😠",
      "cansado": "😴",
    };
    const moodLower = mood.toLowerCase();
    for (const [key, icon] of Object.entries(moodIcons)) {
      if (moodLower.includes(key)) {
        return icon;
      }
    }
  };

  if (!selectedDiary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl text-blue-800 mb-4">Cargando diario...</div>
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">Mi Diario Español</h1>
          <p className="text-blue-600">Practicando español cada día 📚</p>
        </div>

        {/* Navegación entre días */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={goToPreviousDay}
            disabled={currentDiaryIndex === 0}
            className={`flex items-center px-4 py-2 rounded-lg ${currentDiaryIndex === 0 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            ← Día Anterior
          </button>

          <span className="text-lg font-medium text-blue-800 bg-white px-4 py-2 rounded-lg shadow">
            Día {currentDiaryIndex + 1} de {diaries.length}
          </span>

          <button
            onClick={goToNextDay}
            disabled={currentDiaryIndex === diaries.length - 1}
            className={`flex items-center px-4 py-2 rounded-lg ${currentDiaryIndex === diaries.length - 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Día Siguiente →
          </button>
        </div>

        {/* Tarjeta del diario */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border-2 border-blue-200 relative overflow-hidden">
          {/* Elementos decorativos */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-200 rounded-full opacity-30"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-200 rounded-full opacity-30"></div>
          <div className="absolute top-4 right-4 text-4xl opacity-20">📝</div>

          {/* Fecha */}
          <div className="text-center mb-6">
            <div className="text-sm text-blue-600 mb-1">Fecha</div>
            <div className="text-2xl font-bold text-blue-800">{formatDate(selectedDiary.date)}</div>
          </div>
          {/* Contenido libre */}
          <div className="bg-pink-50 p-4 rounded-2xl border border-pink-200">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">📖</span>
              <h3 className="text-lg font-semibold text-pink-800">Mi Entrada de Diario</h3>
            </div>
            <div className="text-pink-700 whitespace-pre-line">
              {selectedDiary.freeContent || "No hay entrada para este día."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}