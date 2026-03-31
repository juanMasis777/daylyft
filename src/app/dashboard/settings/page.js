"use client";

import { useState } from "react";

export default function SettingsPage() {
const [darkMode, setDarkMode] = useState(true);
const [language, setLanguage] = useState("en");
const [notifications, setNotifications] = useState(true);
const [kaiVoice, setKaiVoice] = useState(true);
const [plan, setPlan] = useState("pro");

function Toggle({ value, onChange }) {
return (
    <div
    onClick={() => onChange(!value)}
    style={{
        width: 44, height: 24, borderRadius: 12, cursor: "pointer",
        background: value ? "var(--fm-accent)" : "var(--fm-border)",
        padding: 2, transition: "background 0.2s", flexShrink: 0,
    }}
    >
    <div style={{
        width: 20, height: 20, borderRadius: 10, background: "#fff",
        transition: "transform 0.2s",
        transform: value ? "translateX(20px)" : "translateX(0)",
    }} />
    </div>
);
}

function SettingRow({ label, desc, children }) {
return (
    <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "16px 0", borderBottom: "1px solid var(--fm-border)",
    }}>
    <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--fm-text)" }}>{label}</div>
        {desc && <div style={{ fontSize: 12, color: "var(--fm-muted)", marginTop: 2 }}>{desc}</div>}
    </div>
    {children}
    </div>
);
}

return (
<div style={{ animation: "fadeIn 0.5s ease", maxWidth: 600 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: "0 0 4px" }}>Settings</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "0 0 24px" }}>Customize your FlowMind experience</p>

    {/* Profile */}
    <div style={{
    background: "var(--fm-card)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: 20, marginBottom: 24,
    }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-muted)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Profile</div>
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{
        width: 56, height: 56, borderRadius: 14,
        background: "linear-gradient(135deg, #fd79a8, #e84393)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, fontWeight: 700, color: "#fff",
        }}>JM</div>
        <div>
        <div style={{ fontSize: 18, fontWeight: 600, color: "var(--fm-text)" }}>Juan M.</div>
        <div style={{ fontSize: 13, color: "var(--fm-muted)" }}>juan@example.com</div>
        <div style={{
            display: "inline-block", marginTop: 6, fontSize: 11, fontWeight: 600,
            padding: "3px 10px", borderRadius: 20,
            background: "rgba(108,92,231,0.15)", color: "var(--fm-accent-light)",
        }}>Pro plan — $6.99/mo</div>
        </div>
    </div>
    </div>

    {/* Appearance */}
    <div style={{
    background: "var(--fm-card)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: "4px 20px 0", marginBottom: 24,
    }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-muted)", padding: "16px 0 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>Appearance</div>
    <SettingRow label="Dark mode" desc="Use dark theme across the app">
        <Toggle value={darkMode} onChange={setDarkMode} />
    </SettingRow>
    <SettingRow label="Language" desc="App interface language">
        <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{
            padding: "6px 12px", borderRadius: 8, border: "1px solid var(--fm-border)",
            background: "var(--fm-surface)", color: "var(--fm-text)", fontSize: 13,
            fontFamily: "Outfit, sans-serif", cursor: "pointer", outline: "none",
        }}
        >
        <option value="en">English</option>
        <option value="es">Español</option>
        </select>
    </SettingRow>
    </div>

    {/* Kai settings */}
    <div style={{
    background: "var(--fm-card)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: "4px 20px 0", marginBottom: 24,
    }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-muted)", padding: "16px 0 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>Kai AI assistant</div>
    <SettingRow label="Notifications" desc="Kai sends you reminders and suggestions">
        <Toggle value={notifications} onChange={setNotifications} />
    </SettingRow>
    <SettingRow label="Voice responses" desc="Kai reads messages aloud">
        <Toggle value={kaiVoice} onChange={setKaiVoice} />
    </SettingRow>
    <SettingRow label="Proactivity level" desc="How much should Kai suggest on its own?">
        <select
        value="moderate"
        onChange={() => {}}
        style={{
            padding: "6px 12px", borderRadius: 8, border: "1px solid var(--fm-border)",
            background: "var(--fm-surface)", color: "var(--fm-text)", fontSize: 13,
            fontFamily: "Outfit, sans-serif", cursor: "pointer", outline: "none",
        }}
        >
        <option value="low">Low — only when I ask</option>
        <option value="moderate">Moderate — suggest but I decide</option>
        <option value="high">High — automate everything</option>
        </select>
    </SettingRow>
    </div>

    {/* Subscription */}
    <div style={{
    background: "var(--fm-card)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: 20, marginBottom: 24,
    }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-muted)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Subscription</div>
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[
        { id: "starter", name: "Starter", price: "Free", color: "var(--fm-muted)" },
        { id: "pro", name: "Pro", price: "$6.99/mo", color: "var(--fm-accent)" },
        { id: "business", name: "Business", price: "$12.99/user/mo", color: "var(--fm-success)" },
        ].map((p) => (
        <div
            key={p.id}
            onClick={() => setPlan(p.id)}
            style={{
            flex: 1, minWidth: 140, padding: 16, borderRadius: 12, cursor: "pointer",
            border: plan === p.id ? `2px solid ${p.color}` : "1px solid var(--fm-border)",
            background: plan === p.id ? `${p.color}10` : "transparent",
            textAlign: "center",
            }}
        >
            <div style={{ fontSize: 14, fontWeight: 600, color: plan === p.id ? p.color : "var(--fm-text)" }}>{p.name}</div>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginTop: 4 }}>{p.price}</div>
            {plan === p.id && (
            <div style={{ fontSize: 10, color: p.color, marginTop: 6, fontWeight: 600 }}>Current plan</div>
            )}
        </div>
        ))}
    </div>
    </div>

    {/* Danger zone */}
    <div style={{
    background: "var(--fm-card)", border: "1px solid rgba(255,107,107,0.2)",
    borderRadius: 14, padding: 20,
    }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-danger)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Danger zone</div>
    <div style={{ display: "flex", gap: 10 }}>
        <button style={{
        padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600,
        border: "1px solid var(--fm-border)", background: "transparent",
        color: "var(--fm-muted)", cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Export data</button>
        <button style={{
        padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600,
        border: "1px solid rgba(255,107,107,0.3)", background: "rgba(255,107,107,0.1)",
        color: "var(--fm-danger)", cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Delete account</button>
    </div>
    </div>
</div>
);
}
