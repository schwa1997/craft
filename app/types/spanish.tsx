interface ExampleSentence {
  pronoun: string;
  conjugation: string;
  sentence: string;
  translation: string;
}
interface Verb {
  id: number;
  infinitive: string;
  translation: string;
}
interface PracticeScenario {
  scenario: string;
  sentences: {
    template: string;
    slots: Record<string, string[]>;
    translation: string;
  }[];
}

interface VerbData {
  id: number;
  infinitive: string;
  translation: string;
  difficulty: string;
  practice_scenarios: PracticeScenario[];
  conjugations: Record<string, Record<string, ExampleSentence[]>>;
}

