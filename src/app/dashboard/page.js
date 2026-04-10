"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
const router = useRouter();
const [tasks, setTasks] = useState([]);
const [quickInput, setQuickInput] = useState("");
const [kaiText, setKaiText] = useState("");
const [kaiDone, setKaiDone] = useState(false);
const [loading, setLoading] = useState(true);

const fullMessage = "Good morning! I've analyzed your schedule and organized your day by priority. You have tasks pending — let's get started. What would you like to focus on first?";

useEffect(() => {
fetchTasks();
let i = 0;
const interval = setInterval(() => {
    setKaiText(fullMessage.slice(0, i + 1));
    i++;
    if (i >= fullMessage.length) { clearInterval(interval); setKaiDone(true); }
}, 22);
return () => clearInterval(interval);
}, []);

const fetchTasks = async () => {
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;
const today = new Date().toISOString().split("T")[0];
const { data } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", session.user.id)
    .eq("due_date", today)
    .order("created_at", { ascending: false })
    .limit(6);
if (data) setTasks(data);
setLoading(false);
};

const toggleTask = async (id, done) => {
await supabase.from("tasks").update({ completed: !done }).eq("id", id);
setTasks(tasks.map((t) => t.id === id ? { ...t, completed: !done } : t));
};

const sendToKai = () => {
if (!quickInput.trim()) return;
router.push(`/dashboard/chat?q=${encodeURIComponent(quickInput.trim())}`);
};

const completedCount = tasks.filter((t) => t.completed).length;
const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;
const priorityColors = { high: "var(--fm-danger)", med: "var(--fm-warning)", medium: "var(--fm-warning)", low: "var(--fm-success)" };

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>

    {/* Kai Briefing */}
    <div style={{ background: "linear-gradient(135deg, rgba(108,92,231,0.12), rgba(0,206,201,0.08))", border: "1px solid rgba(108,92,231,0.3)", borderRadius: 16, padding: "18px 20px", marginBottom: 20, display: "flex", gap: 14, alignItems: "flex-start" }}>
    <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
    </div>
    <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, color: "var(--fm-accent-light)", fontWeight: 600, marginBottom: 6 }}>KAI · Daily Briefing</div>
        <div style={{ fontSize: 14, color: "var(--fm-text)", lineHeight: 1.6 }}>
        {kaiText}
        {!kaiDone && <span style={{ display: "inline-block", width: 2, height: 14, background: "var(--fm-accent)", marginLeft: 2, animation: "blink 1s step-end infinite", verticalAlign: "middle" }} />}
        </div>
        {kaiDone && (
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button onClick={() => router.push("/dashboard/chat")} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: "var(--fm-accent)", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}>Ask Kai</button>
            <button onClick={() => router.push("/dashboard/tasks")} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid var(--fm-border)", background: "transparent", color: "var(--fm-muted)", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}>View tasks</button>
        </div>
        )}
    </div>
    </div>

    {/* Stats */}
    <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
    {[
        { label: "Tasks today", value: tasks.length > 0 ? `${completedCount}/${tasks.length}` : "—", sub: tasks.length > 0 ? `${progress}% done` : "No tasks today", color: "var(--fm-accent)" },
        { label: "Focus time", value: "3.2h", sub: "↑ 18% vs avg", color: "var(--fm-teal)" },
        { label: "Streak", value: "7 🔥", sub: "days in a row", color: "var(--fm-warning)" },
    ].map((s, i) => (
        <div key={i} style={{ background: "var(--fm-card)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 16, flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>{s.label}</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginTop: 4 }}>{s.sub}</div>
        </div>
    ))}
    </div>

    {/* Progress Bar */}
    {tasks.length > 0 && (
    <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: "var(--fm-muted)" }}>Daily progress</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--fm-accent)" }}>{progress}%</span>
        </div>
        <div style={{ height: 6, background: "var(--fm-border)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #6C5CE7, #00CEC9)", borderRadius: 99, transition: "width 0.6s ease" }} />
        </div>
    </div>
    )}

    {/* Today's Tasks */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
    <span style={{ fontSize: 16, fontWeight: 600, color: "var(--fm-text)" }}>Today's tasks</span>
    <span onClick={() => router.push("/dashboard/tasks")} style={{ fontSize: 12, color: "var(--fm-accent-light)", cursor: "pointer" }}>View all →</span>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
    {loading ? (
        <div style={{ padding: 20, textAlign: "center", color: "var(--fm-muted)", fontSize: 13 }}>Loading tasks...</div>
    ) : tasks.length === 0 ? (
        <div style={{ padding: 20, textAlign: "center", color: "var(--fm-muted)", fontSize: 13, background: "var(--fm-card)", borderRadius: 12, border: "1px solid var(--fm-border)" }}>
        No tasks for today. <span onClick={() => router.push("/dashboard/tasks")} style={{ color: "var(--fm-accent-light)", cursor: "pointer" }}>Add one →</span>
        </div>
    ) : tasks.map((task) => (
        <div key={task.id} onClick={() => toggleTask(task.id, task.completed)}
        style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "var(--fm-card)", border: "1px solid var(--fm-border)", borderRadius: 12, cursor: "pointer", opacity: task.completed ? 0.6 : 1, transition: "all 0.2s" }}>
        <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${task.completed ? "var(--fm-accent)" : "var(--fm-border)"}`, background: task.completed ? "var(--fm-accent)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
            {task.completed && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--fm-text)", textDecoration: task.completed ? "line-through" : "none" }}>{task.title}</div>
        </div>
        {task.priority && (
            <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 20, background: `${priorityColors[task.priority] || "var(--fm-muted)"}18`, color: priorityColors[task.priority] || "var(--fm-muted)", textTransform: "uppercase" }}>
            {task.priority}
            </span>
        )}
        </div>
    ))}
    </div>

    {/* Ask Kai */}
    <div style={{ background: "var(--fm-card)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 16 }}>
    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>Ask Kai anything</div>
    <div style={{ display: "flex", gap: 8 }}>
        <input
        value={quickInput}
        onChange={(e) => setQuickInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendToKai()}
        placeholder="e.g. 'Optimize my day' or 'Add a task for tomorrow'"
        style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)", background: "var(--fm-surface)", color: "var(--fm-text)", fontSize: 13, fontFamily: "Outfit, sans-serif", outline: "none" }}
        />
        <button onClick={sendToKai} style={{ width: 40, height: 40, borderRadius: 10, border: "none", background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
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