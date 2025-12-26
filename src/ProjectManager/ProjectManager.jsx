import React, { useState, useEffect } from 'react';

// --- ICONS ---
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);
const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

// --- DEFAULT DATA (12 Items) ---
const defaultProjects = [
  // To-Do
  {
    id: 1,
    title: 'Database Schema Design',
    description:
      'Define MongoDB collections for users, products, and orders with proper relationships.',
    category: 'To-Do',
    date: '28/12/2025',
  },
  {
    id: 2,
    title: 'Authentication Setup',
    description:
      'Implement secure login/signup flows using Firebase Auth or NextAuth.',
    category: 'To-Do',
    date: '29/12/2025',
  },
  {
    id: 3,
    title: 'Dark Mode Toggle',
    description:
      'Add system preference detection and manual toggle for light/dark themes.',
    category: 'To-Do',
    date: '30/12/2025',
  },
  // In Progress
  {
    id: 4,
    title: 'API Integration',
    description:
      'Fetch real-time data using Axios and handle loading states for the dashboard.',
    category: 'In Progress',
    date: '26/12/2025',
  },
  {
    id: 5,
    title: 'Responsive Navbar',
    description:
      'Fix hamburger menu animation and layout issues on mobile devices.',
    category: 'In Progress',
    date: '26/12/2025',
  },
  {
    id: 6,
    title: 'Hero Section Animation',
    description: 'Implement smooth entrance animations using Framer Motion.',
    category: 'In Progress',
    date: '27/12/2025',
  },
  // Revise
  {
    id: 7,
    title: 'Fix Z-Index Issue',
    description:
      'Modal is appearing behind the navbar on specific screens. Need to adjust stacking context.',
    category: 'Revise',
    date: '24/12/2025',
  },
  {
    id: 8,
    title: 'Optimize Images',
    description:
      'Lighthouse score is low due to large PNG files. Convert all assets to WebP format.',
    category: 'Revise',
    date: '23/12/2025',
  },
  {
    id: 9,
    title: 'Refactor Context API',
    description:
      'State management logic is getting messy, need to split global context into smaller parts.',
    category: 'Revise',
    date: '22/12/2025',
  },
  // Done
  {
    id: 10,
    title: 'Initial Project Setup',
    description:
      'Created Vite project, installed Tailwind CSS, and configured ESLint/Prettier.',
    category: 'Done',
    date: '20/12/2025',
  },
  {
    id: 11,
    title: 'Figma UI Design',
    description:
      'Completed all wireframes and high-fidelity prototypes for the application.',
    category: 'Done',
    date: '18/12/2025',
  },
  {
    id: 12,
    title: 'GitHub Repo Setup',
    description:
      'Initialized Git, added .gitignore, and pushed the initial commit to the main branch.',
    category: 'Done',
    date: '15/12/2025',
  },
];

function TaskManager() {
  const categories = ['To-Do', 'In Progress', 'Revise', 'Done'];

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('myTasks');
    return savedTasks ? JSON.parse(savedTasks) : defaultProjects;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    id: null,
    title: '',
    description: '',
    category: 'To-Do',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
  }, [tasks]);

  const openModal = (task = null) => {
    if (task) {
      setCurrentTask(task);
    } else {
      setCurrentTask({
        id: null,
        title: '',
        description: '',
        category: 'To-Do',
      });
    }
    setIsModalOpen(true);
  };

  const saveTask = (e) => {
    e.preventDefault();
    if (!currentTask.title.trim()) return;

    if (currentTask.id) {
      setTasks(tasks.map((t) => (t.id === currentTask.id ? currentTask : t)));
    } else {
      setTasks([
        ...tasks,
        {
          ...currentTask,
          id: Date.now(),
          date: new Date().toLocaleDateString(),
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  // 🔥 CLEAR ALL FUNCTION ADDED
  const deleteAllTasks = () => {
    if (
      window.confirm(
        'Are you sure you want to delete ALL projects? This cannot be undone.'
      )
    ) {
      setTasks([]);
    }
  };

  const handleChange = (e) => {
    setCurrentTask({ ...currentTask, [e.target.name]: e.target.value });
  };

  // --- STYLING HELPERS ---
  const getGlowStyles = (cat) => {
    switch (cat) {
      case 'To-Do':
        return 'hover:border-pink-500/50 hover:shadow-pink-500/20 from-pink-500/10 to-transparent';
      case 'In Progress':
        return 'hover:border-blue-500/50 hover:shadow-blue-500/20 from-blue-500/10 to-transparent';
      case 'Revise':
        return 'hover:border-amber-500/50 hover:shadow-amber-500/20 from-amber-500/10 to-transparent';
      case 'Done':
        return 'hover:border-emerald-500/50 hover:shadow-emerald-500/20 from-emerald-500/10 to-transparent';
      default:
        return 'hover:border-gray-500/50';
    }
  };

  const getBadgeColor = (cat) => {
    switch (cat) {
      case 'To-Do':
        return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'In Progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Revise':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Done':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-gray-100 font-sans relative overflow-x-hidden">
      {/* --- BACKGROUND GLOW EFFECTS --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-20 backdrop-blur-lg bg-[#0F172A]/70 border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Project Board
          </h1>

          <div className="flex w-full md:w-auto items-center gap-3">
            <div className="relative w-full md:w-64 group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 group-focus-within:text-blue-400 transition-colors">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700/50 text-sm rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none placeholder-slate-500 transition-all shadow-inner"
              />
            </div>

            {/* Create Button */}
            <button
              onClick={() => openModal()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              <PlusIcon /> <span className="hidden sm:inline">Create</span>
            </button>

            {/* 🔥 CLEAR ALL BUTTON ADDED */}
            <button
              onClick={deleteAllTasks}
              className="bg-white/5 hover:bg-rose-500/20 text-rose-400 border border-white/10 hover:border-rose-500/50 px-4 py-2.5 rounded-xl flex items-center gap-2 font-semibold shadow-lg transition-all active:scale-95"
              title="Delete All Projects"
            >
              <TrashIcon /> <span className="hidden sm:inline">Clear</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- BOARD CONTENT --- */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const categoryTasks = tasks.filter(
              (t) =>
                t.category === category &&
                t.title.toLowerCase().includes(searchTerm.toLowerCase())
            );

            return (
              <div key={category} className="flex flex-col">
                <div className="flex items-center justify-between mb-4 px-1">
                  <h3 className="font-bold text-slate-300 tracking-wide">
                    {category}
                  </h3>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getBadgeColor(
                      category
                    )}`}
                  >
                    {categoryTasks.length}
                  </span>
                </div>

                <div className="flex-1 space-y-4">
                  {categoryTasks.length === 0 ? (
                    <div className="border-2 border-dashed border-slate-800 rounded-2xl h-32 flex items-center justify-center text-slate-600 text-sm">
                      Empty
                    </div>
                  ) : (
                    categoryTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`group relative p-5 rounded-2xl border border-white/5 bg-slate-800/40 backdrop-blur-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden ${getGlowStyles(
                          category
                        )}`}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${getGlowStyles(
                            category
                          )}`}
                        ></div>

                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-xs text-slate-400 font-medium bg-black/20 px-2 py-1 rounded">
                              {task.date}
                            </span>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-200">
                              <button
                                onClick={() => openModal(task)}
                                className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-white/5 rounded-lg transition"
                              >
                                <EditIcon />
                              </button>
                              <button
                                onClick={() => deleteTask(task.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-white/5 rounded-lg transition"
                              >
                                <TrashIcon />
                              </button>
                            </div>
                          </div>

                          <h4 className="font-bold text-white mb-2 leading-tight">
                            {task.title}
                          </h4>
                          <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4">
                            {task.description}
                          </p>

                          <div className="pt-3 border-t border-white/5">
                            <select
                              value={task.category}
                              onChange={(e) => {
                                const updated = {
                                  ...task,
                                  category: e.target.value,
                                };
                                setTasks(
                                  tasks.map((t) =>
                                    t.id === task.id ? updated : t
                                  )
                                );
                              }}
                              className="w-full bg-black/20 text-xs text-slate-300 rounded-lg px-2 py-1.5 border border-white/5 outline-none focus:border-blue-500/50 cursor-pointer hover:bg-black/30 transition"
                            >
                              {categories.map((cat) => (
                                <option
                                  key={cat}
                                  value={cat}
                                  className="bg-slate-800"
                                >
                                  {cat}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-[#1E293B] border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0F172A]/50">
              <h2 className="text-xl font-bold text-white">
                {currentTask.id ? 'Edit Project' : 'New Project'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition bg-white/5 p-1 rounded-full"
              >
                <CloseIcon />
              </button>
            </div>

            <form onSubmit={saveTask} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={currentTask.title}
                  onChange={handleChange}
                  name="title"
                  className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition placeholder-slate-600"
                  placeholder="e.g. Redesign Homepage"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                  Stage
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {categories.map((cat) => (
                    <div
                      key={cat}
                      onClick={() =>
                        setCurrentTask({ ...currentTask, category: cat })
                      }
                      className={`cursor-pointer text-xs font-bold text-center py-2 rounded-lg border transition-all ${
                        currentTask.category === cat
                          ? getBadgeColor(cat)
                          : 'border-slate-700 text-slate-500 hover:bg-slate-800'
                      }`}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                  Description
                </label>
                <textarea
                  required
                  rows="4"
                  name="description"
                  value={currentTask.description}
                  onChange={handleChange}
                  className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition placeholder-slate-600 resize-none"
                  placeholder="Add details..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition font-semibold shadow-lg shadow-blue-500/20"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskManager;
