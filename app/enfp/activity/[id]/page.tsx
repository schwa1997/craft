import data from '@/data/enfp.json';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default function ActivityDetailPage({ params }: { params: { id: string } }) {
  const { dogMembers, meetingNotes } = data;
  const meeting = meetingNotes.find(m => m.meetingId === params.id);

  if (!meeting) {
    return notFound();
  }

  const getDogById = (id: string) => dogMembers.find(dog => dog.id === id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 p-6">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-amber-800 mb-2">
          <span className="inline-block animate-bounce">📝</span> {meeting.meetingTitle}
        </h1>
        <p className="text-xl text-amber-600">会议日期: {meeting.meetingDate}</p>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        {meeting.notes.map((note, index) => {
          const dog = getDogById(note.dogId);
          if (!dog) return null;
          
          return (
            <div key={index} className="bg-white rounded-3xl p-6 shadow-lg border-2 border-amber-200">
              <div className="flex items-start mb-4">
                <div className="relative w-16 h-16 mr-4 rounded-full overflow-hidden border-2 border-amber-300">
                  <Image
                    src={dog.avatar}
                    alt={dog.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-amber-700">{dog.name}</h2>
                  <p className="text-amber-600">{dog.profession} · {dog.location}</p>
                </div>
              </div>
              
              <div className="bg-amber-50 rounded-xl p-4 mb-4">
                <p className="text-amber-800">{note.content}</p>
              </div>
              
              {note.suggestions.length > 0 && (
                <div>
                  <h3 className="font-semibold text-amber-700 mb-2">建议:</h3>
                  <ul className="space-y-2">
                    {note.suggestions.map((suggestion, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-amber-400 mr-2">✨</span>
                        <span className="text-amber-600">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
}