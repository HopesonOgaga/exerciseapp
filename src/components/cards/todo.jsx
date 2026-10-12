import React, { useState } from "react";
import {
  AddInput,
  CardShell,
  EmptyState,
  ProgressBar,
  TaskModal,
  TaskRow,
  pauseTimer,
  useTaskList,
  useToday,
} from "./shared";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "done", label: "Done" },
];

export const TodoCard = () => {
  const today = useToday();
  const { tasks, patch, add, remove } = useTaskList("todos", () => ({
    completed: false,
  }));
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);

  const editing = tasks.find((task) => task.id === editingId);
  const done = tasks.filter((task) => task.completed).length;

  const visible = tasks.filter((task) =>
    filter === "all" ? true : filter === "done" ? task.completed : !task.completed,
  );

  // Completing a task also stops its timer
  const toggle = (id) =>
    patch(id, (task) => ({
      completed: !task.completed,
      timer: pauseTimer(task.timer),
    }));

  return (
    <CardShell title="Todo's" count={tasks.length}>
      <AddInput placeholder="Add a todo" onAdd={add} />

      {tasks.length > 0 && <ProgressBar done={done} total={tasks.length} />}

      {/* Filter tabs */}
      <div className="px-5 pt-4">
        <div className="grid grid-cols-3 rounded-lg bg-stone-100 p-1" role="tablist">
          {FILTERS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={filter === id}
              onClick={() => setFilter(id)}
              className={`rounded-md py-1.5 text-sm transition-all duration-200 ${
                filter === id
                  ? "bg-white font-medium shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <ul className="space-y-3 p-5">
        {visible.length === 0 && (
          <EmptyState>
            {tasks.length === 0
              ? "No todos yet. Type one above and press Enter."
              : filter === "done"
                ? "Nothing finished yet."
                : "All caught up."}
          </EmptyState>
        )}

        {visible.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            today={today}
            completed={task.completed}
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
          label="Edit todo"
          onSave={(changes) => patch(editing.id, changes)}
          onDelete={() => remove(editing.id)}
          onClose={() => setEditingId(null)}
        />
      )}
    </CardShell>
  );
};