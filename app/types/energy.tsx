// Type definitions
interface EnergyCategory {
    name: string;
    color: string; // hex color code
    weight?: number; // importance weighting (optional)
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
      work: EnergyCategory;
      life: EnergyCategory;
      goals: EnergyCategory;
    };
    subcategories: {
      work: EnergyCategory[];
      life: EnergyCategory[];
      goals: EnergyCategory[]; // predefined goals like gym, spanish
    };
  }
  interface WeeklyPlan {
    plan: string;
    review: string;
  }
  type WeeklyReport = Record<string, WeeklyPlan>;
  interface EnergyData {
    settings: EnergySettings;
    records: {
      [year: string]: {
        [month: string]: DailyEnergyRecord[];
      };
    };
    weeklyReport?: {
      [date: string]: WeeklyPlan;  
    }
    monthlySummaries: {
      [year: string]: {
        [month: string]: {
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
        };
      };
    };
  }
  
