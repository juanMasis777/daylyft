"use client";

import { useState, useEffect } from "react";

const defaultMorning = [
{ id: "wake", title: "Wake up early", emoji: "⏰" },
{ id: "water", title: "Drink a glass of water", emoji: "💧" },
{ id: "meditate", title: "Meditate 5 minutes", emoji: "🧘" },
{ id: "exercise", title: "Exercise or stretch", emoji: "💪" },
{ id: "shower", title: "Shower", emoji: "🚿" },
{ id: "breakfast", title: "Healthy breakfast", emoji: "🥗" },
{ id: "plan", title: "Plan your day", emoji: "📋" },
];

const defaultNight = [
{ id: "review", title: "Review what you accomplished", emoji: "📝" },
{ id: "tidy", title: "Tidy your workspace", emoji: "🧹" },
{ id: "journal", title: "Write in your journal", emoji: "📓" },
{ id: "noscreen", title: "No screens 30 min before bed", emoji: "📵" },
{ id: "grateful", title: "Think of 3 things you're grateful for", emoji: "🙏" },
{ id: "sleep", title: "Go to bed on time", emoji: "🛌" },
];

export default function ChecklistPage() {
const [morningItems, setMorningItems] = useState([]);
const [nightItems, setNightItems] = useState([]);
const [morningChecked, setMorningChecked] = useState({});
const [nightChecked, setNightChecked] = useState({});
const [activeTab, setActiveTab] = useState("morning");
const [showAdd, setShowAdd] = useState(false);
const [newTitle, setNewTitle] = useState("");
const [newEmoji, setNewEmoji] = useState("✅");
const [streak, setStreak] = useState(0);

const today = new Date().toDateString();

useEffect(() => {
loadData();
}, []);

const loadData = () => {
const savedMorning = localStorage.getItem("daylyft-checklist-morning-items");
const savedNight = localStorage.getItem("daylyft-checklist-night-items");
setMorningItems(savedMorning ? JSON.parse(savedMorning) : defaultMorning);
setNightItems(savedNight ? JSON.parse(savedNight) : defaultNight);

const savedChecks = localStorage.getItem("daylyft-checklist-checks");
if (savedChecks) {
    const parsed = JSON.parse(savedChecks);
    if (parsed.date === today) {
    setMorningChecked(parsed.morning || {});
    setNightChecked(parsed.night || {});
    }
}

const savedStreak = localStorage.getItem("daylyft-checklist-streak");
if (savedStreak) {
    const parsed = JSON.parse(savedStreak);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (parsed.lastDate === yesterday.toDateString() || parsed.lastDate === today) {
    setStreak(parsed.count || 0);
    }
}
};

const saveChecks = (morning, night) => {
localStorage.setItem("daylyft-checklist-checks", JSON.stringify({
    date: today,
    morning,
    night,
}));

const allMorningDone = morningItems.every((item) => morning[item.id]);
const allNightDone = nightItems.every((item) => night[item.id]);
if (allMorningDone && allNightDone) {
    const newStreak = streak + 1;
    setStreak(newStreak);
    localStorage.setItem("daylyft-checklist-streak", JSON.stringify({
    lastDate: today,
    count: newStreak,
    }));
}
};

const toggleMorning = (id) => {
const updated = { ...morningChecked, [id]: !morningChecked[id] };
setMorningChecked(updated);
saveChecks(updated, nightChecked);
};

const toggleNight = (id) => {
const updated = { ...nightChecked, [id]: !nightChecked[id] };
setNightChecked(updated);
saveChecks(morningChecked, updated);
};

const addItem = () => {
if (!newTitle.trim()) return;
const newItem = { id: `custom_${Date.now()}`, title: newTitle.trim(), emoji: newEmoji };
if (activeTab === "morning") {
    const updated = [...morningItems, newItem];
    setMorningItems(updated);
    localStorage.setItem("daylyft-checklist-morning-items", JSON.stringify(updated));
} else {
    const updated = [...nightItems, newItem];
    setNightItems(updated);
    localStorage.setItem("daylyft-checklist-night-items", JSON.stringify(updated));
}
setNewTitle("");
setNewEmoji("✅");
setShowAdd(false);
};

const removeItem = (id) => {
if (activeTab === "morning") {
    const updated = morningItems.filter((item) => item.id !== id);
    setMorningItems(updated);
    localStorage.setItem("daylyft-checklist-morning-items", JSON.stringify(updated));
} else {
    const updated = nightItems.filter((item) => item.id !== id);
    setNightItems(updated);
    localStorage.setItem("daylyft-checklist-night-items", JSON.stringify(updated));
}
};

const resetToDefaults = () => {
if (!confirm("Reset to default checklist items?")) return;
if (activeTab === "morning") {
    setMorningItems(defaultMorning);
    localStorage.setItem("daylyft-checklist-morning-items", JSON.stringify(defaultMorning));
} else {
    setNightItems(defaultNight);
    localStorage.setItem("daylyft-checklist-night-items", JSON.stringify(defaultNight));
}
};

const currentItems = activeTab === "morning" ? morningItems : nightItems;
const currentChecked = activeTab === "morning" ? morningChecked : nightChecked;
const toggleFn = activeTab === "morning" ? toggleMorning : toggleNight;

const doneCount = currentItems.filter((item) => currentChecked[item.id]).length;
const totalCount = currentItems.length;
const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

const morningDone = morningItems.filter((item) => morningChecked[item.id]).length;
const nightDone = nightItems.filter((item) => nightChecked[item.id]).length;
const totalDone = morningDone + nightDone;
const totalAll = morningItems.length + nightItems.length;
const totalPct = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;

const emojiOptions = ["✅", "💪", "📚", "🧘", "💧", "🥗", "🏃", "💊", "📵", "🎯", "😊", "🛌", "📝", "🧹", "🎨", "🎵", "☕", "🌿", "📱", "💡"];

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Daily Checklist</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Build powerful morning and evening routines that reset every day</p>
    </div>
    <button onClick={() => setShowAdd(!showAdd)} style={{
        padding: "8px 18px", borderRadius: 10, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>{showAdd ? "Cancel" : "+ Add"}</button>
    </div>

    {/* Stats */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginBottom: 16 }}>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Today</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: totalPct === 100 ? "#00CEC9" : "var(--fm-accent-light)" }}>{totalPct}%</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>{totalDone}/{totalAll} done</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Morning</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: morningDone === morningItems.length && morningItems.length > 0 ? "#00CEC9" : "#fdcb6e" }}>{morningDone}/{morningItems.length}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Evening</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: nightDone === nightItems.length && nightItems.length > 0 ? "#00CEC9" : "#74b9ff" }}>{nightDone}/{nightItems.length}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Streak</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: streak >= 7 ? "#00CEC9" : streak >= 3 ? "#6C5CE7" : "var(--fm-muted)" }}>{streak}d</div>
        {streak >= 7 && <div style={{ fontSize: 10, color: "#00CEC9" }}>On fire!</div>}
    </div>
    </div>

    {/* Progress Bar */}
    <div style={{ background: "var(--fm-card)", borderRadius: 8, height: 8, marginBottom: 16, overflow: "hidden" }}>
    <div style={{
        height: "100%", borderRadius: 8, width: `${totalPct}%`,
        background: totalPct === 100 ? "linear-gradient(135deg, #00CEC9, #55efc4)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        transition: "width 0.5s ease",
    }} />
    </div>

    {/* Tabs */}
    <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
    <button onClick={() => setActiveTab("morning")} style={{
        flex: 1, padding: "12px 8px", borderRadius: 10, fontSize: 14, fontWeight: 600,
        border: activeTab === "morning" ? "1px solid rgba(253,203,110,0.4)" : "1px solid var(--fm-border)",
        background: activeTab === "morning" ? "rgba(253,203,110,0.1)" : "var(--fm-surface)",
        color: activeTab === "morning" ? "#fdcb6e" : "var(--fm-muted)",
        cursor: "pointer", fontFamily: "Outfit, sans-serif",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    }}>
        <span style={{ fontSize: 20 }}>🌅</span> Morning
    </button>
    <button onClick={() => setActiveTab("night")} style={{
        flex: 1, padding: "12px 8px", borderRadius: 10, fontSize: 14, fontWeight: 600,
        border: activeTab === "night" ? "1px solid rgba(116,185,255,0.4)" : "1px solid var(--fm-border)",
        background: activeTab === "night" ? "rgba(116,185,255,0.1)" : "var(--fm-surface)",
        color: activeTab === "night" ? "#74b9ff" : "var(--fm-muted)",
        cursor: "pointer", fontFamily: "Outfit, sans-serif",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    }}>
        <span style={{ fontSize: 20 }}>🌙</span> Evening
    </button>
    </div>

    {/* Add Item Form */}
    {showAdd && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 20, marginBottom: 16,
    }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>
        Add to {activeTab === "morning" ? "morning" : "evening"} routine
        </div>
        <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Read 10 pages, Take vitamins..." style={{
        width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
        fontFamily: "Outfit, sans-serif", outline: "none", marginBottom: 12, boxSizing: "border-box",
        }} />
        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 8 }}>Choose an icon</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {emojiOptions.map((e) => (
            <div key={e} onClick={() => setNewEmoji(e)} style={{
            width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, cursor: "pointer",
            background: newEmoji === e ? "rgba(108,92,231,0.1)" : "var(--fm-card)",
            border: newEmoji === e ? "1px solid rgba(108,92,231,0.3)" : "1px solid var(--fm-border)",
            }}>{e}</div>
        ))}
        </div>
        <button onClick={addItem} disabled={!newTitle.trim()} style={{
        width: "100%", padding: "12px", borderRadius: 12, border: "none",
        background: newTitle.trim() ? "linear-gradient(135deg, #6C5CE7, #a29bfe)" : "var(--fm-muted)",
        color: "#fff", fontSize: 14, fontWeight: 600,
        cursor: newTitle.trim() ? "pointer" : "not-allowed", fontFamily: "Outfit, sans-serif",
        }}>Add to {activeTab} routine</button>
    </div>
    )}

    {/* Checklist Items */}
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
    {currentItems.map((item, index) => {
        const checked = currentChecked[item.id];
        return (
        <div key={item.id} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
            background: checked ? (activeTab === "morning" ? "rgba(253,203,110,0.06)" : "rgba(116,185,255,0.06)") : "var(--fm-surface)",
            border: checked ? `1px solid ${activeTab === "morning" ? "rgba(253,203,110,0.2)" : "rgba(116,185,255,0.2)"}` : "1px solid var(--fm-border)",
            borderRadius: 12, transition: "all 0.2s ease",
        }}>
            <div onClick={() => toggleFn(item.id)} style={{
            width: 24, height: 24, borderRadius: 7, cursor: "pointer", flexShrink: 0,
            border: checked ? "none" : "2px solid var(--fm-muted)",
            background: checked ? (activeTab === "morning" ? "linear-gradient(135deg, #fdcb6e, #ffeaa7)" : "linear-gradient(135deg, #74b9ff, #a29bfe)") : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s ease",
            }}>
            {checked && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
            </div>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{item.emoji}</span>
            <span style={{
            fontSize: 14, flex: 1, fontWeight: 500,
            color: checked ? "var(--fm-muted)" : "var(--fm-text)",
            textDecoration: checked ? "line-through" : "none",
            transition: "all 0.2s ease",
            }}>{item.title}</span>
            <span style={{ fontSize: 12, color: "var(--fm-muted)", flexShrink: 0 }}>#{index + 1}</span>
        </div>
        );
    })}
    </div>

    {/* Completion Message */}
    {pct === 100 && totalCount > 0 && (
    <div style={{
        background: activeTab === "morning" ? "rgba(253,203,110,0.1)" : "rgba(116,185,255,0.1)",
        border: `1px solid ${activeTab === "morning" ? "rgba(253,203,110,0.25)" : "rgba(116,185,255,0.25)"}`,
        borderRadius: 14, padding: 20, marginBottom: 16, textAlign: "center",
    }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--fm-text)", marginBottom: 4 }}>
        {activeTab === "morning" ? "Morning routine complete!" : "Evening routine complete!"}
        </div>
        <div style={{ fontSize: 13, color: "var(--fm-muted)" }}>
        {activeTab === "morning" ? "You're set for a productive day!" : "Great way to end the day. Rest well!"}
        </div>
    </div>
    )}

    {/* Manage Section */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: 18,
    }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)" }}>Manage {activeTab} routine</div>
        <button onClick={resetToDefaults} style={{
        padding: "6px 12px", borderRadius: 8, border: "1px solid var(--fm-border)",
        background: "transparent", color: "var(--fm-muted)", fontSize: 11,
        cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Reset defaults</button>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {currentItems.map((item) => (
        <div key={item.id} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "8px 12px", background: "var(--fm-card)", borderRadius: 8,
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16 }}>{item.emoji}</span>
            <span style={{ fontSize: 13, color: "var(--fm-text)" }}>{item.title}</span>
            </div>
            <div onClick={() => removeItem(item.id)} style={{
            cursor: "pointer", color: "var(--fm-danger)", fontSize: 11, fontWeight: 500,
            }}>Remove</div>
        </div>
        ))}
    </div>
    </div>
</div>
);
}