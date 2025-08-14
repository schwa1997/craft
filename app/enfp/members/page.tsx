// app/enfp/member/page.tsx
import { DogMember, MeetingNote } from '@/app/types/enfp';
import data from '@/data/enfp.json';
import Image from 'next/image';

export default function MemberPage() {
  const { dogMembers } = data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-blue-800 mb-4">
          <span className="inline-block animate-bounce">🐶</span> 小狗成员 
          <span className="inline-block animate-bounce">🐕</span>
        </h1>
        <p className="text-xl text-blue-600">认识我们可爱的团队成员</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {dogMembers.map((dog: DogMember) => (
          <div 
            key={dog.id}
            className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-4 border-blue-200 hover:border-blue-300 transform hover:scale-105 transition-transform"
          >
            <div className="relative h-48 mb-4 bg-blue-50 rounded-2xl overflow-hidden">
              <Image 
                src={dog.avatar}
                alt={dog.name}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-1">{dog.name}</h2>
            <p className="text-center text-blue-600 mb-2">{dog.location} · {dog.profession}</p>
            
            <div className="mt-4">
              <h3 className="font-semibold text-blue-700 mb-2">特点:</h3>
              <ul className="space-y-1">
                {dog.characteristics.map((char, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-400 mr-2">🐾</span>
                    <span className="text-blue-600">{char}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}