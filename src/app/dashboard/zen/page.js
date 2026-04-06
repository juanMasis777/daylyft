"use client";

import { useState, useRef, useEffect } from "react";

const sounds = [
{ id: "rain", name: "Rain", icon: "🌧", file: "/sounds/rain.mp3" },
{ id: "ocean", name: "Ocean", icon: "🌊", file: "/sounds/ocean.mp3" },
{ id: "forest", name: "Forest", icon: "🌿", file: "/sounds/forest.mp3" },
{ id: "piano", name: "Lo-fi Piano", icon: "🎹", file: "/sounds/piano.mp3" },
{ id: "whitenoise", name: "White Noise", icon: "📻", file: "/sounds/whitenoise.mp3" },
{ id: "fireplace", name: "Fireplace", icon: "🔥", file: "/sounds/fireplace.mp3" },
{ id: "crickets", name: "Night Crickets", icon: "🦗", file: "/sounds/crickets.mp3" },
{ id: "coffeeshop", name: "Coffee Shop", icon: "☕", file: "/sounds/coffeeshop.mp3" },
];

export default function ZenPage() {
const [playing, setPlaying] = useState({});
const [volumes, setVolumes] = useState({});
const [breathing, setBreathing] = useState(false);
const [breathPhase, setBreathPhase] = useState("");
const [breathCount, setBreathCount] = useState(0);
const [timer, setTimer] = useState(0);
const [timerRunning, setTimerRunning] = useState(false);
const [timerPreset, setTimerPreset] = useState(0);
const audioRefs = useRef({});

useEffect(() => {
const initial = {};
sounds.forEach((s) => { initial[s.id] = 0.5; });
setVolumes(initial);
}, []);

useEffect(() => {
let interval;
if (timerRunning && timer > 0) {
    interval = setInterval(() => {
    setTimer((t) => {
        if (t <= 1) {
        setTimerRunning(false);
        Object.keys(playing).forEach((id) => {
            if (playing[id] && audioRefs.current[id]) {
            audioRefs.current[id].pause();
            }
        });
        setPlaying({});
        return 0;
        }
        return t - 1;
    });
    }, 1000);
}
return () => clearInterval(interval);
}, [timerRunning, timer]);

useEffect(() => {
if (!breathing) return;
let cancelled = false;
const cycle = async () => {
    while (!cancelled) {
    setBreathPhase("Breathe in...");
    await new Promise((r) => setTimeout(r, 4000));
    if (cancelled) break;
    setBreathPhase("Hold...");
    await new Promise((r) => setTimeout(r, 7000));
    if (cancelled) break;
    setBreathPhase("Breathe out...");
    await new Promise((r) => setTimeout(r, 8000));
    if (cancelled) break;
    setBreathCount((c) => c + 1);
    }
};
cycle();
return () => { cancelled = true; };
}, [breathing]);

const toggleSound = (id, file) => {
if (playing[id]) {
    if (audioRefs.current[id]) {
    audioRefs.current[id].pause();
    audioRefs.current[id].currentTime = 0;
    }
    setPlaying((p) => ({ ...p, [id]: false }));
    return;
}

Object.keys(playing).forEach((key) => {
    if (playing[key] && audioRefs.current[key]) {
    audioRefs.current[key].pause();
    audioRefs.current[key].currentTime = 0;
    }
});

if (!audioRefs.current[id]) {
    audioRefs.current[id] = new Audio(file);
    audioRefs.current[id].loop = true;
}
audioRefs.current[id].volume = volumes[id] || 0.5;
audioRefs.current[id].play().catch(() => {});

const newPlaying = {};
sounds.forEach((s) => { newPlaying[s.id] = false; });
newPlaying[id] = true;
setPlaying(newPlaying);
};

const changeVolume = (id, vol) => {
setVolumes((v) => ({ ...v, [id]: vol }));
if (audioRefs.current[id]) {
    audioRefs.current[id].volume = vol;
}
};

const startTimer = (minutes) => {
setTimer(minutes * 60);
setTimerPreset(minutes);
setTimerRunning(true);
};

const formatTime = (s) => {
const m = Math.floor(s / 60);
const sec = s % 60;
return `${m}:${sec.toString().padStart(2, "0")}`;
};

const activeSounds = Object.keys(playing).filter((id) => playing[id]).length;

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ marginBottom: 20 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Zen Mode</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>
        Ambient sounds, breathing exercises, and mindful breaks
    </p>
    </div>

    {/* Timer */}
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 18, marginBottom: 16 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)" }}>Rest Timer</div>
        {timerRunning && (
        <div style={{ fontSize: 28, fontWeight: 700, color: "var(--fm-accent-light)" }}>{formatTime(timer)}</div>
        )}
    </div>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[5, 10, 15, 20, 30].map((m) => (
        <button key={m} onClick={() => startTimer(m)} style={{
            padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 500,
            border: timerPreset === m && timerRunning ? "1px solid rgba(108,92,231,0.3)" : "1px solid var(--fm-border)",
            background: timerPreset === m && timerRunning ? "rgba(108,92,231,0.1)" : "var(--fm-card)",
            color: timerPreset === m && timerRunning ? "var(--fm-accent-light)" : "var(--fm-text)",
            cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>{m} min</button>
        ))}
        {timerRunning && (
        <button onClick={() => { setTimerRunning(false); setTimer(0); }} style={{
            padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 500,
            border: "1px solid rgba(255,107,107,0.3)", background: "rgba(255,107,107,0.1)",
            color: "var(--fm-danger)", cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Stop</button>
        )}
    </div>
    </div>

    {/* Sounds */}
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 18, marginBottom: 16 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)" }}>Ambient Sounds</div>
        <div style={{ fontSize: 12, color: "var(--fm-accent-light)" }}>{activeSounds} active</div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
        {sounds.map((s) => (
        <div key={s.id} style={{
            background: playing[s.id] ? "rgba(108,92,231,0.1)" : "var(--fm-card)",
            border: playing[s.id] ? "1px solid rgba(108,92,231,0.3)" : "1px solid var(--fm-border)",
            borderRadius: 12, padding: 14, cursor: "pointer", transition: "all 0.2s ease",
        }}>
            <div onClick={() => toggleSound(s.id, s.file)} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, cursor: "pointer" }}>
            <span style={{ fontSize: 22 }}>{s.icon}</span>
            <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-text)" }}>{s.name}</div>
                <div style={{ fontSize: 10, color: playing[s.id] ? "var(--fm-accent-light)" : "var(--fm-muted)" }}>
                {playing[s.id] ? "Playing" : "Tap to play"}
                </div>
            </div>
            </div>
            <input
            type="range"
            min="0" max="1" step="0.05"
            value={volumes[s.id] || 0.5}
            onChange={(e) => changeVolume(s.id, parseFloat(e.target.value))}
            style={{ width: "100%", accentColor: "#6C5CE7" }}
            />
        </div>
        ))}
    </div>
    </div>

    {/* Breathing Exercise */}
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 18 }}>
    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>Breathing Exercise (4-7-8)</div>

    {breathing ? (
        <div style={{ textAlign: "center", padding: 20 }}>
        <div style={{
            width: 120, height: 120, borderRadius: "50%", margin: "0 auto 16px",
            background: breathPhase === "Breathe in..." ? "rgba(108,92,231,0.2)" : breathPhase === "Hold..." ? "rgba(0,206,201,0.2)" : "rgba(253,121,168,0.2)",
            border: `2px solid ${breathPhase === "Breathe in..." ? "#6C5CE7" : breathPhase === "Hold..." ? "#00CEC9" : "#fd79a8"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.5s ease",
            transform: breathPhase === "Breathe in..." ? "scale(1.2)" : breathPhase === "Hold..." ? "scale(1.2)" : "scale(0.8)",
        }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)" }}>{breathPhase}</span>
        </div>
        <div style={{ fontSize: 13, color: "var(--fm-muted)", marginBottom: 16 }}>Cycles completed: {breathCount}</div>
        <button onClick={() => { setBreathing(false); setBreathCount(0); }} style={{
            padding: "10px 24px", borderRadius: 10, border: "1px solid rgba(255,107,107,0.3)",
            background: "rgba(255,107,107,0.1)", color: "var(--fm-danger)", fontSize: 13,
            fontWeight: 500, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Stop breathing exercise</button>
        </div>
    ) : (
        <div>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", marginBottom: 14, lineHeight: 1.6 }}>
            The 4-7-8 technique: Breathe in for 4 seconds, hold for 7 seconds, breathe out for 8 seconds. This activates your parasympathetic nervous system and reduces stress.
        </p>
        <button onClick={() => setBreathing(true)} style={{
            padding: "12px 24px", borderRadius: 12, border: "none",
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
            fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Start breathing exercise</button>
        </div>
    )}
    </div>
</div>
);
}