"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const personalities = [
{ id: "strategist", name: "The Strategist", emoji: "🎯", color: "#10b981", desc: "You plan ahead, prioritize well, and tackle high-impact tasks first.", traits: ["Organized", "Focused", "Goal-oriented"] },
{ id: "sprinter", name: "The Sprinter", emoji: "⚡", color: "#00CEC9", desc: "You work in fast bursts of energy, completing tasks quickly and efficiently.", traits: ["Fast", "Energetic", "Decisive"] },
{ id: "explorer", name: "The Explorer", emoji: "🧭", color: "#fdcb6e", desc: "You embrace variety, juggle multiple categories, and love new challenges.", traits: ["Versatile", "Curious", "Adaptive"] },
{ id: "guardian", name: "The Guardian", emoji: "🛡", color: "#fd79a8", desc: "You're steady and reliable, completing tasks consistently day after day.", traits: ["Consistent", "Reliable", "Thorough"] },
{ id: "nightowl", name: "The Night Owl", emoji: "🦉", color: "#34d399", desc: "You do your best work in the evening and night hours.", traits: ["Creative", "Independent", "Reflective"] },
{ id: "balanced", name: "The Balanced One", emoji: "☯", color: "#00CEC9", desc: "You maintain a healthy mix of work and rest, never overloading yourself.", traits: ["Mindful", "Calm", "Sustainable"] },
];

export default function DNAPage() {
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);
const [personality, setPersonality] = useState(null);
const [stats, setStats] = useState({});
const [generated, setGenerated] = useState(false);

useEffect(() => {
loadData();
}, []);

const loadData = async () => {
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;

const { data } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", session.user.id);

if (data) {
    setTasks(data);
    if (data.length >= 3) {
    analyzePersonality(data);
    }
}
setLoading(false);
};

const analyzePersonality = (taskData) => {
const total = taskData.length;
const completed = taskData.filter(t => t.completed).length;
const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

const highPriority = taskData.filter(t => t.priority === "high").length;
const highCompleted = taskData.filter(t => t.priority === "high" && t.completed).length;
const highRate = highPriority > 0 ? Math.round((highCompleted / highPriority) * 100) : 0;

const categories = {};
taskData.forEach(t => { categories[t.category] = (categories[t.category] || 0) + 1; });
const categoryCount = Object.keys(categories).length;
const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];

let p;
if (highRate > 70 && highPriority > total * 0.3) {
    p = personalities.find(x => x.id === "strategist");
} else if (completionRate > 80 && total > 5) {
    p = personalities.find(x => x.id === "sprinter");
} else if (categoryCount >= 4) {
    p = personalities.find(x => x.id === "explorer");
} else if (completionRate > 60) {
    p = personalities.find(x => x.id === "guardian");
} else if (completionRate > 40) {
    p = personalities.find(x => x.id === "balanced");
} else {
    p = personalities.find(x => x.id === "nightowl");
}

setPersonality(p);
setStats({
    total,
    completed,
    completionRate,
    highPriority,
    highRate,
    categoryCount,
    topCategory: topCategory ? topCategory[0] : "general",
});
setGenerated(true);
};

if (loading) {
return <div style={{ padding: 40, textAlign: "center", color: "var(--fm-muted)" }}>Analyzing your productivity DNA...</div>;
}

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0, marginBottom: 4 }}>Productivity DNA</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", marginBottom: 20 }}>Discover your unique productivity personality</p>

    {tasks.length < 3 ? (
    <div style={{
        textAlign: "center", padding: 50,
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 16,
    }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🧬</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--fm-text)", marginBottom: 8 }}>Not enough data yet</h3>
        <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto 20px" }}>
        Add at least 3 tasks and complete some of them so Kai can analyze your productivity patterns and generate your DNA card.
        </p>
        <button onClick={() => window.location.href = "/dashboard/tasks"} style={{
        padding: "12px 24px", borderRadius: 12, border: "none",
        background: "linear-gradient(135deg, #10b981, #34d399)", color: "#fff",
        fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Go to Tasks</button>
    </div>
    ) : generated && personality ? (
    <div>
        {/* DNA Card */}
        <div style={{
        background: `linear-gradient(135deg, ${personality.color}15, ${personality.color}08)`,
        border: `1px solid ${personality.color}30`,
        borderRadius: 20, padding: 28, marginBottom: 20, textAlign: "center",
        }}>
        <div style={{ fontSize: 50, marginBottom: 12 }}>{personality.emoji}</div>
        <div style={{ fontSize: 12, color: personality.color, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 4 }}>YOUR PRODUCTIVITY DNA</div>
        <h3 style={{ fontSize: 26, fontWeight: 700, color: "var(--fm-text)", marginBottom: 8 }}>{personality.name}</h3>
        <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto 16px" }}>{personality.desc}</p>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 20 }}>
            {personality.traits.map((trait, i) => (
            <span key={i} style={{
                padding: "5px 14px", borderRadius: 16, fontSize: 12, fontWeight: 500,
                background: `${personality.color}15`, color: personality.color,
                border: `1px solid ${personality.color}25`,
            }}>{trait}</span>
            ))}
        </div>

        <div style={{ fontSize: 11, color: "var(--fm-muted)" }}>
            Powered by Kai AI · DayLyft
        </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 20 }}>
        <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Total tasks</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--fm-text)" }}>{stats.total}</div>
        </div>
        <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Completion</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--fm-success)" }}>{stats.completionRate}%</div>
        </div>
        <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>High priority rate</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#ff6b6b" }}>{stats.highRate}%</div>
        </div>
        <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Top category</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--fm-accent-light)", textTransform: "capitalize" }}>{stats.topCategory}</div>
        </div>
        </div>

        {/* All Personalities */}
        <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 16, padding: 20,
        }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>All productivity personalities</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
            {personalities.map((p) => (
            <div key={p.id} style={{
                padding: 14, borderRadius: 12,
                background: personality.id === p.id ? `${p.color}10` : "var(--fm-card)",
                border: personality.id === p.id ? `1px solid ${p.color}30` : "1px solid var(--fm-border)",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 18 }}>{p.emoji}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: personality.id === p.id ? p.color : "var(--fm-text)" }}>{p.name}</span>
                {personality.id === p.id && <span style={{ fontSize: 10, color: p.color, fontWeight: 500 }}>← You!</span>}
                </div>
                <div style={{ fontSize: 11, color: "var(--fm-muted)", lineHeight: 1.5 }}>{p.desc}</div>
            </div>
            ))}
        </div>
        </div>
    </div>
    ) : null}
</div>
);
}