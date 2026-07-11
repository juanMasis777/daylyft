"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AnalyticsPage() {
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const loadData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

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

const totalTasks = tasks.length;
const completedTasks = tasks.filter((t) => t.completed).length;
const pendingTasks = totalTasks - completedTasks;
const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

const highPriority = tasks.filter((t) => t.priority === "high").length;
const mediumPriority = tasks.filter((t) => t.priority === "medium").length;
const lowPriority = tasks.filter((t) => t.priority === "low").length;

const categories = {};
tasks.forEach((t) => {
categories[t.category] = (categories[t.category] || 0) + 1;
});

const completedHigh = tasks.filter((t) => t.priority === "high" && t.completed).length;
const completedMed = tasks.filter((t) => t.priority === "medium" && t.completed).length;
const completedLow = tasks.filter((t) => t.priority === "low" && t.completed).length;

if (loading) {
return <div style={{ padding: 40, textAlign: "center", color: "var(--fm-muted)" }}>Loading analytics...</div>;
}

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0, marginBottom: 4 }}>Analytics</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", marginBottom: 20 }}>Your productivity insights based on real data</p>

    {/* Main Stats */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 20 }}>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Total tasks</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "var(--fm-text)" }}>{totalTasks}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Completed</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "var(--fm-success)" }}>{completedTasks}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Pending</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "var(--fm-warning)" }}>{pendingTasks}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Completion rate</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "var(--fm-accent-light)" }}>{completionRate}%</div>
    </div>
    </div>

    {/* Completion Bar */}
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 20, marginBottom: 16 }}>
    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>Overall progress</div>
    <div style={{ background: "var(--fm-card)", borderRadius: 8, height: 24, overflow: "hidden", marginBottom: 8 }}>
        <div style={{ width: `${completionRate}%`, height: "100%", background: "linear-gradient(135deg, #10b981, #00CEC9)", borderRadius: 8, transition: "width 0.5s ease", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {completionRate > 10 && <span style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}>{completionRate}%</span>}
        </div>
    </div>
    <div style={{ fontSize: 12, color: "var(--fm-muted)" }}>
        {completionRate === 100 ? "All tasks completed! Amazing work!" : completionRate > 70 ? "Great progress! Almost there!" : completionRate > 40 ? "Keep going, you're making progress!" : totalTasks === 0 ? "Add some tasks to see your progress" : "Just getting started — you've got this!"}
    </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
    {/* Priority Breakdown */}
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 16 }}>By priority</div>

        <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "#ff6b6b" }}>High priority</span>
            <span style={{ fontSize: 12, color: "var(--fm-muted)" }}>{completedHigh}/{highPriority}</span>
        </div>
        <div style={{ background: "var(--fm-card)", borderRadius: 6, height: 8, overflow: "hidden" }}>
            <div style={{ width: highPriority > 0 ? `${(completedHigh / highPriority) * 100}%` : "0%", height: "100%", background: "#ff6b6b", borderRadius: 6 }} />
        </div>
        </div>

        <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "#fdcb6e" }}>Medium priority</span>
            <span style={{ fontSize: 12, color: "var(--fm-muted)" }}>{completedMed}/{mediumPriority}</span>
        </div>
        <div style={{ background: "var(--fm-card)", borderRadius: 6, height: 8, overflow: "hidden" }}>
            <div style={{ width: mediumPriority > 0 ? `${(completedMed / mediumPriority) * 100}%` : "0%", height: "100%", background: "#fdcb6e", borderRadius: 6 }} />
        </div>
        </div>

        <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "#00CEC9" }}>Low priority</span>
            <span style={{ fontSize: 12, color: "var(--fm-muted)" }}>{completedLow}/{lowPriority}</span>
        </div>
        <div style={{ background: "var(--fm-card)", borderRadius: 6, height: 8, overflow: "hidden" }}>
            <div style={{ width: lowPriority > 0 ? `${(completedLow / lowPriority) * 100}%` : "0%", height: "100%", background: "#00CEC9", borderRadius: 6 }} />
        </div>
        </div>
    </div>

    {/* Category Breakdown */}
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 16 }}>By category</div>

        {Object.keys(categories).length === 0 ? (
        <div style={{ fontSize: 13, color: "var(--fm-muted)", textAlign: "center", padding: 20 }}>No data yet. Add tasks to see category breakdown.</div>
        ) : (
        Object.entries(categories).map(([cat, count]) => (
            <div key={cat} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--fm-border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--fm-accent)" }} />
                <span style={{ fontSize: 13, color: "var(--fm-text)", textTransform: "capitalize" }}>{cat}</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-accent-light)" }}>{count} task{count !== 1 ? "s" : ""}</span>
            </div>
        ))
        )}
    </div>
    </div>

    {/* Kai Insight */}
    <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 14, padding: 18, marginTop: 16 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg, #10b981, #34d399)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
        </div>
        <span style={{ fontSize: 13, color: "var(--fm-accent-light)", fontWeight: 600 }}>Kai's insight</span>
    </div>
    <div style={{ fontSize: 13, color: "var(--fm-text)", lineHeight: 1.6 }}>
        {totalTasks === 0
        ? "Start adding tasks to see personalized productivity insights! I'll analyze your patterns and help you work smarter."
        : completionRate > 80
        ? `Incredible work! You've completed ${completionRate}% of your tasks. Your consistency is impressive. Consider taking a well-deserved break with Zen Mode!`
        : completionRate > 50
        ? `Good progress! ${completedTasks} of ${totalTasks} tasks done. Try tackling your high-priority tasks first tomorrow morning when your energy is highest.`
        : highPriority > pendingTasks / 2
        ? `I notice you have ${highPriority} high-priority tasks. Focus on those first — completing them will give you the biggest sense of progress.`
        : `You've got ${pendingTasks} tasks remaining. Break them into smaller chunks and tackle them one at a time. You've got this!`
        }
    </div>
    </div>
</div>
);
}