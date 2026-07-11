"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function NightReportPage() {
const [loading, setLoading] = useState(true);
const [generating, setGenerating] = useState(false);
const [report, setReport] = useState("");
const [userName, setUserName] = useState("User");
const [stats, setStats] = useState({
totalTasks: 0,
completedTasks: 0,
pendingTasks: 0,
completionRate: 0,
highCompleted: 0,
journalEntries: 0,
habitsCompleted: 0,
totalHabits: 0,
});

const hour = new Date().getHours();
const isNight = hour >= 18 || hour < 5;

useEffect(() => {
loadDayData();
}, []);

const loadDayData = async () => {
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;

setUserName(session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "User");

const today = new Date();
const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
const todayDate = today.toISOString().split("T")[0];

// Fetch tasks
const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", session.user.id);

// Fetch journal entries
const { data: journal } = await supabase
    .from("journal")
    .select("*")
    .eq("user_id", session.user.id)
    .gte("created_at", startOfDay)
    .order("created_at", { ascending: false });

// Fetch habits
let habitsCompleted = 0;
let totalHabits = 0;
try {
    const { data: habits } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", session.user.id);

    if (habits) {
    totalHabits = habits.length;
    const { data: habitLogs } = await supabase
        .from("habit_logs")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("completed_date", todayDate);

    if (habitLogs) habitsCompleted = habitLogs.length;
    }
} catch (e) {}

const totalTasks = tasks ? tasks.length : 0;
const completedTasks = tasks ? tasks.filter((t) => t.completed).length : 0;
const pendingTasks = totalTasks - completedTasks;
const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
const highCompleted = tasks ? tasks.filter((t) => t.priority === "high" && t.completed).length : 0;

setStats({
    totalTasks,
    completedTasks,
    pendingTasks,
    completionRate,
    highCompleted,
    journalEntries: journal ? journal.length : 0,
    habitsCompleted,
    totalHabits,
    tasks: tasks || [],
    journal: journal || [],
});

setLoading(false);
};

const generateReport = async () => {
setGenerating(true);

const completedList = stats.tasks
    .filter((t) => t.completed)
    .map((t) => `"${t.title}" (${t.priority})`)
    .join(", ");

const pendingList = stats.tasks
    .filter((t) => !t.completed)
    .map((t) => `"${t.title}" (${t.priority})`)
    .join(", ");

const journalMoods = stats.journal
    .map((j) => j.mood)
    .join(", ");

try {
    const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: `You are Kai, the AI copilot. Give ${userName.split(" ")[0]} a warm, thoughtful night report to end their day. Here's their data:

Tasks: ${stats.completedTasks} completed out of ${stats.totalTasks} total (${stats.completionRate}% rate).
Completed tasks: ${completedList || "none"}.
Still pending: ${pendingList || "none"}.
High-priority tasks completed: ${stats.highCompleted}.
Journal entries today: ${stats.journalEntries}. Moods: ${journalMoods || "no entries"}.
Habits completed today: ${stats.habitsCompleted} out of ${stats.totalHabits}.

Please include:
1. A warm greeting acknowledging the time of day
2. A summary of what they accomplished today (celebrate wins!)
3. What's still pending and a gentle reminder
4. How their mood/energy seemed based on journal entries
5. One specific tip for tomorrow based on today's patterns
6. A calming closing message to help them rest well

Keep it concise, warm, and supportive. Use emojis sparingly. Make it feel like a caring friend wrapping up the day with them.`,
        history: [],
    }),
    });

    const data = await response.json();
    if (data.reply) setReport(data.reply);
    else setReport("Couldn't generate your night report right now. Try again in a moment.");
} catch (e) {
    setReport("Couldn't connect to Kai. Please check your connection.");
}
setGenerating(false);
};

const getMoodEmoji = () => {
if (stats.completionRate >= 80) return "😊";
if (stats.completionRate >= 50) return "🙂";
if (stats.completionRate >= 30) return "😐";
return "😔";
};

const getDayGrade = () => {
let score = 0;
score += Math.min(stats.completionRate, 100) * 0.4;
if (stats.totalHabits > 0) score += (stats.habitsCompleted / stats.totalHabits) * 100 * 0.3;
else score += 50 * 0.3;
score += stats.journalEntries > 0 ? 15 : 0;
score += stats.highCompleted > 0 ? 15 : 0;

if (score >= 85) return { grade: "A", color: "#00CEC9", label: "Amazing day!" };
if (score >= 70) return { grade: "B", color: "#10b981", label: "Great day!" };
if (score >= 50) return { grade: "C", color: "#fdcb6e", label: "Decent day" };
if (stats.totalTasks === 0) return { grade: "—", color: "#6b6b80", label: "No data" };
return { grade: "D", color: "#ff6b6b", label: "Tomorrow is a new chance" };
};

const grade = getDayGrade();

if (loading) {
return <div style={{ padding: 40, textAlign: "center", color: "var(--fm-muted)" }}>Loading your day...</div>;
}

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ marginBottom: 20 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Kai's Night Report</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Your AI-powered daily wrap-up — see what you achieved and get tips for tomorrow</p>
    </div>

    {/* Night Header */}
    <div style={{
    background: isNight
        ? "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(116,185,255,0.08))"
        : "linear-gradient(135deg, rgba(253,203,110,0.12), rgba(225,112,85,0.08))",
    border: `1px solid ${isNight ? "rgba(16,185,129,0.2)" : "rgba(253,203,110,0.2)"}`,
    borderRadius: 16, padding: 24, marginBottom: 20, textAlign: "center",
    }}>
    <div style={{ fontSize: 48, marginBottom: 12 }}>{isNight ? "🌙" : "☀️"}</div>
    <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--fm-text)", marginBottom: 6 }}>
        {isNight ? `Good evening, ${userName.split(" ")[0]}` : `Hey ${userName.split(" ")[0]}, here's your day so far`}
    </h3>
    <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6 }}>
        {isNight
        ? "Time to wind down. Let's see how your day went and prepare for tomorrow."
        : "You can check your progress anytime. Come back tonight for your full night report!"}
    </p>
    </div>

    {/* Day Grade */}
    <div style={{
    background: `${grade.color}10`,
    border: `1px solid ${grade.color}25`,
    borderRadius: 16, padding: 24, marginBottom: 20, textAlign: "center",
    }}>
    <div style={{ fontSize: 12, color: grade.color, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 6 }}>TODAY'S SCORE</div>
    <div style={{ fontSize: 56, fontWeight: 800, color: grade.color, lineHeight: 1 }}>{grade.grade}</div>
    <div style={{ fontSize: 15, color: "var(--fm-text)", fontWeight: 600, marginTop: 8 }}>{grade.label}</div>
    </div>

    {/* Stats Grid */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 20 }}>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Tasks done</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "var(--fm-success)" }}>{stats.completedTasks}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>of {stats.totalTasks}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Completion</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "var(--fm-accent-light)" }}>{stats.completionRate}%</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>rate</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Habits</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: stats.habitsCompleted === stats.totalHabits && stats.totalHabits > 0 ? "#00CEC9" : "var(--fm-warning)" }}>{stats.habitsCompleted}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>of {stats.totalHabits}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Mood</div>
        <div style={{ fontSize: 28 }}>{getMoodEmoji()}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>{stats.journalEntries} entries</div>
    </div>
    </div>

    {/* Pending Tasks */}
    {stats.pendingTasks > 0 && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid rgba(253,203,110,0.2)",
        borderRadius: 14, padding: 18, marginBottom: 16,
    }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-warning)", marginBottom: 12 }}>
        Still pending for tomorrow ({stats.pendingTasks})
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {stats.tasks.filter((t) => !t.completed).map((task) => (
            <div key={task.id} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
            background: "var(--fm-card)", borderRadius: 8,
            }}>
            <div style={{ width: 14, height: 14, borderRadius: 4, border: "2px solid var(--fm-muted)", flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "var(--fm-text)", flex: 1 }}>{task.title}</span>
            <span style={{
                fontSize: 10, padding: "2px 8px", borderRadius: 10,
                background: task.priority === "high" ? "rgba(255,107,107,0.1)" : "rgba(253,203,110,0.1)",
                color: task.priority === "high" ? "#ff6b6b" : "#fdcb6e",
            }}>{task.priority}</span>
            </div>
        ))}
        </div>
    </div>
    )}

    {/* Completed Tasks */}
    {stats.completedTasks > 0 && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid rgba(0,206,201,0.15)",
        borderRadius: 14, padding: 18, marginBottom: 16,
    }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-success)", marginBottom: 12 }}>
        Wins today ({stats.completedTasks})
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {stats.tasks.filter((t) => t.completed).map((task) => (
            <div key={task.id} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
            background: "var(--fm-card)", borderRadius: 8,
            }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00CEC9" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            <span style={{ fontSize: 13, color: "var(--fm-muted)", flex: 1, textDecoration: "line-through" }}>{task.title}</span>
            </div>
        ))}
        </div>
    </div>
    )}

    {/* Kai's Report */}
    {report ? (
    <div style={{
        background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)",
        borderRadius: 14, padding: 20, marginBottom: 16,
    }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, #10b981, #34d399)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
        </div>
        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-accent-light)" }}>Kai's night report</span>
        </div>
        <div style={{ fontSize: 14, color: "var(--fm-text)", lineHeight: 1.8, whiteSpace: "pre-line" }}>{report}</div>
    </div>
    ) : (
    <div style={{ textAlign: "center" }}>
        <button onClick={generateReport} disabled={generating} style={{
        padding: "14px 32px", borderRadius: 14, border: "none",
        background: generating ? "var(--fm-muted)" : "linear-gradient(135deg, #10b981, #34d399)",
        color: "#fff", fontSize: 15, fontWeight: 700,
        cursor: generating ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
        display: "inline-flex", alignItems: "center", gap: 8,
        }}>
        {generating ? (
            <>
            <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            Kai is reviewing your day...
            </>
        ) : (
            <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            Generate night report
            </>
        )}
        </button>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
    )}

    {/* Wind Down Suggestion */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: 18, marginTop: 16, textAlign: "center",
    }}>
    <div style={{ fontSize: 24, marginBottom: 8 }}>🧘</div>
    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 6 }}>Ready to wind down?</div>
    <div style={{ fontSize: 13, color: "var(--fm-muted)", marginBottom: 14 }}>Try Zen Mode for a calming session before bed</div>
    <button onClick={() => window.location.href = "/dashboard/zen"} style={{
        padding: "10px 24px", borderRadius: 10, border: "none",
        background: "rgba(116,185,255,0.1)", color: "#74b9ff",
        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        border: "1px solid rgba(116,185,255,0.2)",
    }}>Open Zen Mode</button>
    </div>
</div>
);
}