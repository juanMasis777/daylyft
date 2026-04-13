"use client";

import { useState, useEffect } from "react";

const DAILY_GOAL = 8;

const cupSizes = [
{ id: "small", label: "Small", amount: 0.5, emoji: "🥤", ml: "125ml" },
{ id: "medium", label: "Medium", amount: 1, emoji: "🥛", ml: "250ml" },
{ id: "large", label: "Large", amount: 1.5, emoji: "🫗", ml: "375ml" },
{ id: "bottle", label: "Bottle", amount: 2, emoji: "🍶", ml: "500ml" },
];

const tips = [
"Drink a glass of water first thing in the morning to kickstart your metabolism",
"Keep a water bottle at your desk so you never forget to hydrate",
"Set a timer to remind yourself to drink water every hour",
"Add lemon or cucumber for flavor if plain water feels boring",
"Drink a glass before each meal — it helps with digestion and prevents overeating",
"If you feel tired in the afternoon, try water before reaching for coffee",
"Your brain is 75% water — staying hydrated improves focus and memory",
"Drink more water when exercising or in hot weather",
];

export default function WaterPage() {
const [glasses, setGlasses] = useState(0);
const [log, setLog] = useState([]);
const [goal, setGoal] = useState(DAILY_GOAL);
const [showSettings, setShowSettings] = useState(false);
const [streak, setStreak] = useState(0);
const [weekData, setWeekData] = useState({});

const today = new Date().toDateString();
const tipOfDay = tips[new Date().getDay() % tips.length];

useEffect(() => {
loadData();
}, []);

const loadData = () => {
const saved = localStorage.getItem("daylyft-water");
if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed.date === today) {
    setGlasses(parsed.glasses || 0);
    setLog(parsed.log || []);
    }
    if (parsed.goal) setGoal(parsed.goal);
    if (parsed.weekData) setWeekData(parsed.weekData);
    if (parsed.streak) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (parsed.lastGoalDate === yesterday.toDateString() || parsed.lastGoalDate === today) {
        setStreak(parsed.streak);
    }
    }
}
};

const saveData = (newGlasses, newLog, newGoal, newStreak, newWeekData) => {
const data = {
    date: today,
    glasses: newGlasses,
    log: newLog,
    goal: newGoal,
    streak: newStreak,
    lastGoalDate: newGlasses >= newGoal ? today : localStorage.getItem("daylyft-water") ? JSON.parse(localStorage.getItem("daylyft-water")).lastGoalDate : null,
    weekData: newWeekData,
};
localStorage.setItem("daylyft-water", JSON.stringify(data));
};

const addWater = (amount) => {
const newGlasses = glasses + amount;
const time = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
const newLog = [...log, { amount, time, id: Date.now() }];
const newWeekData = { ...weekData, [today]: newGlasses };

let newStreak = streak;
if (newGlasses >= goal && glasses < goal) {
    newStreak = streak + 1;
}

setGlasses(newGlasses);
setLog(newLog);
setStreak(newStreak);
setWeekData(newWeekData);
saveData(newGlasses, newLog, goal, newStreak, newWeekData);
};

const removeLastDrink = () => {
if (log.length === 0) return;
const lastDrink = log[log.length - 1];
const newGlasses = Math.max(0, glasses - lastDrink.amount);
const newLog = log.slice(0, -1);
const newWeekData = { ...weekData, [today]: newGlasses };

setGlasses(newGlasses);
setLog(newLog);
setWeekData(newWeekData);
saveData(newGlasses, newLog, goal, streak, newWeekData);
};

const updateGoal = (newGoal) => {
setGoal(newGoal);
saveData(glasses, log, newGoal, streak, weekData);
};

const resetToday = () => {
if (!confirm("Reset today's water intake?")) return;
setGlasses(0);
setLog([]);
const newWeekData = { ...weekData };
delete newWeekData[today];
setWeekData(newWeekData);
saveData(0, [], goal, streak, newWeekData);
};

const pct = goal > 0 ? Math.min(Math.round((glasses / goal) * 100), 100) : 0;
const goalReached = glasses >= goal;

// Wave animation height
const waveHeight = Math.min((glasses / goal) * 100, 100);

// Last 7 days
const last7Days = Array.from({ length: 7 }, (_, i) => {
const d = new Date();
d.setDate(d.getDate() - (6 - i));
return d.toDateString();
});

const dayLabels = last7Days.map((d) => {
const date = new Date(d);
return date.toLocaleDateString("en-US", { weekday: "short" });
});

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Water Tracker</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Stay hydrated throughout the day — your body and brain will thank you</p>
    </div>
    <button onClick={() => setShowSettings(!showSettings)} style={{
        padding: "8px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-surface)", color: "var(--fm-muted)", fontSize: 12,
        fontWeight: 500, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>{showSettings ? "Close" : "⚙"}</button>
    </div>

    {/* Settings */}
    {showSettings && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 18, marginBottom: 16,
    }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>Daily goal (glasses)</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {[6, 8, 10, 12].map((g) => (
            <button key={g} onClick={() => updateGoal(g)} style={{
            flex: 1, padding: "10px", borderRadius: 10, fontSize: 14, fontWeight: 600,
            border: goal === g ? "1px solid rgba(116,185,255,0.4)" : "1px solid var(--fm-border)",
            background: goal === g ? "rgba(116,185,255,0.1)" : "var(--fm-card)",
            color: goal === g ? "#74b9ff" : "var(--fm-text)",
            cursor: "pointer", fontFamily: "Outfit, sans-serif",
            }}>{g}</button>
        ))}
        </div>
        <button onClick={resetToday} style={{
        padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(255,107,107,0.3)",
        background: "rgba(255,107,107,0.1)", color: "#ff6b6b", fontSize: 12,
        cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Reset today</button>
    </div>
    )}

    {/* Main Water Display */}
    <div style={{
    background: goalReached
        ? "linear-gradient(135deg, rgba(0,206,201,0.12), rgba(85,239,196,0.08))"
        : "linear-gradient(135deg, rgba(116,185,255,0.12), rgba(162,155,254,0.08))",
    border: `1px solid ${goalReached ? "rgba(0,206,201,0.2)" : "rgba(116,185,255,0.2)"}`,
    borderRadius: 20, padding: 32, marginBottom: 20, textAlign: "center",
    position: "relative", overflow: "hidden",
    }}>
    {/* Water fill background */}
    <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: `${waveHeight}%`,
        background: goalReached
        ? "linear-gradient(to top, rgba(0,206,201,0.15), rgba(0,206,201,0.05))"
        : "linear-gradient(to top, rgba(116,185,255,0.15), rgba(116,185,255,0.05))",
        transition: "height 0.8s ease",
        borderRadius: "0 0 20px 20px",
    }} />

    <div style={{ position: "relative", zIndex: 1 }}>
        {goalReached && <div style={{ fontSize: 40, marginBottom: 8 }}>🎉</div>}
        <div style={{ fontSize: 56, marginBottom: 8 }}>💧</div>
        <div style={{ fontSize: 48, fontWeight: 800, color: goalReached ? "#00CEC9" : "#74b9ff", lineHeight: 1 }}>
        {glasses}
        </div>
        <div style={{ fontSize: 16, color: "var(--fm-muted)", marginTop: 4 }}>
        of {goal} glasses
        </div>
        <div style={{
        fontSize: 20, fontWeight: 700, marginTop: 8,
        color: goalReached ? "#00CEC9" : pct >= 50 ? "#74b9ff" : "var(--fm-muted)",
        }}>
        {pct}%
        </div>
        {goalReached && (
        <div style={{ fontSize: 14, color: "#00CEC9", fontWeight: 600, marginTop: 4 }}>
            Daily goal reached!
        </div>
        )}
    </div>
    </div>

    {/* Progress Bar */}
    <div style={{ background: "var(--fm-card)", borderRadius: 8, height: 10, marginBottom: 20, overflow: "hidden" }}>
    <div style={{
        height: "100%", borderRadius: 8, width: `${pct}%`,
        background: goalReached ? "linear-gradient(135deg, #00CEC9, #55efc4)" : "linear-gradient(135deg, #74b9ff, #a29bfe)",
        transition: "width 0.8s ease",
    }} />
    </div>

    {/* Quick Add Buttons */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: 18, marginBottom: 16,
    }}>
    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>Add water</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {cupSizes.map((cup) => (
        <button key={cup.id} onClick={() => addWater(cup.amount)} style={{
            padding: "14px 8px", borderRadius: 12, cursor: "pointer",
            background: "var(--fm-card)", border: "1px solid var(--fm-border)",
            fontFamily: "Outfit, sans-serif", textAlign: "center",
            transition: "all 0.2s ease",
        }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>{cup.emoji}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--fm-text)" }}>{cup.label}</div>
            <div style={{ fontSize: 9, color: "var(--fm-muted)" }}>{cup.ml}</div>
        </button>
        ))}
    </div>
    {log.length > 0 && (
        <button onClick={removeLastDrink} style={{
        marginTop: 10, padding: "6px 14px", borderRadius: 8,
        border: "1px solid var(--fm-border)", background: "transparent",
        color: "var(--fm-muted)", fontSize: 11, cursor: "pointer",
        fontFamily: "Outfit, sans-serif",
        }}>Undo last drink</button>
    )}
    </div>

    {/* Stats */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginBottom: 16 }}>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Today</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#74b9ff" }}>{glasses}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>glasses</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Approx</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#00CEC9" }}>{(glasses * 250).toLocaleString()}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>ml</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Streak</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: streak >= 7 ? "#00CEC9" : streak >= 3 ? "#6C5CE7" : "var(--fm-muted)" }}>{streak}d</div>
        {streak >= 7 && <div style={{ fontSize: 10, color: "#00CEC9" }}>On fire!</div>}
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Remaining</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: goalReached ? "#00CEC9" : "var(--fm-warning)" }}>{goalReached ? "✓" : Math.max(0, goal - glasses)}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>{goalReached ? "Done!" : "to go"}</div>
    </div>
    </div>

    {/* Weekly Chart */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: 18, marginBottom: 16,
    }}>
    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>This week</div>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 100, marginBottom: 8 }}>
        {last7Days.map((day, i) => {
        const dayGlasses = day === today ? glasses : (weekData[day] || 0);
        const barPct = goal > 0 ? Math.min((dayGlasses / goal) * 100, 100) : 0;
        const isToday = day === today;
        return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: dayGlasses >= goal ? "#00CEC9" : "var(--fm-muted)" }}>
                {dayGlasses > 0 ? dayGlasses : ""}
            </div>
            <div style={{
                width: "100%", borderRadius: 4,
                height: `${Math.max(barPct, 4)}%`,
                background: dayGlasses >= goal
                ? "linear-gradient(to top, #00CEC9, #55efc4)"
                : isToday
                ? "linear-gradient(to top, #74b9ff, #a29bfe)"
                : dayGlasses > 0 ? "rgba(116,185,255,0.4)" : "var(--fm-border)",
                transition: "all 0.3s ease",
                opacity: dayGlasses > 0 ? 1 : 0.3,
            }} />
            </div>
        );
        })}
    </div>
    <div style={{ display: "flex", gap: 6 }}>
        {dayLabels.map((d, i) => (
        <div key={i} style={{
            flex: 1, fontSize: 10, textAlign: "center",
            color: last7Days[i] === today ? "#74b9ff" : "var(--fm-muted)",
            fontWeight: last7Days[i] === today ? 700 : 400,
        }}>{d}</div>
        ))}
    </div>
    </div>

    {/* Today's Log */}
    {log.length > 0 && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 18, marginBottom: 16,
    }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>Today's log</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {log.map((entry, i) => {
            const cup = cupSizes.find((c) => c.amount === entry.amount) || cupSizes[1];
            return (
            <div key={entry.id} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
                background: "var(--fm-card)", borderRadius: 8,
            }}>
                <span style={{ fontSize: 16 }}>{cup.emoji}</span>
                <span style={{ fontSize: 13, color: "var(--fm-text)", flex: 1 }}>{cup.label} ({cup.ml})</span>
                <span style={{ fontSize: 11, color: "var(--fm-muted)" }}>{entry.time}</span>
            </div>
            );
        })}
        </div>
    </div>
    )}

    {/* Tip */}
    <div style={{
    background: "rgba(116,185,255,0.08)", border: "1px solid rgba(116,185,255,0.15)",
    borderRadius: 14, padding: 16,
    }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 16 }}>💡</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#74b9ff" }}>Hydration tip</span>
    </div>
    <div style={{ fontSize: 13, color: "var(--fm-text)", lineHeight: 1.6 }}>{tipOfDay}</div>
    </div>
</div>
);
}