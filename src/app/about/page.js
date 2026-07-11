"use client";

export default function AboutPage() {
return (
<div style={{ minHeight: "100vh", background: "#080d0b", fontFamily: "'Outfit', sans-serif", padding: "60px 24px" }}>
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
    <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#10b981", textDecoration: "none", fontSize: 14, marginBottom: 32 }}>← Back to DayLyft</a>

    <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{
        width: 80, height: 80, borderRadius: 22, margin: "0 auto 20px",
        background: "linear-gradient(135deg, #10b981, #34d399)",
        display: "flex", alignItems: "center", justifyContent: "center",
        }}>
        <svg width={36} height={36} viewBox="0 0 24 24" fill="none">
            <circle cx="8" cy="8" r="3" fill="white" />
            <circle cx="16" cy="14" r="3" fill="white" />
            <line x1="8" y1="8" x2="16" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: "#fff", marginBottom: 8 }}>About DayLyft</h1>
        <p style={{ fontSize: 16, color: "#8a8a9a", lineHeight: 1.7 }}>Your AI copilot for life</p>
    </div>

    <div style={{ fontSize: 15, color: "#b0b0c0", lineHeight: 1.8 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginTop: 32, marginBottom: 12 }}>Our mission</h2>
        <p>DayLyft was born from a simple frustration: managing your life shouldn't require 10 different apps. We built one app that covers productivity, wellness, finances, fitness, family, and learning — all powered by Kai, your personal AI copilot.</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginTop: 32, marginBottom: 12 }}>Why DayLyft?</h2>
        <p>Most productivity apps focus only on work. But life isn't just work. You also need to track your health, manage your money, build habits, take care of your family, and keep learning. DayLyft brings all of these together in one beautiful, affordable app.</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginTop: 32, marginBottom: 12 }}>What makes us different</h2>
        <p style={{ marginBottom: 8 }}>While competitors like Motion ($29/mo), Sunsama ($20/mo), and Notion ($10/mo) offer around 10 features focused only on work, DayLyft offers 40+ features across 7 life categories — starting completely free.</p>
        <p>Our AI copilot Kai doesn't just help you manage tasks. Kai plans your morning, writes your emails, analyzes your sleep, suggests workouts, recommends books, tracks your budget, and gives you a personalized night report. It's like having a personal assistant, coach, and advisor in your pocket.</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginTop: 32, marginBottom: 12 }}>Built in Miami</h2>
        <p>DayLyft is proudly built in Miami, Florida. We believe great software should be accessible to everyone, not just those who can afford premium subscriptions. That's why our free tier includes 11 powerful features with no time limit.</p>

        <div style={{
        marginTop: 40, padding: 24, borderRadius: 16,
        background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)",
        textAlign: "center",
        }}>
        <div style={{ fontSize: 24, marginBottom: 12 }}>🚀</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>40+ features. One app. Free to start.</div>
        <a href="/login" style={{
            display: "inline-block", marginTop: 12, padding: "12px 28px", borderRadius: 12,
            background: "linear-gradient(135deg, #10b981, #34d399)", color: "#fff",
            fontSize: 14, fontWeight: 600, textDecoration: "none",
        }}>Get Started Free</a>
        </div>
    </div>

    <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#636e72" }}>© 2026 DayLyft. All rights reserved. Made with ❤️ in Miami</p>
    </div>
    </div>
</div>
);
}