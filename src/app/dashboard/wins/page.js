"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function WinsPage() {
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);
const [kaiMessage, setKaiMessage] = useState("");
const [generatingKai, setGeneratingKai] = useState(false);
const [userName, setUserName] = useState("User");

useEffect(() => {
loadData();
}, []);

const loadData = async () => {
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;

setUserName(session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "User");

const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

const { data } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", session.user.id)
    .gte("created_at", sevenDaysAgo.toISOString())
    .order("created_at", { ascending: false });

if (data) setTasks(data);
setLoading(false);
};

const completed = tasks.filter((t) => t.completed);
const pending = tasks.filter((t) => !t.completed);
const total = tasks.length;
const completionRate = total > 0 ? Math.round((completed.length / total) * 100) : 0;

const highCompleted = completed.filter((t) => t.priority === "high").length;
const medCompleted = completed.filter((t) => t.priority === "medium").length;
const lowCompleted = completed.filter((t) => t.priority === "low").length;

const categories = {};
completed.forEach((t) => {
categories[t.category] = (categories[t.category] || 0) + 1;
});
const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];

const getGrade = () => {
if (completionRate >= 90) return { grade: "A+", color: "#00CEC9", label: "Outstanding!" };
if (completionRate >= 80) return { grade: "A", color: "#00CEC9", label: "Excellent!" };
if (completionRate >= 70) return { grade: "B+", color: "#10b981", label: "Great work!" };
if (completionRate >= 60) return { grade: "B", color: "#10b981", label: "Good progress!" };
if (completionRate >= 50) return { grade: "C+", color: "#fdcb6e", label: "Getting there!" };
if (completionRate >= 40) return { grade: "C", color: "#fdcb6e", label: "Keep pushing!" };
if (total === 0) return { grade: "—", color: "#6b6b80", label: "No data yet" };
return { grade: "D", color: "#ff6b6b", label: "Room to grow!" };
};

const grade = getGrade();

const generateKaiReport = async () => {
if (total === 0) return;
setGeneratingKai(true);

const taskList = completed.map((t) => `"${t.title}" (${t.priority} priority, ${t.category})`).join(", ");
const pendingList = pending.map((t) => `"${t.title}" (${t.priority} priority)`).join(", ");

try {
    const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: `Give me a motivating weekly wins report. My name is ${userName.split(" ")[0]}. This week I completed ${completed.length} out of ${total} tasks (${completionRate}% completion rate). Tasks completed: ${taskList || "none"}. Tasks still pending: ${pendingList || "none"}. My top category was "${topCategory ? topCategory[0] : "general"}". Give me: 1) A celebratory message about what I accomplished, 2) My biggest win this week, 3) One specific tip for next week based on my patterns. Keep it concise, warm, and motivating.`,
        history: [],
    }),
    });
    const data = await response.json();
    if (data.reply) setKaiMessage(data.reply);
} catch (e) {
    setKaiMessage("Couldn't generate your report right now. Try again in a moment!");
}
setGeneratingKai(false);
};

if (loading) {
return <div style={{ padding: 40, textAlign: "center", color: "var(--fm-muted)" }}>Loading your wins...</div>;
}

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ marginBottom: 20 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Weekly Wins Report</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>See your weekly grade, completed tasks, and get Kai's motivational report</p>
    </div>

    {total === 0 ? (
    <div style={{
        textAlign: "center", padding: 50,
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 16,
    }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>📊</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--fm-text)", marginBottom: 8 }}>No tasks this week yet</h3>
        <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto 20px" }}>
        Add tasks and complete them to see your weekly wins report here!
        </p>
        <button onClick={() => window.location.href = "/dashboard/tasks"} style={{
        padding: "12px 24px", borderRadius: 12, border: "none",
        background: "linear-gradient(135deg, #10b981, #34d399)", color: "#fff",
        fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Go to Tasks</button>
    </div>
    ) : (
    <div>
        <div style={{
        background: `linear-gradient(135deg, ${grade.color}12, ${grade.color}06)`,
        border: `1px solid ${grade.color}25`,
        borderRadius: 20, padding: 28, marginBottom: 20, textAlign: "center",
        }}>
        <div style={{ fontSize: 12, color: grade.color, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 8 }}>THIS WEEK'S GRADE</div>
        <div style={{ fontSize: 64, fontWeight: 800, color: grade.color, lineHeight: 1 }}>{grade.grade}</div>
        <div style={{ fontSize: 16, color: "var(--fm-text)", fontWeight: 600, marginTop: 8 }}>{grade.label}</div>
        <div style={{ fontSize: 13, color: "var(--fm-muted)", marginTop: 4 }}>
            {completed.length} of {total} tasks completed · {completionRate}% completion rate
        </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 20 }}>
        <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Completed</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--fm-success)" }}>{completed.length}</div>
            <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>tasks done</div>
        </div>
        <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Pending</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--fm-warning)" }}>{pending.length}</div>
            <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>remaining</div>
        </div>
        <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Completion</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--fm-accent-light)" }}>{completionRate}%</div>
            <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>rate</div>
        </div>
        <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Top category</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--fm-text)", textTransform: "capitalize" }}>{topCategory ? topCategory[0] : "—"}</div>
            <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>{topCategory ? `${topCategory[1]} tasks` : ""}</div>
        </div>
        </div>

        <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 20, marginBottom: 16,
        }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>Tasks completed by priority</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 100, padding: 14, borderRadius: 10, textAlign: "center", background: "rgba(255,107,107,0.08)", border: "1px solid rgba(255,107,107,0.15)" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#ff6b6b" }}>{highCompleted}</div>
            <div style={{ fontSize: 11, color: "#ff6b6b" }}>High priority</div>
            </div>
            <div style={{ flex: 1, minWidth: 100, padding: 14, borderRadius: 10, textAlign: "center", background: "rgba(253,203,110,0.08)", border: "1px solid rgba(253,203,110,0.15)" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#fdcb6e" }}>{medCompleted}</div>
            <div style={{ fontSize: 11, color: "#fdcb6e" }}>Medium priority</div>
            </div>
            <div style={{ flex: 1, minWidth: 100, padding: 14, borderRadius: 10, textAlign: "center", background: "rgba(0,206,201,0.08)", border: "1px solid rgba(0,206,201,0.15)" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#00CEC9" }}>{lowCompleted}</div>
            <div style={{ fontSize: 11, color: "#00CEC9" }}>Low priority</div>
            </div>
        </div>
        </div>

        <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 20, marginBottom: 16,
        }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>
            Your wins this week ({completed.length})
        </div>
        {completed.length === 0 ? (
            <div style={{ fontSize: 13, color: "var(--fm-muted)", textAlign: "center", padding: 16 }}>No completed tasks yet this week.</div>
        ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {completed.map((task) => (
                <div key={task.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "var(--fm-card)", borderRadius: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00CEC9" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                <span style={{ fontSize: 13, color: "var(--fm-text)", flex: 1 }}>{task.title}</span>
                <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, textTransform: "capitalize", background: "rgba(16,185,129,0.1)", color: "var(--fm-accent-light)" }}>{task.category}</span>
                </div>
            ))}
            </div>
        )}
        </div>

        {kaiMessage ? (
        <div style={{
            background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)",
            borderRadius: 14, padding: 20, marginBottom: 16,
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg, #10b981, #34d399)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-accent-light)" }}>Kai's weekly report</span>
            </div>
            <div style={{ fontSize: 14, color: "var(--fm-text)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{kaiMessage}</div>
        </div>
        ) : (
        <div style={{ textAlign: "center", marginBottom: 16 }}>
            <button onClick={generateKaiReport} disabled={generatingKai} style={{
            padding: "14px 28px", borderRadius: 14, border: "none",
            background: generatingKai ? "var(--fm-muted)" : "linear-gradient(135deg, #10b981, #34d399)",
            color: "#fff", fontSize: 14, fontWeight: 700,
            cursor: generatingKai ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
            display: "inline-flex", alignItems: "center", gap: 8,
            }}>
            {generatingKai ? (
                <>
                <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                Kai is analyzing your week...
                </>
            ) : (
                <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
                Get Kai's weekly report
                </>
            )}
            </button>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
        )}

        {pending.length > 0 && (
        <div style={{
            background: "var(--fm-surface)", border: "1px solid rgba(253,203,110,0.2)",
            borderRadius: 14, padding: 20,
        }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-warning)", marginBottom: 14 }}>Still pending ({pending.length})</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {pending.map((task) => (
                <div key={task.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "var(--fm-card)", borderRadius: 8 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, flexShrink: 0, border: "2px solid var(--fm-muted)" }} />
                <span style={{ fontSize: 13, color: "var(--fm-text)", flex: 1 }}>{task.title}</span>
                <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: task.priority === "high" ? "rgba(255,107,107,0.1)" : "rgba(253,203,110,0.1)", color: task.priority === "high" ? "#ff6b6b" : "#fdcb6e" }}>{task.priority}</span>
                </div>
            ))}
            </div>
        </div>
        )}
    </div>
    )}
</div>
);
}