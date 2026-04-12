"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const timeframes = [
{ id: "weekly", label: "This Week", emoji: "📅", color: "#6C5CE7" },
{ id: "monthly", label: "This Month", emoji: "🗓", color: "#00CEC9" },
{ id: "yearly", label: "This Year", emoji: "🎯", color: "#fd79a8" },
];

const goalColors = ["#6C5CE7", "#00CEC9", "#fd79a8", "#fdcb6e", "#00b894", "#e17055", "#74b9ff", "#a29bfe", "#ff6b6b", "#55efc4"];

export default function GoalsPage() {
const [goals, setGoals] = useState([]);
const [loading, setLoading] = useState(true);
const [activeTab, setActiveTab] = useState("weekly");
const [showAdd, setShowAdd] = useState(false);
const [newTitle, setNewTitle] = useState("");
const [newDescription, setNewDescription] = useState("");
const [newTimeframe, setNewTimeframe] = useState("weekly");
const [newTarget, setNewTarget] = useState(100);
const [newColor, setNewColor] = useState("#6C5CE7");
const [kaiMessage, setKaiMessage] = useState("");
const [generatingKai, setGeneratingKai] = useState(false);

useEffect(() => { fetchGoals(); }, []);

const fetchGoals = async () => {
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;
const { data } = await supabase.from("goals").select("*").eq("user_id", session.user.id).order("created_at", { ascending: false });
if (data) setGoals(data);
setLoading(false);
};

const addGoal = async () => {
if (!newTitle.trim()) return;
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;
const { data, error } = await supabase.from("goals").insert([{ title: newTitle.trim(), description: newDescription.trim(), timeframe: newTimeframe, target: newTarget, progress: 0, status: "active", color: newColor, user_id: session.user.id }]).select();
if (!error && data) {
    setGoals([data[0], ...goals]);
    setNewTitle(""); setNewDescription(""); setNewTimeframe("weekly"); setNewTarget(100); setNewColor("#6C5CE7"); setShowAdd(false);
}
};

const updateProgress = async (id, newProgress) => {
const goal = goals.find((g) => g.id === id);
const clamped = Math.max(0, Math.min(newProgress, goal?.target || 100));
const newStatus = clamped >= (goal?.target || 100) ? "completed" : "active";
await supabase.from("goals").update({ progress: clamped, status: newStatus }).eq("id", id);
setGoals(goals.map((g) => g.id === id ? { ...g, progress: clamped, status: newStatus } : g));
};

const deleteGoal = async (id) => {
if (!confirm("Delete this goal?")) return;
await supabase.from("goals").delete().eq("id", id);
setGoals(goals.filter((g) => g.id !== id));
};

const resetGoal = async (id) => {
await supabase.from("goals").update({ progress: 0, status: "active" }).eq("id", id);
setGoals(goals.map((g) => g.id === id ? { ...g, progress: 0, status: "active" } : g));
};

const filteredGoals = goals.filter((g) => g.timeframe === activeTab);
const activeGoals = filteredGoals.filter((g) => g.status === "active");
const completedGoals = filteredGoals.filter((g) => g.status === "completed");
const totalGoals = goals.filter((g) => g.status === "active").length;
const totalCompleted = goals.filter((g) => g.status === "completed").length;
const overallRate = (totalGoals + totalCompleted) > 0 ? Math.round((totalCompleted / (totalGoals + totalCompleted)) * 100) : 0;

const generateKaiAdvice = async () => {
if (goals.length === 0) return;
setGeneratingKai(true);
const goalsList = goals.filter((g) => g.status === "active").map((g) => `"${g.title}" (${g.timeframe}, ${g.progress}/${g.target} = ${Math.round((g.progress / g.target) * 100)}%)`).join(", ");
const completedList = goals.filter((g) => g.status === "completed").map((g) => `"${g.title}" (${g.timeframe})`).join(", ");
try {
    const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: `Analyze my goals and give me advice. Active goals: ${goalsList || "none"}. Completed goals: ${completedList || "none"}. Give me: 1) Which goal I should focus on RIGHT NOW and why, 2) One specific tip to make faster progress on my most behind goal, 3) A motivating message about my overall progress. Keep it concise and actionable.`, history: [] }) });
    const data = await response.json();
    if (data.reply) setKaiMessage(data.reply);
} catch (e) { setKaiMessage("Couldn't connect to Kai right now. Try again in a moment!"); }
setGeneratingKai(false);
};

if (loading) return <div style={{ padding: 40, textAlign: "center", color: "var(--fm-muted)" }}>Loading goals...</div>;

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Goal Setting</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Define your weekly, monthly, and yearly goals — track progress and crush them</p>
    </div>
    <button onClick={() => setShowAdd(!showAdd)} style={{ padding: "8px 18px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}>{showAdd ? "Cancel" : "+ New Goal"}</button>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 16 }}>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Active goals</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "var(--fm-accent-light)" }}>{totalGoals}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Completed</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "var(--fm-success)" }}>{totalCompleted}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Success rate</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: overallRate >= 50 ? "#00CEC9" : "var(--fm-warning)" }}>{overallRate}%</div>
    </div>
    </div>

    <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
    {timeframes.map((tf) => {
        const count = goals.filter((g) => g.timeframe === tf.id).length;
        return (
        <button key={tf.id} onClick={() => setActiveTab(tf.id)} style={{ flex: 1, padding: "10px 8px", borderRadius: 10, fontSize: 13, fontWeight: 600, border: activeTab === tf.id ? `1px solid ${tf.color}40` : "1px solid var(--fm-border)", background: activeTab === tf.id ? `${tf.color}15` : "var(--fm-surface)", color: activeTab === tf.id ? tf.color : "var(--fm-muted)", cursor: "pointer", fontFamily: "Outfit, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <span style={{ fontSize: 16 }}>{tf.emoji}</span>{tf.label} ({count})
        </button>
        );
    })}
    </div>

    {showAdd && (
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>Create new goal</div>
        <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Read 4 books, Save $1000, Run 50 miles..." style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)", background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14, fontFamily: "Outfit, sans-serif", outline: "none", marginBottom: 10, boxSizing: "border-box" }} />
        <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Why is this goal important to you? (optional)" rows={2} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)", background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13, fontFamily: "Outfit, sans-serif", outline: "none", resize: "none", marginBottom: 12, boxSizing: "border-box" }} />
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
        <div style={{ flex: 1, minWidth: 140 }}>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Timeframe</div>
            <select value={newTimeframe} onChange={(e) => setNewTimeframe(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)", background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13, fontFamily: "Outfit, sans-serif", outline: "none" }}>
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="yearly">This Year</option>
            </select>
        </div>
        <div style={{ flex: 1, minWidth: 140 }}>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Target (number)</div>
            <input type="number" value={newTarget} onChange={(e) => setNewTarget(parseInt(e.target.value) || 100)} min="1" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)", background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13, fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box" }} />
        </div>
        </div>
        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 8 }}>Color</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {goalColors.map((c) => (
            <div key={c} onClick={() => setNewColor(c)} style={{ width: 30, height: 30, borderRadius: 8, background: c, cursor: "pointer", border: newColor === c ? "3px solid var(--fm-text)" : "3px solid transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {newColor === c && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
            </div>
        ))}
        </div>
        <button onClick={addGoal} disabled={!newTitle.trim()} style={{ width: "100%", padding: "12px", borderRadius: 12, border: "none", background: newTitle.trim() ? "linear-gradient(135deg, #6C5CE7, #a29bfe)" : "var(--fm-muted)", color: "#fff", fontSize: 14, fontWeight: 600, cursor: newTitle.trim() ? "pointer" : "not-allowed", fontFamily: "Outfit, sans-serif" }}>Create Goal</button>
    </div>
    )}

    {filteredGoals.length === 0 ? (
    <div style={{ textAlign: "center", padding: 50, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16 }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🎯</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--fm-text)", marginBottom: 8 }}>No {activeTab} goals yet</h3>
        <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto" }}>Set a goal and track your progress. What do you want to achieve?</p>
    </div>
    ) : (
    <div>
        {activeGoals.length > 0 && (
        <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 10 }}>Active ({activeGoals.length})</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {activeGoals.map((goal) => {
                const pct = goal.target > 0 ? Math.round((goal.progress / goal.target) * 100) : 0;
                return (
                <div key={goal.id} style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 18, borderLeft: `4px solid ${goal.color}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 2 }}>{goal.title}</div>
                        {goal.description && <div style={{ fontSize: 12, color: "var(--fm-muted)", lineHeight: 1.5 }}>{goal.description}</div>}
                    </div>
                    <div onClick={() => deleteGoal(goal.id)} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 4, marginLeft: 10 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </div>
                    </div>
                    <div style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 12, color: "var(--fm-muted)" }}>{goal.progress} / {goal.target}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: goal.color }}>{pct}%</span>
                    </div>
                    <div style={{ background: "var(--fm-card)", borderRadius: 6, height: 10, overflow: "hidden" }}>
                        <div style={{ height: "100%", borderRadius: 6, width: `${Math.min(pct, 100)}%`, background: `linear-gradient(135deg, ${goal.color}, ${goal.color}aa)`, transition: "width 0.5s ease" }} />
                    </div>
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <button onClick={() => updateProgress(goal.id, goal.progress - 1)} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--fm-border)", background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Outfit, sans-serif" }}>-</button>
                    <input type="number" value={goal.progress} onChange={(e) => updateProgress(goal.id, parseInt(e.target.value) || 0)} min="0" max={goal.target} style={{ width: 60, padding: "6px 8px", borderRadius: 8, border: "1px solid var(--fm-border)", background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14, fontFamily: "Outfit, sans-serif", outline: "none", textAlign: "center" }} />
                    <button onClick={() => updateProgress(goal.id, goal.progress + 1)} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--fm-border)", background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Outfit, sans-serif" }}>+</button>
                    <button onClick={() => updateProgress(goal.id, goal.target)} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: `${goal.color}15`, color: goal.color, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif", marginLeft: "auto" }}>Complete</button>
                    </div>
                </div>
                );
            })}
            </div>
        </div>
        )}

        {completedGoals.length > 0 && (
        <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-success)", marginBottom: 10 }}>Completed ({completedGoals.length})</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {completedGoals.map((goal) => (
                <div key={goal.id} style={{ background: "rgba(0,206,201,0.05)", border: "1px solid rgba(0,206,201,0.15)", borderRadius: 12, padding: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00CEC9" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "var(--fm-text)", textDecoration: "line-through" }}>{goal.title}</div>
                    <div style={{ fontSize: 11, color: "var(--fm-muted)" }}>{goal.target} / {goal.target} — 100%</div>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    <div onClick={() => resetGoal(goal.id)} style={{ fontSize: 11, color: "var(--fm-muted)", cursor: "pointer" }}>Reset</div>
                    <div onClick={() => deleteGoal(goal.id)} style={{ fontSize: 11, color: "var(--fm-danger)", cursor: "pointer" }}>Delete</div>
                </div>
                </div>
            ))}
            </div>
        </div>
        )}
    </div>
    )}

    {goals.length > 0 && (
    kaiMessage ? (
        <div style={{ background: "rgba(108,92,231,0.08)", border: "1px solid rgba(108,92,231,0.15)", borderRadius: 14, padding: 20, marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-accent-light)" }}>Kai's goal advice</span>
        </div>
        <div style={{ fontSize: 14, color: "var(--fm-text)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{kaiMessage}</div>
        </div>
    ) : (
        <div style={{ textAlign: "center", marginTop: 16 }}>
        <button onClick={generateKaiAdvice} disabled={generatingKai} style={{ padding: "14px 28px", borderRadius: 14, border: "none", background: generatingKai ? "var(--fm-muted)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: generatingKai ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif", display: "inline-flex", alignItems: "center", gap: 8 }}>
            {generatingKai ? (
            <>
                <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                Kai is analyzing your goals...
            </>
            ) : (
            <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
                Get Kai's advice
            </>
            )}
        </button>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )
    )}
</div>
);
}