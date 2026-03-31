"use client";

import { useState, useEffect, useRef } from "react";

// Audio engine using Web Audio API
function createSoundEngine() {
if (typeof window === "undefined") return null;
const ctx = new (window.AudioContext || window.webkitAudioContext)();

function makeNoise(type) {
const bufferSize = ctx.sampleRate * 2;
const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
const data = buffer.getChannelData(0);

if (type === "white") {
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
} else if (type === "brown") {
    let last = 0;
    for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    data[i] = (last + 0.02 * white) / 1.02;
    last = data[i];
    data[i] *= 3.5;
    }
} else if (type === "pink") {
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.969 * b2 + white * 0.153852;
    b3 = 0.8665 * b3 + white * 0.3104856;
    b4 = 0.55 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.016898;
    data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    data[i] *= 0.11;
    b6 = white * 0.115926;
    }
}
return buffer;
}

function createRain() {
const source = ctx.createBufferSource();
source.buffer = makeNoise("pink");
source.loop = true;
const highpass = ctx.createBiquadFilter();
highpass.type = "highpass";
highpass.frequency.value = 4000;
const lowpass = ctx.createBiquadFilter();
lowpass.type = "lowpass";
lowpass.frequency.value = 8000;
const gain = ctx.createGain();
gain.gain.value = 0.4;
source.connect(highpass).connect(lowpass).connect(gain).connect(ctx.destination);
source.start();
return { source, gain };
}

function createOcean() {
const source = ctx.createBufferSource();
source.buffer = makeNoise("brown");
source.loop = true;
const filter = ctx.createBiquadFilter();
filter.type = "lowpass";
filter.frequency.value = 500;
const lfo = ctx.createOscillator();
lfo.frequency.value = 0.1;
const lfoGain = ctx.createGain();
lfoGain.gain.value = 200;
lfo.connect(lfoGain).connect(filter.frequency);
lfo.start();
const gain = ctx.createGain();
gain.gain.value = 0.5;
source.connect(filter).connect(gain).connect(ctx.destination);
source.start();
return { source, gain, lfo };
}

function createForest() {
const source = ctx.createBufferSource();
source.buffer = makeNoise("pink");
source.loop = true;
const bp = ctx.createBiquadFilter();
bp.type = "bandpass";
bp.frequency.value = 3000;
bp.Q.value = 0.5;
const gain = ctx.createGain();
gain.gain.value = 0.15;
source.connect(bp).connect(gain).connect(ctx.destination);
source.start();
return { source, gain };
}

function createFire() {
const source = ctx.createBufferSource();
source.buffer = makeNoise("brown");
source.loop = true;
const bp = ctx.createBiquadFilter();
bp.type = "bandpass";
bp.frequency.value = 800;
bp.Q.value = 1.5;
const lfo = ctx.createOscillator();
lfo.frequency.value = 3;
const lfoGain = ctx.createGain();
lfoGain.gain.value = 400;
lfo.connect(lfoGain).connect(bp.frequency);
lfo.start();
const gain = ctx.createGain();
gain.gain.value = 0.3;
source.connect(bp).connect(gain).connect(ctx.destination);
source.start();
return { source, gain, lfo };
}

function createThunder() {
const source = ctx.createBufferSource();
source.buffer = makeNoise("brown");
source.loop = true;
const lp = ctx.createBiquadFilter();
lp.type = "lowpass";
lp.frequency.value = 150;
const gain = ctx.createGain();
gain.gain.value = 0.6;
source.connect(lp).connect(gain).connect(ctx.destination);
source.start();
return { source, gain };
}

function createNight() {
const source = ctx.createBufferSource();
source.buffer = makeNoise("white");
source.loop = true;
const bp = ctx.createBiquadFilter();
bp.type = "bandpass";
bp.frequency.value = 5000;
bp.Q.value = 5;
const lfo = ctx.createOscillator();
lfo.frequency.value = 6;
const lfoGain = ctx.createGain();
lfoGain.gain.value = 0.3;
lfo.connect(lfoGain);
const gain = ctx.createGain();
gain.gain.value = 0.08;
lfoGain.connect(gain.gain);
lfo.start();
source.connect(bp).connect(gain).connect(ctx.destination);
source.start();
return { source, gain, lfo };
}

function createLofi() {
const osc1 = ctx.createOscillator();
osc1.type = "sine";
osc1.frequency.value = 261.63;
const osc2 = ctx.createOscillator();
osc2.type = "sine";
osc2.frequency.value = 329.63;
const osc3 = ctx.createOscillator();
osc3.type = "sine";
osc3.frequency.value = 392.0;
const lfo = ctx.createOscillator();
lfo.frequency.value = 0.3;
const lfoGain = ctx.createGain();
lfoGain.gain.value = 5;
lfo.connect(lfoGain);
lfoGain.connect(osc1.frequency);
lfoGain.connect(osc2.frequency);
lfoGain.connect(osc3.frequency);
const gain = ctx.createGain();
gain.gain.value = 0.06;
const filter = ctx.createBiquadFilter();
filter.type = "lowpass";
filter.frequency.value = 800;
osc1.connect(filter);
osc2.connect(filter);
osc3.connect(filter);
filter.connect(gain).connect(ctx.destination);
osc1.start();
osc2.start();
osc3.start();
lfo.start();
return { source: osc1, gain, extras: [osc2, osc3, lfo] };
}

function createCafe() {
const source = ctx.createBufferSource();
source.buffer = makeNoise("pink");
source.loop = true;
const lp = ctx.createBiquadFilter();
lp.type = "lowpass";
lp.frequency.value = 2000;
const hp = ctx.createBiquadFilter();
hp.type = "highpass";
hp.frequency.value = 200;
const gain = ctx.createGain();
gain.gain.value = 0.12;
source.connect(hp).connect(lp).connect(gain).connect(ctx.destination);
source.start();
return { source, gain };
}

const creators = {
rain: createRain,
ocean: createOcean,
forest: createForest,
fire: createFire,
thunder: createThunder,
night: createNight,
lofi: createLofi,
cafe: createCafe,
};

return { ctx, creators };
}

const soundList = [
{ id: "rain", name: "Rain", color: "#378ADD" },
{ id: "lofi", name: "Lo-fi Piano", color: "#6C5CE7" },
{ id: "ocean", name: "Ocean Waves", color: "#1D9E75" },
{ id: "forest", name: "Forest", color: "#639922" },
{ id: "fire", name: "Fireplace", color: "#D85A30" },
{ id: "cafe", name: "Cafe", color: "#BA7517" },
{ id: "thunder", name: "Thunder", color: "#534AB7" },
{ id: "night", name: "Night Crickets", color: "#085041" },
];

export default function ZenModePage() {
const [sounds, setSounds] = useState(soundList.map((s) => ({ ...s, active: false, volume: 50 })));
const [breatheActive, setBreatheActive] = useState(false);
const [breathePhase, setBreathePhase] = useState("idle");
const [timer, setTimer] = useState(0);
const [timerRunning, setTimerRunning] = useState(false);
const [timerMinutes, setTimerMinutes] = useState(10);
const engineRef = useRef(null);
const playingRef = useRef({});
const intervalRef = useRef(null);

useEffect(() => {
return () => {
    Object.values(playingRef.current).forEach((p) => {
    try {
        p.source.stop();
        if (p.extras) p.extras.forEach((e) => e.stop());
        if (p.lfo) p.lfo.stop();
    } catch (e) {}
    });
};
}, []);

const toggleSound = (id) => {
if (!engineRef.current) {
    engineRef.current = createSoundEngine();
}
const engine = engineRef.current;
if (!engine) return;

if (engine.ctx.state === "suspended") {
    engine.ctx.resume();
}

const sound = sounds.find((s) => s.id === id);
if (sound.active) {
    const playing = playingRef.current[id];
    if (playing) {
    try {
        playing.source.stop();
        if (playing.extras) playing.extras.forEach((e) => e.stop());
        if (playing.lfo) playing.lfo.stop();
    } catch (e) {}
    delete playingRef.current[id];
    }
} else {
    const creator = engine.creators[id];
    if (creator) {
    const nodes = creator();
    nodes.gain.gain.value = (sound.volume / 100) * 0.5;
    playingRef.current[id] = nodes;
    }
}

setSounds(sounds.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
};

const setVolume = (id, vol) => {
const playing = playingRef.current[id];
if (playing) {
    playing.gain.gain.value = (vol / 100) * 0.5;
}
setSounds(sounds.map((s) => (s.id === id ? { ...s, volume: vol } : s)));
};

const activeCount = sounds.filter((s) => s.active).length;

// Breathing
useEffect(() => {
if (!breatheActive) {
    setBreathePhase("idle");
    return;
}
const phases = [
    { name: "Breathe in", duration: 4000 },
    { name: "Hold", duration: 7000 },
    { name: "Breathe out", duration: 8000 },
];
let i = 0;
setBreathePhase(phases[0].name);
let timeout;
const run = () => {
    timeout = setTimeout(() => {
    i = (i + 1) % phases.length;
    setBreathePhase(phases[i].name);
    run();
    }, phases[i].duration);
};
run();
return () => clearTimeout(timeout);
}, [breatheActive]);

// Timer
useEffect(() => {
if (timerRunning && timer > 0) {
    intervalRef.current = setInterval(() => {
    setTimer((t) => {
        if (t <= 1) {
        setTimerRunning(false);
        return 0;
        }
        return t - 1;
    });
    }, 1000);
}
return () => clearInterval(intervalRef.current);
}, [timerRunning]);

const startTimer = () => {
setTimer(timerMinutes * 60);
setTimerRunning(true);
};

const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: "0 0 4px" }}>Zen Mode</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "0 0 24px" }}>
    {activeCount > 0 ? `${activeCount} sound${activeCount > 1 ? "s" : ""} playing — adjust volume with sliders` : "Click any sound to start playing"}
    </p>

    {/* Kai suggestion */}
    <div
    style={{
        background: "linear-gradient(135deg, rgba(108,92,231,0.08), rgba(0,206,201,0.05))",
        border: "1px solid var(--fm-border)",
        borderRadius: 14,
        padding: 16,
        marginBottom: 24,
        display: "flex",
        alignItems: "center",
        gap: 12,
    }}
    >
    <div
        style={{
        width: 32, height: 32, borderRadius: 8,
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}
    >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
        <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
        </svg>
    </div>
    <p style={{ fontSize: 13, color: "var(--fm-text)", margin: 0, lineHeight: 1.5 }}>
        Try combining Rain + Lo-fi Piano + Fireplace for the ultimate cozy work session. Adjust each volume to find your perfect mix.
    </p>
    </div>

    {/* Sound Grid */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10, marginBottom: 24 }}>
    {sounds.map((sound) => (
        <div
        key={sound.id}
        style={{
            background: sound.active ? `${sound.color}15` : "var(--fm-card)",
            border: `1px solid ${sound.active ? sound.color : "var(--fm-border)"}`,
            borderRadius: 12,
            padding: 16,
            cursor: "pointer",
            transition: "all 0.2s",
        }}
        >
        <div
            onClick={() => toggleSound(sound.id)}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: sound.active ? 10 : 0 }}
        >
            <span style={{ fontSize: 13, fontWeight: 600, color: sound.active ? sound.color : "var(--fm-text)" }}>
            {sound.name}
            </span>
            <div
            style={{
                width: 10, height: 10, borderRadius: "50%",
                background: sound.active ? sound.color : "var(--fm-border)",
            }}
            />
        </div>
        {sound.active && (
            <input
            type="range" min="0" max="100" value={sound.volume}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setVolume(sound.id, parseInt(e.target.value))}
            style={{ width: "100%", accentColor: sound.color }}
            />
        )}
        </div>
    ))}
    </div>

    {/* Timer and Breathing */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
    <div style={{ background: "var(--fm-card)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 16 }}>Rest Timer</div>
        {timerRunning ? (
        <>
            <div style={{ fontSize: 48, fontWeight: 700, color: "var(--fm-accent)", marginBottom: 16 }}>{formatTime(timer)}</div>
            <button onClick={() => { setTimerRunning(false); setTimer(0); }}
            style={{ background: "var(--fm-danger)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}>
            Stop
            </button>
        </>
        ) : (
        <>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 16 }}>
            {[5, 10, 15, 20].map((m) => (
                <button key={m} onClick={() => setTimerMinutes(m)}
                style={{ padding: "8px 16px", borderRadius: 8, border: timerMinutes === m ? "none" : "1px solid var(--fm-border)", background: timerMinutes === m ? "var(--fm-accent)" : "transparent", color: timerMinutes === m ? "#fff" : "var(--fm-muted)", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}>
                {m}m
                </button>
            ))}
            </div>
            <button onClick={startTimer}
            style={{ background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}>
            Start break
            </button>
        </>
        )}
    </div>

    <div style={{ background: "var(--fm-card)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 16 }}>4-7-8 Breathing</div>
        <div style={{
        width: 120, height: 120, borderRadius: "50%", margin: "0 auto 16px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: breatheActive
            ? breathePhase === "Breathe in" ? "rgba(108,92,231,0.3)" : breathePhase === "Hold" ? "rgba(0,206,201,0.3)" : "rgba(253,121,168,0.3)"
            : "rgba(108,92,231,0.1)",
        border: `2px solid ${breatheActive ? "var(--fm-accent)" : "var(--fm-border)"}`,
        transition: "all 1s ease",
        transform: breatheActive && breathePhase === "Breathe in" ? "scale(1.2)" : "scale(1)",
        }}>
        <span style={{ fontSize: breatheActive ? 16 : 14, fontWeight: 600, color: breatheActive ? "var(--fm-accent-light)" : "var(--fm-muted)", transition: "all 0.5s" }}>
            {breatheActive ? breathePhase : "Ready"}
        </span>
        </div>
        <button onClick={() => setBreatheActive(!breatheActive)}
        style={{ background: breatheActive ? "var(--fm-danger)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}>
        {breatheActive ? "Stop" : "Start breathing"}
        </button>
    </div>
    </div>
</div>
);
}