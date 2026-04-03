"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const initialTasks = [
{ id: 1, title: "Review Meridian client proposal", time: "9:00 AM", priority: "high", done: true, ai: false },
{ id: 2, title: "Q2 campaign brainstorm session", time: "10:30 AM", priority: "high", done: false, ai: true },
{ id: 3, title: "Update metrics dashboard", time: "12:00 PM", priority: "med", done: false, ai: false },
{ id: 4, title: "Design team sync call", time: "2:00 PM", priority: "med", done: false, ai: true },
{ id: 5, title: "Prepare weekly report", time: "4:00 PM", priority: "low", done: false, ai: true },
{ id: 6, title: "Buy groceries", time: "5:30 PM", priority: "low", done: false, ai: true },
];

const priorityColors = {
high: "var(--fm-danger)",
med: "var(--fm-warning)",
low: "var(--fm-success)",
};

function TaskItem({ task, onToggle }) {
return (
<div
    onClick={() => onToggle(task.id)}
    style={{
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    background: "var(--fm-card)",
    border: "1px solid var(--fm-border)",
    borderRadius: 12,
    cursor: "pointer",
    opacity: task.done ? 0.6 : 1,
    transition: "all 0.2s",
    }}
>
    <div
    style={{
        width: 22,
        height: 22,
        borderRadius: 6,
        border: `2px solid ${task.done ? "var(--fm-accent)" : "var(--fm-border)"}`,
        background: task.done ? "var(--fm-accent)" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "all 0.2s",
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
        fontSize: 14,
        fontWeight: 500,
        color: "var(--fm-text)",
        textDecoration: task.done ? "line-through" : "none",
        }}
    >
        {task.title}
    </div>
    <div
        style={{
        fontSize: 12,
        color: "var(--fm-muted)",
        marginTop: 3,
        display: "flex",
        alignItems: "center",
        gap: 8,
        }}
    >
        {task.time && (
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
            </svg>
            {task.time}
        </span>
        )}
        {task.ai && (
        <span style={{ color: "var(--fm-accent-light)", display: "flex", alignItems: "center", gap: 3 }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--fm-accent-light)">
            <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
            </svg>
            Kai suggested
        </span>
        )}
    </div>
    </div>

    <span
    style={{
        fontSize: 11,
        fontWeight: 700,
        padding: "3px 9px",
        borderRadius: 20,
        background: `${priorityColors[task.priority]}18`,
        color: priorityColors[task.priority],
        textTransform: "uppercase",
        letterSpacing: "0.05em",
    }}
    >
    {task.priority}
    </span>
</div>
);
}

function StatCard({ label, value, sub, color }) {
return (
<div
    style={{
    background: "var(--fm-card)",
    border: "1px solid var(--fm-border)",
    borderRadius: 14,
    padding: "16px",
    flex: 1,
    minWidth: 0,
    }}
>
    <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 22, fontWeight: 700, color: color || "var(--fm-text)" }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: "var(--fm-muted)", marginTop: 4 }}>{sub}</div>}
</div>
);
}

export default function DashboardPage() {
const router = useRouter();
const [tasks, setTasks] = useState(initialTasks);
const [quickInput, setQuickInput] = useState("");
const [kaiText, setKaiText] = useState("");
const [kaiDone, setKaiDone] = useState(false);

const fullMessage =
"Good morning! You have 6 tasks today. I've noticed you're most productive on Tuesday mornings — I moved your creative work earlier. Your 3PM meeting can shift to Thursday. Want me to reschedule it?";

useEffect(() => {
let i = 0;
const interval = setInterval(() => {
    setKaiText(fullMessage.slice(0, i + 1));
    i++;
    if (i >= fullMessage.length) {
    clearInterval(interval);
    setKaiDone(true);
    }
}, 22);
return () => clearInterval(interval);
}, []);

const toggleTask = (id) => {
setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
};

const sendToKai = () => {
if (!quickInput.trim()) return;
router.push(`/dashboard/chat?q=${encodeURIComponent(quickInput.trim())}`);
};

const completedCount = tasks.filter((t) => t.done).length;
const progress = Math.round((completedCount / tasks.length) * 100);

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    {/* Header */}
    <div style={{ marginBottom: 24 }}>
    <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>
        Good morning 👋
    </h2>
    <p style={{ fontSize: 14, color: "var(--fm-muted)", marginTop: 4 }}>
        Here's your day at a glance
    </p>
    </div>

    {/* Kai Briefing */}
    <div
    style={{
        background: "linear-gradient(135deg, rgba(108,92,231,0.12), rgba(0,206,201,0.08))",
        border: "1px solid rgba(108,92,231,0.3)",
        borderRadius: 16,
        padding: "18px 20px",
        marginBottom: 20,
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
    }}
    >
    <div
        style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        }}
    >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
        </svg>
    </div>
    <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, color: "var(--fm-accent-light)", fontWeight: 600, marginBottom: 6 }}>
        KAI · Daily Briefing
        </div>
        <div style={{ fontSize: 14, color: "var(--fm-text)", lineHeight: 1.6 }}>
        {kaiText}
        {!kaiDone && (
            <span
            style={{
                display: "inline-block",
                width: 2,
                height: 14,
                background: "var(--fm-accent)",
                marginLeft: 2,
                animation: "blink 1s step-end infinite",
                verticalAlign: "middle",
            }}
            />
        )}
        </div>
        {kaiDone && (
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button
            onClick={() => router.push("/dashboard/calendar")}
            style={{
                padding: "6px 14px",
                borderRadius: 8,
                border: "none",
                background: "var(--fm-accent)",
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Outfit, sans-serif",
            }}
            >
            Yes, reschedule it
            </button>
            <button
            style={{
                padding: "6px 14px",
                borderRadius: 8,
                border: "1px solid var(--fm-border)",
                background: "transparent",
                color: "var(--fm-muted)",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Outfit, sans-serif",
            }}
            >
            Keep it
            </button>
        </div>
        )}
    </div>
    </div>

    {/* Stats Row */}
    <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
    <StatCard label="Tasks today" value={`${completedCount}/${tasks.length}`} sub={`${progress}% done`} color="var(--fm-accent)" />
    <StatCard label="Focus time" value="3.2h" sub="↑ 18% vs avg" color="var(--fm-teal)" />
    <StatCard label="Streak" value="7 🔥" sub="days in a row" color="var(--fm-warning)" />
    </div>

    {/* Progress Bar */}
    <div style={{ marginBottom: 20 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: "var(--fm-muted)" }}>Daily progress</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--fm-accent)" }}>{progress}%</span>
    </div>
    <div
        style={{
        height: 6,
        background: "var(--fm-border)",
        borderRadius: 99,
        overflow: "hidden",
        }}
    >
        <div
        style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #6C5CE7, #00CEC9)",
            borderRadius: 99,
            transition: "width 0.6s ease",
        }}
        />
    </div>
    </div>

    {/* Today's Tasks */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
    <span style={{ fontSize: 16, fontWeight: 600, color: "var(--fm-text)" }}>Today's tasks</span>
    <span
        onClick={() => router.push("/dashboard/tasks")}
        style={{ fontSize: 12, color: "var(--fm-accent-light)", cursor: "pointer" }}
    >
        View all →
    </span>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
    {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={toggleTask} />
    ))}
    </div>

    {/* Ask Kai */}
    <div
    style={{
        background: "var(--fm-card)",
        border: "1px solid var(--fm-border)",
        borderRadius: 14,
        padding: 16,
    }}
    >
    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>
        Ask Kai anything
    </div>
    <div style={{ display: "flex", gap: 8 }}>
        <input
        value={quickInput}
        onChange={(e) => setQuickInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendToKai()}
        placeholder="e.g. 'Optimize my Wednesday' or 'Add a task for tomorrow'"
        style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid var(--fm-border)",
            background: "var(--fm-surface)",
            color: "var(--fm-text)",
            fontSize: 13,
            fontFamily: "Outfit, sans-serif",
            outline: "none",
        }}
        />
        <button
        onClick={sendToKai}
        style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            border: "none",
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
        }}
        >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
        </button>
    </div>
    </div>

    <style>{`
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    `}</style>
</div>
);
}