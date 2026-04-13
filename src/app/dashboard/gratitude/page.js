"use client";

import { useState, useEffect } from "react";

export default function GratitudePage() {
const [entries, setEntries] = useState([]);
const [item1, setItem1] = useState("");
const [item2, setItem2] = useState("");
const [item3, setItem3] = useState("");
const [todaySaved, setTodaySaved] = useState(false);
const [streak, setStreak] = useState(0);
const [kaiMessage, setKaiMessage] = useState("");
const [generatingKai, setGeneratingKai] = useState(false);

const today = new Date().toDateString();

useEffect(() => {
loadData();
}, []);

const loadData = () => {
const saved = localStorage.getItem("daylyft-gratitude");
if (saved) {
    const parsed = JSON.parse(saved);
    setEntries(parsed.entries || []);

    const todayEntry = (parsed.entries || []).find((e) => e.date === today);
    if (todayEntry) {
    setItem1(todayEntry.items[0] || "");
    setItem2(todayEntry.items[1] || "");
    setItem3(todayEntry.items[2] || "");
    setTodaySaved(true);
    }

    if (parsed.streak) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (parsed.lastDate === yesterday.toDateString() || parsed.lastDate === today) {
        setStreak(parsed.streak);
    }
    }
}
};

const saveEntry = () => {
if (!item1.trim() && !item2.trim() && !item3.trim()) {
    alert("Write at least one thing you're grateful for");
    return;
}

const items = [item1.trim(), item2.trim(), item3.trim()].filter((i) => i);
const newEntry = { date: today, items, dayLabel: new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) };

const existingIndex = entries.findIndex((e) => e.date === today);
let updatedEntries;
if (existingIndex >= 0) {
    updatedEntries = [...entries];
    updatedEntries[existingIndex] = newEntry;
} else {
    updatedEntries = [newEntry, ...entries];
}

const newStreak = todaySaved ? streak : streak + 1;

setEntries(updatedEntries);
setStreak(newStreak);
setTodaySaved(true);

localStorage.setItem("daylyft-gratitude", JSON.stringify({
    entries: updatedEntries,
    streak: newStreak,
    lastDate: today,
}));
};

const deleteEntry = (date) => {
if (!confirm("Delete this entry?")) return;
const updated = entries.filter((e) => e.date !== date);
setEntries(updated);
if (date === today) {
    setItem1("");
    setItem2("");
    setItem3("");
    setTodaySaved(false);
}
localStorage.setItem("daylyft-gratitude", JSON.stringify({
    entries: updated,
    streak,
    lastDate: updated.length > 0 ? updated[0].date : null,
}));
};

const generateKaiReflection = async () => {
if (entries.length < 3) return;
setGeneratingKai(true);

const recentEntries = entries.slice(0, 7).map((e) => `${e.dayLabel}: ${e.items.join(", ")}`).join(". ");

try {
    const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: `Analyze my recent gratitude journal entries and give me a warm reflection. Entries: ${recentEntries}. Give me: 1) A pattern you notice in what I'm grateful for (people, experiences, achievements, nature, etc.), 2) How practicing gratitude is affecting my mindset based on what I write, 3) A prompt for tomorrow's gratitude entry to help me think deeper. Keep it warm, personal, and encouraging.`,
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

const totalEntries = entries.length;
const totalItems = entries.reduce((sum, e) => sum + e.items.length, 0);

const hour = new Date().getHours();
const timeGreeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ marginBottom: 16 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Gratitude Journal</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Write 3 things you're grateful for each day — rewire your brain for happiness</p>
    </div>

    {/* Stats */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginBottom: 16 }}>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Days logged</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-accent-light)" }}>{totalEntries}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Total gratitudes</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#00CEC9" }}>{totalItems}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Streak</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: streak >= 7 ? "#00CEC9" : streak >= 3 ? "#6C5CE7" : "var(--fm-muted)" }}>{streak}d</div>
        {streak >= 7 && <div style={{ fontSize: 10, color: "#00CEC9" }}>Amazing!</div>}
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Today</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: todaySaved ? "#00CEC9" : "var(--fm-warning)" }}>{todaySaved ? "✓" : "—"}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>{todaySaved ? "Done!" : "Not yet"}</div>
    </div>
    </div>

    {/* Today's Entry */}
    <div style={{
    background: todaySaved
        ? "linear-gradient(135deg, rgba(0,206,201,0.08), rgba(85,239,196,0.05))"
        : "linear-gradient(135deg, rgba(108,92,231,0.08), rgba(162,155,254,0.05))",
    border: `1px solid ${todaySaved ? "rgba(0,206,201,0.2)" : "rgba(108,92,231,0.2)"}`,
    borderRadius: 16, padding: 24, marginBottom: 20,
    }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 24 }}>🙏</span>
        <div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--fm-text)" }}>{timeGreeting}!</div>
        <div style={{ fontSize: 13, color: "var(--fm-muted)" }}>
            {todaySaved ? "You've logged your gratitude today. You can still edit it." : "What are you grateful for today?"}
        </div>
        </div>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
            width: 28, height: 28, borderRadius: 8, flexShrink: 0,
            background: item1.trim() ? "rgba(0,206,201,0.15)" : "var(--fm-card)",
            border: item1.trim() ? "1px solid rgba(0,206,201,0.3)" : "1px solid var(--fm-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: item1.trim() ? "#00CEC9" : "var(--fm-muted)",
        }}>1</div>
        <input value={item1} onChange={(e) => setItem1(e.target.value)} placeholder="I'm grateful for..." style={{
            flex: 1, padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
            fontFamily: "Outfit, sans-serif", outline: "none",
        }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
            width: 28, height: 28, borderRadius: 8, flexShrink: 0,
            background: item2.trim() ? "rgba(0,206,201,0.15)" : "var(--fm-card)",
            border: item2.trim() ? "1px solid rgba(0,206,201,0.3)" : "1px solid var(--fm-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: item2.trim() ? "#00CEC9" : "var(--fm-muted)",
        }}>2</div>
        <input value={item2} onChange={(e) => setItem2(e.target.value)} placeholder="I'm grateful for..." style={{
            flex: 1, padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
            fontFamily: "Outfit, sans-serif", outline: "none",
        }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
            width: 28, height: 28, borderRadius: 8, flexShrink: 0,
            background: item3.trim() ? "rgba(0,206,201,0.15)" : "var(--fm-card)",
            border: item3.trim() ? "1px solid rgba(0,206,201,0.3)" : "1px solid var(--fm-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: item3.trim() ? "#00CEC9" : "var(--fm-muted)",
        }}>3</div>
        <input value={item3} onChange={(e) => setItem3(e.target.value)} placeholder="I'm grateful for..." style={{
            flex: 1, padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
            fontFamily: "Outfit, sans-serif", outline: "none",
        }} />
        </div>
    </div>

    <button onClick={saveEntry} style={{
        width: "100%", padding: "12px", borderRadius: 12, border: "none",
        background: todaySaved ? "rgba(0,206,201,0.15)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        color: todaySaved ? "#00CEC9" : "#fff",
        border: todaySaved ? "1px solid rgba(0,206,201,0.3)" : "none",
        fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>{todaySaved ? "Update today's entry" : "Save today's gratitude"}</button>
    </div>

    {/* Kai Reflection */}
    {entries.length >= 3 && (
    kaiMessage ? (
        <div style={{
        background: "rgba(108,92,231,0.08)", border: "1px solid rgba(108,92,231,0.15)",
        borderRadius: 14, padding: 20, marginBottom: 16,
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-accent-light)" }}>Kai's gratitude reflection</span>
        </div>
        <div style={{ fontSize: 14, color: "var(--fm-text)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{kaiMessage}</div>
        </div>
    ) : (
        <div style={{ textAlign: "center", marginBottom: 16 }}>
        <button onClick={generateKaiReflection} disabled={generatingKai} style={{
            padding: "14px 28px", borderRadius: 14, border: "none",
            background: generatingKai ? "var(--fm-muted)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            color: "#fff", fontSize: 14, fontWeight: 700,
            cursor: generatingKai ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
            display: "inline-flex", alignItems: "center", gap: 8,
        }}>
            {generatingKai ? (
            <>
                <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                Kai is reflecting...
            </>
            ) : (
            <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
                Get Kai's reflection
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
        Log {3 - entries.length} more day{3 - entries.length > 1 ? "s" : ""} to unlock Kai's gratitude reflection
    </div>
    )}

    {/* Past Entries */}
    {entries.length > 0 && (
    <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>Past entries</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {entries.map((entry) => (
            <div key={entry.date} style={{
            background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
            borderRadius: 14, padding: 18,
            borderLeft: entry.date === today ? "4px solid #00CEC9" : "4px solid var(--fm-border)",
            }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 16 }}>🙏</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-text)" }}>{entry.dayLabel}</span>
                {entry.date === today && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 8, background: "rgba(0,206,201,0.1)", color: "#00CEC9" }}>Today</span>}
                </div>
                <div onClick={() => deleteEntry(entry.date)} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 4 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {entry.items.map((item, i) => (
                <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 12px",
                    background: "var(--fm-card)", borderRadius: 8,
                }}>
                    <div style={{
                    width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1,
                    background: "rgba(0,206,201,0.15)", border: "1px solid rgba(0,206,201,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 700, color: "#00CEC9",
                    }}>{i + 1}</div>
                    <span style={{ fontSize: 13, color: "var(--fm-text)", lineHeight: 1.6 }}>{item}</span>
                </div>
                ))}
            </div>
            </div>
        ))}
        </div>
    </div>
    )}

    {entries.length === 0 && !todaySaved && (
    <div style={{
        textAlign: "center", padding: 40,
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 16,
    }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🙏</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--fm-text)", marginBottom: 8 }}>Start your gratitude practice</h3>
        <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto" }}>
        Research shows that writing 3 things you're grateful for each day increases happiness by 25% in just 3 weeks.
        </p>
    </div>
    )}
</div>
);
}