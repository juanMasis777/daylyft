"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const habitIcons = [
{ icon: "💪", label: "Exercise" },
{ icon: "📚", label: "Reading" },
{ icon: "🧘", label: "Meditation" },
{ icon: "💧", label: "Water" },
{ icon: "🛌", label: "Sleep" },
{ icon: "🥗", label: "Healthy food" },
{ icon: "📝", label: "Journal" },
{ icon: "🚶", label: "Walk" },
{ icon: "💊", label: "Vitamins" },
{ icon: "📵", label: "No phone" },
{ icon: "🎯", label: "Focus" },
{ icon: "😊", label: "Gratitude" },
];

const habitColors = ["#6C5CE7", "#00CEC9", "#fd79a8", "#fdcb6e", "#00b894", "#e17055", "#74b9ff", "#a29bfe", "#ff6b6b", "#55efc4"];

export default function HabitsPage() {
const [habits, setHabits] = useState([]);
const [logs, setLogs] = useState([]);
const [loading, setLoading] = useState(true);
const [showAdd, setShowAdd] = useState(false);
const [newTitle, setNewTitle] = useState("");
const [newIcon, setNewIcon] = useState("💪");
const [newColor, setNewColor] = useState("#6C5CE7");

const today = new Date().toISOString().split("T")[0];
const last7Days = Array.from({ length: 7 }, (_, i) => {
const d = new Date();
d.setDate(d.getDate() - (6 - i));
return d.toISOString().split("T")[0];
});

const dayLabels = last7Days.map((d) => {
const date = new Date(d + "T12:00:00");
return date.toLocaleDateString("en-US", { weekday: "short" });
});

useEffect(() => {
loadData();
}, []);

const loadData = async () => {
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;

const { data: habitsData } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: true });

const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

const { data: logsData } = await supabase
    .from("habit_logs")
    .select("*")
    .eq("user_id", session.user.id)
    .gte("completed_date", sevenDaysAgo.toISOString().split("T")[0]);

if (habitsData) setHabits(habitsData);
if (logsData) setLogs(logsData);
setLoading(false);
};

const addHabit = async () => {
if (!newTitle.trim()) return;
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;

const { data, error } = await supabase
    .from("habits")
    .insert([{ title: newTitle.trim(), icon: newIcon, color: newColor, user_id: session.user.id }])
    .select();

if (!error && data) {
    setHabits([...habits, data[0]]);
    setNewTitle("");
    setNewIcon("💪");
    setNewColor("#6C5CE7");
    setShowAdd(false);
}
};

const deleteHabit = async (id) => {
if (!confirm("Delete this habit and all its history?")) return;
await supabase.from("habit_logs").delete().eq("habit_id", id);
await supabase.from("habits").delete().eq("id", id);
setHabits(habits.filter((h) => h.id !== id));
setLogs(logs.filter((l) => l.habit_id !== id));
};

const toggleLog = async (habitId, date) => {
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;

const existing = logs.find((l) => l.habit_id === habitId && l.completed_date === date);

if (existing) {
    await supabase.from("habit_logs").delete().eq("id", existing.id);
    setLogs(logs.filter((l) => l.id !== existing.id));
} else {
    const { data, error } = await supabase
    .from("habit_logs")
    .insert([{ habit_id: habitId, completed_date: date, user_id: session.user.id }])
    .select();

    if (!error && data) {
    setLogs([...logs, data[0]]);
    }
}
};

const isCompleted = (habitId, date) => {
return logs.some((l) => l.habit_id === habitId && l.completed_date === date);
};

const getStreak = (habitId) => {
let streak = 0;
const d = new Date();
while (true) {
    const dateStr = d.toISOString().split("T")[0];
    if (logs.some((l) => l.habit_id === habitId && l.completed_date === dateStr)) {
    streak++;
    d.setDate(d.getDate() - 1);
    } else {
    break;
    }
}
return streak;
};

const getWeekCompletions = (habitId) => {
return last7Days.filter((d) => isCompleted(habitId, d)).length;
};

const todayTotal = habits.length;
const todayDone = habits.filter((h) => isCompleted(h.id, today)).length;
const todayRate = todayTotal > 0 ? Math.round((todayDone / todayTotal) * 100) : 0;

if (loading) {
return <div style={{ padding: 40, textAlign: "center", color: "var(--fm-muted)" }}>Loading habits...</div>;
}

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Habit Tracker</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Build daily habits, track your streaks, and become the best version of yourself</p>
    </div>
    <button onClick={() => setShowAdd(!showAdd)} style={{
        padding: "8px 18px", borderRadius: 10, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>{showAdd ? "Cancel" : "+ New Habit"}</button>
    </div>

    {/* Today's Progress */}
    <div style={{
    background: "linear-gradient(135deg, rgba(108,92,231,0.12), rgba(0,206,201,0.08))",
    border: "1px solid rgba(108,92,231,0.2)",
    borderRadius: 16, padding: 20, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
    <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 4 }}>Today's progress</div>
        <div style={{ fontSize: 13, color: "var(--fm-muted)" }}>{todayDone} of {todayTotal} habits completed</div>
    </div>
    <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 32, fontWeight: 800, color: todayRate === 100 ? "#00CEC9" : todayRate >= 50 ? "#6C5CE7" : "var(--fm-muted)" }}>{todayRate}%</div>
        {todayRate === 100 && todayTotal > 0 && <div style={{ fontSize: 11, color: "#00CEC9", fontWeight: 600 }}>Perfect day!</div>}
    </div>
    </div>

    {/* Progress Bar */}
    {todayTotal > 0 && (
    <div style={{ background: "var(--fm-card)", borderRadius: 8, height: 8, marginBottom: 20, overflow: "hidden" }}>
        <div style={{
        height: "100%", borderRadius: 8,
        width: `${todayRate}%`,
        background: todayRate === 100 ? "linear-gradient(135deg, #00CEC9, #55efc4)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        transition: "width 0.5s ease",
        }} />
    </div>
    )}

    {/* Add Habit Form */}
    {showAdd && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 20, marginBottom: 16,
    }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>Create new habit</div>

        <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Exercise 30 minutes, Read 10 pages, Meditate..." style={{
        width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
        fontFamily: "Outfit, sans-serif", outline: "none", marginBottom: 14, boxSizing: "border-box",
        }} />

        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--fm-muted)", marginBottom: 8 }}>Choose an icon</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {habitIcons.map((h) => (
            <div key={h.icon} onClick={() => setNewIcon(h.icon)} style={{
            width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, cursor: "pointer",
            background: newIcon === h.icon ? "rgba(108,92,231,0.1)" : "var(--fm-card)",
            border: newIcon === h.icon ? "1px solid rgba(108,92,231,0.3)" : "1px solid var(--fm-border)",
            }}>{h.icon}</div>
        ))}
        </div>

        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--fm-muted)", marginBottom: 8 }}>Choose a color</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {habitColors.map((c) => (
            <div key={c} onClick={() => setNewColor(c)} style={{
            width: 32, height: 32, borderRadius: 8, background: c, cursor: "pointer",
            border: newColor === c ? "3px solid var(--fm-text)" : "3px solid transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            }}>
            {newColor === c && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
            </div>
        ))}
        </div>

        <button onClick={addHabit} disabled={!newTitle.trim()} style={{
        width: "100%", padding: "12px", borderRadius: 12, border: "none",
        background: newTitle.trim() ? "linear-gradient(135deg, #6C5CE7, #a29bfe)" : "var(--fm-muted)",
        color: "#fff", fontSize: 14, fontWeight: 600,
        cursor: newTitle.trim() ? "pointer" : "not-allowed", fontFamily: "Outfit, sans-serif",
        }}>Create Habit</button>
    </div>
    )}

    {/* Habits List */}
    {habits.length === 0 ? (
    <div style={{
        textAlign: "center", padding: 50,
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 16,
    }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--fm-text)", marginBottom: 8 }}>No habits yet</h3>
        <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto" }}>
        Create your first habit and start building consistency. Small daily actions lead to big results!
        </p>
    </div>
    ) : (
    <div>
        {/* Week Header */}
        <div style={{
        display: "grid", gridTemplateColumns: "1fr repeat(7, 36px) 60px",
        gap: 4, alignItems: "center", padding: "0 14px", marginBottom: 8,
        }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--fm-muted)" }}>Habit</div>
        {dayLabels.map((d, i) => (
            <div key={i} style={{
            fontSize: 10, fontWeight: 600, textAlign: "center",
            color: last7Days[i] === today ? "var(--fm-accent-light)" : "var(--fm-muted)",
            }}>{d}</div>
        ))}
        <div style={{ fontSize: 10, fontWeight: 600, textAlign: "center", color: "var(--fm-muted)" }}>Streak</div>
        </div>

        {/* Habit Rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {habits.map((habit) => {
            const streak = getStreak(habit.id);
            const weekDone = getWeekCompletions(habit.id);
            return (
            <div key={habit.id} style={{
                display: "grid", gridTemplateColumns: "1fr repeat(7, 36px) 60px",
                gap: 4, alignItems: "center", padding: "10px 14px",
                background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
                borderRadius: 12,
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, overflow: "hidden" }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{habit.icon}</span>
                <div style={{ overflow: "hidden" }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--fm-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{habit.title}</div>
                    <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>{weekDone}/7 this week</div>
                </div>
                </div>

                {last7Days.map((date) => {
                const done = isCompleted(habit.id, date);
                return (
                    <div key={date} onClick={() => toggleLog(habit.id, date)} style={{
                    width: 32, height: 32, borderRadius: 8, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: done ? `${habit.color}20` : "var(--fm-card)",
                    border: done ? `1px solid ${habit.color}40` : "1px solid var(--fm-border)",
                    transition: "all 0.2s ease",
                    }}>
                    {done && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={habit.color} strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                        </svg>
                    )}
                    </div>
                );
                })}

                <div style={{ textAlign: "center" }}>
                <div style={{
                    fontSize: 16, fontWeight: 700,
                    color: streak >= 7 ? "#00CEC9" : streak >= 3 ? habit.color : "var(--fm-muted)",
                }}>{streak}d</div>
                {streak >= 7 && <div style={{ fontSize: 9, color: "#00CEC9" }}>🔥</div>}
                </div>
            </div>
            );
        })}
        </div>

        {/* Delete Section */}
        <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 18, marginTop: 16,
        }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>Manage habits</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {habits.map((habit) => (
            <div key={habit.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "8px 12px", background: "var(--fm-card)", borderRadius: 8,
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>{habit.icon}</span>
                <span style={{ fontSize: 13, color: "var(--fm-text)" }}>{habit.title}</span>
                </div>
                <div onClick={() => deleteHabit(habit.id)} style={{
                cursor: "pointer", color: "var(--fm-danger)", fontSize: 11, fontWeight: 500,
                }}>Delete</div>
            </div>
            ))}
        </div>
        </div>
    </div>
    )}
</div>
);
}