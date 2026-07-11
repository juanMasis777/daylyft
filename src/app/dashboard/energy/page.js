"use client";

import { useState, useEffect } from "react";

const energyLevels = [
{ value: 5, label: "Peak", emoji: "🔥", color: "#00CEC9" },
{ value: 4, label: "High", emoji: "⚡", color: "#10b981" },
{ value: 3, label: "Medium", emoji: "🙂", color: "#fdcb6e" },
{ value: 2, label: "Low", emoji: "😴", color: "#e17055" },
{ value: 1, label: "Drained", emoji: "💤", color: "#ff6b6b" },
];

const hours = [
"6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
"12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM",
"6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM",
];

export default function EnergyPage() {
const [todayData, setTodayData] = useState({});
const [weekData, setWeekData] = useState({});
const [kaiMessage, setKaiMessage] = useState("");
const [generatingKai, setGeneratingKai] = useState(false);

const today = new Date().toDateString();
const currentHour = new Date().getHours();

useEffect(() => {
const saved = localStorage.getItem("daylyft-energy");
if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed[today]) setTodayData(parsed[today]);
    setWeekData(parsed);
}
}, []);

const saveEnergy = (hour, level) => {
const updated = { ...todayData, [hour]: level };
setTodayData(updated);

const allData = { ...weekData, [today]: updated };
setWeekData(allData);
localStorage.setItem("daylyft-energy", JSON.stringify(allData));
};

const getHourIndex = (hourStr) => {
const match = hourStr.match(/(\d+)\s*(AM|PM)/);
if (!match) return 0;
let h = parseInt(match[1]);
if (match[2] === "PM" && h !== 12) h += 12;
if (match[2] === "AM" && h === 12) h = 0;
return h;
};

const isCurrentHour = (hourStr) => {
return getHourIndex(hourStr) === currentHour;
};

const isPastHour = (hourStr) => {
return getHourIndex(hourStr) <= currentHour;
};

const loggedCount = Object.keys(todayData).length;
const avgEnergy = loggedCount > 0 ? (Object.values(todayData).reduce((a, b) => a + b, 0) / loggedCount).toFixed(1) : 0;

const peakHour = Object.entries(todayData).sort((a, b) => b[1] - a[1])[0];
const lowHour = Object.entries(todayData).sort((a, b) => a[1] - b[1])[0];

// Weekly averages per hour
const weeklyAverages = {};
hours.forEach((h) => {
const values = [];
Object.values(weekData).forEach((dayData) => {
    if (dayData[h]) values.push(dayData[h]);
});
if (values.length > 0) {
    weeklyAverages[h] = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
}
});

const getEnergyInfo = (value) => {
return energyLevels.find((e) => e.value === value) || energyLevels[2];
};

const getBarColor = (value) => {
if (!value) return "var(--fm-border)";
if (value >= 5) return "#00CEC9";
if (value >= 4) return "#10b981";
if (value >= 3) return "#fdcb6e";
if (value >= 2) return "#e17055";
return "#ff6b6b";
};

const generateKaiInsight = async () => {
if (loggedCount < 3) return;
setGeneratingKai(true);

const entries = Object.entries(todayData).map(([h, v]) => {
    const info = getEnergyInfo(v);
    return `${h}: ${info.label} (${v}/5)`;
}).join(", ");

const weekEntries = Object.entries(weeklyAverages).map(([h, v]) => `${h}: ${v}/5`).join(", ");

try {
    const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: `Analyze my energy patterns and give me actionable advice. Today's energy levels: ${entries}. My peak hour was ${peakHour ? peakHour[0] : "unknown"} and my lowest was ${lowHour ? lowHour[0] : "unknown"}. Weekly averages per hour: ${weekEntries || "not enough data yet"}. Give me: 1) When I should schedule my most important tasks based on my energy peaks, 2) Why I might be experiencing energy dips and how to fix them, 3) One specific habit to boost my overall energy. Keep it concise and practical.`,
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

const resetToday = () => {
if (!confirm("Reset today's energy data?")) return;
setTodayData({});
const allData = { ...weekData };
delete allData[today];
setWeekData(allData);
localStorage.setItem("daylyft-energy", JSON.stringify(allData));
setKaiMessage("");
};

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Smart Energy Map</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Track your energy every hour to discover when you work best and when you need rest</p>
    </div>
    <button onClick={resetToday} style={{
        padding: "8px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-surface)", color: "var(--fm-muted)", fontSize: 12,
        fontWeight: 500, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>Reset today</button>
    </div>

    {/* Today's Summary */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 16 }}>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Avg energy</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: getBarColor(Math.round(avgEnergy)) }}>{avgEnergy}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>out of 5</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Peak hour</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#00CEC9" }}>{peakHour ? peakHour[0] : "—"}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>{peakHour ? `${getEnergyInfo(peakHour[1]).emoji} ${getEnergyInfo(peakHour[1]).label}` : "Log more data"}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Low hour</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#ff6b6b" }}>{lowHour ? lowHour[0] : "—"}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>{lowHour ? `${getEnergyInfo(lowHour[1]).emoji} ${getEnergyInfo(lowHour[1]).label}` : "Log more data"}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Logged</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "var(--fm-accent-light)" }}>{loggedCount}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>of {hours.length} hours</div>
    </div>
    </div>

    {/* Energy Bar Chart */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: 18, marginBottom: 16,
    }}>
    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>Today's energy map</div>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 120, marginBottom: 8 }}>
        {hours.map((h) => {
        const value = todayData[h] || 0;
        const barHeight = value > 0 ? (value / 5) * 100 : 4;
        return (
            <div key={h} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ fontSize: 9, color: "var(--fm-muted)", fontWeight: 500 }}>{value > 0 ? getEnergyInfo(value).emoji : ""}</div>
            <div style={{
                width: "100%", borderRadius: 4,
                height: `${barHeight}%`,
                background: value > 0 ? getBarColor(value) : "var(--fm-border)",
                opacity: value > 0 ? 1 : 0.3,
                transition: "all 0.3s ease",
            }} />
            </div>
        );
        })}
    </div>
    <div style={{ display: "flex", gap: 4 }}>
        {hours.map((h) => (
        <div key={h} style={{
            flex: 1, fontSize: 8, textAlign: "center",
            color: isCurrentHour(h) ? "var(--fm-accent-light)" : "var(--fm-muted)",
            fontWeight: isCurrentHour(h) ? 700 : 400,
        }}>{h.replace(" AM", "a").replace(" PM", "p")}</div>
        ))}
    </div>
    </div>

    {/* Log Energy */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: 18, marginBottom: 16,
    }}>
    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 4 }}>Log your energy</div>
    <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 14 }}>Tap an hour, then select your energy level</div>

    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {hours.filter((h) => isPastHour(h)).reverse().map((h) => {
        const value = todayData[h];
        const info = value ? getEnergyInfo(value) : null;
        return (
            <div key={h} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
            background: isCurrentHour(h) ? "rgba(16,185,129,0.08)" : "var(--fm-card)",
            border: isCurrentHour(h) ? "1px solid rgba(16,185,129,0.2)" : "1px solid var(--fm-border)",
            borderRadius: 10,
            }}>
            <div style={{
                fontSize: 12, fontWeight: 600, minWidth: 50,
                color: isCurrentHour(h) ? "var(--fm-accent-light)" : "var(--fm-text)",
            }}>
                {h}
                {isCurrentHour(h) && <div style={{ fontSize: 9, color: "var(--fm-accent-light)", fontWeight: 400 }}>now</div>}
            </div>

            <div style={{ display: "flex", gap: 4, flex: 1 }}>
                {energyLevels.map((level) => (
                <button key={level.value} onClick={() => saveEnergy(h, level.value)} style={{
                    flex: 1, padding: "6px 2px", borderRadius: 8, cursor: "pointer",
                    background: value === level.value ? `${level.color}20` : "transparent",
                    border: value === level.value ? `1px solid ${level.color}50` : "1px solid transparent",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                    fontFamily: "Outfit, sans-serif",
                }}>
                    <span style={{ fontSize: 14 }}>{level.emoji}</span>
                    <span style={{
                    fontSize: 8, fontWeight: 500,
                    color: value === level.value ? level.color : "var(--fm-muted)",
                    }}>{level.label}</span>
                </button>
                ))}
            </div>
            </div>
        );
        })}
    </div>
    </div>

    {/* Weekly Patterns */}
    {Object.keys(weeklyAverages).length > 0 && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 18, marginBottom: 16,
    }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 4 }}>Weekly patterns</div>
        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 14 }}>Your average energy by hour across all logged days</div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 80, marginBottom: 8 }}>
        {hours.map((h) => {
            const avg = parseFloat(weeklyAverages[h]) || 0;
            const barHeight = avg > 0 ? (avg / 5) * 100 : 4;
            return (
            <div key={h} style={{
                flex: 1, borderRadius: 4,
                height: `${barHeight}%`,
                background: avg > 0 ? `${getBarColor(Math.round(avg))}80` : "var(--fm-border)",
                opacity: avg > 0 ? 1 : 0.3,
            }} />
            );
        })}
        </div>
        <div style={{ display: "flex", gap: 4 }}>
        {hours.map((h) => (
            <div key={h} style={{ flex: 1, fontSize: 8, textAlign: "center", color: "var(--fm-muted)" }}>
            {h.replace(" AM", "a").replace(" PM", "p")}
            </div>
        ))}
        </div>
    </div>
    )}

    {/* Legend */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: 18, marginBottom: 16,
    }}>
    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>Energy levels</div>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {energyLevels.map((level) => (
        <div key={level.value} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "6px 12px",
            background: `${level.color}10`, border: `1px solid ${level.color}25`,
            borderRadius: 10,
        }}>
            <span style={{ fontSize: 16 }}>{level.emoji}</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: level.color }}>{level.label}</span>
        </div>
        ))}
    </div>
    </div>

    {/* Kai Insight */}
    {loggedCount >= 3 && (
    kaiMessage ? (
        <div style={{
        background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)",
        borderRadius: 14, padding: 20,
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg, #10b981, #34d399)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-accent-light)" }}>Kai's energy insight</span>
        </div>
        <div style={{ fontSize: 14, color: "var(--fm-text)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{kaiMessage}</div>
        </div>
    ) : (
        <div style={{ textAlign: "center" }}>
        <button onClick={generateKaiInsight} disabled={generatingKai} style={{
            padding: "14px 28px", borderRadius: 14, border: "none",
            background: generatingKai ? "var(--fm-muted)" : "linear-gradient(135deg, #10b981, #34d399)",
            color: "#fff", fontSize: 14, fontWeight: 700,
            cursor: generatingKai ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
            display: "inline-flex", alignItems: "center", gap: 8,
        }}>
            {generatingKai ? (
            <>
                <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                Kai is analyzing your energy...
            </>
            ) : (
            <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
                Get Kai's energy insight
            </>
            )}
        </button>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )
    )}

    {loggedCount < 3 && (
    <div style={{
        textAlign: "center", padding: 20,
        background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.1)",
        borderRadius: 14, fontSize: 13, color: "var(--fm-muted)",
    }}>
        Log at least 3 hours of energy to unlock Kai's personalized insight
    </div>
    )}
</div>
);
}