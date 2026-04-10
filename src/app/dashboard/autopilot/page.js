"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AutopilotPage() {
const [tasks, setTasks] = useState([]);
const [plan, setPlan] = useState("");
const [loading, setLoading] = useState(true);
const [generating, setGenerating] = useState(false);
const [generated, setGenerated] = useState(false);
const [userName, setUserName] = useState("User");

const hour = new Date().getHours();
const timeOfDay = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";

useEffect(() => {
loadData();
}, []);

const loadData = async () => {
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;

setUserName(session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "User");

const { data } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", session.user.id)
    .eq("completed", false)
    .order("created_at", { ascending: true });

if (data) setTasks(data);
setLoading(false);
};

const generatePlan = async () => {
if (tasks.length === 0) return;
setGenerating(true);

const taskList = tasks.map((t, i) => `${i + 1}. "${t.title}" (priority: ${t.priority}, category: ${t.category})`).join("\n");

try {
    const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: `You are planning my day. Here are my pending tasks:\n${taskList}\n\nCreate an optimized daily schedule for me. For each task, suggest a specific time slot and explain WHY you put it there (e.g., "high-focus tasks in the morning when energy is highest"). Include 2-3 short breaks. Format it clearly with times and emojis. Keep it practical and motivating. Address me as ${userName.split(" ")[0]}.`,
        history: [],
    }),
    });

    const data = await response.json();
    if (data.reply) {
    setPlan(data.reply);
    setGenerated(true);
    } else {
    setPlan("Sorry, I couldn't generate a plan right now. Please try again.");
    }
} catch (e) {
    setPlan("Couldn't connect to Kai. Please check your connection and try again.");
}

setGenerating(false);
};

const regenerate = () => {
setPlan("");
setGenerated(false);
generatePlan();
};

if (loading) {
return <div style={{ padding: 40, textAlign: "center", color: "var(--fm-muted)" }}>Loading your tasks...</div>;
}

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ marginBottom: 20 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Morning Autopilot</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Kai analyzes your tasks and creates an optimized schedule for your {timeOfDay}</p>
    </div>

    <div style={{
    background: "linear-gradient(135deg, rgba(108,92,231,0.12), rgba(0,206,201,0.08))",
    border: "1px solid rgba(108,92,231,0.2)",
    borderRadius: 16, padding: 24, marginBottom: 20, textAlign: "center",
    }}>
    <div style={{ fontSize: 40, marginBottom: 12 }}>
        {hour < 12 ? "🌅" : hour < 18 ? "☀️" : "🌙"}
    </div>
    <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", marginBottom: 6 }}>
        Good {timeOfDay}, {userName.split(" ")[0]}!
    </h3>
    <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6, marginBottom: 4 }}>
        {tasks.length === 0
        ? "You don't have any pending tasks. Add some tasks first and come back!"
        : `You have ${tasks.length} pending task${tasks.length !== 1 ? "s" : ""}. Let Kai create the perfect plan for your ${timeOfDay}.`
        }
    </p>
    </div>

    {tasks.length > 0 && !generated && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 18, marginBottom: 20,
    }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>
        Your pending tasks ({tasks.length})
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {tasks.map((task) => (
            <div key={task.id} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", background: "var(--fm-card)",
            borderRadius: 10,
            }}>
            <span style={{
                fontSize: 10, padding: "2px 8px", borderRadius: 10, flexShrink: 0,
                background: task.priority === "high" ? "rgba(255,107,107,0.1)" : task.priority === "low" ? "rgba(0,206,201,0.1)" : "rgba(253,203,110,0.1)",
                color: task.priority === "high" ? "#ff6b6b" : task.priority === "low" ? "#00CEC9" : "#fdcb6e",
                border: `1px solid ${task.priority === "high" ? "rgba(255,107,107,0.2)" : task.priority === "low" ? "rgba(0,206,201,0.2)" : "rgba(253,203,110,0.2)"}`,
            }}>{task.priority}</span>
            <span style={{ fontSize: 13, color: "var(--fm-text)", flex: 1 }}>{task.title}</span>
            <span style={{
                fontSize: 10, padding: "2px 8px", borderRadius: 10,
                background: "rgba(108,92,231,0.1)", color: "var(--fm-accent-light)",
                textTransform: "capitalize",
            }}>{task.category}</span>
            </div>
        ))}
        </div>
    </div>
    )}

    {tasks.length > 0 && !generated && (
    <div style={{ textAlign: "center", marginBottom: 20 }}>
        <button onClick={generatePlan} disabled={generating} style={{
        padding: "14px 32px", borderRadius: 14, border: "none",
        background: generating ? "var(--fm-muted)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        color: "#fff", fontSize: 15, fontWeight: 700,
        cursor: generating ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
        display: "inline-flex", alignItems: "center", gap: 8,
        }}>
        {generating ? (
            <>
            <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            Kai is planning your day...
            </>
        ) : (
            <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            Generate my plan
            </>
        )}
        </button>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
    )}

    {tasks.length === 0 && (
    <div style={{ textAlign: "center", padding: 30 }}>
        <button onClick={() => window.location.href = "/dashboard/tasks"} style={{
        padding: "12px 24px", borderRadius: 12, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Add tasks first</button>
    </div>
    )}

    {generated && plan && (
    <div>
        <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 16, padding: 24, marginBottom: 16,
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            display: "flex", alignItems: "center", justifyContent: "center",
            }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            </div>
            <span style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)" }}>Kai's plan for your {timeOfDay}</span>
        </div>
        <div style={{
            fontSize: 14, color: "var(--fm-text)", lineHeight: 1.8,
            whiteSpace: "pre-line",
        }}>
            {plan}
        </div>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={regenerate} style={{
            padding: "10px 20px", borderRadius: 10,
            border: "1px solid var(--fm-border)", background: "var(--fm-surface)",
            color: "var(--fm-text)", fontSize: 13, fontWeight: 500,
            cursor: "pointer", fontFamily: "Outfit, sans-serif",
            display: "flex", alignItems: "center", gap: 6,
        }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
            Regenerate plan
        </button>
        <button onClick={() => window.location.href = "/dashboard/tasks"} style={{
            padding: "10px 20px", borderRadius: 10, border: "none",
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
            fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Start working on tasks</button>
        </div>
    </div>
    )}
</div>
);
}