"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function TasksPage() {
const [tasks, setTasks] = useState([]);
const [newTask, setNewTask] = useState("");
const [priority, setPriority] = useState("medium");
const [category, setCategory] = useState("general");
const [filter, setFilter] = useState("all");
const [loading, setLoading] = useState(true);

useEffect(() => {
fetchTasks();
}, []);

const fetchTasks = async () => {
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;

const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

if (!error && data) setTasks(data);
setLoading(false);
};

const addTask = async () => {
if (!newTask.trim()) return;
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;

const { data, error } = await supabase
    .from("tasks")
    .insert([{ title: newTask.trim(), priority, category, user_id: session.user.id }])
    .select();

if (!error && data) {
    setTasks([data[0], ...tasks]);
    setNewTask("");
}
};

const toggleTask = async (id, completed) => {
const { error } = await supabase
    .from("tasks")
    .update({ completed: !completed })
    .eq("id", id);

if (!error) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !completed } : t)));
}
};

const deleteTask = async (id) => {
const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

if (!error) {
    setTasks(tasks.filter((t) => t.id !== id));
}
};

const filtered = tasks.filter((t) => {
if (filter === "active") return !t.completed;
if (filter === "completed") return t.completed;
return true;
});

const completedCount = tasks.filter((t) => t.completed).length;
const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

const priorityColors = {
high: { bg: "rgba(255,107,107,0.1)", border: "rgba(255,107,107,0.2)", text: "#ff6b6b" },
medium: { bg: "rgba(253,203,110,0.1)", border: "rgba(253,203,110,0.2)", text: "#fdcb6e" },
low: { bg: "rgba(0,206,201,0.1)", border: "rgba(0,206,201,0.2)", text: "#00CEC9" },
};

if (loading) {
return (
    <div style={{ padding: 40, textAlign: "center", color: "var(--fm-muted)" }}>
    Loading tasks...
    </div>
);
}

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Tasks</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>
        {completedCount} of {tasks.length} completed
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Organize, prioritize, and track all your tasks in one place</p>
        </p>
    </div>
    </div>

    {/* Progress bar */}
    <div style={{ background: "var(--fm-card)", borderRadius: 8, height: 8, marginBottom: 20, overflow: "hidden" }}>
    <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(135deg, #6C5CE7, #00CEC9)", borderRadius: 8, transition: "width 0.3s ease" }} />
    </div>

    {/* Add task */}
    <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
    <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
        placeholder="Add a new task..."
        style={{
        flex: 1, minWidth: 200, padding: "12px 16px", borderRadius: 12,
        border: "1px solid var(--fm-border)", background: "var(--fm-surface)",
        color: "var(--fm-text)", fontSize: 14, fontFamily: "Outfit, sans-serif", outline: "none",
        }}
    />
    <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{
        padding: "12px 14px", borderRadius: 12,
        border: "1px solid var(--fm-border)", background: "var(--fm-surface)",
        color: "var(--fm-text)", fontSize: 13, fontFamily: "Outfit, sans-serif", outline: "none",
        }}
    >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
    </select>
    <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
        padding: "12px 14px", borderRadius: 12,
        border: "1px solid var(--fm-border)", background: "var(--fm-surface)",
        color: "var(--fm-text)", fontSize: 13, fontFamily: "Outfit, sans-serif", outline: "none",
        }}
    >
        <option value="general">General</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="health">Health</option>
        <option value="family">Family</option>
    </select>
    <button
        onClick={addTask}
        style={{
        padding: "12px 24px", borderRadius: 12, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}
    >
        Add
    </button>
    </div>

    {/* Filters */}
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
    {["all", "active", "completed"].map((f) => (
        <button
        key={f}
        onClick={() => setFilter(f)}
        style={{
            padding: "8px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500,
            border: filter === f ? "1px solid rgba(108,92,231,0.3)" : "1px solid var(--fm-border)",
            background: filter === f ? "rgba(108,92,231,0.1)" : "var(--fm-surface)",
            color: filter === f ? "var(--fm-accent-light)" : "var(--fm-muted)",
            cursor: "pointer", fontFamily: "Outfit, sans-serif", textTransform: "capitalize",
        }}
        >
        {f}
        </button>
    ))}
    </div>

    {/* Task list */}
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, color: "var(--fm-muted)", fontSize: 14 }}>
        {filter === "all" ? "No tasks yet. Add your first task above!" : `No ${filter} tasks.`}
        </div>
    ) : (
        filtered.map((task) => (
        <div
            key={task.id}
            style={{
            display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
            background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
            borderRadius: 12, transition: "all 0.2s ease",
            }}
        >
            {/* Checkbox */}
            <div
            onClick={() => toggleTask(task.id, task.completed)}
            style={{
                width: 22, height: 22, borderRadius: 6, flexShrink: 0, cursor: "pointer",
                border: task.completed ? "none" : "2px solid var(--fm-muted)",
                background: task.completed ? "linear-gradient(135deg, #6C5CE7, #00CEC9)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
            }}
            >
            {task.completed && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
                </svg>
            )}
            </div>

            {/* Task info */}
            <div style={{ flex: 1 }}>
            <div style={{
                fontSize: 14, fontWeight: 500,
                color: task.completed ? "var(--fm-muted)" : "var(--fm-text)",
                textDecoration: task.completed ? "line-through" : "none",
            }}>
                {task.title}
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                <span style={{
                fontSize: 10, padding: "2px 8px", borderRadius: 10,
                background: priorityColors[task.priority]?.bg || priorityColors.medium.bg,
                color: priorityColors[task.priority]?.text || priorityColors.medium.text,
                border: `1px solid ${priorityColors[task.priority]?.border || priorityColors.medium.border}`,
                }}>
                {task.priority}
                </span>
                <span style={{
                fontSize: 10, padding: "2px 8px", borderRadius: 10,
                background: "rgba(108,92,231,0.1)", color: "var(--fm-accent-light)",
                border: "1px solid rgba(108,92,231,0.15)",
                }}>
                {task.category}
                </span>
            </div>
            </div>

            {/* Delete button */}
            <div
            onClick={() => deleteTask(task.id)}
            style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 4 }}
            >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            </div>
        </div>
        ))
    )}
    </div>
</div>
);
}