"use client";

import { useState } from "react";

const initialTasks = [
{ id: 1, title: "Review Meridian client proposal", time: "9:00 AM", priority: "high", category: "work", done: true, ai: false },
{ id: 2, title: "Q2 campaign brainstorm", time: "10:30 AM", priority: "high", category: "work", done: false, ai: true },
{ id: 3, title: "Update metrics dashboard", time: "12:00 PM", priority: "med", category: "work", done: false, ai: false },
{ id: 4, title: "Design team sync call", time: "2:00 PM", priority: "med", category: "work", done: false, ai: true },
{ id: 5, title: "Prepare weekly report", time: "4:00 PM", priority: "low", category: "work", done: false, ai: true },
{ id: 6, title: "Buy groceries", time: "5:30 PM", priority: "low", category: "personal", done: false, ai: true },
{ id: 7, title: "Call dentist for appointment", time: "", priority: "med", category: "personal", done: false, ai: false },
{ id: 8, title: "Research new project management tools", time: "", priority: "low", category: "learning", done: false, ai: false },
];

export default function TasksPage() {
const [tasks, setTasks] = useState(initialTasks);
const [filter, setFilter] = useState("all");
const [showAdd, setShowAdd] = useState(false);
const [newTitle, setNewTitle] = useState("");
const [newPriority, setNewPriority] = useState("med");
const [newCategory, setNewCategory] = useState("work");

const priorityColors = { high: "var(--fm-danger)", med: "var(--fm-warning)", low: "var(--fm-success)" };
const categoryColors = { work: "var(--fm-accent)", personal: "var(--fm-pink)", learning: "var(--fm-teal)", family: "var(--fm-warning)" };

const filtered = tasks.filter((t) => {
if (filter === "all") return true;
if (filter === "done") return t.done;
if (filter === "pending") return !t.done;
return t.category === filter;
});

const toggleTask = (id) => {
setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
};

const deleteTask = (id) => {
setTasks(tasks.filter((t) => t.id !== id));
};

const addTask = () => {
if (!newTitle.trim()) return;
const task = {
    id: Date.now(),
    title: newTitle,
    time: "",
    priority: newPriority,
    category: newCategory,
    done: false,
    ai: false,
};
setTasks([...tasks, task]);
setNewTitle("");
setShowAdd(false);
};

const doneCount = tasks.filter((t) => t.done).length;

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    {/* Header */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Tasks</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>
        {doneCount} of {tasks.length} completed
        </p>
    </div>
    <button
        onClick={() => setShowAdd(!showAdd)}
        style={{
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        color: "#fff",
        border: "none",
        borderRadius: 10,
        padding: "10px 20px",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "Outfit, sans-serif",
        }}
    >
        + Add task
    </button>
    </div>

    {/* Add task form */}
    {showAdd && (
    <div
        style={{
        background: "var(--fm-card)",
        border: "1px solid var(--fm-border)",
        borderRadius: 14,
        padding: 20,
        marginBottom: 20,
        animation: "fadeIn 0.3s ease",
        }}
    >
        <input
        type="text"
        placeholder="What needs to be done?"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
        autoFocus
        style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 10,
            border: "1px solid var(--fm-border)",
            background: "var(--fm-surface)",
            color: "var(--fm-text)",
            fontSize: 14,
            fontFamily: "Outfit, sans-serif",
            outline: "none",
            marginBottom: 12,
        }}
        />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        {["low", "med", "high"].map((p) => (
            <button
            key={p}
            onClick={() => setNewPriority(p)}
            style={{
                padding: "6px 14px",
                borderRadius: 8,
                border: newPriority === p ? "none" : "1px solid var(--fm-border)",
                background: newPriority === p ? priorityColors[p] : "transparent",
                color: newPriority === p ? "#fff" : "var(--fm-muted)",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Outfit, sans-serif",
                textTransform: "uppercase",
            }}
            >
            {p}
            </button>
        ))}
        <div style={{ width: 1, height: 20, background: "var(--fm-border)", margin: "0 4px" }} />
        {["work", "personal", "learning", "family"].map((c) => (
            <button
            key={c}
            onClick={() => setNewCategory(c)}
            style={{
                padding: "6px 14px",
                borderRadius: 8,
                border: newCategory === c ? "none" : "1px solid var(--fm-border)",
                background: newCategory === c ? categoryColors[c] : "transparent",
                color: newCategory === c ? "#fff" : "var(--fm-muted)",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "Outfit, sans-serif",
                textTransform: "capitalize",
            }}
            >
            {c}
            </button>
        ))}
        <div style={{ flex: 1 }} />
        <button
            onClick={addTask}
            style={{
            background: "var(--fm-accent)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 20px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "Outfit, sans-serif",
            }}
        >
            Add
        </button>
        </div>
    </div>
    )}

    {/* Filters */}
    <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
    {["all", "pending", "done", "work", "personal", "learning", "family"].map((f) => (
        <button
        key={f}
        onClick={() => setFilter(f)}
        style={{
            padding: "6px 14px",
            borderRadius: 20,
            border: filter === f ? "none" : "1px solid var(--fm-border)",
            background: filter === f ? "var(--fm-accent)" : "transparent",
            color: filter === f ? "#fff" : "var(--fm-muted)",
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "Outfit, sans-serif",
            textTransform: "capitalize",
        }}
        >
        {f}
        </button>
    ))}
    </div>

    {/* Progress bar */}
    <div style={{ marginBottom: 20 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: "var(--fm-muted)" }}>Progress</span>
        <span style={{ fontSize: 12, color: "var(--fm-accent-light)", fontWeight: 600 }}>
        {tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0}%
        </span>
    </div>
    <div style={{ height: 6, background: "var(--fm-border)", borderRadius: 3 }}>
        <div
        style={{
            height: "100%",
            width: `${tasks.length > 0 ? (doneCount / tasks.length) * 100 : 0}%`,
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            borderRadius: 3,
            transition: "width 0.3s ease",
        }}
        />
    </div>
    </div>

    {/* Task list */}
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    {filtered.map((task) => (
        <div
        key={task.id}
        style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 14px",
            background: task.done ? "rgba(108,92,231,0.04)" : "var(--fm-surface)",
            border: "1px solid var(--fm-border)",
            borderRadius: 10,
            opacity: task.done ? 0.5 : 1,
        }}
        >
        <div
            onClick={() => toggleTask(task.id)}
            style={{
            width: 20,
            height: 20,
            borderRadius: 5,
            border: `2px solid ${task.done ? "var(--fm-accent)" : "var(--fm-border)"}`,
            background: task.done ? "var(--fm-accent)" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            cursor: "pointer",
            }}
        >
            {task.done && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
            </svg>
            )}
        </div>
        <div style={{ flex: 1 }}>
            <div
            style={{
                fontSize: 13,
                fontWeight: 500,
                color: "var(--fm-text)",
                textDecoration: task.done ? "line-through" : "none",
            }}
            >
            {task.title}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 3 }}>
            {task.time && (
                <span style={{ fontSize: 11, color: "var(--fm-muted)", display: "flex", alignItems: "center", gap: 3 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
                {task.time}
                </span>
            )}
            <span
                style={{
                fontSize: 10,
                padding: "2px 8px",
                borderRadius: 10,
                background: `${categoryColors[task.category]}20`,
                color: categoryColors[task.category],
                fontWeight: 500,
                textTransform: "capitalize",
                }}
            >
                {task.category}
            </span>
            {task.ai && (
                <span style={{ fontSize: 10, color: "var(--fm-accent-light)", display: "flex", alignItems: "center", gap: 2 }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
                </svg>
                Kai
                </span>
            )}
            </div>
        </div>
        <span
            style={{
            fontSize: 10,
            fontWeight: 600,
            padding: "3px 8px",
            borderRadius: 12,
            background: `${priorityColors[task.priority]}15`,
            color: priorityColors[task.priority],
            textTransform: "uppercase",
            }}
        >
            {task.priority}
        </span>
        <button
            onClick={() => deleteTask(task.id)}
            style={{
            background: "none",
            border: "none",
            color: "var(--fm-muted)",
            cursor: "pointer",
            padding: 4,
            opacity: 0.5,
            }}
        >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        </button>
        </div>
    ))}
    </div>

    {filtered.length === 0 && (
    <div style={{ textAlign: "center", padding: 40, color: "var(--fm-muted)", fontSize: 14 }}>
        No tasks in this category. Add one above!
    </div>
    )}
</div>
);
}
