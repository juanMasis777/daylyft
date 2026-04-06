"use client";

export default function LandingPage() {
const features = [
{ icon: "✦", title: "AI Copilot — Kai", desc: "Your personal AI assistant that learns how you work and optimizes your day automatically." },
{ icon: "◉", title: "Smart Calendar", desc: "Add events, organize your week, and never miss a deadline." },
{ icon: "◈", title: "Zen Mode", desc: "8 ambient sounds, breathing exercises, and smart breaks to recharge." },
{ icon: "◇", title: "Life Journal", desc: "AI-generated daily summaries and a printable Life Book of your year." },
{ icon: "△", title: "Productivity DNA", desc: "Discover your unique work personality and share it with the world." },
{ icon: "○", title: "7 Color Themes", desc: "Personalize your experience with beautiful dark and light themes." },
];

return (
<div style={{ minHeight: "100vh", background: "var(--fm-bg)", fontFamily: "Outfit, sans-serif" }}>
    {/* Nav */}
    <nav style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "16px 24px", maxWidth: 1100, margin: "0 auto",
    }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        display: "flex", alignItems: "center", justifyContent: "center",
        }}>
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <circle cx="8" cy="8" r="3" fill="white" />
            <circle cx="16" cy="14" r="3" fill="white" />
            <line x1="8" y1="8" x2="16" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        </div>
        <span style={{ fontSize: 20, fontWeight: 800, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>FlowMind</span>
    </div>
    <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => window.location.href = "/login"} style={{
        padding: "10px 20px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "transparent", color: "var(--fm-text)", fontSize: 13,
        fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Sign in</button>
        <button onClick={() => window.location.href = "/login"} style={{
        padding: "10px 20px", borderRadius: 10, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Get started free</button>
    </div>
    </nav>

    {/* Hero */}
    <section style={{
    textAlign: "center", padding: "60px 20px 50px", maxWidth: 800, margin: "0 auto",
    position: "relative",
    }}>
    <div style={{
        position: "absolute", width: 300, height: 300, borderRadius: "50%",
        background: "var(--fm-accent-glow)", filter: "blur(100px)", opacity: 0.3,
        left: "10%", top: "0", pointerEvents: "none",
    }} />
    <div style={{
        position: "absolute", width: 250, height: 250, borderRadius: "50%",
        background: "var(--fm-teal-glow)", filter: "blur(80px)", opacity: 0.2,
        right: "10%", top: "20%", pointerEvents: "none",
    }} />
    <div style={{
        display: "inline-block", padding: "6px 16px", borderRadius: 20,
        background: "rgba(108,92,231,0.1)", border: "1px solid rgba(108,92,231,0.2)",
        fontSize: 13, color: "var(--fm-accent-light)", fontWeight: 500, marginBottom: 20,
    }}>
        Meet Kai — your AI productivity copilot
    </div>
    <h1 style={{
        fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, color: "var(--fm-text)",
        letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16,
        position: "relative",
    }}>
        Work smarter.<br />
        <span style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        Rest better.
        </span><br />
        Live fully.
    </h1>
    <p style={{ fontSize: "clamp(14px, 2vw, 18px)", color: "var(--fm-muted)", lineHeight: 1.6, marginBottom: 28, maxWidth: 560, margin: "0 auto 28px", position: "relative" }}>
        FlowMind is the AI copilot that organizes your work, protects your rest, and manages your life — all for less than a coffee per month.
    </p>
    <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
        <button onClick={() => window.location.href = "/login"} style={{
        padding: "14px 28px", borderRadius: 14, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Start free — no card needed</button>
        <button onClick={() => window.location.href = "/pricing"} style={{
        padding: "14px 28px", borderRadius: 14,
        border: "1px solid var(--fm-border)", background: "transparent",
        color: "var(--fm-text)", fontSize: 15, fontWeight: 600,
        cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>See pricing</button>
    </div>
    <p style={{ fontSize: 12, color: "var(--fm-muted)", marginTop: 14, position: "relative" }}>
        Free forever plan available. No credit card required.
    </p>
    </section>

    {/* Social proof */}
    <section style={{
    display: "flex", justifyContent: "center", gap: "clamp(20px, 4vw, 40px)", padding: "10px 20px 50px",
    flexWrap: "wrap",
    }}>
    {[
        { num: "$6.99", label: "/month for Pro" },
        { num: "46+", label: "features" },
        { num: "24/7", label: "AI copilot" },
        { num: "100%", label: "data privacy" },
    ].map((s, i) => (
        <div key={i} style={{ textAlign: "center" }}>
        <div style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 800, color: "var(--fm-accent)" }}>{s.num}</div>
        <div style={{ fontSize: 12, color: "var(--fm-muted)" }}>{s.label}</div>
        </div>
    ))}
    </section>

    {/* Features */}
    <section style={{ padding: "30px 20px 60px", maxWidth: 1000, margin: "0 auto" }}>
    <h2 style={{ textAlign: "center", fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, color: "var(--fm-text)", marginBottom: 8 }}>
        Everything you need. Nothing you don't.
    </h2>
    <p style={{ textAlign: "center", fontSize: 15, color: "var(--fm-muted)", marginBottom: 36 }}>
        Productivity + wellness + life management — all in one app.
    </p>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
        {features.map((f, i) => (
        <div key={i} style={{
            background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
            borderRadius: 16, padding: 22,
        }}>
            <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: "rgba(108,92,231,0.1)", display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: 18, color: "var(--fm-accent)", marginBottom: 12,
            }}>{f.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 4 }}>{f.title}</div>
            <div style={{ fontSize: 13, color: "var(--fm-muted)", lineHeight: 1.6 }}>{f.desc}</div>
        </div>
        ))}
    </div>
    </section>

    {/* How it works */}
    <section style={{ padding: "30px 20px 60px", maxWidth: 800, margin: "0 auto" }}>
    <h2 style={{ textAlign: "center", fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, color: "var(--fm-text)", marginBottom: 36 }}>
        How FlowMind works
    </h2>
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {[
        { step: "1", title: "Sign up in 10 seconds", desc: "Create an account with email or Google. No credit card needed." },
        { step: "2", title: "Add your tasks", desc: "Tell Kai what you need to do. He organizes everything by priority and deadline." },
        { step: "3", title: "Let Kai optimize your day", desc: "Kai learns your patterns and suggests the best times for focus, breaks, and tasks." },
        { step: "4", title: "Track your progress", desc: "See your productivity analytics, completion rates, and improvement over time." },
        ].map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{
            width: 40, height: 40, borderRadius: 10, flexShrink: 0,
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 700, color: "#fff",
            }}>{item.step}</div>
            <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "var(--fm-text)", marginBottom: 2 }}>{item.title}</div>
            <div style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
        </div>
        ))}
    </div>
    </section>

    {/* CTA */}
    <section style={{
    padding: "50px 20px", textAlign: "center",
    background: "linear-gradient(135deg, rgba(108,92,231,0.08), rgba(0,206,201,0.05))",
    borderTop: "1px solid var(--fm-border)",
    }}>
    <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, color: "var(--fm-text)", marginBottom: 8 }}>
        Ready to meet Kai?
    </h2>
    <p style={{ fontSize: 15, color: "var(--fm-muted)", marginBottom: 24 }}>
        Join FlowMind today. Free forever, upgrade when you're ready.
    </p>
    <button onClick={() => window.location.href = "/login"} style={{
        padding: "14px 36px", borderRadius: 14, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>Get started free</button>
    </section>

    {/* Footer */}
    <footer style={{
    padding: "24px 20px", textAlign: "center",
    borderTop: "1px solid var(--fm-border)",
    }}>
    <p style={{ fontSize: 11, color: "var(--fm-muted)" }}>
        © 2026 FlowMind. Your data is yours. We never sell it. Privacy Policy · Terms of Service
    </p>
    </footer>
</div>
);
}