interface Reflection {
    date: string;
    text: string;
  }

  interface EnergyMoment {
    date: string;
    activity: string;
  }
interface Goal {
    id: string;
    title: string;
    description: string;
    feeling: number;
    category?: string; // e.g. "Health", "Career", "Relationships"
    priority?: "low" | "medium" | "high";
    startDate: string;
    targetDate?: string;
    completed: boolean;
    completionDate?: string;
    milestones?: Milestone[];
    reflections: Reflection[];
    energyMoments: EnergyMoment[];
    timeline: GoalTimelineItem[];
  }
  
  interface Milestone {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    targetDate: string;
  }
  
  interface GoalTimelineItem {
    date: string;
    title: string;
    description: string;
    struggle?: string;
    current?: boolean;
  }