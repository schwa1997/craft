type FlowLevel = "spotting" | "light" | "medium" | "heavy";

interface DayEntry {
  date: string;
  flow?: string;
  mood?: string;
  notes?: string;
}

export interface PeriodRecord {
  start: string;
  end: string;
  days: DayEntry[];
}

export interface PeriodsData {
  periods: PeriodRecord[];
}