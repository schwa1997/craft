import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white p-4">
      <div className="w-full max-w-2xl space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-green-800">
            My Management Hub
          </h1>
          <p className="text-green-600">
            Select a module to begin managing your activities
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
          {/* Energy Garden Module */}
          <Link
            href="/energy"
            className="group relative rounded-xl border border-green-100 bg-white p-6 transition-all hover:border-green-300 hover:shadow-lg hover:bg-green-50"
          >
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-green-200 transition-all duration-300"></div>
            <h2 className="mb-3 text-xl font-semibold text-green-700 group-hover:text-green-600">
              Energy Garden
            </h2>
            <p className="m-0 text-sm text-green-600 opacity-80">
              Manage your energy levels and productivity
            </p>
          </Link>

          {/* Goal Tracker Module */}
          <Link
            href="/goal"
            className="group relative rounded-xl border border-green-100 bg-white p-6 transition-all hover:border-green-300 hover:shadow-lg hover:bg-green-50"
          >
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-green-200 transition-all duration-300"></div>
            <h2 className="mb-3 text-xl font-semibold text-green-700 group-hover:text-green-600">
              Goal Tracker
            </h2>
            <p className="m-0 text-sm text-green-600 opacity-80">
              Track and achieve your personal objectives
            </p>
          </Link>

          {/* Spanish Module */}
          <Link
            href="/spanish"
            className="group relative rounded-xl border border-green-100 bg-white p-6 transition-all hover:border-green-300 hover:shadow-lg hover:bg-green-50"
          >
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-green-200 transition-all duration-300"></div>
            <h2 className="mb-3 text-xl font-semibold text-green-700 group-hover:text-green-600">
              Spanish
            </h2>
            <p className="m-0 text-sm text-green-600 opacity-80">
              Practice and improve your Spanish skills
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}