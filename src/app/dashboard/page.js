"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
const [tasks, setTasks] = useState([]);
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [kaiInput, setKaiInput] = useState("");

useEffect(() => {
const loadData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    setUser(session.user);

    const { data } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

    if (data) setTasks(data);
    setLoading(false);
};
loadData();
}, []);

const toggleTask = async (id, completed) => {
await supabase.from("tasks").update({ completed: !completed }).eq("id", id);
setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !completed } : t)));
};

const todayTasks = tasks.slice(0, 6);
const completedCount = tasks.filter((t) => t.completed).length;
const totalTasks = tasks.length;
const streak = Math.min(completedCount, 30);

const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";

const hour = new Date().getHours();
const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

if (loading) {
return <div style={{ padding: 40, textAlign: "center", color: "var(--fm-muted)" }}>Loading...</div>;
}

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    {/* Kai Briefing */}
    <div style={{
    background: "rgba(108,92,231,0.08)", border: "1px solid rgba(108,92,231,0.15)",
    borderRadius: 14, padding: "16px 18px", marginBottom: 20,
    }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{
        width: 26, height: 26, borderRadius: 7,
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        display: "flex", alignItems: "center", justifyContent: "center",
        }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
            <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
        </svg>
        </div>
        <span style={{ fontSize: 13, color: "var(--fm-accent-light)", fontWeight: 600 }}>Kai's briefing</span>
    </div>
    <div style={{ fontSize: 13, color: "var(--fm-text)", lineHeight: 1.6 }}>
        {totalTasks === 0
        ? `${greeting}, ${userName.split(" ")[0]}! You don't have any tasks yet. Head over to Tasks to add your first one, or ask me to help you plan your day!`
        : `${greeting}, ${userName.split(" ")[0]}! You have ${totalTasks} task${totalTasks !== 1 ? "s" : ""} total. ${completedCount} completed, ${totalTasks - completedCount} remaining. ${completedCount > totalTasks / 2 ? "Great progress today! Keep it up!" : "Let's tackle those remaining tasks — you've got this!"}`
        }
    </div>
    </div>

    {/* Stats */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 20 }}>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14 }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Tasks today</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-text)" }}>{totalTasks}</div>
        <div style={{ fontSize: 11, color: "var(--fm-success)" }}>{completedCount} completed</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14 }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Completion</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-text)" }}>{totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0}%</div>
        <div style={{ fontSize: 11, color: "var(--fm-accent-light)" }}>productivity</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14 }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Streak</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-text)" }}>{streak}d</div>
        <div style={{ fontSize: 11, color: "var(--fm-pink)" }}>{streak > 5 ? "On fire!" : "Keep going!"}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14 }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Remaining</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-text)" }}>{totalTasks - completedCount}</div>
        <div style={{ fontSize: 11, color: "var(--fm-warning)" }}>to do</div>
    </div>
    </div>

    {/* Tasks */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
    <div style={{ fontSize: 16, fontWeight: 600, color: "var(--fm-text)" }}>Your tasks</div>
    <div
        onClick={() => window.location.href = "/dashboard/tasks"}
        style={{ fontSize: 12, color: "var(--fm-accent-light)", cursor: "pointer" }}
    >View all</div>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
    {todayTasks.length === 0 ? (
        <div style={{
        textAlign: "center", padding: 30,
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 12, color: "var(--fm-muted)", fontSize: 13,
        }}>
        No tasks yet. Go to Tasks to add your first one!
        </div>
    ) : (
        todayTasks.map((task) => (
        <div key={task.id} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
            background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
            borderRadius: 10,
        }}>
            <div
            onClick={() => toggleTask(task.id, task.completed)}
            style={{
                width: 20, height: 20, borderRadius: 5, flexShrink: 0, cursor: "pointer",
                border: task.completed ? "none" : "2px solid var(--fm-muted)",
                background: task.completed ? "linear-gradient(135deg, #6C5CE7, #00CEC9)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
            }}
            >
            {task.completed && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
                </svg>
            )}
            </div>
            <span style={{
            fontSize: 13, flex: 1,
            color: task.completed ? "var(--fm-muted)" : "var(--fm-text)",
            textDecoration: task.completed ? "line-through" : "none",
            }}>{task.title}</span>
            <span style={{
            fontSize: 10, padding: "2px 8px", borderRadius: 10,
            background: task.priority === "high" ? "rgba(255,107,107,0.1)" : task.priority === "low" ? "rgba(0,206,201,0.1)" : "rgba(253,203,110,0.1)",
            color: task.priority === "high" ? "#ff6b6b" : task.priority === "low" ? "#00CEC9" : "#fdcb6e",
            }}>{task.priority}</span>
        </div>
        ))
    )}
    </div>

    {/* Quick Kai Input */}
    <div style={{ display: "flex", gap: 8 }}>
    <form
        onSubmit={(e) => { e.preventDefault(); if (kaiInput.trim()) window.location.href = "/dashboard/chat"; }}
        style={{ display: "flex", gap: 8, flex: 1 }}
    >
        <input
        value={kaiInput}
        onChange={(e) => setKaiInput(e.target.value)}
        placeholder="Ask Kai anything..."
        enterKeyHint="send"
        style={{
            flex: 1, padding: "12px 16px", borderRadius: 12,
            border: "1px solid var(--fm-border)", background: "var(--fm-surface)",
            color: "var(--fm-text)", fontSize: 14, fontFamily: "Outfit, sans-serif", outline: "none",
        }}
        />
        <button
        type="button"
        onClick={() => window.location.href = "/dashboard/chat"}
        style={{
            padding: "12px 20px", borderRadius: 12, border: "none",
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
            fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}
        >Ask Kai</button>
    </form>
    </div>
</div>
);
}