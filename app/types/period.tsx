type FlowLevel = "spotting" | "light" | "medium" | "heavy";

interface DayEntry {
  date: string;
  flow?: FlowLevel;
  mood?: string;
  backPain?: boolean;
  hasPMS?: boolean;
  cramps?: boolean;
  recentChange?: string;
  energyLevel?: 1 | 2 | 3 | 4 | 5;
}


export interface PeriodRecord {
  start: string;
  end: string;
  days: DayEntry[];
}

export interface PeriodsData {
  periods: PeriodRecord[];
}