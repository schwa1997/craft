// Type definitions
type EnergyCategory = "work" | "life" | "goals";

type WeeklyReport = Record<string, WeeklyPlan>;
interface CategorySettings {
  color: string;
  name: string;
  weight: number;
}

interface SubcategorySettings {
  color: string;
  name: string;
}

interface EnergyEntry {
  value: number; // energy level 0-10
  notes?: string; // optional notes
}

interface DailyEnergyRecord {
  date: string; // YYYY-MM-DD
  work: {
    [subcategory: string]: EnergyEntry; // e.g. "coding", "meetings"
  };
  life: {
    [subcategory: string]: EnergyEntry; // e.g. "family", "hobbies"
  };
  goals: {
    [goalName: string]: EnergyEntry; // e.g. "gym", "spanish"
  };
}

interface EnergySettings {
  categories: {
    work: CategorySettings;
    life: CategorySettings;
    goals: CategorySettings;
  };
  subcategories: {
    work: SubcategorySettings[];
    life: SubcategorySettings[];
    goals: SubcategorySettings[];
  };
}

interface WeeklyPlan {
  plan: string;
  review: string;
}


interface MonthlyGoals {
  goals: number;
  life: number;
  work: number;
}

interface MonthlySummary {
  averages: {
    work: number;
    life: number;
    goals: number;
  };
  subcategoryAverages: {
    work: Record<string, number>;
    life: Record<string, number>;
    goals: Record<string, number>;
  };
}

interface EnergyData {
  settings: EnergySettings;
  records: {
    [year: string]: {
      [month: string]: DailyEnergyRecord[];
    };
  };
  weeklyReport?: {
    [date: string]: WeeklyPlan;
  };
  monthlyGoals?: {
    [year: string]: {
      [month: string]: MonthlyGoals;
    };
  };
  monthlySummaries?: {
    [year: string]: {
      [month: string]: MonthlySummary;
    };
  };
}