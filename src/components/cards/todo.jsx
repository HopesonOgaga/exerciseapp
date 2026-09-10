import React, { useState } from "react";

export const TodoCard = () => {
  const [textHidden, setTextHidden] = useState(false);
  const [newHabit, setNewHabit] = useState("");
  const [habits, setHabits] = useState([]);

  // Modal / Form States
  const [activeTask, setActiveTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editNote, setEditNote] = useState("");
  const [editDifficulty, setEditDifficulty] = useState("medium");
  const [selectedTags, setSelectedTags] = useState([]);
  const [date, setDate] = useState("");

  // Add new habit
  const addHabit = (e) => {
    if (e.key === "Enter") {
      const habitName = newHabit.trim();
      if (!habitName) return;

      const habit = {
        id: Date.now(),
        name: habitName,
        completed: false,
        note: "",
        difficulty: "medium",
        tags: [],
        date: "",
      };

      setHabits((currentHabits) => [...currentHabits, habit]);
      setNewHabit("");
    }
  };

  const tags = ["work", "exercise", "school", "chores", "creativity"];

  const toggleTag = (tag) => {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((item) => item !== tag)
        : [...currentTags, tag]
    );
  };

  // Toggle completed
  const toggleHabit = (id) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  // Remove habit
  const removeHabit = (id) => {
    setHabits((currentHabits) =>
      currentHabits.filter((habit) => habit.id !== id)
    );
  };

  // Open modal and prefill inputs with selected task's existing data
  const handleTaskClick = (habit) => {
    if (habit.completed) return; // Prevent editing completed tasks
    setActiveTask(habit);
    setEditTitle(habit.name || "");
    setEditNote(habit.note || "");
    setEditDifficulty(habit.difficulty || "medium");
    setDate(habit.date || "");
    setSelectedTags(habit.tags || []);
  };

  // Close modal
  const closeModal = () => {
    setActiveTask(null);
  };

  // Save changes and update original task in state
  const saveTask = () => {
    if (!activeTask) return;

    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === activeTask.id
          ? {
              ...habit,
              name: editTitle,
              note: editNote,
              difficulty: editDifficulty,
              date: date,
              tags: selectedTags,
            }
          : habit
      )
    );

    closeModal();
  };

  return (
    <section className="p-4">
      <div className="bg-stone-100 w-[30vw] rounded-md min-h-[70vh] flex justify-center items-start py-6">
        <div className="w-[25vw] shadow-md rounded-md bg-white overflow-hidden">
          {/* Header */}
          <div className="flex gap-4 items-center p-4">
            <p className="capitalize font-semibold text-lg">Todo's</p>
            <p className="text-sm bg-brand-primary/80 w-8 h-8 text-center text-white font-semibold rounded-full flex items-center justify-center">
              {habits.length}
            </p>
          </div>

          {/* Add habit input */}
          <div>
            <input
              type="text"
              placeholder="add todo's"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              onKeyDown={addHabit}
              className="placeholder:capitalize placeholder:text-sm w-[90%] h-[5vh] rounded-sm border-2 border-brand-accent/80 p-2 m-4 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
              onFocus={() => setTextHidden(true)}
              onBlur={() => setTextHidden(false)}
            />

            {!textHidden && (
              <p className="text-center text-stone-400 text-sm capitalize">
                tip to add multiple habits
              </p>
            )}
          </div>

          {/* Habits */}
          <section className="p-4 space-y-3">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="flex w-full min-h-[15vh] overflow-hidden rounded-md shadow-md"
              >
                {/* Completed */}
                <div
                  className={`flex items-center justify-center w-[3vw] shrink-0 text-white rounded-l-md transition-colors duration-200 ${
                    habit.completed ? "bg-stone-400" : "bg-brand-primary/80"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={habit.completed}
                    onChange={() => toggleHabit(habit.id)}
                    className="w-6 h-6 m-1.5 p-0 shadow-md appearance-none bg-brand-accent/70 rounded-sm outline-none transition-all duration-200 checked:bg-stone-500"
                  />
                </div>

                {/* Habit name & Info */}
                <div
                  className="flex flex-col justify-center p-2 flex-1 px-4 min-w-0 cursor-pointer"
                  onClick={() => handleTaskClick(habit)}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    removeHabit(habit.id);
                  }}
                  title="Click to edit task | Double click to remove"
                >
                  <p
                    className={`text-sm capitalize break-words ${
                      habit.completed ? "line-through text-stone-400" : ""
                    }`}
                  >
                    {habit.name}
                  </p>

                  {/* Display Updated Details on Original Card */}
                  {!habit.completed && (
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      {habit.date && (
                        <span className="text-[10px] text-stone-400">
                          📅 {habit.date}
                        </span>
                      )}
                      {habit.difficulty && (
                        <span className="text-[10px] capitalize bg-stone-200 px-1.5 py-0.5 rounded text-stone-600">
                          {habit.difficulty}
                        </span>
                      )}
                      {habit.tags?.length > 0 && (
                        <div className="flex gap-1 flex-wrap">
                          {habit.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] bg-brand-accent/30 text-stone-600 px-1.5 py-0.5 rounded-full capitalize"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* Modal Popup Overlay */}
      {activeTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <section className="w-full max-w-lg bg-white rounded-md shadow-xl overflow-hidden">
            {/* Header + title/note */}
            <div className="bg-brand-primary w-full p-5 rounded-t-sm flex flex-col gap-6">
              {/* Header top */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-brand-accent font-semibold capitalize text-lg">
                    edit to do
                  </p>
                </div>
                <div className="gap-3 flex items-center">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-brand-accent capitalize hover:underline cursor-pointer"
                  >
                    cancel
                  </button>
                  <button
                    type="button"
                    onClick={saveTask}
                    className="w-20 h-10 rounded-md bg-white text-black capitalize cursor-pointer hover:bg-stone-100 transition font-medium"
                  >
                    save
                  </button>
                </div>
              </div>

              {/* Title + Note */}
              <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                {/* Title */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="title"
                    className="text-brand-accent font-semibold capitalize text-sm"
                  >
                    title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Enter task title"
                    className="w-full h-10 border-none outline-none bg-brand-accent/75 rounded-sm shadow px-3 text-black placeholder:text-stone-500 focus:ring-2 focus:ring-white/40"
                  />
                </div>

                {/* Note */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="note"
                    className="text-brand-accent font-semibold capitalize text-sm"
                  >
                    note
                  </label>
                  <textarea
                    id="note"
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                    placeholder="Add a note..."
                    className="w-full min-h-20 resize-none border-none outline-none bg-brand-accent/75 rounded-sm shadow p-3 text-black placeholder:text-stone-500 focus:ring-2 focus:ring-white/40"
                  />
                </div>
              </form>
            </div>

            {/* Difficulty */}
            <div className="p-5 border-b border-stone-100">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="difficulty"
                  className="text-lg capitalize font-medium"
                >
                  difficulty
                </label>
                <select
                  id="difficulty"
                  value={editDifficulty}
                  onChange={(e) => setEditDifficulty(e.target.value)}
                  className="capitalize text-stone-500 border-none outline-none h-10 w-full shadow-sm rounded-sm px-3 bg-white focus:ring-2 focus:ring-brand-primary/30"
                >
                  <option value="easy">easy</option>
                  <option value="trivia">trivia</option>
                  <option value="medium">medium</option>
                  <option value="hard">hard</option>
                </select>
              </div>
            </div>

            {/* Date */}
            <div className="p-5 border-b border-stone-100">
              <div className="flex flex-col gap-2">
                <label htmlFor="date" className="text-lg capitalize font-medium">
                  date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-10 border-none outline-none shadow-sm rounded-sm px-3 text-stone-500 bg-white focus:ring-2 focus:ring-brand-primary/30 cursor-pointer"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="p-5">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="text-lg capitalize font-medium">
                    tags
                  </label>
                  {selectedTags.length > 0 && (
                    <p className="text-xs text-stone-400">
                      {selectedTags.length} selected
                    </p>
                  )}
                </div>

                {/* Tag options */}
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => {
                    const selected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-4 py-2 rounded-md capitalize text-sm cursor-pointer transition ${
                          selected
                            ? "bg-brand-primary text-brand-accent shadow-sm"
                            : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </section>
  );
};