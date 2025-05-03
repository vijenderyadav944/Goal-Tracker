"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { v4 as uuidv4 } from 'uuid';

// Theme Context
type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Check if user has previously set theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark');
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  // Update the document class when theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// Types
type GoalStatus = 'Not Started' | 'In Progress' | 'Completed';

type Milestone = {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
};

type Comment = {
  id: string;
  author: string;
  text: string;
  timestamp: Date;
};

type Goal = {
  id: string;
  title: string;
  description: string;
  status: GoalStatus;
  progress: number;
  createdAt: Date;
  dueDate: string;
  category: string;
  isPersonal: boolean;
  assignedTo: string[];
  milestones: Milestone[];
  comments: Comment[];
};

// Mock User Data
type User = {
  id: string;
  name: string;
  avatar: string;
};

const users: User[] = [
  { id: '1', name: 'Vijender', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '2', name: 'Sam Wilson', avatar: 'https://randomuser.me/api/portraits/women/26.jpg' },
  { id: '3', name: 'Jamie Smith', avatar: 'https://randomuser.me/api/portraits/men/44.jpg' },
  { id: '4', name: 'Taylor Brown', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
];

// Initial Goals Data
const initialGoals: Goal[] = [
  {
    id: '1',
    title: 'Launch New Website',
    description: 'Complete and launch the redesigned company website with improved UX',
    status: 'In Progress',
    progress: 65,
    createdAt: new Date('2025-04-15'),
    dueDate: '2025-05-30',
    category: 'Work',
    isPersonal: false,
    assignedTo: ['1', '2'],
    milestones: [
      { id: uuidv4(), title: 'Finalize Design', completed: true, dueDate: '2025-04-20' },
      { id: uuidv4(), title: 'Complete Frontend Development', completed: true, dueDate: '2025-05-10' },
      { id: uuidv4(), title: 'Backend Integration', completed: false, dueDate: '2025-05-25' },
    ],
    comments: [
      {
        id: uuidv4(),
        author: 'Alex Johnson',
        text: 'Design phase completed ahead of schedule!',
        timestamp: new Date('2025-04-18'),
      },
    ],
  },
  {
    id: '2',
    title: 'Learn Spanish',
    description: 'Reach conversational fluency in Spanish',
    status: 'In Progress',
    progress: 30,
    createdAt: new Date('2025-03-01'),
    dueDate: '2025-12-31',
    category: 'Personal',
    isPersonal: true,
    assignedTo: ['1'],
    milestones: [
      { id: uuidv4(), title: 'Complete Basics', completed: true, dueDate: '2025-04-01' },
      { id: uuidv4(), title: 'Intermediate Grammar', completed: false, dueDate: '2025-07-01' },
      { id: uuidv4(), title: 'Conversational Practice', completed: false, dueDate: '2025-10-01' },
    ],
    comments: [],
  },
  {
    id: '3',
    title: 'Q2 Marketing Campaign',
    description: 'Plan and execute Q2 marketing campaign focusing on new product line',
    status: 'Not Started',
    progress: 0,
    createdAt: new Date('2025-04-28'),
    dueDate: '2025-06-30',
    category: 'Work',
    isPersonal: false,
    assignedTo: ['2', '3', '4'],
    milestones: [
      { id: uuidv4(), title: 'Strategy Document', completed: false, dueDate: '2025-05-15' },
      { id: uuidv4(), title: 'Creative Assets', completed: false, dueDate: '2025-06-01' },
      { id: uuidv4(), title: 'Campaign Launch', completed: false, dueDate: '2025-06-15' },
    ],
    comments: [],
  },
];

// Component for goal progress visualization
const ProgressBar = ({ percentage }: { percentage: number }) => {
  return (
    <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
      <div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

// Theme toggle button component
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300 transition-transform duration-300 ease-in-out transform rotate-0" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 transition-transform duration-300 ease-in-out transform rotate-0" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
};

// Main Page Component
const GoalTracker: NextPage = () => {
  const { theme } = useTheme();
  // Use useState with no initial value first
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [filteredGoals, setFilteredGoals] = useState<Goal[]>(initialGoals);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    title: '',
    description: '',
    status: 'Not Started',
    progress: 0,
    dueDate: '',
    category: '',
    isPersonal: true,
    assignedTo: [],
    milestones: [],
    comments: [],
  });
  const [newMilestone, setNewMilestone] = useState<Partial<Milestone>>({
    title: '',
    dueDate: '',
  });
  const [newComment, setNewComment] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState<User>(users[0]);
  const [isClient, setIsClient] = useState(false);
  
  // Use useEffect to initialize from localStorage only after component is mounted on client
  useEffect(() => {
    // Mark that we're on the client
    setIsClient(true);
    
    // Get data from localStorage
    const savedGoals = localStorage.getItem('goals');
    if (savedGoals) {
      try {
        // Parse the JSON and convert date strings back to Date objects
        const parsedGoals = JSON.parse(savedGoals);
        // Convert string dates back to Date objects
        const hydratedGoals = parsedGoals.map((goal: any) => ({
          ...goal,
          createdAt: new Date(goal.createdAt),
          comments: goal.comments.map((comment: any) => ({
            ...comment,
            timestamp: new Date(comment.timestamp)
          }))
        }));
        setGoals(hydratedGoals);
        setFilteredGoals(hydratedGoals);
      } catch (error) {
        console.error('Error parsing goals from localStorage:', error);
      }
    }
  }, []);  // Empty dependency array ensures this only runs once after mount

  // Save goals to localStorage whenever they change - but only on the client
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('goals', JSON.stringify(goals));
    }
  }, [goals, isClient]);  // Only run when goals or isClient changes

  // Apply filters
  useEffect(() => {
    let result = [...goals];

    // Filter by status
    if (filterStatus !== 'All') {
      result = result.filter((goal) => goal.status === filterStatus);
    }

    // Filter by category
    if (filterCategory !== 'All') {
      result = result.filter((goal) => goal.category === filterCategory);
    }

    // Search by title or description
    if (searchTerm) {
      result = result.filter(
        (goal) =>
          goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          goal.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredGoals(result);
  }, [goals, filterStatus, filterCategory, searchTerm]);

  // Get unique categories
  const categories = ['All', ...new Set(goals.map((goal) => goal.category))];

  // Handle adding a new goal
  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.dueDate) return;

    const goal: Goal = {
      id: uuidv4(),
      title: newGoal.title || '',
      description: newGoal.description || '',
      status: newGoal.status as GoalStatus || 'Not Started',
      progress: newGoal.progress || 0,
      createdAt: new Date(),
      dueDate: newGoal.dueDate || '',
      category: newGoal.category || 'Personal',
      isPersonal: newGoal.isPersonal || true,
      assignedTo: newGoal.assignedTo || [currentUser.id],
      milestones: newGoal.milestones || [],
      comments: newGoal.comments || [],
    };

    setGoals([...goals, goal]);

    // Reset form
    setNewGoal({
      title: '',
      description: '',
      status: 'Not Started',
      progress: 0,
      dueDate: '',
      category: '',
      isPersonal: true,
      assignedTo: [],
      milestones: [],
      comments: [],
    });

    setShowAddGoal(false);
  };

  // Handle updating goal progress
  const updateGoalProgress = (goalId: string, progress: number) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        const updatedGoal = { ...goal, progress };

        // Auto-update status based on progress
        if (progress === 100) {
          updatedGoal.status = 'Completed';
        } else if (progress === 0) {
          updatedGoal.status = 'Not Started';
        } else {
          updatedGoal.status = 'In Progress';
        }

        return updatedGoal;
      }
      return goal;
    });

    setGoals(updatedGoals);
  };

  // Handle adding a milestone to a goal
  const addMilestone = (goalId: string) => {
    if (!newMilestone.title || !newMilestone.dueDate) return;

    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        const milestone: Milestone = {
          id: uuidv4(),
          title: newMilestone.title || '',
          completed: false,
          dueDate: newMilestone.dueDate || '',
        };

        return { ...goal, milestones: [...goal.milestones, milestone] };
      }
      return goal;
    });

    setGoals(updatedGoals);

    if (selectedGoal && selectedGoal.id === goalId) {
      const updatedGoal = updatedGoals.find((g) => g.id === goalId);
      if (updatedGoal) {
        setSelectedGoal(updatedGoal);
      }
    }

    // Reset form
    setNewMilestone({
      title: '',
      dueDate: '',
    });
  };

  // Toggle milestone completion
  const toggleMilestoneCompletion = (goalId: string, milestoneId: string) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        // Create a new array of milestones with the toggled completion status
        const updatedMilestones = goal.milestones.map((milestone) => {
          if (milestone.id === milestoneId) {
            return { ...milestone, completed: !milestone.completed };
          }
          return milestone;
        });

        // Calculate the new progress based on completed milestones
        const totalMilestones = updatedMilestones.length;
        const completedMilestones = updatedMilestones.filter((m) => m.completed).length;
        const progress = totalMilestones > 0
          ? Math.round((completedMilestones / totalMilestones) * 100)
          : 0;

        // Determine the new status based on the progress
        const newStatus: GoalStatus = 
          progress === 100 ? 'Completed' : 
          progress > 0 ? 'In Progress' : 
          'Not Started';

        // Return a new goal object with the updated milestones, progress and status
        return {
          ...goal,
          milestones: updatedMilestones,
          progress: progress,
          status: newStatus,
        };
      }
      return goal;
    });

    // Update the goals state
    setGoals(updatedGoals);

    // If the currently selected goal was updated, also update the selectedGoal state
    if (selectedGoal && selectedGoal.id === goalId) {
      const updatedGoal = updatedGoals.find((g) => g.id === goalId);
      if (updatedGoal) {
        setSelectedGoal(updatedGoal);
      }
    }
  };

  // Add comment to a goal
  const addComment = (goalId: string) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: uuidv4(),
      author: currentUser.name,
      text: newComment,
      timestamp: new Date(),
    };

    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        return { ...goal, comments: [...goal.comments, comment] };
      }
      return goal;
    });

    setGoals(updatedGoals);

    if (selectedGoal && selectedGoal.id === goalId) {
      const updatedGoal = updatedGoals.find((g) => g.id === goalId);
      if (updatedGoal) {
        setSelectedGoal(updatedGoal);
      }
    }

    setNewComment('');
  };

  // Delete a goal
  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter((goal) => goal.id !== goalId));
    if (selectedGoal && selectedGoal.id === goalId) {
      setSelectedGoal(null);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <Head>
        <title>Goal Tracker | Dashboard</title>
        <meta name="description" content="Track your personal and team goals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header
        className={`${
          theme === 'dark'
            ? 'bg-gradient-to-r from-blue-900 to-indigo-900'
            : 'bg-gradient-to-r from-blue-600 to-indigo-700'
        } text-white shadow-lg`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
              <h1 className="text-2xl font-bold">GoalTracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search goals..."
                  className={`rounded-full px-4 py-2 pl-10 ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-gray-100 placeholder-gray-400 border border-gray-700'
                      : 'bg-white text-gray-800 placeholder-gray-500 border border-transparent'
                  } focus:outline-none focus:ring-2 focus:ring-white`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 absolute left-3 top-2.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <ThemeToggle />
              <div className="flex items-center space-x-2">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <span className="font-medium">{currentUser.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Goals</h2>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{goals.length}</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Completed Goals</h2>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {goals.filter((goal) => goal.status === 'Completed').length}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">In Progress</h2>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 011.664.235 1 1 0 01-.664 1.889A4 4 0 106 10a1 1 0 11-2 0 6 6 0 016-6zm0 10a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {goals.filter((goal) => goal.status === 'In Progress').length}
            </div>
          </div>
        </div>

        {/* Filter & Add Goal */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4 md:mb-0">
            <select
              className="rounded-lg border border-gray-300 dark:border-gray-700 p-2 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              className="rounded-lg border border-gray-300 dark:border-gray-700 p-2 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center space-x-2 transition-colors"
            onClick={() => setShowAddGoal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Add New Goal</span>
          </button>
        </div>

        {/* Goals List & Detail View */}
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
          {/* Goals List */}
          <div className="lg:w-1/2 space-y-4">
            {filteredGoals.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012 2h2a2 2 0 012-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No goals found</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Try adjusting your filters or add a new goal</p>
              </div>
            ) : (
              filteredGoals.map((goal) => (
                <div
                  key={goal.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 cursor-pointer transition-all hover:shadow-lg ${
                    selectedGoal?.id === goal.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedGoal(goal)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{goal.title}</h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            goal.status === 'Completed'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : goal.status === 'In Progress'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {goal.status}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{goal.description}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Due: {new Date(goal.dueDate).toLocaleDateString('en-US')}
                      </span>
                      <div className="flex -space-x-2 mt-2">
                        {goal.assignedTo.map((userId, index) => {
                          const user = users.find((u) => u.id === userId);
                          return user ? (
                            <img
                              key={index}
                              src={user.avatar}
                              alt={user.name}
                              className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                              title={user.name}
                            />
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{goal.progress}%</span>
                    </div>
                    <ProgressBar percentage={goal.progress} />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Goal Detail */}
          <div className="lg:w-1/2">
            {selectedGoal ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedGoal.title}</h2>
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 mt-2">
                      {selectedGoal.category}
                    </span>
                  </div>
                  <button
                    className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400"
                    onClick={() => deleteGoal(selectedGoal.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6">{selectedGoal.description}</p>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Progress</h3>
                    <div className="flex items-center space-x-1">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={selectedGoal.progress}
                        onChange={(e) => updateGoalProgress(selectedGoal.id, parseInt(e.target.value))}
                        className="range"
                      />
                      <span className="font-medium text-gray-900 dark:text-white">{selectedGoal.progress}%</span>
                    </div>
                  </div>
                  <ProgressBar percentage={selectedGoal.progress} />
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Milestones</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedGoal.milestones.filter((m) => m.completed).length} of {selectedGoal.milestones.length} completed
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {selectedGoal.milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={milestone.completed}
                          onChange={() => toggleMilestoneCompletion(selectedGoal.id, milestone.id)}
                          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <div className="flex-1">
                          <span
                            className={`font-medium ${
                              milestone.completed
                                ? 'line-through text-gray-500 dark:text-gray-400'
                                : 'text-gray-800 dark:text-white'
                            }`}
                          >
                            {milestone.title}
                          </span>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Due: {new Date(milestone.dueDate).toLocaleDateString('en-US')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add New Milestone</h4>
                    <div className="flex flex-col space-y-2">
                      <input
                        type="text"
                        placeholder="Milestone title"
                        className="rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newMilestone.title}
                        onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                      />
                      <input
                        type="date"
                        className="rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newMilestone.dueDate}
                        onChange={(e) => setNewMilestone({ ...newMilestone, dueDate: e.target.value })}
                      />
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors"
                        onClick={() => addMilestone(selectedGoal.id)}
                      >
                        Add Milestone
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Comments</h3>

                  <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
                    {selectedGoal.comments.length === 0 ? (
                      <p className="text-gray-500 dark:text-gray-400 italic text-center py-4">No comments yet</p>
                    ) : (
                      selectedGoal.comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-900 dark:text-white">{comment.author}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {comment.timestamp.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addComment(selectedGoal.id)}
                    />
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors"
                      onClick={() => addComment(selectedGoal.id)}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No goal selected</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Select a goal from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Goal</h2>
              <button
                onClick={() => setShowAddGoal(false)}
                className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white text-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white text-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                    placeholder="e.g., Work, Personal, Health"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newGoal.dueDate}
                    onChange={(e) => setNewGoal({ ...newGoal, dueDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Goal Type</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-600 dark:bg-gray-700"
                      name="goalType"
                      checked={newGoal.isPersonal}
                      onChange={() => setNewGoal({ ...newGoal, isPersonal: true })}
                    />
                    <span className="ml-2 dark:text-gray-300">Personal</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-600 dark:bg-gray-700"
                      name="goalType"
                      checked={!newGoal.isPersonal}
                      onChange={() => setNewGoal({ ...newGoal, isPersonal: false })}
                    />
                    <span className="ml-2 dark:text-gray-300">Team</span>
                  </label>
                </div>
              </div>

              {!newGoal.isPersonal && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assign To</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {users.map((user) => (
                      <label key={user.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="form-checkbox text-blue-600 rounded dark:bg-gray-700"
                          checked={newGoal.assignedTo?.includes(user.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewGoal({
                                ...newGoal,
                                assignedTo: [...(newGoal.assignedTo || []), user.id],
                              });
                            } else {
                              setNewGoal({
                                ...newGoal,
                                assignedTo: newGoal.assignedTo?.filter((id) => id !== user.id) || [],
                              });
                            }
                          }}
                        />
                        <div className="flex items-center space-x-2">
                          <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                          <span className="dark:text-gray-300">{user.name}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-end space-x-3 border-t border-gray-200 dark:border-gray-700">
                <button
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => setShowAddGoal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  onClick={handleAddGoal}
                >
                  Create Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Wrap the main component with ThemeProvider
const GoalTrackerWithTheme: NextPage = () => {
  return (
    <ThemeProvider>
      <GoalTracker />
    </ThemeProvider>
  );
};

// Add Tailwind CSS classes
const tailwindCSS = `
@tailwind base;
@tailwind components;
@tailwind utilities;

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

body {
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
`;

export default GoalTrackerWithTheme;