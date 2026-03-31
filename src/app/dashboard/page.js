"use client";

import { useState, useEffect } from "react";

function KaiBriefing() {
const [text, setText] = useState("");
const fullText =
"Good morning, Juan! You have 6 tasks today. I noticed Tuesdays are your most creative day, so I scheduled your design work for this morning when your energy peaks. Your 3pm meeting with Sarah can move to Friday — she has more availability. Want me to reschedule it? Remember: consistency beats intensity. You've shown up 18 days in a row. That's not luck, that's discipline.";

useEffect(() => {
let i = 0;
const interval = setInterval(() => {
    if (i < fullText.length) {
    setText(fullText.slice(0, i + 1));
    i++;
    } else {
    clearInterval(interval);
    }
}, 18);
return () => clearInterval(interval);
}, []);

return (
<div
    style={{
    background: "linear-gradient(135deg, rgba(108,92,231,0.1), rgba(0,206,201,0.06))",
    border: "1px solid var(--fm-border)",
    borderRadius: 18,
    padding: 24,
    marginBottom: 24,
    }}
>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
    <div
        style={{
        width: 34,
        height: 34,
        borderRadius: 9,
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        }}
    >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
        <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
        </svg>
    </div>
    <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)" }}>Kai</div>
        <div style={{ fontSize: 11, color: "var(--fm-success)", fontWeight: 500 }}>● Active</div>
    </div>
    </div>
    <div style={{ fontSize: 14, color: "var(--fm-text)", lineHeight: 1.7 }}>
    {text}
    <span style={{ animation: "pulseGlow 0.8s infinite", color: "var(--fm-accent)" }}>|</span>
    </div>
    <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
    <button
        style={{
        background: "var(--fm-accent)",
        color: "#fff",
        border: "none",
        borderRadius: 9,
        padding: "8px 18px",
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "Outfit, sans-serif",
        }}
    >
        Yes, reschedule
    </button>
    <button
        style={{
        background: "rgba(255,255,255,0.05)",
        color: "var(--fm-muted)",
        border: "1px solid var(--fm-border)",
        borderRadius: 9,
        padding: "8px 18px",
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "Outfit, sans-serif",
        }}
    >
        Keep it today
    </button>
    </div>
</div>
);
}

function StatCard({ icon, label, value, change, color }) {
return (
<div
    style={{
    background: "var(--fm-card)",
    border: "1px solid var(--fm-border)",
    borderRadius: 14,
    padding: "16px 18px",
    flex: 1,
    minWidth: 150,
    }}
>
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
    <span style={{ color }}>{icon}</span>
    <span style={{ fontSize: 12, color: "var(--fm-muted)", fontWeight: 500 }}>{label}</span>
    </div>
    <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-text)" }}>{value}</div>
    <div style={{ fontSize: 11, color: "var(--fm-success)", marginTop: 4 }}>{change}</div>
</div>
);
}

function TaskItem({ task }) {
const [checked, setChecked] = useState(task.done);
const priorityColors = { high: "var(--fm-danger)", med: "var(--fm-warning)", low: "var(--fm-success)" };

return (
<div
    onClick={() => setChecked(!checked)}
    style={{
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    background: checked ? "rgba(108,92,231,0.04)" : "var(--fm-surface)",
    border: "1px solid var(--fm-border)",
    borderRadius: 10,
    cursor: "pointer",
    opacity: checked ? 0.5 : 1,
    }}
>
    <div
    style={{
        width: 20,
        height: 20,
        borderRadius: 5,
        border: `2px solid ${checked ? "var(--fm-accent)" : "var(--fm-border)"}`,
        background: checked ? "var(--fm-accent)" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    }}
    >
    {checked && (
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
        textDecoration: checked ? "line-through" : "none",
        }}
    >
        {task.title}
    </div>
    <div style={{ fontSize: 11, color: "var(--fm-muted)", display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
        </svg>
        {task.time}
        {task.ai && (
        <span style={{ color: "var(--fm-accent-light)", display: "flex", alignItems: "center", gap: 3 }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
            </svg>
            Kai suggested
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
</div>
);
}

export default function DashboardPage() {
const tasks = [
{ title: "Review Meridian client proposal", time: "9:00 AM", priority: "high", done: true, ai: false },
{ title: "Q2 campaign brainstorm session", time: "10:30 AM", priority: "high", done: false, ai: true },
{ title: "Update metrics dashboard", time: "12:00 PM", priority: "med", done: false, ai: false },
{ title: "Design team sync call", time: "2:00 PM", priority: "med", done: false, ai: true },
{ title: "Prepare weekly report", time: "4:00 PM", priority: "low", done: false, ai: true },
{ title: "Buy groceries", time: "5:30 PM", priority: "low", done: false, ai: true },
];

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    {/* Kai Briefing */}
    <KaiBriefing />

    {/* Stats */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 24 }}>
    <StatCard
        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 12l2 2 4-4" /></svg>}
        label="Tasks today"
        value="6"
        change="+2 vs yesterday"
        color="var(--fm-accent)"
    />
    <StatCard
        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>}
        label="Productivity"
        value="91%"
        change="+8% this week"
        color="var(--fm-success)"
    />
    <StatCard
        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>}
        label="Focus time"
        value="5.4h"
        change="+1.2h vs avg"
        color="var(--fm-warning)"
    />
    <StatCard
        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>}
        label="Streak"
        value="18 days"
        change="Personal best!"
        color="var(--fm-pink)"
    />
    </div>

    {/* Tasks */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
    <span style={{ fontSize: 16, fontWeight: 600, color: "var(--fm-text)" }}>Today's tasks</span>
    <span style={{ fontSize: 12, color: "var(--fm-accent-light)", cursor: "pointer" }}>View all →</span>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
    {tasks.map((task, i) => (
        <TaskItem key={i} task={task} />
    ))}
    </div>

    {/* AI Chat Input */}
    <div
    style={{
        background: "var(--fm-card)",
        border: "1px solid var(--fm-border)",
        borderRadius: 14,
        padding: 16,
    }}
    >
    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>Ask Kai anything</div>
    <div style={{ display: "flex", gap: 8 }}>
        <input
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
</div>
);
}

