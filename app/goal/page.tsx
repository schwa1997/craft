"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface HappinessTask {
  id: string;
  title: string;
  description: string;
  progress: number;
  lastUpdated: string;
  feeling: number;
}

export default function HappinessDashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState<HappinessTask[]>([
    {
      id: '1',
      title: 'Healthy Eating Habits',
      description: 'Develop sustainable eating patterns',
      progress: 75,
      lastUpdated: '2023-11-15',
      feeling: 7
    },
    {
      id: '2',
      title: 'Morning Routine',
      description: 'Establish a consistent morning routine',
      progress: 60,
      lastUpdated: '2023-11-14',
      feeling: 6
    },
    {
      id: '3',
      title: 'Mindfulness Practice',
      description: 'Daily 10-minute meditation',
      progress: 85,
      lastUpdated: '2023-11-16',
      feeling: 8
    }
  ]);

  // State for new goal modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    feeling: 5
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewGoal({
      ...newGoal,
      [name]: value
    });
  };

  // Handle feeling slider change
  const handleFeelingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGoal({
      ...newGoal,
      feeling: parseInt(e.target.value)
    });
  };

  // Submit new goal
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newGoal.title.trim()) {
      alert('Please enter a title for your goal');
      return;
    }

    const newTask: HappinessTask = {
      id: Date.now().toString(), // Simple ID generation
      title: newGoal.title,
      description: newGoal.description || 'No description provided',
      progress: 0, // Start at 0% progress
      lastUpdated: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      feeling: newGoal.feeling
    };

    setTasks([...tasks, newTask]);
    setNewGoal({
      title: '',
      description: '',
      feeling: 5
    });
    setShowAddModal(false);
    
    // Optional: Redirect to the new task page
    // router.push(`/happiness/${newTask.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-900">Happiness Tracker</h1>
        <p className="text-green-700">Track your wellbeing journey</p>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Active Goals</h3>
          <p className="text-2xl font-bold text-teal-600">{tasks.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Average Progress</h3>
          <p className="text-2xl font-bold text-teal-600">
            {tasks.length > 0 ? Math.round(tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length ): 0} %
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Average Feeling</h3>
          <p className="text-2xl font-bold text-teal-600">
            {tasks.length > 0 ? Math.round(tasks.reduce((sum, task) => sum + task.feeling, 0) / tasks.length ): 0}/10
          </p>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <Link 
            key={task.id} 
            href={`/${task.id}`}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold text-gray-900">{task.title}</h2>
                <span className="text-sm text-gray-500">{task.lastUpdated}</span>
              </div>
              <p className="text-gray-600 mb-4">{task.description}</p>
              
              <div className="mb-3 text-gray-400">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${task.progress > 70 ? 'bg-green-500' : task.progress > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700 mr-2">Feeling:</span>
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
        
        {/* Add New Task Card */}
        <div 
          onClick={() => setShowAddModal(true)}
          className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-dashed border-gray-300 hover:border-teal-500 transition-colors duration-300 flex items-center justify-center cursor-pointer"
        >
          <div className="p-6 w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-teal-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="font-medium">Add New Goal</span>
          </div>
        </div>
      </div>

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-teal-800 mb-4">Create New Goal</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Goal Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newGoal.title}
                    onChange={handleInputChange}
                    placeholder="What do you want to achieve?"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
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
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
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