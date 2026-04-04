"use client";

import { useTheme } from "@/context/ThemeContext";

export default function SettingsPage() {
const { theme, setTheme, themes } = useTheme();

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", marginBottom: 4 }}>Settings</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", marginBottom: 24 }}>Customize your FlowMind experience</p>

    {/* Theme Selection */}
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16, padding: 24, marginBottom: 16 }}>
    <div style={{ fontSize: 16, fontWeight: 600, color: "var(--fm-text)", marginBottom: 4 }}>Color Theme</div>
    <div style={{ fontSize: 13, color: "var(--fm-muted)", marginBottom: 16 }}>Choose your preferred look. Free users get Midnight + Snow.</div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 }}>
        {themes.map((t) => (
        <div
            key={t.id}
            onClick={() => setTheme(t.id)}
            style={{
            padding: 12, borderRadius: 12, cursor: "pointer",
            border: theme === t.id ? `2px solid ${t.color}` : "1px solid var(--fm-border)",
            background: "var(--fm-card)",
            transition: "all 0.2s ease",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: t.bg, border: `2px solid ${t.color}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: t.color }} />
            </div>
            <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-text)" }}>{t.name}</div>
                {!t.free && <div style={{ fontSize: 9, color: "var(--fm-accent-light)" }}>PRO</div>}
            </div>
            </div>
            {theme === t.id && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00CEC9" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                <span style={{ fontSize: 10, color: "#00CEC9" }}>Active</span>
            </div>
            )}
        </div>
        ))}
    </div>
    </div>

    {/* Profile Section */}
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16, padding: 24, marginBottom: 16 }}>
    <div style={{ fontSize: 16, fontWeight: 600, color: "var(--fm-text)", marginBottom: 4 }}>Profile</div>
    <div style={{ fontSize: 13, color: "var(--fm-muted)", marginBottom: 16 }}>Manage your account settings</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--fm-border)" }}>
        <span style={{ fontSize: 13, color: "var(--fm-muted)" }}>Email</span>
        <span style={{ fontSize: 13, color: "var(--fm-text)" }}>Connected via login</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--fm-border)" }}>
        <span style={{ fontSize: 13, color: "var(--fm-muted)" }}>Plan</span>
        <span style={{ fontSize: 13, color: "var(--fm-accent-light)", fontWeight: 600 }}>Free</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}>
        <span style={{ fontSize: 13, color: "var(--fm-muted)" }}>Language</span>
        <span style={{ fontSize: 13, color: "var(--fm-text)" }}>English / Spanish (auto-detect)</span>
        </div>
    </div>
    </div>

    {/* Subscription */}
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16, padding: 24, marginBottom: 16 }}>
    <div style={{ fontSize: 16, fontWeight: 600, color: "var(--fm-text)", marginBottom: 4 }}>Subscription</div>
    <div style={{ fontSize: 13, color: "var(--fm-muted)", marginBottom: 16 }}>Upgrade to unlock all features</div>
    <button
        onClick={() => window.location.href = "/pricing"}
        style={{
        padding: "12px 24px", borderRadius: 12, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}
    >
        Upgrade to Pro — $6.99/month
    </button>
    </div>

    {/* Kai Settings */}
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16, padding: 24, marginBottom: 16 }}>
    <div style={{ fontSize: 16, fontWeight: 600, color: "var(--fm-text)", marginBottom: 4 }}>Kai AI Copilot</div>
    <div style={{ fontSize: 13, color: "var(--fm-muted)", marginBottom: 16 }}>Configure how Kai interacts with you</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--fm-border)" }}>
        <span style={{ fontSize: 13, color: "var(--fm-muted)" }}>Personality</span>
        <span style={{ fontSize: 13, color: "var(--fm-text)" }}>Friendly & Professional</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--fm-border)" }}>
        <span style={{ fontSize: 13, color: "var(--fm-muted)" }}>Proactivity</span>
        <span style={{ fontSize: 13, color: "var(--fm-text)" }}>Moderate</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}>
        <span style={{ fontSize: 13, color: "var(--fm-muted)" }}>Language</span>
        <span style={{ fontSize: 13, color: "var(--fm-text)" }}>Auto-detect (EN/ES)</span>
        </div>
    </div>
    </div>

    {/* Danger Zone */}
    <div style={{ background: "var(--fm-surface)", border: "1px solid rgba(255,107,107,0.2)", borderRadius: 16, padding: 24 }}>
    <div style={{ fontSize: 16, fontWeight: 600, color: "var(--fm-danger)", marginBottom: 4 }}>Danger Zone</div>
    <div style={{ fontSize: 13, color: "var(--fm-muted)", marginBottom: 16 }}>Irreversible actions</div>
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button style={{
        padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 500,
        border: "1px solid rgba(255,107,107,0.3)", background: "rgba(255,107,107,0.05)",
        color: "var(--fm-danger)", cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Export my data</button>
        <button style={{
        padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 500,
        border: "1px solid rgba(255,107,107,0.3)", background: "rgba(255,107,107,0.05)",
        color: "var(--fm-danger)", cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Delete my account</button>
    </div>
    </div>
</div>
);
}