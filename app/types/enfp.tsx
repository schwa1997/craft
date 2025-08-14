// app/types.ts
export type DogMember = {
    id: string;
    name: string;
    location: string;
    profession: string;
    avatar: string;
    characteristics: string[];
  };
  
  export type MeetingNote = {
    id: string;
    meetingId: string;
    meetingTitle: string;
    meetingDate: string;
    participants: string[]; // dog member ids
    notes: {
      dogId: string;
      content: string;
      suggestions: string[];
    }[];
  };