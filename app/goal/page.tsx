"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";



export default function HappinessDashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for new goal modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    feeling: 5,
  });

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setIsLoading(true);
        const data = await getGoals();
        setTasks(data);
        setError(null);
      } catch (err) {
        setError("Failed to load goals. Please try again later.");
        console.error("Error fetching goals:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, []);

  async function getGoals(): Promise<Goal[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/goals`, {
      next: { revalidate: 3600 }, // Revalidate data every hour
    });

    if (!res.ok) {
      throw new Error("Failed to fetch goals");
    }

    return res.json();
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewGoal({
      ...newGoal,
      [name]: value,
    });
  };

  const handleFeelingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGoal({
      ...newGoal,
      feeling: parseInt(e.target.value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newGoal.title.trim()) {
      alert("Please enter a title for your goal");
      return;
    }

    // const newTask: Goal = {
    //   id: Date.now().toString(),
    //   title: newGoal.title,
    //   description: newGoal.description || "No description provided",
    //   // progress: 0,
    //   // lastUpdated: new Date().toISOString().split("T")[0],
    //   feeling: newGoal.feeling,
    // };

    try {
      // Optimistic UI update
      // setTasks([...tasks, newTask]);
      
      // Reset form
      setNewGoal({
        title: "",
        description: "",
        feeling: 5,
      });
      setShowAddModal(false);

      // TODO: Add API call to save the new task
      // await saveGoalToAPI(newTask);
      
    } catch (err) {
      // Rollback if API call fails
      setTasks(tasks);
      setError("Failed to save the goal. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500 text-center py-10">
          {error}
          <button 
            onClick={() => window.location.reload()}
            className="ml-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-900">Happiness Tracker</h1>
        <p className="text-green-700">Track your wellbeing journey</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Active Goals</h3>
          <p className="text-2xl font-bold text-teal-600">{tasks.length}</p>
        </div>
        {/* <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Average Progress</h3>
          <p className="text-2xl font-bold text-teal-600">
            {tasks.length > 0
              ? Math.round(
                  tasks.reduce((sum, task) => sum + task.progress, 0) /
                    tasks.length
                )
              : 0}%
          </p>
        </div> */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Average Feeling</h3>
          <p className="text-2xl font-bold text-teal-600">
            {tasks.length > 0
              ? (tasks.reduce((sum, task) => sum + task.feeling, 0) /
                    tasks.length
              ).toFixed(1)
              : 0}
            /10
          </p>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium text-gray-600 mb-2">No goals yet</h3>
          <p className="text-gray-500 mb-6">Start by adding your first happiness goal</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Add Your First Goal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <Link
              key={task.id}
              href={`/goal/${task.id}`}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-900 line-clamp-1">
                    {task.title}
                  </h2>
                  {/* <span className="text-sm text-gray-500 whitespace-nowrap">
                    {task.lastUpdated}
                  </span> */}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Progress</span>
                    {/* <span className="font-medium">{task.progress}%</span> */}
                  </div>
                  {/* <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        task.progress > 70
                          ? "bg-green-500"
                          : task.progress > 40
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div> */}
                </div>

                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 mr-2">
                    Feeling:
                  </span>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={task.feeling}
                      readOnly
                      className="w-full accent-teal-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 px-1">
                      <span>1</span>
                      <span>10</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* <div
            onClick={() => setShowAddModal(true)}
            className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-dashed border-gray-300 hover:border-teal-500 transition-colors duration-300 flex items-center justify-center cursor-pointer min-h-[200px]"
          >
            <div className="p-6 w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-teal-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="font-medium">Add New Goal</span>
            </div>
          </div> */}
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-teal-800">
                Create New Goal
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Goal Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newGoal.title}
                    // onChange={handleInputChange}
                    placeholder="What do you want to achieve?"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                    autoFocus
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newGoal.description}
                    onChange={handleInputChange}
                    placeholder="More details about your goal..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Initial Feeling About This Goal
                  </label>
                  <div className="flex justify-between text-xs text-gray-500 px-2 mb-1">
                    <span>Apprehensive</span>
                    <span>Excited</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    name="feeling"
                    value={newGoal.feeling}
                    onChange={handleFeelingChange}
                    className="w-full accent-teal-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 px-2 mt-1">
                    <span>1</span>
                    <span>{newGoal.feeling}</span>
                    <span>10</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}