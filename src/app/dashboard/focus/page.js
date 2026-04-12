"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

const focusDurations = [
{ label: "15 min", minutes: 15 },
{ label: "30 min", minutes: 30 },
{ label: "45 min", minutes: 45 },
{ label: "60 min", minutes: 60 },
{ label: "90 min", minutes: 90 },
{ label: "120 min", minutes: 120 },
];

const autoResponses = [
"I'm in deep focus mode right now. I'll get back to you when my session ends!",
"Currently in a Focus Shield session. I'll respond soon!",
"Can't chat right now — I'm protecting my focus time. Talk later!",
"Focus mode activated. I'll be available in a bit!",
];

const distractions = [
{ id: "social", name: "Social Media", emoji: "📱", tip: "Put your phone face-down or in another room" },
{ id: "email", name: "Email", emoji: "📧", tip: "Close all email tabs and disable notifications" },
{ id: "chat", name: "Chat Apps", emoji: "💬", tip: "Set yourself as 'Do Not Disturb' on Slack/Teams" },
{ id: "news", name: "News Sites", emoji: "📰", tip: "Resist the urge to check headlines — they'll be there later" },
{ id: "youtube", name: "YouTube", emoji: "▶️", tip: "Close YouTube tabs and remove it from your bookmarks bar" },
{ id: "snacks", name: "Snack Breaks", emoji: "🍪", tip: "Grab water and a snack BEFORE starting your session" },
];

export default function FocusPage() {
const [shieldActive, setShieldActive] = useState(false);
const [selectedDuration, setSelectedDuration] = useState(30);
const [timeLeft, setTimeLeft] = useState(0);
const [sessionsToday, setSessionsToday] = useState(0);
const [totalMinutesToday, setTotalMinutesToday] = useState(0);
const [selectedTask, setSelectedTask] = useState("");
const [tasks, setTasks] = useState([]);
const [autoResponse, setAutoResponse] = useState(autoResponses[0]);
const [blockedDistractions, setBlockedDistractions] = useState([]);
const [sessionComplete, setSessionComplete] = useState(false);
const intervalRef = useRef(null);

useEffect(() => {
loadData();
}, []);

useEffect(() => {
if (shieldActive && timeLeft > 0) {
    intervalRef.current = setInterval(() => {
    setTimeLeft((t) => t - 1);
    }, 1000);
} else if (timeLeft === 0 && shieldActive) {
    setShieldActive(false);
    completeSession();
}
return () => clearInterval(intervalRef.current);
}, [shieldActive, timeLeft]);

const loadData = async () => {
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;

const { data } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", session.user.id)
    .eq("completed", false)
    .order("created_at", { ascending: true });

if (data) setTasks(data);

const saved = localStorage.getItem("daylyft-focus");
if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed.date === new Date().toDateString()) {
    setSessionsToday(parsed.sessions || 0);
    setTotalMinutesToday(parsed.minutes || 0);
    }
}
};

const startShield = () => {
setShieldActive(true);
setTimeLeft(selectedDuration * 60);
setSessionComplete(false);
playStartSound();
};

const stopShield = () => {
if (!confirm("End your focus session early?")) return;
setShieldActive(false);
setTimeLeft(0);
clearInterval(intervalRef.current);
};

const completeSession = () => {
const newSessions = sessionsToday + 1;
const newMinutes = totalMinutesToday + selectedDuration;
setSessionsToday(newSessions);
setTotalMinutesToday(newMinutes);
setSessionComplete(true);

localStorage.setItem("daylyft-focus", JSON.stringify({
    date: new Date().toDateString(),
    sessions: newSessions,
    minutes: newMinutes,
}));

playCompleteSound();
};

const playStartSound = () => {
try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 600;
    gain.gain.value = 0.2;
    osc.start();
    setTimeout(() => { osc.frequency.value = 800; }, 150);
    setTimeout(() => { osc.stop(); ctx.close(); }, 300);
} catch (e) {}
};

const playCompleteSound = () => {
try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 523;
    gain.gain.value = 0.2;
    osc.start();
    setTimeout(() => { osc.frequency.value = 659; }, 200);
    setTimeout(() => { osc.frequency.value = 784; }, 400);
    setTimeout(() => { osc.stop(); ctx.close(); }, 600);
} catch (e) {}
};

const toggleDistraction = (id) => {
setBlockedDistractions((prev) =>
    prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
);
};

const formatTime = (seconds) => {
const m = Math.floor(seconds / 60);
const s = seconds % 60;
return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

const progress = selectedDuration * 60 > 0 ? ((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * 100 : 0;
const circumference = 2 * Math.PI * 120;
const strokeDashoffset = circumference - (progress / 100) * circumference;

// Active Shield Mode
if (shieldActive) {
return (
    <div style={{ animation: "fadeIn 0.5s ease", textAlign: "center", paddingTop: 20 }}>
    <div style={{
        background: "linear-gradient(135deg, rgba(108,92,231,0.1), rgba(0,206,201,0.05))",
        border: "1px solid rgba(108,92,231,0.2)",
        borderRadius: 20, padding: 32, marginBottom: 20,
    }}>
        <div style={{ fontSize: 14, color: "#6C5CE7", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 16 }}>🛡 FOCUS SHIELD ACTIVE</div>

        <div style={{ position: "relative", width: 260, height: 260, margin: "0 auto 20px" }}>
        <svg width="260" height="260" viewBox="0 0 260 260" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="130" cy="130" r="120" fill="none" stroke="var(--fm-border)" strokeWidth="6" />
            <circle cx="130" cy="130" r="120" fill="none"
            stroke="#6C5CE7" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 1s linear" }}
            />
        </svg>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <div style={{ fontSize: 52, fontWeight: 800, color: "var(--fm-text)", lineHeight: 1, fontFamily: "Outfit, sans-serif" }}>{formatTime(timeLeft)}</div>
            <div style={{ fontSize: 13, color: "var(--fm-muted)", marginTop: 8 }}>remaining</div>
        </div>
        </div>

        {selectedTask && (
        <div style={{ fontSize: 14, color: "var(--fm-text)", marginBottom: 16 }}>
            Working on: <span style={{ fontWeight: 600, color: "var(--fm-accent-light)" }}>{selectedTask}</span>
        </div>
        )}

        <div style={{
        padding: 14, borderRadius: 12,
        background: "rgba(108,92,231,0.08)", border: "1px solid rgba(108,92,231,0.15)",
        marginBottom: 20, fontSize: 13, color: "var(--fm-muted)", lineHeight: 1.6,
        }}>
        <div style={{ fontWeight: 600, color: "var(--fm-accent-light)", marginBottom: 4 }}>Auto-response ready:</div>
        "{autoResponse}"
        </div>

        {blockedDistractions.length > 0 && (
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            {blockedDistractions.map((id) => {
            const d = distractions.find((x) => x.id === id);
            return d ? (
                <span key={id} style={{
                padding: "4px 12px", borderRadius: 16, fontSize: 11,
                background: "rgba(255,107,107,0.1)", color: "#ff6b6b",
                border: "1px solid rgba(255,107,107,0.2)",
                }}>🚫 {d.emoji} {d.name}</span>
            ) : null;
            })}
        </div>
        )}

        <button onClick={stopShield} style={{
        padding: "12px 28px", borderRadius: 12,
        border: "1px solid rgba(255,107,107,0.3)", background: "rgba(255,107,107,0.1)",
        color: "#ff6b6b", fontSize: 14, fontWeight: 600,
        cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>End session early</button>
    </div>

    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 18, textAlign: "left",
    }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 10 }}>Stay focused tips</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {blockedDistractions.length > 0 ? (
            blockedDistractions.map((id) => {
            const d = distractions.find((x) => x.id === id);
            return d ? (
                <div key={id} style={{ fontSize: 13, color: "var(--fm-muted)", display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span>{d.emoji}</span>
                <span>{d.tip}</span>
                </div>
            ) : null;
            })
        ) : (
            <div style={{ fontSize: 13, color: "var(--fm-muted)" }}>You're in the zone. Keep going!</div>
        )}
        </div>
    </div>
    </div>
);
}

// Session Complete Screen
if (sessionComplete) {
return (
    <div style={{ animation: "fadeIn 0.5s ease", textAlign: "center", paddingTop: 40 }}>
    <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
    <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-text)", marginBottom: 8 }}>Focus session complete!</h2>
    <p style={{ fontSize: 15, color: "var(--fm-muted)", marginBottom: 24 }}>
        You focused for {selectedDuration} minutes. Great work!
    </p>

    <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 32 }}>
        <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center", minWidth: 120 }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Sessions today</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "#6C5CE7" }}>{sessionsToday}</div>
        </div>
        <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center", minWidth: 120 }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Total focus</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "#00CEC9" }}>{totalMinutesToday}m</div>
        </div>
    </div>

    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={() => setSessionComplete(false)} style={{
        padding: "12px 28px", borderRadius: 12, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Start another session</button>
        <button onClick={() => window.location.href = "/dashboard/zen"} style={{
        padding: "12px 28px", borderRadius: 12,
        border: "1px solid rgba(116,185,255,0.3)", background: "rgba(116,185,255,0.1)",
        color: "#74b9ff", fontSize: 14, fontWeight: 600,
        cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Take a Zen break</button>
    </div>
    </div>
);
}

// Setup Screen
return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ marginBottom: 20 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Focus Shield</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Block distractions and protect your deep work time with smart focus sessions</p>
    </div>

    {/* Today's Stats */}
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
    <div style={{ flex: 1, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Sessions today</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "#6C5CE7" }}>{sessionsToday}</div>
    </div>
    <div style={{ flex: 1, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Total focus</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "#00CEC9" }}>{totalMinutesToday}m</div>
    </div>
    <div style={{ flex: 1, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Daily goal</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: totalMinutesToday >= 120 ? "#00CEC9" : "var(--fm-warning)" }}>{totalMinutesToday >= 120 ? "✓" : `${120 - totalMinutesToday}m`}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>{totalMinutesToday >= 120 ? "Goal reached!" : "to reach 2h"}</div>
    </div>
    </div>

    {/* Duration Selector */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: 18, marginBottom: 16,
    }}>
    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>How long do you want to focus?</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {focusDurations.map((d) => (
        <button key={d.minutes} onClick={() => setSelectedDuration(d.minutes)} style={{
            padding: "12px 8px", borderRadius: 10, fontSize: 14, fontWeight: 600,
            border: selectedDuration === d.minutes ? "1px solid rgba(108,92,231,0.4)" : "1px solid var(--fm-border)",
            background: selectedDuration === d.minutes ? "rgba(108,92,231,0.1)" : "var(--fm-card)",
            color: selectedDuration === d.minutes ? "#6C5CE7" : "var(--fm-text)",
            cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>{d.label}</button>
        ))}
    </div>
    </div>

    {/* Task Selector */}
    {tasks.length > 0 && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 18, marginBottom: 16,
    }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>What will you work on?</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {tasks.slice(0, 5).map((task) => (
            <div key={task.id} onClick={() => setSelectedTask(selectedTask === task.title ? "" : task.title)} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
            background: selectedTask === task.title ? "rgba(108,92,231,0.1)" : "var(--fm-card)",
            border: selectedTask === task.title ? "1px solid rgba(108,92,231,0.3)" : "1px solid var(--fm-border)",
            borderRadius: 10, cursor: "pointer",
            }}>
            <span style={{
                fontSize: 10, padding: "2px 8px", borderRadius: 10, flexShrink: 0,
                background: task.priority === "high" ? "rgba(255,107,107,0.1)" : task.priority === "low" ? "rgba(0,206,201,0.1)" : "rgba(253,203,110,0.1)",
                color: task.priority === "high" ? "#ff6b6b" : task.priority === "low" ? "#00CEC9" : "#fdcb6e",
            }}>{task.priority}</span>
            <span style={{ fontSize: 13, color: selectedTask === task.title ? "var(--fm-accent-light)" : "var(--fm-text)" }}>{task.title}</span>
            {selectedTask === task.title && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2.5" style={{ marginLeft: "auto" }}><polyline points="20 6 9 17 4 12" /></svg>
            )}
            </div>
        ))}
        </div>
    </div>
    )}

    {/* Distraction Blocker */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: 18, marginBottom: 16,
    }}>
    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 4 }}>What distractions will you block?</div>
    <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 12 }}>Select the ones you want to avoid during your session</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
        {distractions.map((d) => (
        <div key={d.id} onClick={() => toggleDistraction(d.id)} style={{
            padding: "10px 12px", borderRadius: 10, cursor: "pointer",
            background: blockedDistractions.includes(d.id) ? "rgba(255,107,107,0.08)" : "var(--fm-card)",
            border: blockedDistractions.includes(d.id) ? "1px solid rgba(255,107,107,0.25)" : "1px solid var(--fm-border)",
            display: "flex", alignItems: "center", gap: 8,
        }}>
            <span style={{ fontSize: 18 }}>{d.emoji}</span>
            <span style={{
            fontSize: 12, fontWeight: 500,
            color: blockedDistractions.includes(d.id) ? "#ff6b6b" : "var(--fm-text)",
            }}>{d.name}</span>
        </div>
        ))}
    </div>
    </div>

    {/* Auto Response */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: 18, marginBottom: 20,
    }}>
    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>Auto-response message</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {autoResponses.map((msg, i) => (
        <div key={i} onClick={() => setAutoResponse(msg)} style={{
            padding: "10px 14px", borderRadius: 10, cursor: "pointer",
            background: autoResponse === msg ? "rgba(108,92,231,0.08)" : "var(--fm-card)",
            border: autoResponse === msg ? "1px solid rgba(108,92,231,0.25)" : "1px solid var(--fm-border)",
            fontSize: 12, color: autoResponse === msg ? "var(--fm-accent-light)" : "var(--fm-muted)", lineHeight: 1.5,
        }}>
            "{msg}"
        </div>
        ))}
    </div>
    </div>

    {/* Start Button */}
    <div style={{ textAlign: "center" }}>
    <button onClick={startShield} style={{
        padding: "16px 48px", borderRadius: 16, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        color: "#fff", fontSize: 18, fontWeight: 700,
        cursor: "pointer", fontFamily: "Outfit, sans-serif",
        display: "inline-flex", alignItems: "center", gap: 10,
    }}>
        🛡 Activate Focus Shield ({selectedDuration} min)
    </button>
    </div>
</div>
);
}