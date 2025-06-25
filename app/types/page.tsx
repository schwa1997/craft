type Status = {
  id: string;
  text: string;
  editable: boolean;
};

type Metric = {
  type: string;
  value: number;
  unit: string;
};

type Reflection = {
  date: string;
  text: string;
  status: Status;
  metrics?: Metric[];
};

type TimelineItem = {
  date: string;
  title: string;
  description: string;
  status: Status;
  struggle?: string;
  current?: boolean;
};

type Goal = {
  id: string;
  title: string;
  description: string;
  feeling: number;
  createdAt: string;
  updatedAt: string;
  current: boolean;
  status: Status;
  reflections: Reflection[];
  energyMoments: any[];
  timeline: TimelineItem[];
};

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

interface GoalTimelineItem {
  date: string;
  title: string;
  description: string;
  struggle?: string;
  current?: boolean;
}
