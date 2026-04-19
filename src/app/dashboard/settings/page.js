"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { supabase } from "@/lib/supabase";

const themes = [
{ id: "midnight", label: "Midnight", color: "#0a0a12", accent: "#6C5CE7", free: true },
{ id: "snow", label: "Snow", color: "#f5f6fa", accent: "#6C5CE7", free: true },
{ id: "ocean", label: "Ocean", color: "#0a1628", accent: "#00CEC9", free: true },
{ id: "forest", label: "Forest", color: "#0a1410", accent: "#00b894", free: false },
{ id: "rose", label: "Rose", color: "#1a0a14", accent: "#fd79a8", free: false },
{ id: "amber", label: "Amber", color: "#14100a", accent: "#fdcb6e", free: false },
{ id: "sunset", label: "Sunset", color: "#140a0a", accent: "#e17055", free: false },
];

export default function SettingsPage() {
const { theme, setTheme } = useTheme();
const [user, setUser] = useState(null);

useEffect(() => {
const getUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) setUser(session.user);
};
getUser();
}, []);

const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
const userEmail = user?.email || "";

const handleExport = () => {
const data = {};
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("daylyft-")) {
    data[key] = localStorage.getItem(key);
    }
}
const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = `daylyft-export-${new Date().toISOString().split("T")[0]}.json`;
a.click();
URL.revokeObjectURL(url);
};

const handleDeleteAccount = async () => {
const confirmed = confirm("Are you sure you want to delete your account? This action is PERMANENT and cannot be undone. All your data will be lost.");
if (!confirmed) return;
const doubleConfirm = confirm("This is your last chance. Click OK to confirm you want to permanently delete your account and all data.");
if (!doubleConfirm) return;
try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
    await supabase.from("tasks").delete().eq("user_id", session.user.id);
    await supabase.from("events").delete().eq("user_id", session.user.id);
    await supabase.from("journal").delete().eq("user_id", session.user.id);
    await supabase.from("habits").delete().eq("user_id", session.user.id);
    await supabase.from("habit_logs").delete().eq("user_id", session.user.id);
    await supabase.from("goals").delete().eq("user_id", session.user.id);
    await supabase.from("budget").delete().eq("user_id", session.user.id);
    await supabase.from("notes").delete().eq("user_id", session.user.id);
    await supabase.from("family").delete().eq("user_id", session.user.id);
    localStorage.clear();
    await supabase.auth.signOut();
    alert("Your account data has been deleted.");
    window.location.href = "/login";
    }
} catch (e) {
    alert("Error deleting account. Please try again or contact juanmasis777@gmail.com");
}
};

const handleResetOnboarding = () => {
localStorage.removeItem("daylyft-onboarding");
alert("Onboarding reset! Refresh the page to see it again.");
window.location.reload();
};

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ marginBottom: 16 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Settings</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Customize your DayLyft experience</p>
    </div>

    {/* Profile */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 16, padding: 20, marginBottom: 16,
    }}>
    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>Profile</div>
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
        width: 50, height: 50, borderRadius: 14,
        background: "linear-gradient(135deg, #fd79a8, #e84393)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, fontWeight: 700, color: "#fff",
        }}>
        {userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
        </div>
        <div>
        <div style={{ fontSize: 16, fontWeight: 600, color: "var(--fm-text)" }}>{userName}</div>
        <div style={{ fontSize: 13, color: "var(--fm-muted)" }}>{userEmail}</div>
        <div style={{
            marginTop: 4, fontSize: 11, padding: "2px 10px", borderRadius: 6,
            background: "rgba(108,92,231,0.1)", color: "var(--fm-accent-light)",
            display: "inline-block",
        }}>Free plan</div>
        </div>
    </div>
    </div>

    {/* Themes */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 16, padding: 20, marginBottom: 16,
    }}>
    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 4 }}>Color themes</div>
    <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 14 }}>Choose your vibe — 3 free, 4 with Pro</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 10 }}>
        {themes.map((t) => (
        <div key={t.id} onClick={() => t.free ? setTheme(t.id) : alert("Upgrade to Pro to unlock this theme!")} style={{
            padding: 14, borderRadius: 14, cursor: "pointer",
            border: theme === t.id ? `2px solid ${t.accent}` : "2px solid var(--fm-border)",
            background: theme === t.id ? `${t.accent}10` : "var(--fm-card)",
            textAlign: "center", transition: "all 0.2s",
            opacity: t.free ? 1 : 0.6,
            position: "relative",
        }}>
            <div style={{
            width: 40, height: 40, borderRadius: 12, margin: "0 auto 8px",
            background: t.color, border: `2px solid ${t.accent}40`,
            }} />
            <div style={{ fontSize: 13, fontWeight: 600, color: theme === t.id ? t.accent : "var(--fm-text)" }}>{t.label}</div>
            {!t.free && (
            <div style={{
                position: "absolute", top: 8, right: 8,
                fontSize: 9, padding: "2px 6px", borderRadius: 4,
                background: "rgba(108,92,231,0.15)", color: "var(--fm-accent-light)",
            }}>PRO</div>
            )}
            {theme === t.id && (
            <div style={{ marginTop: 6 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.accent} strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
                </svg>
            </div>
            )}
        </div>
        ))}
    </div>
    </div>

    {/* App Info */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 16, padding: 20, marginBottom: 16,
    }}>
    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>About</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
        <span style={{ color: "var(--fm-muted)" }}>App</span>
        <span style={{ color: "var(--fm-text)", fontWeight: 500 }}>DayLyft</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
        <span style={{ color: "var(--fm-muted)" }}>Version</span>
        <span style={{ color: "var(--fm-text)", fontWeight: 500 }}>1.0.0</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
        <span style={{ color: "var(--fm-muted)" }}>Features</span>
        <span style={{ color: "var(--fm-text)", fontWeight: 500 }}>40+</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
        <span style={{ color: "var(--fm-muted)" }}>AI Copilot</span>
        <span style={{ color: "#00CEC9", fontWeight: 500 }}>Kai</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
        <span style={{ color: "var(--fm-muted)" }}>Made with</span>
        <span style={{ color: "var(--fm-text)", fontWeight: 500 }}>❤️ in Miami</span>
        </div>
    </div>
    </div>

    {/* Actions */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 16, padding: 20, marginBottom: 16,
    }}>
    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>Actions</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button onClick={handleExport} style={{
        padding: "12px 16px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)",
        fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        textAlign: "left", display: "flex", alignItems: "center", gap: 10,
        }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
        Export my data
        </button>
        <button onClick={handleResetOnboarding} style={{
        padding: "12px 16px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)",
        fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        textAlign: "left", display: "flex", alignItems: "center", gap: 10,
        }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
        Reset onboarding
        </button>
    </div>
    </div>

    {/* Danger Zone */}
    <div style={{
    background: "rgba(255,107,107,0.05)", border: "1px solid rgba(255,107,107,0.15)",
    borderRadius: 16, padding: 20,
    }}>
    <div style={{ fontSize: 15, fontWeight: 600, color: "#ff6b6b", marginBottom: 4 }}>Danger Zone</div>
    <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 14 }}>Irreversible actions</div>
    <button onClick={handleDeleteAccount} style={{
        padding: "10px 20px", borderRadius: 10, border: "1px solid rgba(255,107,107,0.3)",
        background: "rgba(255,107,107,0.1)", color: "#ff6b6b",
        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        display: "flex", alignItems: "center", gap: 8,
    }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
        Delete my account
    </button>
    </div>
</div>
);
}