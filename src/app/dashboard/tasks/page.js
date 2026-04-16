"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Confetti } from "@/app/components/Confetti";

export default function TasksPage() {
const [tasks, setTasks] = useState([]);
const [newTask, setNewTask] = useState("");
const [priority, setPriority] = useState("medium");
const [category, setCategory] = useState("personal");
const [filter, setFilter] = useState("all");
const [loading, setLoading] = useState(true);
const [showConfetti, setShowConfetti] = useState(false);

useEffect(() => { loadTasks(); }, []);

const loadTasks = async () => {
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
    .insert([{
    user_id: session.user.id,
    title: newTask.trim(),
    priority,
    category,
    completed: false,
    }])
    .select();

if (!error && data) {
    setTasks([data[0], ...tasks]);
    setNewTask("");
}
};

const toggleTask = async (task) => {
const newStatus = !task.completed;
const { error } = await supabase
    .from("tasks")
    .update({ completed: newStatus })
    .eq("id", task.id);

if (!error) {
    setTasks(tasks.map((t) => t.id === task.id ? { ...t, completed: newStatus } : t));
    if (newStatus) {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2500);
    }
}
};

const deleteTask = async (id) => {
if (!confirm("Delete this task?")) return;
const { error } = await supabase.from("tasks").delete().eq("id", id);
if (!error) setTasks(tasks.filter((t) => t.id !== id));
};

const getPriorityColor = (p) => {
if (p === "high") return "#ff6b6b";
if (p === "low") return "#00CEC9";
return "#fdcb6e";
};

const filtered = tasks.filter((t) => {
if (filter === "active") return !t.completed;
if (filter === "completed") return t.completed;
return true;
});

const pendingCount = tasks.filter((t) => !t.completed).length;
const completedCount = tasks.filter((t) => t.completed).length;

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <Confetti active={showConfetti} />

    <div style={{ marginBottom: 16 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Tasks</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Organize your day with smart task management</p>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginBottom: 16 }}>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Pending</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#00CEC9" }}>{pendingCount}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Completed</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#6C5CE7" }}>{completedCount}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Total</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-accent-light)" }}>{tasks.length}</div>
    </div>
    </div>

    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: 16, marginBottom: 16,
    }}>
    <input
        value={newTask} onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
        placeholder="What needs to get done?"
        style={{
        width: "100%", padding: "12px 14px", borderRadius: 10,
        border: "1px solid var(--fm-border)", background: "var(--fm-card)",
        color: "var(--fm-text)", fontSize: 15, fontWeight: 500,
        fontFamily: "Outfit, sans-serif", outline: "none",
        marginBottom: 10, boxSizing: "border-box",
        }}
    />

    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 4 }}>
        {["low", "medium", "high"].map((p) => (
            <button key={p} onClick={() => setPriority(p)} style={{
            padding: "5px 12px", borderRadius: 8, fontSize: 11, fontWeight: 500,
            border: priority === p ? `1px solid ${getPriorityColor(p)}40` : "1px solid var(--fm-border)",
            background: priority === p ? `${getPriorityColor(p)}15` : "var(--fm-card)",
            color: priority === p ? getPriorityColor(p) : "var(--fm-muted)",
            cursor: "pointer", fontFamily: "Outfit, sans-serif",
            }}>{p}</button>
        ))}
        </div>
        <div style={{ display: "flex", gap: 4 }}>
        {["personal", "work", "health"].map((c) => (
            <button key={c} onClick={() => setCategory(c)} style={{
            padding: "5px 12px", borderRadius: 8, fontSize: 11, fontWeight: 500,
            border: category === c ? "1px solid rgba(108,92,231,0.4)" : "1px solid var(--fm-border)",
            background: category === c ? "rgba(108,92,231,0.1)" : "var(--fm-card)",
            color: category === c ? "#6C5CE7" : "var(--fm-muted)",
            cursor: "pointer", fontFamily: "Outfit, sans-serif",
            }}>{c}</button>
        ))}
        </div>
    </div>

    <button onClick={addTask} style={{
        width: "100%", padding: "10px", borderRadius: 10, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>Add Task</button>
    </div>

    <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
    {["all", "active", "completed"].map((f) => (
        <button key={f} onClick={() => setFilter(f)} style={{
        padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 500,
        border: filter === f ? "1px solid rgba(108,92,231,0.4)" : "1px solid var(--fm-border)",
        background: filter === f ? "rgba(108,92,231,0.1)" : "var(--fm-surface)",
        color: filter === f ? "#6C5CE7" : "var(--fm-muted)",
        cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>{f}</button>
    ))}
    </div>

    {loading ? (
    <div style={{ textAlign: "center", padding: 40, color: "var(--fm-muted)" }}>Loading tasks...</div>
    ) : filtered.length === 0 ? (
    <div style={{
        textAlign: "center", padding: 50,
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16,
    }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--fm-text)", marginBottom: 8 }}>
        {filter === "completed" ? "No completed tasks yet" : filter === "active" ? "All clear!" : "No tasks yet"}
        </h3>
        <p style={{ fontSize: 14, color: "var(--fm-muted)" }}>
        {filter === "active" ? "Enjoy your free time!" : "Add your first task above"}
        </p>
    </div>
    ) : (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((task) => (
        <div key={task.id} style={{
            background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
            borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12,
            borderLeft: `3px solid ${getPriorityColor(task.priority)}`,
            opacity: task.completed ? 0.6 : 1,
            transition: "all 0.3s ease",
        }}>
            <div onClick={() => toggleTask(task)} style={{
            width: 22, height: 22, borderRadius: 7, flexShrink: 0, cursor: "pointer",
            border: task.completed ? `2px solid ${getPriorityColor(task.priority)}` : `2px solid ${getPriorityColor(task.priority)}40`,
            background: task.completed ? getPriorityColor(task.priority) : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
            }}>
            {task.completed && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
                </svg>
            )}
            </div>
            <div style={{ flex: 1 }}>
            <div style={{
                fontSize: 14, fontWeight: 500, color: "var(--fm-text)",
                textDecoration: task.completed ? "line-through" : "none",
            }}>{task.title}</div>
            <div style={{ display: "flex", gap: 6, marginTop: 3 }}>
                <span style={{
                fontSize: 10, padding: "2px 8px", borderRadius: 6,
                background: `${getPriorityColor(task.priority)}15`,
                color: getPriorityColor(task.priority),
                }}>{task.priority}</span>
                {task.category && (
                <span style={{
                    fontSize: 10, padding: "2px 8px", borderRadius: 6,
                    background: "rgba(108,92,231,0.1)", color: "var(--fm-accent-light)",
                }}>{task.category}</span>
                )}
            </div>
            </div>
            <div onClick={() => deleteTask(task.id)} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 4 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            </div>
        </div>
        ))}
    </div>
    )}
</div>
);
}