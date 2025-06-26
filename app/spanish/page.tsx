import Link from "next/link";
import data from "../../data/spanish.json";

export default async function Home() {
  const verbs = data.verbs;

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gradient-to-b from-green-50 to-white">
      <h1 className="text-3xl font-bold mb-8 text-green-800 border-b-2 border-green-200 pb-2">
        Spanish Verb Conjugations
      </h1>

      {verbs.length === 0 ? (
        <div className="text-green-700">No verbs found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {verbs.map((verb) => (
            <Link
              key={verb.id}
              href={`/spanish/${verb.id}`}
              className="block transition-transform hover:scale-105" 
            >
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all h-full border-l-4 border-green-400 hover:border-green-600">
                <h2 className="text-xl font-semibold text-green-600 hover:text-green-800">
                  {verb.infinitive}
                </h2>
                <p className="text-green-500 mt-2 italic">{verb.translation}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
