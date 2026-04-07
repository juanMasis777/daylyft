"use client";

import { useState, useEffect } from "react";

const areas = [
{ id: "work", name: "Work", emoji: "💼", color: "#6C5CE7" },
{ id: "health", name: "Health", emoji: "💪", color: "#00CEC9" },
{ id: "family", name: "Family", emoji: "👨‍👩‍👧‍👦", color: "#fd79a8" },
{ id: "social", name: "Social", emoji: "🤝", color: "#fdcb6e" },
{ id: "finances", name: "Finances", emoji: "💰", color: "#00b894" },
{ id: "growth", name: "Growth", emoji: "📚", color: "#a29bfe" },
{ id: "fun", name: "Fun", emoji: "🎉", color: "#e17055" },
{ id: "spirit", name: "Inner Peace", emoji: "🧘", color: "#74b9ff" },
];

export default function BalancePage() {
const [scores, setScores] = useState({});
const [saved, setSaved] = useState(false);
const [kaiMessage, setKaiMessage] = useState("");
const [generatingKai, setGeneratingKai] = useState(false);

useEffect(() => {
const savedScores = localStorage.getItem("daylyft-balance");
if (savedScores) {
    setScores(JSON.parse(savedScores));
    setSaved(true);
} else {
    const initial = {};
    areas.forEach((a) => { initial[a.id] = 5; });
    setScores(initial);
}
}, []);

const updateScore = (id, value) => {
setScores((prev) => ({ ...prev, [id]: value }));
setSaved(false);
setKaiMessage("");
};

const saveScores = () => {
localStorage.setItem("daylyft-balance", JSON.stringify(scores));
setSaved(true);
};

const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
const avgScore = areas.length > 0 ? (totalScore / areas.length).toFixed(1) : 0;
const maxArea = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
const minArea = Object.entries(scores).sort((a, b) => a[1] - b[1])[0];

const getBalanceLevel = () => {
const avg = parseFloat(avgScore);
const values = Object.values(scores);
const min = Math.min(...values);
const max = Math.max(...values);
const spread = max - min;

if (avg >= 8 && spread <= 2) return { label: "Excellent balance", color: "#00CEC9", emoji: "🌟" };
if (avg >= 7) return { label: "Good balance", color: "#6C5CE7", emoji: "✨" };
if (avg >= 5) return { label: "Room to grow", color: "#fdcb6e", emoji: "🌱" };
return { label: "Needs attention", color: "#ff6b6b", emoji: "⚠️" };
};

const balanceLevel = getBalanceLevel();

const generateKaiInsight = async () => {
setGeneratingKai(true);

const scoreList = areas.map((a) => `${a.name}: ${scores[a.id]}/10`).join(", ");
const strongest = areas.find((a) => a.id === maxArea?.[0])?.name || "unknown";
const weakest = areas.find((a) => a.id === minArea?.[0])?.name || "unknown";

try {
    const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: `Analyze my life balance wheel scores and give me personalized advice. My scores are: ${scoreList}. My strongest area is ${strongest} (${maxArea?.[1]}/10) and my weakest area is ${weakest} (${minArea?.[1]}/10). My overall average is ${avgScore}/10. Give me: 1) A brief observation about my balance, 2) One specific actionable tip to improve my weakest area, 3) How to leverage my strongest area to help other areas. Keep it concise, warm, and practical.`,
        history: [],
    }),
    });
    const data = await response.json();
    if (data.reply) setKaiMessage(data.reply);
} catch (e) {
    setKaiMessage("Couldn't connect to Kai right now. Try again in a moment!");
}
setGeneratingKai(false);
};

const resetScores = () => {
const initial = {};
areas.forEach((a) => { initial[a.id] = 5; });
setScores(initial);
setSaved(false);
setKaiMessage("");
localStorage.removeItem("daylyft-balance");
};

// Draw wheel
const wheelSize = 280;
const center = wheelSize / 2;
const maxRadius = center - 30;

const getPoint = (index, value) => {
const angle = (Math.PI * 2 * index) / areas.length - Math.PI / 2;
const r = (value / 10) * maxRadius;
return {
    x: center + r * Math.cos(angle),
    y: center + r * Math.sin(angle),
};
};

const polygonPoints = areas.map((_, i) => {
const p = getPoint(i, scores[areas[i].id] || 5);
return `${p.x},${p.y}`;
}).join(" ");

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ marginBottom: 20 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Life Balance Wheel</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Rate each area of your life to see your overall balance</p>
    </div>

    {/* Balance Level */}
    <div style={{
    background: `${balanceLevel.color}10`,
    border: `1px solid ${balanceLevel.color}25`,
    borderRadius: 14, padding: 16, marginBottom: 20,
    display: "flex", alignItems: "center", gap: 12,
    }}>
    <span style={{ fontSize: 28 }}>{balanceLevel.emoji}</span>
    <div>
        <div style={{ fontSize: 16, fontWeight: 700, color: balanceLevel.color }}>{balanceLevel.label}</div>
        <div style={{ fontSize: 12, color: "var(--fm-muted)" }}>Average score: {avgScore}/10</div>
    </div>
    </div>

    {/* Wheel Visualization */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 16, padding: 20, marginBottom: 20, textAlign: "center",
    }}>
    <svg width={wheelSize} height={wheelSize} viewBox={`0 0 ${wheelSize} ${wheelSize}`} style={{ maxWidth: "100%" }}>
        {/* Grid circles */}
        {[2, 4, 6, 8, 10].map((level) => (
        <circle key={level} cx={center} cy={center} r={(level / 10) * maxRadius}
            fill="none" stroke="var(--fm-border)" strokeWidth="0.5" strokeDasharray={level === 10 ? "none" : "3,3"} />
        ))}

        {/* Grid lines */}
        {areas.map((_, i) => {
        const p = getPoint(i, 10);
        return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="var(--fm-border)" strokeWidth="0.5" />;
        })}

        {/* Filled polygon */}
        <polygon points={polygonPoints} fill="rgba(108,92,231,0.15)" stroke="#6C5CE7" strokeWidth="2" />

        {/* Data points */}
        {areas.map((area, i) => {
        const p = getPoint(i, scores[area.id] || 5);
        return <circle key={area.id} cx={p.x} cy={p.y} r="5" fill={area.color} stroke="var(--fm-bg)" strokeWidth="2" />;
        })}

        {/* Labels */}
        {areas.map((area, i) => {
        const p = getPoint(i, 12);
        return (
            <text key={area.id} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central"
            fill="var(--fm-muted)" fontSize="10" fontFamily="Outfit, sans-serif">
            {area.emoji}
            </text>
        );
        })}
    </svg>
    </div>

    {/* Sliders */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 16, padding: 20, marginBottom: 16,
    }}>
    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>Rate each area (1-10)</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {areas.map((area) => (
        <div key={area.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>{area.emoji}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--fm-text)" }}>{area.name}</span>
            </div>
            <span style={{
                fontSize: 14, fontWeight: 700, color: area.color,
                minWidth: 28, textAlign: "right",
            }}>{scores[area.id] || 5}</span>
            </div>
            <input
            type="range" min="1" max="10" step="1"
            value={scores[area.id] || 5}
            onChange={(e) => updateScore(area.id, parseInt(e.target.value))}
            style={{ width: "100%", accentColor: area.color }}
            />
        </div>
        ))}
    </div>

    <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button onClick={saveScores} style={{
        flex: 1, padding: "12px", borderRadius: 12, border: "none",
        background: saved ? "rgba(0,206,201,0.1)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        color: saved ? "#00CEC9" : "#fff",
        fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        border: saved ? "1px solid rgba(0,206,201,0.2)" : "none",
        }}>{saved ? "✓ Saved" : "Save scores"}</button>
        <button onClick={resetScores} style={{
        padding: "12px 20px", borderRadius: 12,
        border: "1px solid var(--fm-border)", background: "transparent",
        color: "var(--fm-muted)", fontSize: 13, fontWeight: 500,
        cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Reset</button>
    </div>
    </div>

    {/* Stats */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, marginBottom: 16 }}>
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 12, padding: 16, textAlign: "center",
    }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Strongest area</div>
        <div style={{ fontSize: 20 }}>{areas.find((a) => a.id === maxArea?.[0])?.emoji}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-success)" }}>
        {areas.find((a) => a.id === maxArea?.[0])?.name} ({maxArea?.[1]}/10)
        </div>
    </div>
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 12, padding: 16, textAlign: "center",
    }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Needs attention</div>
        <div style={{ fontSize: 20 }}>{areas.find((a) => a.id === minArea?.[0])?.emoji}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-warning)" }}>
        {areas.find((a) => a.id === minArea?.[0])?.name} ({minArea?.[1]}/10)
        </div>
    </div>
    </div>

    {/* Kai Insight */}
    {kaiMessage ? (
    <div style={{
        background: "rgba(108,92,231,0.08)", border: "1px solid rgba(108,92,231,0.15)",
        borderRadius: 14, padding: 20,
    }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
        </div>
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-accent-light)" }}>Kai's balance insight</span>
        </div>
        <div style={{ fontSize: 14, color: "var(--fm-text)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{kaiMessage}</div>
    </div>
    ) : (
    <div style={{ textAlign: "center" }}>
        <button onClick={generateKaiInsight} disabled={generatingKai} style={{
        padding: "14px 28px", borderRadius: 14, border: "none",
        background: generatingKai ? "var(--fm-muted)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        color: "#fff", fontSize: 14, fontWeight: 700,
        cursor: generatingKai ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
        display: "inline-flex", alignItems: "center", gap: 8,
        }}>
        {generatingKai ? (
            <>
            <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            Kai is analyzing...
            </>
        ) : (
            <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            Get Kai's insight
            </>
        )}
        </button>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
    )}
</div>
);
}