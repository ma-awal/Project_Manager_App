import React, { useState, useEffect } from 'react';

// আইকন কম্পোনেন্টস (যাতে আলাদা লাইব্রেরি ইন্সটল না করতে হয়)
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

function TaskManager() {
  // --- স্টেটস (State) ---
  const categories = ['To-Do', 'In Progress', 'Revise', 'Done'];

  // ১. লোকাল স্টোরেজ থেকে ডাটা লোড করা
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('myTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    id: null,
    title: '',
    description: '',
    category: 'To-Do',
  });
  const [searchTerm, setSearchTerm] = useState('');

  // ২. টাস্ক পরিবর্তন হলে লোকাল স্টোরেজে সেভ করা
  useEffect(() => {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
  }, [tasks]);

  // --- ফাংশনস (Functions) ---

  // মডাল ওপেন করা (এডিট বা নতুন অ্যাড করার জন্য)
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

  // টাস্ক সেভ করা (Add or Edit)
  const saveTask = (e) => {
    e.preventDefault();
    if (!currentTask.title.trim()) return;

    if (currentTask.id) {
      // এডিট মোড
      setTasks(tasks.map((t) => (t.id === currentTask.id ? currentTask : t)));
    } else {
      // নতুন টাস্ক
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

  // টাস্ক ডিলিট করা
  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  // ড্রপডাউন চেঞ্জ হ্যান্ডলার
  const handleChange = (e) => {
    setCurrentTask({ ...currentTask, [e.target.name]: e.target.value });
  };

  // --- কালার ম্যাপ (ডিজাইনের জন্য) ---
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'To-Do':
        return 'bg-pink-500';
      case 'In Progress':
        return 'bg-blue-500';
      case 'Revise':
        return 'bg-yellow-500';
      case 'Done':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {/* --- হেডার --- */}
      <header className="bg-gray-800 shadow-md border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Project Board
          </h1>

          <div className="flex w-full md:w-auto items-center gap-3">
            <div className="relative w-full md:w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 text-white border-none rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
              />
            </div>
            <button
              onClick={() => openModal()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-lg"
            >
              <PlusIcon /> <span className="hidden sm:inline">New Task</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- মেইন কন্টেন্ট (বোর্ড) --- */}
      <main className="container mx-auto px-4 py-8">
        {/* রেস্পন্সিভ গ্রিড: মোবাইলে ১, ট্যাবে ২, পিসিতে ৪ কলাম */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            // ফিল্টারিং লজিক
            const categoryTasks = tasks.filter(
              (t) =>
                t.category === category &&
                t.title.toLowerCase().includes(searchTerm.toLowerCase())
            );

            return (
              <div
                key={category}
                className="flex flex-col bg-gray-800/50 rounded-xl p-4 border border-gray-700 h-fit"
              >
                {/* ক্যাটাগরি টাইটেল */}
                <div
                  className={`flex items-center justify-between mb-4 pb-2 border-b border-gray-700 ${getCategoryColor(
                    category
                  )} bg-opacity-10 px-2 py-1 rounded`}
                >
                  <h3 className="font-semibold text-lg">{category}</h3>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full text-white ${getCategoryColor(
                      category
                    )}`}
                  >
                    {categoryTasks.length}
                  </span>
                </div>

                {/* টাস্ক লিস্ট */}
                <div className="space-y-3">
                  {categoryTasks.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">
                      No tasks here
                    </p>
                  ) : (
                    categoryTasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-gray-700 p-4 rounded-lg shadow hover:bg-gray-600 transition group border-l-4 border-l-transparent hover:border-l-blue-400"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-white">
                            {task.title}
                          </h4>
                          <span className="text-xs text-gray-400">
                            {task.date}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                          {task.description}
                        </p>

                        <div className="flex justify-between items-center border-t border-gray-600 pt-3">
                          {/* ক্যাটাগরি পরিবর্তন শর্টকাট (মোবাইল ফ্রেন্ডলি) */}
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
                            className="bg-gray-800 text-xs text-gray-300 rounded px-2 py-1 border border-gray-600 outline-none focus:border-blue-500 cursor-pointer"
                          >
                            {categories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>

                          <div className="flex gap-2">
                            <button
                              onClick={() => openModal(task)}
                              className="text-yellow-400 hover:bg-gray-800 p-1.5 rounded transition"
                            >
                              <EditIcon />
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="text-red-400 hover:bg-gray-800 p-1.5 rounded transition"
                            >
                              <TrashIcon />
                            </button>
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

      {/* --- মডাল (Popup Form) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700 animate-fadeIn">
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">
                {currentTask.id ? 'Edit Task' : 'Create New Task'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <CloseIcon />
              </button>
            </div>

            <form onSubmit={saveTask} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={currentTask.title}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border-gray-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none border"
                  placeholder="e.g., Fix Navigation Bug"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={currentTask.category}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border-gray-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none border"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  value={currentTask.description}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border-gray-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none border resize-none"
                  placeholder="Task details..."
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2.5 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition"
                >
                  {currentTask.id ? 'Update Task' : 'Add Task'}
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
