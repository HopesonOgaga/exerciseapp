
import React, { useState } from "react";

export const DailyHabitCard = () => {
  const [textHidden, setTextHidden] = useState(false);
  const [newHabit, setNewHabit] = useState("");

  const [habits, setHabits] = useState([]);

  // Add new habit
  const addHabit = (e) => {
    if (e.key === "Enter") {
      const habitName = newHabit.trim();

      // Don't add empty habits
      if (!habitName) return;

      const habit = {
        id: Date.now(),
        name: habitName,
        completed: false,
      };

      setHabits((currentHabits) => [...currentHabits, habit]);

      // Clear input
      setNewHabit("");
    }
  };

  // Mark habit as completed
  const completeHabit = (id) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === id
          ? { ...habit, completed: true }
          : habit
      )
    );
  };

  // Mark habit as not completed
  const uncompleteHabit = (id) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === id
          ? { ...habit, completed: false }
          : habit
      )
    );
  };

  // Remove habit
  const removeHabit = (id) => {
    setHabits((currentHabits) =>
      currentHabits.filter((habit) => habit.id !== id)
    );
  };

  return (
    <section className="p-4">
      <div className="bg-stone-100 w-[30vw] rounded-md min-h-[70vh] flex justify-center items-center">
        
        <div className="w-[25vw] shadow-md rounded-md h-[65vh] bg-white">

          {/* Header */}
          <div className="flex gap-4 items-center p-4">
            <p className="capitalize font-semibold text-lg">
               Daily
            </p>

            <p className="text-sm bg-brand-primary/80 w-8 h-8 text-center text-white font-semibold rounded-full flex items-center justify-center">
              {habits.length}
            </p>
          </div>

          {/* Add habit input */}
          <div>
            <input
              type="text"
              placeholder="add new habit"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              onKeyDown={addHabit}
              className="w-[90%] h-[5vh] rounded-sm border-2 border-brand-accent/80 p-2 m-4 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
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
                className="flex w-full h-[15vh] overflow-hidden rounded-md shadow-md"
              >

                {/* Completed */}
                <div className="flex items-center justify-center w-[3vw] shrink-0 bg-brand-primary/80 text-white rounded-l-md">
                  <button
                    onClick={() => completeHabit(habit.id)}
                    className="bg-brand-primary w-10 rounded-full h-10 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Habit name */}
                <div
                  className="flex items-center p-2 flex-1 px-4"
                  onDoubleClick={() => removeHabit(habit.id)}
                  title="Double click to remove"
                >
                  <p
                    className={`text-sm capitalize ${
                      habit.completed
                        ? "line-through text-stone-400"
                        : ""
                    }`}
                  >
                    {habit.name}
                  </p>
                </div>

                {/* Not completed */}
                <div className="flex items-center justify-center w-[3vw] shrink-0 bg-brand-primary/80 text-white rounded-r-md">
                  <button
                    onClick={() => uncompleteHabit(habit.id)}
                    className="bg-brand-primary w-10 rounded-full h-10 cursor-pointer"
                  >
                    -
                  </button>
                </div>

              </div>
            ))}

          </section>
        </div>
      </div>
    </section>
  );
};

