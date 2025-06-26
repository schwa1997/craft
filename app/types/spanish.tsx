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
  id: number;
  infinitive: string;
  translation: string;
  difficulty: string;
  practice_scenarios: PracticeScenario[];
  conjugations: VerbConjugations;
}

interface LanguageData {
  verbs: VerbData[];
}
