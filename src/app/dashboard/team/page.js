"use client";

export default function TeamPage() {
return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0, marginBottom: 4 }}>Team</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", marginBottom: 24 }}>Collaborate with your team</p>

    <div style={{ textAlign: "center", padding: "60px 20px" }}>
    <div style={{
        width: 80, height: 80, borderRadius: "50%", margin: "0 auto 20px",
        background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
    }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--fm-accent-light)" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    </div>

    <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--fm-text)", marginBottom: 8 }}>
        Team features coming soon!
    </h3>
    <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto 24px" }}>
        Invite team members, balance workloads with AI, track team productivity, and assign tasks — all in one place.
    </p>

    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 16, padding: 24, maxWidth: 400, margin: "0 auto 24px", textAlign: "left",
    }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>
        Business plan includes:
        </div>
        {[
        "Team dashboard with real-time status",
        "AI workload balancing across members",
        "Shared task management & assignment",
        "Team analytics & productivity reports",
        "Admin controls & permissions",
        "Priority support",
        ].map((f, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00CEC9" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
            </svg>
            <span style={{ fontSize: 13, color: "var(--fm-text)" }}>{f}</span>
        </div>
        ))}
    </div>

    <button
        onClick={() => window.location.href = "/pricing"}
        style={{
        padding: "14px 32px", borderRadius: 14, border: "none",
        background: "linear-gradient(135deg, #10b981, #34d399)", color: "#fff",
        fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}
    >
        Upgrade to Business — $12.99/mo
    </button>
    </div>
</div>
);
}