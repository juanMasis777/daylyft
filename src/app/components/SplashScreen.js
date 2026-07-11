"use client";

import { useEffect, useState } from "react";

export default function SplashScreen({ onComplete }) {
const [phase, setPhase] = useState("entering");

useEffect(() => {
const timer1 = setTimeout(() => setPhase("holding"), 800);
const timer2 = setTimeout(() => setPhase("exiting"), 1800);
const timer3 = setTimeout(() => {
    if (onComplete) onComplete();
}, 2300);

return () => {
    clearTimeout(timer1);
    clearTimeout(timer2);
    clearTimeout(timer3);
};
}, []);

return (
<div style={{
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "#080d0b",
    zIndex: 99999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    opacity: phase === "exiting" ? 0 : 1,
    transition: "opacity 0.5s ease-out",
    pointerEvents: phase === "exiting" ? "none" : "auto",
}}>
    <div style={{
    position: "absolute",
    width: 500, height: 500, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)",
    filter: "blur(60px)",
    animation: "orbPulse 2s ease-in-out infinite",
    }} />
    <div style={{
    position: "absolute",
    width: 400, height: 400, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,206,201,0.2) 0%, transparent 70%)",
    filter: "blur(60px)",
    top: "60%",
    left: "20%",
    animation: "orbPulse 2.5s ease-in-out infinite 0.5s",
    }} />
    <div style={{
    position: "absolute",
    width: 300, height: 300, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(253,121,168,0.2) 0%, transparent 70%)",
    filter: "blur(60px)",
    top: "20%",
    right: "15%",
    animation: "orbPulse 3s ease-in-out infinite 1s",
    }} />

    <div style={{
    position: "relative",
    textAlign: "center",
    zIndex: 10,
    }}>
    <div style={{
        width: 100, height: 100, borderRadius: 28,
        background: "linear-gradient(135deg, #10b981, #34d399)",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 24px",
        animation: phase === "entering" 
        ? "splashLogoIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
        : "splashLogoPulse 1s ease-in-out infinite",
        boxShadow: "0 20px 60px rgba(16,185,129,0.5)",
    }}>
        <svg width={50} height={50} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 14l7-7 7 7"
            style={{ animation: "splashLine 0.9s ease forwards", strokeDasharray: "24", strokeDashoffset: "24" }} />
        <path d="M5 19h14"
            style={{ animation: "splashLine 0.9s ease 0.25s forwards", strokeDasharray: "14", strokeDashoffset: "14" }} />
        </svg>
    </div>

    <h1 style={{
        fontSize: 42,
        fontWeight: 900,
        background: "linear-gradient(135deg, #10b981, #34d399, #00CEC9)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundSize: "200% auto",
        animation: phase === "entering"
        ? "splashTextIn 0.8s ease 0.3s both, gradientShift 3s ease infinite 0.3s"
        : "gradientShift 3s ease infinite",
        fontFamily: "'Outfit', sans-serif",
        margin: "0 0 8px",
        letterSpacing: "-0.02em",
    }}>DayLyft</h1>

    <p style={{
        fontSize: 14,
        color: "#6c6c80",
        fontFamily: "'Outfit', sans-serif",
        margin: 0,
        fontWeight: 500,
        animation: phase === "entering" ? "splashTextIn 0.8s ease 0.5s both" : "none",
    }}>Your AI copilot for life</p>

    <div style={{
        marginTop: 40,
        display: "flex",
        justifyContent: "center",
        gap: 6,
        animation: phase === "entering" ? "splashTextIn 0.8s ease 0.7s both" : "none",
    }}>
        <span style={{
        width: 8, height: 8, borderRadius: "50%", background: "#10b981",
        animation: "splashDot 1.4s infinite ease-in-out",
        }} />
        <span style={{
        width: 8, height: 8, borderRadius: "50%", background: "#34d399",
        animation: "splashDot 1.4s infinite ease-in-out 0.2s",
        }} />
        <span style={{
        width: 8, height: 8, borderRadius: "50%", background: "#00CEC9",
        animation: "splashDot 1.4s infinite ease-in-out 0.4s",
        }} />
    </div>
    </div>

    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
    
    @keyframes splashLogoIn {
        0% { transform: scale(0) rotate(-180deg); opacity: 0; }
        60% { transform: scale(1.15) rotate(10deg); opacity: 1; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    
    @keyframes splashLogoPulse {
        0%, 100% { transform: scale(1); box-shadow: 0 20px 60px rgba(16,185,129,0.5); }
        50% { transform: scale(1.05); box-shadow: 0 20px 80px rgba(16,185,129,0.7); }
    }
    
    @keyframes splashTextIn {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes splashDot {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
        30% { transform: translateY(-10px); opacity: 1; }
    }
    
    @keyframes splashDot1 {
        from { opacity: 0; transform: scale(0); transform-origin: 8px 8px; }
        to { opacity: 1; transform: scale(1); transform-origin: 8px 8px; }
    }
    
    @keyframes splashDot2 {
        from { opacity: 0; transform: scale(0); transform-origin: 16px 14px; }
        to { opacity: 1; transform: scale(1); transform-origin: 16px 14px; }
    }
    
    @keyframes splashLine {
        to { stroke-dashoffset: 0; }
    }
    
    @keyframes gradientShift {
        0%, 100% { background-position: 0% center; }
        50% { background-position: 100% center; }
    }
    
    @keyframes orbPulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.1); }
    }
    `}</style>
</div>
);
}