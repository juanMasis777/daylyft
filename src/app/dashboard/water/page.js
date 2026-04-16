"use client";

import { useState, useEffect } from "react";
import { Confetti, CelebrationOverlay } from "@/app/components/Confetti";

export default function WaterPage() {
const [glasses, setGlasses] = useState(0);
const [history, setHistory] = useState([]);
const [showCelebration, setShowCelebration] = useState(false);
const [showConfetti, setShowConfetti] = useState(false);

const today = new Date().toDateString();
const goal = 8;

useEffect(() => {
const saved = localStorage.getItem("daylyft-water");
if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed.date === today) setGlasses(parsed.glasses || 0);
}
const historySaved = localStorage.getItem("daylyft-water-history");
if (historySaved) setHistory(JSON.parse(historySaved));
}, []);

const saveProgress = (newCount) => {
setGlasses(newCount);
localStorage.setItem("daylyft-water", JSON.stringify({ date: today, glasses: newCount }));

const historySaved = localStorage.getItem("daylyft-water-history");
let hist = historySaved ? JSON.parse(historySaved) : [];
const todayEntry = hist.find((h) => h.date === today);
if (todayEntry) {
    todayEntry.glasses = newCount;
} else {
    hist.unshift({ date: today, glasses: newCount });
    hist = hist.slice(0, 30);
}
setHistory(hist);
localStorage.setItem("daylyft-water-history", JSON.stringify(hist));
};

const addGlass = () => {
const newCount = glasses + 1;
saveProgress(newCount);

if (newCount === goal) {
    setShowCelebration(true);
    setShowConfetti(true);
    setTimeout(() => setShowCelebration(false), 2000);
    setTimeout(() => setShowConfetti(false), 2500);
}
};

const removeGlass = () => {
if (glasses > 0) saveProgress(glasses - 1);
};

const resetDay = () => {
if (!confirm("Reset today's water?")) return;
saveProgress(0);
};

const percentage = Math.min((glasses / goal) * 100, 100);
const weekAvg = history.slice(0, 7).reduce((sum, h) => sum + h.glasses, 0) / Math.max(history.slice(0, 7).length, 1);
const bestDay = history.reduce((max, h) => h.glasses > max ? h.glasses : max, 0);
const streak = (() => {
let count = 0;
for (const h of history) {
    if (h.glasses >= goal) count++;
    else break;
}
return count;
})();

const last7 = Array.from({ length: 7 }, (_, i) => {
const d = new Date();
d.setDate(d.getDate() - (6 - i));
const dateStr = d.toDateString();
const entry = history.find((h) => h.date === dateStr);
return { date: dateStr, glasses: entry ? entry.glasses : 0, day: d.toLocaleDateString("en-US", { weekday: "short" }) };
});

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <Confetti active={showConfetti} />
    <CelebrationOverlay
    active={showCelebration}
    message="Hydration complete!"
    emoji="💧"
    />

    <div style={{ marginBottom: 16 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Water Tracker</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Stay hydrated, feel better, think clearer</p>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 10, marginBottom: 16 }}>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Streak</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: streak >= 7 ? "#00CEC9" : streak >= 3 ? "#6C5CE7" : "var(--fm-muted)" }}>{streak}d</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Week avg</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#74b9ff" }}>{weekAvg.toFixed(1)}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Best day</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#00CEC9" }}>{bestDay}</div>
    </div>
    </div>

    <div style={{
    background: "linear-gradient(135deg, rgba(116,185,255,0.08), rgba(0,206,201,0.04))",
    border: "1px solid rgba(116,185,255,0.2)",
    borderRadius: 20, padding: 32, marginBottom: 16, textAlign: "center",
    }}>
    <div style={{ fontSize: 13, color: "var(--fm-muted)", marginBottom: 8 }}>Today</div>
    <div style={{ fontSize: 56, fontWeight: 900, color: glasses >= goal ? "#00CEC9" : "#74b9ff", lineHeight: 1, marginBottom: 4 }}>
        {glasses}<span style={{ fontSize: 24, fontWeight: 500, color: "var(--fm-muted)" }}>/{goal}</span>
    </div>
    <div style={{ fontSize: 13, color: "var(--fm-muted)", marginBottom: 16 }}>glasses of water</div>

    <div style={{ background: "var(--fm-card)", borderRadius: 12, height: 12, marginBottom: 20, overflow: "hidden" }}>
        <div style={{
        height: "100%", borderRadius: 12,
        width: `${percentage}%`,
        background: glasses >= goal
            ? "linear-gradient(135deg, #00CEC9, #55efc4)"
            : "linear-gradient(135deg, #74b9ff, #a29bfe)",
        transition: "width 0.5s ease",
        }} />
    </div>

    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={removeGlass} disabled={glasses === 0} style={{
        padding: "14px 24px", borderRadius: 12, border: "1px solid var(--fm-border)",
        background: glasses === 0 ? "var(--fm-card)" : "var(--fm-surface)",
        color: glasses === 0 ? "var(--fm-muted)" : "var(--fm-text)",
        fontSize: 14, fontWeight: 600,
        cursor: glasses === 0 ? "not-allowed" : "pointer",
        fontFamily: "Outfit, sans-serif", opacity: glasses === 0 ? 0.5 : 1,
        }}>− Remove</button>
        <button onClick={addGlass} style={{
        padding: "14px 32px", borderRadius: 12, border: "none",
        background: "linear-gradient(135deg, #74b9ff, #6C5CE7)", color: "#fff",
        fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        display: "inline-flex", alignItems: "center", gap: 8,
        }}>
        <span style={{ fontSize: 18 }}>💧</span> Add Glass
        </button>
    </div>
    </div>

    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: 18, marginBottom: 16,
    }}>
    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>This week</div>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 100, marginBottom: 6 }}>
        {last7.map((day, i) => {
        const barHeight = day.glasses > 0 ? Math.min((day.glasses / 8) * 100, 100) : 4;
        return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            {day.glasses > 0 && <div style={{ fontSize: 10, fontWeight: 600, color: "#74b9ff" }}>{day.glasses}</div>}
            <div style={{
                width: "100%", borderRadius: 4,
                height: `${barHeight}%`,
                background: day.glasses >= 8
                ? "linear-gradient(to top, #00CEC9, #55efc4)"
                : day.glasses > 0
                    ? "linear-gradient(to top, #74b9ff, #a29bfe)"
                    : "var(--fm-border)",
                opacity: day.glasses > 0 ? 1 : 0.3,
                transition: "height 0.5s ease",
            }} />
            </div>
        );
        })}
    </div>
    <div style={{ display: "flex", gap: 6 }}>
        {last7.map((day, i) => (
        <div key={i} style={{
            flex: 1, fontSize: 10, textAlign: "center",
            color: day.date === today ? "#74b9ff" : "var(--fm-muted)",
            fontWeight: day.date === today ? 700 : 400,
        }}>{day.day}</div>
        ))}
    </div>
    </div>

    <div style={{
    background: "rgba(116,185,255,0.08)", border: "1px solid rgba(116,185,255,0.15)",
    borderRadius: 14, padding: 16, marginBottom: 16,
    }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 16 }}>💡</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#74b9ff" }}>Hydration tip</span>
    </div>
    <div style={{ fontSize: 13, color: "var(--fm-text)", lineHeight: 1.6 }}>
        A glass of water first thing in the morning kickstarts your metabolism and helps flush out toxins from overnight.
    </div>
    </div>

    <div style={{ textAlign: "center" }}>
    <button onClick={resetDay} style={{
        padding: "8px 16px", borderRadius: 8, border: "1px solid var(--fm-border)",
        background: "transparent", color: "var(--fm-muted)", fontSize: 12,
        cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>Reset today</button>
    </div>
</div>
);
}