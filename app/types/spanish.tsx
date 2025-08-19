interface ExampleSentence {
  pronoun: string;
  conjugation: string;
  sentence: string;
  translation: string;
}

interface ConjugationTense {
  examples: ExampleSentence[];
}

interface SlotData {
  options: string[];
  correct: string;
  explanation: string;
}

interface PracticeSentence {
  id: number;
  template: string;
  slots: SlotData;
  translation: string;
}

interface PracticeScenario {
  scenario: string;
  description: string;
  sentences: PracticeSentence[];
}

interface VerbConjugations {
  [tense: string]: {
    examples: ExampleSentence[];
  };
}

interface VerbData {
  id: string;
  infinitive: string;
  translation: string;
  difficulty: string;
  practice_scenarios: PracticeScenario[];
  conjugations: VerbConjugations;
}
interface Flashcard {
  id: string;              // 卡片唯一ID
  word: string;            // 西语单词 (如 "manzana")
  translation: string;     // 翻译 (如 "apple")
  gender?: string;      // 性别（仅名词）
  plural?: string;         // 复数形式（如 "manzanas"）
  image?: string;          // 图片URL（可选）
  audio?: string;          // 发音音频URL（可选）
  hint?: string;           // 正面提示（如 "水果，红色或绿色"）
  example?: string;        // 例句（如 "Como una manzana cada día."）
  explanation?: string;    // 语法解释（如 "阴性名词，以-a结尾"）
}

interface WordData {
  id: string;             // 分类ID
  category: string;       // 分类名称（如 "food", "animals"）
  flashcards: Flashcard[]; // 该分类下的卡片数组
}
// UserStats
interface UserStats {
  dailyStreak: number;
  totalVerbsMastered: number;
  totalWordsMastered: number;
  weakPoints: {
    verbs: string[];
    words: string[];
  };
}
interface DairyData {
  id: string;
  date: string;
  freeContent: string;
  formatedContent: {
    foodOfTheDay: string,
    thingOfTheDay: string,
    moodOfTheDay: string
  }
}

interface LanguageData {
  verbs: VerbData[];
  words: WordData[];
  diaries: DairyData[];
  userStats: UserStats;
}
