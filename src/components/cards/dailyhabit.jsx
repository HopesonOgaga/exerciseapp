import React, { useEffect, useState } from "react";
import {
  AddInput,
  CardShell,
  EmptyState,
  ProgressBar,
  TaskModal,
  TaskRow,
  dateOf,
  dayKey,
  emptyTimer,
  pauseTimer,
  streakOf,
  usePersistentState,
  useTaskList,
  useToday,
} from "./shared";

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

/** Daily check-in: one tap per day, with a 7-day strip and a streak. */
function CheckIn({ checkIns, today, done, total, onCheckIn }) {
  const checkedIn = checkIns.includes(today);
  const streak = streakOf(checkIns);

  const week = Array.from({ length: 7 }, (_, i) => {
    const offset = i - 6;
    return {
      key: dayKey(offset),
      label: dateOf(offset).toLocaleDateString(undefined, { weekday: "narrow" }),
      isToday: offset === 0,
    };
  });

  return (
    <div className="mx-5 mt-4 overflow-hidden rounded-xl bg-brand-primary p-4 text-white shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-brand-accent">
            {checkedIn ? "You're checked in" : `${greeting()}`}
          </p>
          <p className="mt-0.5 text-xs text-white/70">
            {total === 0
              ? "Add a daily to get started"
              : `${done} of ${total} dailies done today`}
          </p>
        </div>

        <div className="text-right">
          <p
            key={streak}
            className="animate-bump text-2xl font-semibold leading-none tabular-nums"
          >
            🔥 {streak}
          </p>
          <p className="mt-1 text-xs text-white/70">
            day{streak === 1 ? "" : "s"} in a row
          </p>
        </div>
      </div>

      {/* Last 7 days */}
      <div className="mt-4 flex justify-between" aria-label="Check-ins this week">
        {week.map(({ key, label, isToday }) => {
          const checked = checkIns.includes(key);
          return (
            <div key={key} className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-white/60">{label}</span>
              <span
                className={`grid h-7 w-7 place-items-center rounded-full text-xs transition-all duration-300 ${
                  checked
                    ? "scale-100 bg-white text-brand-primary"
                    : isToday
                      ? "bg-white/10 ring-2 ring-white/60"
                      : "bg-white/10"
                }`}
              >
                {checked ? "✓" : ""}
              </span>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onCheckIn}
        disabled={checkedIn}
        className={`mt-4 h-10 w-full rounded-lg text-sm font-medium transition-all duration-200 ${
          checkedIn
            ? "cursor-default bg-white/15 text-white/80"
            : "bg-white text-brand-primary hover:scale-[1.01] active:scale-95"
        }`}
      >
        {checkedIn ? "Checked in for today" : "Check in for today"}
      </button>
    </div>
  );
}

export const DailyHabitCard = () => {
  const today = useToday();
  const { tasks, setTasks, patch, add, remove } = useTaskList("dailies", () => ({
    history: [], // list of day keys this daily was completed
  }));
  const [checkIns, setCheckIns] = usePersistentState("dailies-checkins", []);
  const [timerDay, setTimerDay] = usePersistentState("dailies-timer-day", today);
  const [editingId, setEditingId] = useState(null);

  // Timers on dailies measure "time today": reset them when the day changes
  useEffect(() => {
    if (timerDay !== today) {
      setTimerDay(today);
      setTasks((current) =>
        current.map((task) => ({ ...task, timer: emptyTimer })),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [today]);

  const isDone = (task) => task.history.includes(today);
  const editing = tasks.find((task) => task.id === editingId);
  const done = tasks.filter(isDone).length;

  // A daily is "done" if today's date is in its history, so it
  // un-checks itself automatically the next day.
  const toggle = (id) =>
    patch(id, (task) =>
      task.history.includes(today)
        ? { history: task.history.filter((day) => day !== today) }
        : {
            history: [...task.history, today],
            timer: pauseTimer(task.timer),
          },
    );

  const checkIn = () =>
    setCheckIns((current) =>
      current.includes(today) ? current : [...current, today],
    );

  return (
    <CardShell title="Dailies" count={tasks.length}>
      <CheckIn
        checkIns={checkIns}
        today={today}
        done={done}
        total={tasks.length}
        onCheckIn={checkIn}
      />

      <AddInput placeholder="Add a daily habit" onAdd={add} />

      {tasks.length > 0 && <ProgressBar done={done} total={tasks.length} />}

      <ul className="space-y-3 p-5">
        {tasks.length === 0 && (
          <EmptyState>
            No dailies yet. Add one you want to repeat every day.
          </EmptyState>
        )}

        {tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            today={today}
            completed={isDone(task)}
            streak={streakOf(task.history)}
            onToggle={() => toggle(task.id)}
            onOpen={() => setEditingId(task.id)}
            onRemove={() => remove(task.id)}
            onTimer={(timer) => patch(task.id, { timer })}
          />
        ))}
      </ul>

      {editing && (
        <TaskModal
          key={editing.id}
          task={editing}
          label="Edit daily habit"
          onSave={(changes) => patch(editing.id, changes)}
          onDelete={() => remove(editing.id)}
          onClose={() => setEditingId(null)}
        />
      )}
    </CardShell>
  );
};