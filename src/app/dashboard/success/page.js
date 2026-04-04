"use client";

export default function SuccessPage() {
return (
<div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", animation: "fadeIn 0.5s ease" }}>
    <div style={{ textAlign: "center", maxWidth: 500, padding: 20 }}>
    <div style={{
        width: 80, height: 80, borderRadius: "50%", margin: "0 auto 24px",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        display: "flex", alignItems: "center", justifyContent: "center",
    }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
        <polyline points="20 6 9 17 4 12" />
        </svg>
    </div>

    <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--fm-text)", marginBottom: 12 }}>
        Thank you for your purchase!
    </h1>

    <p style={{ fontSize: 16, color: "var(--fm-muted)", lineHeight: 1.6, marginBottom: 8 }}>
        Welcome to FlowMind Pro! You now have access to all premium features.
    </p>

    <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6, marginBottom: 32 }}>
        A charge from <strong style={{ color: "var(--fm-text)" }}>FlowMind</strong> will appear on your statement. Your subscription renews monthly and you can cancel anytime.
    </p>

    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 16, padding: 24, marginBottom: 24, textAlign: "left",
    }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>
        What you unlocked:
        </div>
        {[
        "Unlimited Kai AI conversations",
        "All 7 color themes",
        "Life Journal & Ghostwriter",
        "Productivity DNA card",
        "Focus Shield auto-replies",
        "Smart Energy Map",
        "Priority support",
        ].map((feature, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00CEC9" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
            </svg>
            <span style={{ fontSize: 13, color: "var(--fm-text)" }}>{feature}</span>
        </div>
        ))}
    </div>

    <button
        onClick={() => window.location.href = "/dashboard"}
        style={{
        padding: "14px 40px", borderRadius: 14, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}
    >
        Start using FlowMind Pro
    </button>

    <p style={{ fontSize: 12, color: "var(--fm-muted)", marginTop: 16 }}>
        Questions? Contact support@flowmind.app
    </p>
    </div>
</div>
);
}