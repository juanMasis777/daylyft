"use client";

import { useEffect, useState } from "react";

export function Confetti({ active, onComplete }) {
const [particles, setParticles] = useState([]);

useEffect(() => {
if (!active) return;

const colors = ["#6C5CE7", "#00CEC9", "#fd79a8", "#fdcb6e", "#a29bfe", "#55efc4", "#ff6b6b"];
const newParticles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: 50,
    y: 50,
    vx: (Math.random() - 0.5) * 400,
    vy: -Math.random() * 400 - 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
    shape: Math.random() > 0.5 ? "circle" : "square",
}));

setParticles(newParticles);

const timer = setTimeout(() => {
    setParticles([]);
    if (onComplete) onComplete();
}, 2500);

return () => clearTimeout(timer);
}, [active]);

if (!active || particles.length === 0) return null;

return (
<div style={{
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    pointerEvents: "none",
    zIndex: 9999,
    overflow: "hidden",
}}>
    {particles.map((p) => (
    <div
        key={p.id}
        style={{
        position: "absolute",
        top: `${p.y}%`,
        left: `${p.x}%`,
        width: p.size,
        height: p.size,
        background: p.color,
        borderRadius: p.shape === "circle" ? "50%" : "2px",
        transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
        animation: `confettiFall 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
        "--vx": `${p.vx}px`,
        "--vy": `${p.vy}px`,
        }}
    />
    ))}
    <style>{`
    @keyframes confettiFall {
        0% {
        transform: translate(-50%, -50%) translate(0, 0) rotate(0deg);
        opacity: 1;
        }
        100% {
        transform: translate(-50%, -50%) translate(var(--vx), calc(var(--vy) + 100vh)) rotate(720deg);
        opacity: 0;
        }
    }
    `}</style>
</div>
);
}

export function CelebrationOverlay({ active, message = "Great job!", emoji = "🎉" }) {
if (!active) return null;

return (
<div style={{
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10000,
    pointerEvents: "none",
    textAlign: "center",
    animation: "celebrationPop 1.5s ease-out forwards",
}}>
    <div style={{ fontSize: 80, marginBottom: 8 }}>{emoji}</div>
    <div style={{
    fontSize: 24,
    fontWeight: 800,
    color: "#fff",
    textShadow: "0 0 30px rgba(108,92,231,0.8)",
    }}>{message}</div>
    <style>{`
    @keyframes celebrationPop {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        30% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
        50% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        80% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0; }
    }
    `}</style>
</div>
);
}

export function TypingIndicator() {
return (
<div style={{
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "8px 14px",
    background: "rgba(108,92,231,0.15)",
    borderRadius: 14,
    border: "1px solid rgba(108,92,231,0.2)",
}}>
    <span style={{
    width: 6, height: 6, borderRadius: "50%", background: "#6C5CE7",
    animation: "typingBounce 1.4s infinite ease-in-out",
    }} />
    <span style={{
    width: 6, height: 6, borderRadius: "50%", background: "#6C5CE7",
    animation: "typingBounce 1.4s infinite ease-in-out 0.2s",
    }} />
    <span style={{
    width: 6, height: 6, borderRadius: "50%", background: "#6C5CE7",
    animation: "typingBounce 1.4s infinite ease-in-out 0.4s",
    }} />
    <style>{`
    @keyframes typingBounce {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
        30% { transform: translateY(-6px); opacity: 1; }
    }
    `}</style>
</div>
);
}

export function SuccessPulse({ color = "#00CEC9" }) {
return (
<div style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
}}>
    <div style={{
    width: 40, height: 40, borderRadius: "50%",
    border: `2px solid ${color}`,
    animation: "successPulse 0.8s ease-out forwards",
    }} />
    <style>{`
    @keyframes successPulse {
        0% { transform: scale(0.5); opacity: 1; }
        100% { transform: scale(2.5); opacity: 0; }
    }
    `}</style>
</div>
);
}