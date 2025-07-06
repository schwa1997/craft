interface Status {
  id: string;
  text: string;
  editable?: boolean; // Made optional since not all status objects need it
}

interface Metric {
  type: string;
  value: number | string;
  unit: string;
}

interface Reflection {
  date: string;
  text: string;
  status: Status;
  metrics?: Metric[];
}

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  status?: Status;       // Made optional since your JSON doesn't show status in timeline items
  struggle?: string;      // Optional field
  current?: boolean;      // Optional field
}

interface EnergyMoment {
  date: string;
  activity: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  targetDate: string;
}

interface Goal {
  id: number | string;
  title: string;
  description: string;
  feeling?: number;       // Made optional since not all goals might have this
  createdAt: string;
  updatedAt: string;
  status: "completed" | "in-progress" | string;
  reflections: Reflection[];
  energyMoments?: EnergyMoment[];  // Made optional and corrected typo (should be moments)
  timeline: TimelineItem[];
  milestones?: Milestone[];        // Made optional
  current?: boolean;               // Made optional
}

interface GoalsData {
  goals: Goal[];
}