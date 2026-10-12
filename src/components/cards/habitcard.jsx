import React from "react";
import {
  AddInput,
  CardShell,
  EmptyState,
  TrashIcon,
  useTaskList,
  useToday,
} from "./shared";

export const HabitCard = () => {
  const today = useToday();
  const { tasks: habits, patch, add, remove } = useTaskList("habits", () => ({
    score: 0, // all-time: + adds one, - removes one
    log: {}, // { "2026-10-12": { up: 2, down: 0 } }
  }));

  const tally = (habit) => habit.log?.[today] ?? { up: 0, down: 0 };

  const vote = (id, kind) =>
    patch(id, (habit) => {
      const day = habit.log?.[today] ?? { up: 0, down: 0 };
      return {
        score: habit.score + (kind === "up" ? 1 : -1),
        log: { ...habit.log, [today]: { ...day, [kind]: day[kind] + 1 } },
      };
    });

  const totalUp = habits.reduce((sum, habit) => sum + tally(habit).up, 0);
  const totalDown = habits.reduce((sum, habit) => sum + tally(habit).down, 0);

  return (
    <CardShell title="Habits" count={habits.length}>
      <AddInput placeholder="Add a new habit" onAdd={add} />

      {habits.length > 0 && (
        <p className="px-5 pt-4 text-xs text-stone-500">
          Today:{" "}
          <span key={totalUp} className="animate-bump inline-block font-semibold text-brand-primary">
            +{totalUp}
          </span>{" "}
          <span key={`d${totalDown}`} className="animate-bump inline-block font-semibold text-red-500">
            −{totalDown}
          </span>
        </p>
      )}

      <ul className="space-y-3 p-5">
        {habits.length === 0 && (
          <EmptyState>
            No habits yet. Add one, then tap + each time you do it.
          </EmptyState>
        )}

        {habits.map((habit) => {
          const { up, down } = tally(habit);
          return (
            <li
              key={habit.id}
              className={`group flex items-stretch overflow-hidden rounded-xl border border-stone-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md ${
                habit.removing ? "animate-pop-out" : "animate-pop-in"
              }`}
            >
              <button
                type="button"
                onClick={() => vote(habit.id, "up")}
                aria-label={`Log "${habit.name}" as done`}
                className="grid w-12 shrink-0 place-items-center bg-brand-primary text-xl text-white transition hover:brightness-110 active:scale-90 active:brightness-90"
              >
                +
              </button>

              <div className="min-w-0 flex-1 px-4 py-3">
                <p className="break-words text-sm font-medium capitalize text-stone-800">
                  {habit.name}
                </p>
                <div className="mt-1 flex items-center gap-2 text-[10px]">
                  <span
                    key={`u${up}`}
                    className={`animate-bump rounded-full px-1.5 py-0.5 font-medium ${
                      up > 0
                        ? "bg-brand-accent/30 text-stone-700"
                        : "bg-stone-100 text-stone-400"
                    }`}
                  >
                    +{up} today
                  </span>
                  {down > 0 && (
                    <span
                      key={`d${down}`}
                      className="animate-bump rounded-full bg-red-50 px-1.5 py-0.5 font-medium text-red-500"
                    >
                      −{down} today
                    </span>
                  )}
                  <span className="text-stone-400">Score {habit.score}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => remove(habit.id)}
                aria-label={`Delete "${habit.name}"`}
                className="self-center pr-2 text-stone-300 transition hover:text-red-500 focus:opacity-100 md:opacity-0 md:group-hover:opacity-100"
              >
                <TrashIcon />
              </button>

              <button
                type="button"
                onClick={() => vote(habit.id, "down")}
                aria-label={`Log "${habit.name}" as missed`}
                className="grid w-12 shrink-0 place-items-center bg-stone-100 text-xl text-stone-500 transition hover:bg-red-100 hover:text-red-500 active:scale-90"
              >
                −
              </button>
            </li>
          );
        })}
      </ul>
    </CardShell>
  );
};