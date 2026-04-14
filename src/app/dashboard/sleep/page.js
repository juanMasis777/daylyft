"use client";

import { useState, useEffect } from "react";

const sleepQualities = [
{ id: "great", label: "Great", emoji: "😴", color: "#00CEC9" },
{ id: "good", label: "Good", emoji: "🙂", color: "#6C5CE7" },
{ id: "okay", label: "Okay", emoji: "😐", color: "#fdcb6e" },
{ id: "poor", label: "Poor", emoji: "😫", color: "#e17055" },
{ id: "terrible", label: "Terrible", emoji: "💀", color: "#ff6b6b" },
];

const tips = [
"Keep a consistent sleep schedule — even on weekends",
"Avoid screens 1 hour before bed to help your brain wind down",
"Keep your room cool (65-68°F / 18-20°C) for optimal sleep",
"Avoid caffeine after 2 PM — it stays in your system for 8+ hours",
"Exercise regularly, but not within 3 hours of bedtime",
"Use your bed only for sleep — train your brain to associate bed with rest",
"Try a 10-minute wind-down routine: stretch, read, or journal",
];

export default function SleepPage() {
const [entries, setEntries] = useState([]);
const [bedtime, setBedtime] = useState("23:00");
const [wakeTime, setWakeTime] = useState("07:00");
const [quality, setQuality] = useState("good");
const [notes, setNotes] = useState("");
const [todaySaved, setTodaySaved] = useState(false);
const [kaiMessage, setKaiMessage] = useState("");
const [generatingKai, setGeneratingKai] = useState(false);

const today = new Date().toDateString();
const tipOfDay = tips[new Date().getDay() % tips.length];

useEffect(() => {
const saved = localStorage.getItem("daylyft-sleep");
if (saved) {
    const parsed = JSON.parse(saved);
    setEntries(parsed);
    const todayEntry = parsed.find((e) => e.date === today);
    if (todayEntry) {
    setBedtime(todayEntry.bedtime);
    setWakeTime(todayEntry.wakeTime);
    setQuality(todayEntry.quality);
    setNotes(todayEntry.notes || "");
    setTodaySaved(true);
    }
}
}, []);

const saveEntries = (updated) => {
setEntries(updated);
localStorage.setItem("daylyft-sleep", JSON.stringify(updated));
};

const calculateHours = (bed, wake) => {
const [bedH, bedM] = bed.split(":").map(Number);
const [wakeH, wakeM] = wake.split(":").map(Number);
let bedMin = bedH * 60 + bedM;
let wakeMin = wakeH * 60 + wakeM;
if (wakeMin <= bedMin) wakeMin += 24 * 60;
return ((wakeMin - bedMin) / 60).toFixed(1);
};

const saveEntry = () => {
const hours = parseFloat(calculateHours(bedtime, wakeTime));
const newEntry = {
    date: today,
    dayLabel: new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
    bedtime,
    wakeTime,
    hours,
    quality,
    notes: notes.trim(),
};

const existingIndex = entries.findIndex((e) => e.date === today);
let updated;
if (existingIndex >= 0) {
    updated = [...entries];
    updated[existingIndex] = newEntry;
} else {
    updated = [newEntry, ...entries];
}

saveEntries(updated);
setTodaySaved(true);
};

const deleteEntry = (date) => {
if (!confirm("Delete this entry?")) return;
const updated = entries.filter((e) => e.date !== date);
saveEntries(updated);
if (date === today) {
    setTodaySaved(false);
    setBedtime("23:00");
    setWakeTime("07:00");
    setQuality("good");
    setNotes("");
}
};

const getHoursColor = (hours) => {
if (hours >= 7 && hours <= 9) return "#00CEC9";
if (hours >= 6) return "#fdcb6e";
return "#ff6b6b";
};

const getQualityInfo = (id) => sleepQualities.find((q) => q.id === id) || sleepQualities[1];

const currentHours = parseFloat(calculateHours(bedtime, wakeTime));

// Weekly stats
const last7 = entries.slice(0, 7);
const avgHours = last7.length > 0 ? (last7.reduce((sum, e) => sum + e.hours, 0) / last7.length).toFixed(1) : 0;
const avgQualityScore = last7.length > 0 ? (last7.reduce((sum, e) => {
const scores = { great: 5, good: 4, okay: 3, poor: 2, terrible: 1 };
return sum + (scores[e.quality] || 3);
}, 0) / last7.length).toFixed(1) : 0;

const bestNight = last7.length > 0 ? last7.reduce((best, e) => e.hours > best.hours ? e : best, last7[0]) : null;
const worstNight = last7.length > 0 ? last7.reduce((worst, e) => e.hours < worst.hours ? e : worst, last7[0]) : null;

// Last 7 days for chart
const last7Days = Array.from({ length: 7 }, (_, i) => {
const d = new Date();
d.setDate(d.getDate() - (6 - i));
return d.toDateString();
});

const dayLabels = last7Days.map((d) => {
const date = new Date(d);
return date.toLocaleDateString("en-US", { weekday: "short" });
});

const generateKaiInsight = async () => {
if (entries.length < 3) return;
setGeneratingKai(true);

const recentEntries = entries.slice(0, 7).map((e) => `${e.dayLabel}: ${e.hours}h, bedtime ${e.bedtime}, wake ${e.wakeTime}, quality: ${e.quality}`).join(". ");

try {
    const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: `Analyze my sleep data and give me personalized advice. Recent sleep: ${recentEntries}. Average hours: ${avgHours}h. Average quality: ${avgQualityScore}/5. Best night: ${bestNight?.hours}h. Worst night: ${worstNight?.hours}h. Give me: 1) A pattern you notice in my sleep habits, 2) One specific change I should make tonight to sleep better, 3) How my sleep might be affecting my productivity. Keep it concise and practical.`,
        history: [],
    }),
    });
    const data = await response.json();
    if (data.reply) setKaiMessage(data.reply);
} catch (e) {
    setKaiMessage("Couldn't connect to Kai right now.");
}
setGeneratingKai(false);
};

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ marginBottom: 16 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Sleep Tracker</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Log your sleep, discover patterns, and let Kai help you rest better</p>
    </div>

    {/* Stats */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginBottom: 16 }}>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Avg sleep</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: getHoursColor(avgHours) }}>{avgHours}h</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>last 7 days</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Avg quality</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: avgQualityScore >= 4 ? "#00CEC9" : avgQualityScore >= 3 ? "#fdcb6e" : "#ff6b6b" }}>{avgQualityScore}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>out of 5</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Best night</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#00CEC9" }}>{bestNight ? `${bestNight.hours}h` : "—"}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Days logged</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-accent-light)" }}>{entries.length}</div>
    </div>
    </div>

    {/* Log Today */}
    <div style={{
    background: todaySaved ? "linear-gradient(135deg, rgba(0,206,201,0.08), rgba(85,239,196,0.05))" : "linear-gradient(135deg, rgba(108,92,231,0.08), rgba(162,155,254,0.05))",
    border: `1px solid ${todaySaved ? "rgba(0,206,201,0.2)" : "rgba(108,92,231,0.2)"}`,
    borderRadius: 16, padding: 24, marginBottom: 20,
    }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 24 }}>😴</span>
        <div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--fm-text)" }}>Last night's sleep</div>
        <div style={{ fontSize: 13, color: "var(--fm-muted)" }}>
            {todaySaved ? "Logged! You can still update it." : "How did you sleep?"}
        </div>
        </div>
    </div>

    <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 130 }}>
        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Bedtime</div>
        <input type="time" value={bedtime} onChange={(e) => setBedtime(e.target.value)} style={{
            width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 16, fontWeight: 600,
            fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box",
        }} />
        </div>
        <div style={{ flex: 1, minWidth: 130 }}>
        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Wake time</div>
        <input type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} style={{
            width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 16, fontWeight: 600,
            fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box",
        }} />
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 4 }}>
        <div style={{
            padding: "10px 18px", borderRadius: 10,
            background: `${getHoursColor(currentHours)}15`, border: `1px solid ${getHoursColor(currentHours)}30`,
        }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: getHoursColor(currentHours), lineHeight: 1 }}>{currentHours}h</div>
        </div>
        </div>
    </div>

    <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 8 }}>Sleep quality</div>
    <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {sleepQualities.map((q) => (
        <button key={q.id} onClick={() => setQuality(q.id)} style={{
            flex: 1, padding: "10px 4px", borderRadius: 10, cursor: "pointer",
            border: quality === q.id ? `1px solid ${q.color}50` : "1px solid var(--fm-border)",
            background: quality === q.id ? `${q.color}15` : "var(--fm-card)",
            fontFamily: "Outfit, sans-serif", textAlign: "center",
        }}>
            <div style={{ fontSize: 20, marginBottom: 2 }}>{q.emoji}</div>
            <div style={{ fontSize: 10, fontWeight: 500, color: quality === q.id ? q.color : "var(--fm-muted)" }}>{q.label}</div>
        </button>
        ))}
    </div>

    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any notes? Dreams, disturbances, how you feel..." rows={2} style={{
        width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13,
        fontFamily: "Outfit, sans-serif", outline: "none", resize: "none",
        marginBottom: 16, boxSizing: "border-box", lineHeight: 1.6,
    }} />

    <button onClick={saveEntry} style={{
        width: "100%", padding: "12px", borderRadius: 12, border: "none",
        background: todaySaved ? "rgba(0,206,201,0.15)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        color: todaySaved ? "#00CEC9" : "#fff",
        border: todaySaved ? "1px solid rgba(0,206,201,0.3)" : "none",
        fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>{todaySaved ? "Update" : "Log sleep"}</button>
    </div>

    {/* Weekly Chart */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: 18, marginBottom: 16,
    }}>
    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>This week</div>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 120, marginBottom: 8 }}>
        {last7Days.map((day, i) => {
        const entry = entries.find((e) => e.date === day);
        const hours = entry ? entry.hours : 0;
        const barHeight = hours > 0 ? Math.min((hours / 12) * 100, 100) : 4;
        const isToday = day === today;
        return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ fontSize: 9, fontWeight: 600, color: hours > 0 ? getHoursColor(hours) : "var(--fm-muted)" }}>
                {hours > 0 ? `${hours}h` : ""}
            </div>
            {entry && (
                <div style={{ fontSize: 12 }}>{getQualityInfo(entry.quality).emoji}</div>
            )}
            <div style={{
                width: "100%", borderRadius: 4,
                height: `${barHeight}%`,
                background: hours > 0
                ? `linear-gradient(to top, ${getHoursColor(hours)}, ${getHoursColor(hours)}80)`
                : "var(--fm-border)",
                opacity: hours > 0 ? 1 : 0.3,
                transition: "all 0.3s ease",
            }} />
            </div>
        );
        })}
    </div>
    <div style={{ display: "flex", gap: 6 }}>
        {dayLabels.map((d, i) => (
        <div key={i} style={{
            flex: 1, fontSize: 10, textAlign: "center",
            color: last7Days[i] === today ? "var(--fm-accent-light)" : "var(--fm-muted)",
            fontWeight: last7Days[i] === today ? 700 : 400,
        }}>{d}</div>
        ))}
    </div>

    <div style={{ marginTop: 12, display: "flex", gap: 12, justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <div style={{ width: 10, height: 10, borderRadius: 3, background: "#00CEC9" }} />
        <span style={{ fontSize: 10, color: "var(--fm-muted)" }}>7-9h (ideal)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <div style={{ width: 10, height: 10, borderRadius: 3, background: "#fdcb6e" }} />
        <span style={{ fontSize: 10, color: "var(--fm-muted)" }}>6-7h</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <div style={{ width: 10, height: 10, borderRadius: 3, background: "#ff6b6b" }} />
        <span style={{ fontSize: 10, color: "var(--fm-muted)" }}>Under 6h</span>
        </div>
    </div>
    </div>

    {/* Kai Insight */}
    {entries.length >= 3 && (
    kaiMessage ? (
        <div style={{
        background: "rgba(108,92,231,0.08)", border: "1px solid rgba(108,92,231,0.15)",
        borderRadius: 14, padding: 20, marginBottom: 16,
        }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-accent-light)" }}>Kai's sleep insight</span>
            </div>
            <div onClick={() => setKaiMessage("")} style={{ cursor: "pointer", color: "var(--fm-muted)", fontSize: 11 }}>Close</div>
        </div>
        <div style={{ fontSize: 13, color: "var(--fm-text)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{kaiMessage}</div>
        </div>
    ) : (
        <div style={{ textAlign: "center", marginBottom: 16 }}>
        <button onClick={generateKaiInsight} disabled={generatingKai} style={{
            padding: "12px 24px", borderRadius: 12, border: "none",
            background: generatingKai ? "var(--fm-muted)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            color: "#fff", fontSize: 13, fontWeight: 600,
            cursor: generatingKai ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
            display: "inline-flex", alignItems: "center", gap: 8,
        }}>
            {generatingKai ? (
            <>
                <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                Kai is analyzing...
            </>
            ) : (
            <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
                Get Kai's sleep insight
            </>
            )}
        </button>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )
    )}

    {entries.length < 3 && entries.length > 0 && (
    <div style={{
        textAlign: "center", padding: 16, marginBottom: 16,
        background: "rgba(108,92,231,0.05)", border: "1px solid rgba(108,92,231,0.1)",
        borderRadius: 14, fontSize: 13, color: "var(--fm-muted)",
    }}>
        Log {3 - entries.length} more night{3 - entries.length > 1 ? "s" : ""} to unlock Kai's sleep analysis
    </div>
    )}

    {/* Sleep Tip */}
    <div style={{
    background: "rgba(116,185,255,0.08)", border: "1px solid rgba(116,185,255,0.15)",
    borderRadius: 14, padding: 16, marginBottom: 16,
    }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 16 }}>💡</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#74b9ff" }}>Sleep tip</span>
    </div>
    <div style={{ fontSize: 13, color: "var(--fm-text)", lineHeight: 1.6 }}>{tipOfDay}</div>
    </div>

    {/* Past Entries */}
    {entries.length > 0 && (
    <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 10 }}>Sleep log</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {entries.map((entry) => {
            const qualityInfo = getQualityInfo(entry.quality);
            return (
            <div key={entry.date} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 14px", background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
                borderRadius: 12, borderLeft: `4px solid ${getHoursColor(entry.hours)}`,
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 22 }}>{qualityInfo.emoji}</div>
                <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)" }}>
                    {entry.hours}h — {qualityInfo.label}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--fm-muted)" }}>
                    {entry.dayLabel} · {entry.bedtime} → {entry.wakeTime}
                    {entry.date === today && <span style={{ color: "#00CEC9", marginLeft: 6 }}>Today</span>}
                    </div>
                    {entry.notes && <div style={{ fontSize: 11, color: "var(--fm-muted)", marginTop: 2 }}>"{entry.notes}"</div>}
                </div>
                </div>
                <div onClick={() => deleteEntry(entry.date)} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 4 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </div>
            </div>
            );
        })}
        </div>
    </div>
    )}
</div>
);
}