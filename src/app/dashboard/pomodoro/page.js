"use client";

import { useState, useEffect, useRef } from "react";

const MODES = {
focus: { label: "Focus Time", duration: 25 * 60, color: "#6C5CE7", icon: "🎯" },
shortBreak: { label: "Short Break", duration: 5 * 60, color: "#00CEC9", icon: "☕" },
longBreak: { label: "Long Break", duration: 15 * 60, color: "#fd79a8", icon: "🌴" },
};

export default function PomodoroPage() {
const [mode, setMode] = useState("focus");
const [timeLeft, setTimeLeft] = useState(MODES.focus.duration);
const [running, setRunning] = useState(false);
const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
const [totalToday, setTotalToday] = useState(0);
const [totalMinutesToday, setTotalMinutesToday] = useState(0);
const [selectedTask, setSelectedTask] = useState("");
const [showSettings, setShowSettings] = useState(false);
const [focusDuration, setFocusDuration] = useState(25);
const [shortBreakDuration, setShortBreakDuration] = useState(5);
const [longBreakDuration, setLongBreakDuration] = useState(15);
const intervalRef = useRef(null);
const audioRef = useRef(null);

useEffect(() => {
const saved = localStorage.getItem("daylyft-pomodoro");
if (saved) {
    const data = JSON.parse(saved);
    const today = new Date().toDateString();
    if (data.date === today) {
    setTotalToday(data.totalToday || 0);
    setTotalMinutesToday(data.totalMinutes || 0);
    }
}
}, []);

useEffect(() => {
if (running && timeLeft > 0) {
    intervalRef.current = setInterval(() => {
    setTimeLeft((t) => t - 1);
    }, 1000);
} else if (timeLeft === 0 && running) {
    setRunning(false);
    playSound();
    handleComplete();
}
return () => clearInterval(intervalRef.current);
}, [running, timeLeft]);

const playSound = () => {
try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 800;
    gain.gain.value = 0.3;
    osc.start();
    setTimeout(() => { osc.frequency.value = 1000; }, 200);
    setTimeout(() => { osc.frequency.value = 800; }, 400);
    setTimeout(() => { osc.stop(); ctx.close(); }, 600);
} catch (e) {}
};

const handleComplete = () => {
if (mode === "focus") {
    const newCount = pomodorosCompleted + 1;
    setPomodorosCompleted(newCount);
    const newTotal = totalToday + 1;
    const newMinutes = totalMinutesToday + focusDuration;
    setTotalToday(newTotal);
    setTotalMinutesToday(newMinutes);

    localStorage.setItem("daylyft-pomodoro", JSON.stringify({
    date: new Date().toDateString(),
    totalToday: newTotal,
    totalMinutes: newMinutes,
    }));

    if (newCount % 4 === 0) {
    switchMode("longBreak");
    } else {
    switchMode("shortBreak");
    }
} else {
    switchMode("focus");
}
};

const switchMode = (newMode) => {
setRunning(false);
setMode(newMode);
if (newMode === "focus") setTimeLeft(focusDuration * 60);
else if (newMode === "shortBreak") setTimeLeft(shortBreakDuration * 60);
else setTimeLeft(longBreakDuration * 60);
};

const toggleTimer = () => {
setRunning(!running);
};

const resetTimer = () => {
setRunning(false);
if (mode === "focus") setTimeLeft(focusDuration * 60);
else if (mode === "shortBreak") setTimeLeft(shortBreakDuration * 60);
else setTimeLeft(longBreakDuration * 60);
};

const applySettings = () => {
MODES.focus.duration = focusDuration * 60;
MODES.shortBreak.duration = shortBreakDuration * 60;
MODES.longBreak.duration = longBreakDuration * 60;
if (mode === "focus") setTimeLeft(focusDuration * 60);
else if (mode === "shortBreak") setTimeLeft(shortBreakDuration * 60);
else setTimeLeft(longBreakDuration * 60);
setRunning(false);
setShowSettings(false);
};

const formatTime = (seconds) => {
const m = Math.floor(seconds / 60);
const s = seconds % 60;
return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

const currentMode = MODES[mode];
const totalDuration = mode === "focus" ? focusDuration * 60 : mode === "shortBreak" ? shortBreakDuration * 60 : longBreakDuration * 60;
const progress = ((totalDuration - timeLeft) / totalDuration) * 100;

const circumference = 2 * Math.PI * 120;
const strokeDashoffset = circumference - (progress / 100) * circumference;

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Pomodoro Timer</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Stay focused with 25-min work sessions and smart breaks to maximize your productivity</p>
    </div>
    <button onClick={() => setShowSettings(!showSettings)} style={{
        padding: "8px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-surface)", color: "var(--fm-muted)", fontSize: 12,
        fontWeight: 500, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>{showSettings ? "Close" : "⚙ Settings"}</button>
    </div>

    {/* Settings */}
    {showSettings && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 20, marginBottom: 16,
    }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>Timer settings</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        <div style={{ flex: 1, minWidth: 120 }}>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Focus (min)</div>
            <input type="number" value={focusDuration} onChange={(e) => setFocusDuration(parseInt(e.target.value) || 25)} min="1" max="60" style={{
            width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
            fontFamily: "Outfit, sans-serif", outline: "none",
            }} />
        </div>
        <div style={{ flex: 1, minWidth: 120 }}>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Short break (min)</div>
            <input type="number" value={shortBreakDuration} onChange={(e) => setShortBreakDuration(parseInt(e.target.value) || 5)} min="1" max="30" style={{
            width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
            fontFamily: "Outfit, sans-serif", outline: "none",
            }} />
        </div>
        <div style={{ flex: 1, minWidth: 120 }}>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Long break (min)</div>
            <input type="number" value={longBreakDuration} onChange={(e) => setLongBreakDuration(parseInt(e.target.value) || 15)} min="1" max="60" style={{
            width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
            fontFamily: "Outfit, sans-serif", outline: "none",
            }} />
        </div>
        </div>
        <button onClick={applySettings} style={{
        padding: "10px 24px", borderRadius: 10, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Apply settings</button>
    </div>
    )}

    {/* Mode Selector */}
    <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
    {Object.entries(MODES).map(([key, m]) => (
        <button key={key} onClick={() => { if (!running) switchMode(key); }} style={{
        flex: 1, padding: "10px 8px", borderRadius: 10, fontSize: 13, fontWeight: 600,
        border: mode === key ? `1px solid ${m.color}40` : "1px solid var(--fm-border)",
        background: mode === key ? `${m.color}15` : "var(--fm-surface)",
        color: mode === key ? m.color : "var(--fm-muted)",
        cursor: running ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        opacity: running && mode !== key ? 0.5 : 1,
        }}>
        <span style={{ fontSize: 16 }}>{m.icon}</span>
        {m.label}
        </button>
    ))}
    </div>

    {/* Timer Circle */}
    <div style={{ textAlign: "center", marginBottom: 24 }}>
    <div style={{ position: "relative", width: 260, height: 260, margin: "0 auto" }}>
        <svg width="260" height="260" viewBox="0 0 260 260" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="130" cy="130" r="120" fill="none" stroke="var(--fm-border)" strokeWidth="6" />
        <circle cx="130" cy="130" r="120" fill="none"
            stroke={currentMode.color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 1s linear" }}
        />
        </svg>
        <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        textAlign: "center",
        }}>
        <div style={{ fontSize: 14, color: currentMode.color, fontWeight: 600, marginBottom: 4 }}>{currentMode.icon} {currentMode.label}</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: "var(--fm-text)", lineHeight: 1, fontFamily: "Outfit, sans-serif" }}>{formatTime(timeLeft)}</div>
        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginTop: 6 }}>
            {running ? "Stay focused..." : timeLeft === totalDuration ? "Ready to start" : "Paused"}
        </div>
        </div>
    </div>
    </div>

    {/* Controls */}
    <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 24 }}>
    <button onClick={resetTimer} style={{
        width: 48, height: 48, borderRadius: 14,
        border: "1px solid var(--fm-border)", background: "var(--fm-surface)",
        color: "var(--fm-muted)", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
    }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
    </button>
    <button onClick={toggleTimer} style={{
        width: 64, height: 64, borderRadius: 18, border: "none",
        background: running ? `${currentMode.color}30` : `linear-gradient(135deg, ${currentMode.color}, ${currentMode.color}aa)`,
        color: running ? currentMode.color : "#fff",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        border: running ? `2px solid ${currentMode.color}50` : "none",
    }}>
        {running ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
        ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
        )}
    </button>
    <button onClick={() => handleComplete()} disabled={running} style={{
        width: 48, height: 48, borderRadius: 14,
        border: "1px solid var(--fm-border)", background: "var(--fm-surface)",
        color: running ? "var(--fm-border)" : "var(--fm-muted)", cursor: running ? "not-allowed" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
    }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 4 15 12 5 20 5 4" /><line x1="19" y1="5" x2="19" y2="19" /></svg>
    </button>
    </div>

    {/* Task Input */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: 16, marginBottom: 16,
    }}>
    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--fm-muted)", marginBottom: 8 }}>What are you working on?</div>
    <input value={selectedTask} onChange={(e) => setSelectedTask(e.target.value)} placeholder="e.g. Writing the report, studying chapter 5..." style={{
        width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13,
        fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box",
    }} />
    </div>

    {/* Pomodoro Progress */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: 18, marginBottom: 16,
    }}>
    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>Session progress</div>
    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {[1, 2, 3, 4].map((num) => (
        <div key={num} style={{
            flex: 1, height: 8, borderRadius: 4,
            background: pomodorosCompleted % 4 >= num ? currentMode.color : "var(--fm-card)",
            border: `1px solid ${pomodorosCompleted % 4 >= num ? currentMode.color + "40" : "var(--fm-border)"}`,
            transition: "all 0.3s ease",
        }} />
        ))}
    </div>
    <div style={{ fontSize: 12, color: "var(--fm-muted)", textAlign: "center" }}>
        {pomodorosCompleted % 4} of 4 pomodoros · Long break after 4 sessions
    </div>
    </div>

    {/* Today's Stats */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 12, padding: 16, textAlign: "center",
    }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Pomodoros today</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "#6C5CE7" }}>{totalToday}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>sessions</div>
    </div>
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 12, padding: 16, textAlign: "center",
    }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Focus time today</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "#00CEC9" }}>{totalMinutesToday}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>minutes</div>
    </div>
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 12, padding: 16, textAlign: "center",
    }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Daily goal</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: totalToday >= 8 ? "#00CEC9" : "var(--fm-warning)" }}>{totalToday >= 8 ? "✓" : `${8 - totalToday}`}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>{totalToday >= 8 ? "Goal reached!" : "left to reach 8"}</div>
    </div>
    </div>
</div>
);
}