import Link from 'next/link';

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  lastUpdated: string;
  feeling: number;
}

export default function TaskCard({ id, title, description, progress, lastUpdated, feeling }: TaskCardProps) {
  return (
    <Link 
      href={`/happiness/${id}`}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <span className="text-sm text-gray-500">{lastUpdated}</span>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        
        {/* Progress bar and feeling slider from dashboard */}
        {/* ... */}
      </div>
    </Link>
  );
}