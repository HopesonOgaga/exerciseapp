import React, { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */
export const TAGS = ["work", "exercise", "school", "chores", "creativity"];
export const DIFFICULTIES = ["trivial", "easy", "medium", "hard"];

const DIFFICULTY_STYLE = {
  trivial: "bg-stone-100 text-stone-500",
  easy: "bg-emerald-50 text-emerald-600",
  medium: "bg-amber-50 text-amber-600",
  hard: "bg-red-50 text-red-500",
};

/* ------------------------------------------------------------------ */
/* Dates (local time, so "today" matches the user's calendar day)      */
/* ------------------------------------------------------------------ */
const pad = (n) => String(n).padStart(2, "0");

export const dateOf = (offset = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d;
};

export const dayKey = (offset = 0) => {
  const d = dateOf(offset);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const formatDate = (key) =>
  new Date(`${key}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

/** Re-renders when the calendar day changes (even if the tab stays open). */
export function useToday() {
  const [today, setToday] = useState(dayKey());
  useEffect(() => {
    const id = setInterval(() => setToday(dayKey()), 30000);
    return () => clearInterval(id);
  }, []);
  return today;
}

/** Consecutive days ending today (or yesterday, if today isn't done yet). */
export const streakOf = (days = []) => {
  const set = new Set(days);
  let offset = set.has(dayKey(0)) ? 0 : -1;
  let count = 0;
  while (set.has(dayKey(offset))) {
    count++;
    offset--;
  }
  return count;
};

/* ------------------------------------------------------------------ */
/* Persistence                                                         */
/* ------------------------------------------------------------------ */
export function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or blocked: keep working in memory */
    }
  }, [key, value]);

  return [value, setValue];
}

/**
 * Task list with add / patch / animated remove.
 * `patch` accepts an object or a function (current task) => changes.
 */
export function useTaskList(storageKey, extraFields = () => ({})) {
  const [tasks, setTasks] = usePersistentState(storageKey, []);

  const patch = (id, changes) =>
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              ...(typeof changes === "function" ? changes(task) : changes),
            }
          : task,
      ),
    );

  const add = (name) =>
    setTasks((current) => [
      ...current,
      {
        id: Date.now(),
        name,
        note: "",
        difficulty: "medium",
        tags: [],
        date: "",
        timer: emptyTimer,
        ...extraFields(),
      },
    ]);

  // Play the exit animation first, then delete
  const remove = (id) => {
    patch(id, { removing: true });
    setTimeout(
      () => setTasks((current) => current.filter((task) => task.id !== id)),
      250,
    );
  };

  return { tasks, setTasks, patch, add, remove };
}

/* ------------------------------------------------------------------ */
/* Timer: stores timestamps, so it stays accurate across tab switches  */
/* and page refreshes (no setInterval drift).                          */
/* ------------------------------------------------------------------ */
export const emptyTimer = { elapsed: 0, startedAt: null };

export const elapsedMs = (timer, now) =>
  (timer?.elapsed ?? 0) + (timer?.startedAt ? now - timer.startedAt : 0);

export const startTimer = (timer) =>
  timer?.startedAt
    ? timer
    : { elapsed: timer?.elapsed ?? 0, startedAt: Date.now() };

export const pauseTimer = (timer) =>
  timer?.startedAt
    ? { elapsed: timer.elapsed + (Date.now() - timer.startedAt), startedAt: null }
    : timer;

export const formatTime = (ms) => {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
};

function useNow(enabled) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!enabled) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [enabled]);
  return now;
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */
const Icon = ({ children, className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const PlayIcon = () => (
  <Icon>
    <path d="M7 4.5v15l12-7.5z" fill="currentColor" />
  </Icon>
);
export const PauseIcon = () => (
  <Icon>
    <path d="M8 5v14M16 5v14" strokeWidth="3" />
  </Icon>
);
export const ResetIcon = () => (
  <Icon>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 3v5h5" />
  </Icon>
);
export const TrashIcon = () => (
  <Icon>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
  </Icon>
);

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */
export function CardShell({ title, count, children }) {
  return (
    <section className="w-full min-w-0 animate-fade-in rounded-2xl bg-stone-100 p-3 sm:p-4">
      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
        <header className="flex items-center gap-3 px-5 pt-5">
          <h2 className="text-lg font-semibold capitalize">{title}</h2>
          <span
            key={count}
            className="animate-bump grid h-7 min-w-[1.75rem] place-items-center rounded-full bg-brand-primary px-2 text-xs font-semibold text-white"
          >
            {count}
          </span>
        </header>
        {children}
      </div>
    </section>
  );
}

export function AddInput({ placeholder, onAdd }) {
  const [value, setValue] = useState("");

  const submit = () => {
    const name = value.trim();
    if (!name) return;
    onAdd(name);
    setValue("");
  };

  return (
    <div className="px-5 pt-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          className="h-10 min-w-0 flex-1 rounded-lg border-2 border-brand-accent/60 px-3 text-sm transition placeholder:text-stone-400 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/30"
        />
        <button
          type="button"
          onClick={submit}
          disabled={!value.trim()}
          aria-label="Add"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-primary text-xl text-white transition hover:brightness-110 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>
      </div>
      <p className="mt-2 text-xs text-stone-400">Press Enter to add</p>
    </div>
  );
}

export function EmptyState({ children }) {
  return (
    <p className="animate-fade-in rounded-xl border border-dashed border-stone-200 py-8 text-center text-sm text-stone-400">
      {children}
    </p>
  );
}

export function ProgressBar({ done, total }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="px-5 pt-4">
      <div className="mb-1.5 flex justify-between text-xs text-stone-500">
        <span>
          {done} of {total} done
        </span>
        <span className="tabular-nums">{pct}%</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-stone-100"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-brand-primary transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function CheckCircle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-all duration-300 active:scale-90 ${
        checked
          ? "border-brand-primary bg-brand-primary"
          : "border-stone-300 hover:border-brand-accent"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path
          d="M5 12.5l4.5 4.5L19 7"
          style={{
            strokeDasharray: 24,
            strokeDashoffset: checked ? 0 : 24,
            transition: "stroke-dashoffset 300ms ease-out 80ms",
          }}
        />
      </svg>
    </button>
  );
}

export function TaskTimer({ timer, onChange, disabled }) {
  const running = Boolean(timer?.startedAt);
  const now = useNow(running);
  const ms = elapsedMs(timer, now);

  if (disabled && ms === 0) return null;

  const stop = (handler) => (e) => {
    e.stopPropagation();
    handler();
  };

  return (
    <div className="flex items-center gap-1.5">
      {!disabled && (
        <button
          type="button"
          onClick={stop(() => onChange(running ? pauseTimer(timer) : startTimer(timer)))}
          aria-label={running ? "Pause timer" : "Start timer"}
          className={`grid h-7 w-7 place-items-center rounded-full transition active:scale-90 ${
            running
              ? "bg-brand-primary text-white"
              : "bg-stone-100 text-stone-500 hover:bg-brand-accent/30"
          }`}
        >
          {running ? <PauseIcon /> : <PlayIcon />}
        </button>
      )}

      <span
        className={`font-mono text-xs tabular-nums transition-colors ${
          running ? "font-semibold text-brand-primary" : "text-stone-400"
        }`}
      >
        {formatTime(ms)}
      </span>

      {running && (
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary" />
        </span>
      )}

      {!disabled && !running && ms > 0 && (
        <button
          type="button"
          onClick={stop(() => onChange(emptyTimer))}
          aria-label="Reset timer"
          className="text-stone-300 transition hover:text-stone-500"
        >
          <ResetIcon />
        </button>
      )}
    </div>
  );
}

/** One row used by both Dailies and Todos. */
export function TaskRow({
  task,
  completed,
  streak = 0,
  today,
  onToggle,
  onOpen,
  onRemove,
  onTimer,
}) {
  const overdue = !completed && task.date && task.date < today;

  return (
    <li
      className={`group flex items-center gap-3 rounded-xl border border-stone-100 p-3 shadow-sm transition-all duration-300 hover:shadow-md ${
        completed ? "bg-stone-50" : "bg-white"
      } ${task.removing ? "animate-pop-out" : "animate-pop-in"}`}
    >
      <CheckCircle
        checked={completed}
        onChange={onToggle}
        label={`Mark "${task.name}" ${completed ? "not done" : "done"}`}
      />

      <div
        role="button"
        tabIndex={completed ? -1 : 0}
        onClick={() => !completed && onOpen()}
        onKeyDown={(e) => e.key === "Enter" && !completed && onOpen()}
        title={completed ? undefined : "Click to edit"}
        className={`min-w-0 flex-1 ${completed ? "" : "cursor-pointer"}`}
      >
        <p
          className={`break-words text-sm font-medium capitalize transition-colors duration-300 ${
            completed ? "text-stone-400 line-through" : "text-stone-800"
          }`}
        >
          {task.name}
        </p>

        {!completed && (
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] capitalize ${
                DIFFICULTY_STYLE[task.difficulty] ?? DIFFICULTY_STYLE.medium
              }`}
            >
              {task.difficulty}
            </span>
            {task.date && (
              <span
                className={`text-[10px] ${
                  overdue ? "font-semibold text-red-500" : "text-stone-400"
                }`}
              >
                {overdue ? "Overdue · " : "Due "}
                {formatDate(task.date)}
              </span>
            )}
            {streak > 0 && (
              <span className="rounded-full bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-600">
                🔥 {streak} day{streak > 1 ? "s" : ""}
              </span>
            )}
            {task.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-brand-accent/30 px-1.5 py-0.5 text-[10px] capitalize text-stone-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {!completed && task.note && (
          <p className="mt-1 line-clamp-1 text-xs text-stone-400">{task.note}</p>
        )}
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1">
        <TaskTimer timer={task.timer} onChange={onTimer} disabled={completed} />
      </div>

      <button
        type="button"
        onClick={onRemove}
        aria-label={`Delete "${task.name}"`}
        className="shrink-0 text-stone-300 transition hover:text-red-500 focus:opacity-100 md:opacity-0 md:group-hover:opacity-100"
      >
        <TrashIcon />
      </button>
    </li>
  );
}

/** Edit dialog shared by Dailies and Todos. Owns its own form state. */
export function TaskModal({ task, label, onSave, onDelete, onClose }) {
  const [title, setTitle] = useState(task.name);
  const [note, setNote] = useState(task.note || "");
  const [difficulty, setDifficulty] = useState(task.difficulty || "medium");
  const [date, setDate] = useState(task.date || "");
  const [tags, setTags] = useState(task.tags || []);
  const [closing, setClosing] = useState(false);

  const close = () => {
    setClosing(true);
    setTimeout(onClose, 180);
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTag = (tag) =>
    setTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    );

  const submit = (e) => {
    e.preventDefault();
    onSave({
      name: title.trim() || task.name,
      note,
      difficulty,
      date,
      tags,
    });
    close();
  };

  const remove = () => {
    onDelete();
    onClose();
  };

  return (
    <div
      onMouseDown={(e) => e.target === e.currentTarget && close()}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity duration-200 ${
        closing ? "opacity-0" : "animate-fade-in"
      }`}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onSubmit={submit}
        className={`max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl transition-all duration-200 ${
          closing ? "scale-95 opacity-0" : "animate-modal-in"
        }`}
      >
        {/* Title + note */}
        <div className="flex flex-col gap-5 bg-brand-primary p-5">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold capitalize text-brand-accent">
              {label}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={close}
                className="capitalize text-brand-accent hover:underline"
              >
                cancel
              </button>
              <button
                type="submit"
                className="h-10 rounded-md bg-white px-5 font-medium text-black transition hover:bg-stone-100 active:scale-95"
              >
                Save
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="task-title" className="text-sm font-semibold text-brand-accent">
              Title
            </label>
            <input
              id="task-title"
              type="text"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-10 rounded-sm bg-brand-accent/75 px-3 text-black shadow outline-none placeholder:text-stone-500 focus:ring-2 focus:ring-white/40"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="task-note" className="text-sm font-semibold text-brand-accent">
              Note
            </label>
            <textarea
              id="task-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note..."
              className="min-h-20 resize-none rounded-sm bg-brand-accent/75 p-3 text-black shadow outline-none placeholder:text-stone-500 focus:ring-2 focus:ring-white/40"
            />
          </div>
        </div>

        {/* Difficulty */}
        <div className="border-b border-stone-100 p-5">
          <p className="mb-2 text-lg font-medium">Difficulty</p>
          <div className="grid grid-cols-4 gap-2">
            {DIFFICULTIES.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setDifficulty(level)}
                aria-pressed={difficulty === level}
                className={`rounded-md py-2 text-sm capitalize transition active:scale-95 ${
                  difficulty === level
                    ? "bg-brand-primary text-brand-accent shadow-sm"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Date */}
        <div className="border-b border-stone-100 p-5">
          <label htmlFor="task-date" className="mb-2 block text-lg font-medium">
            Due date
          </label>
          <input
            id="task-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-10 w-full cursor-pointer rounded-sm px-3 text-stone-500 shadow-sm outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
        </div>

        {/* Tags */}
        <div className="border-b border-stone-100 p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-lg font-medium">Tags</p>
            {tags.length > 0 && (
              <p className="text-xs text-stone-400">{tags.length} selected</p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                aria-pressed={tags.includes(tag)}
                className={`rounded-md px-4 py-2 text-sm capitalize transition active:scale-95 ${
                  tags.includes(tag)
                    ? "bg-brand-primary text-brand-accent shadow-sm"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5">
          <button
            type="button"
            onClick={remove}
            className="text-sm text-red-500 transition hover:underline"
          >
            Delete this task
          </button>
        </div>
      </form>
    </div>
  );
}