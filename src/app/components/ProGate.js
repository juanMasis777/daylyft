"use client";

import { useState } from "react";

const proFeatureIds = [
"analytics", "autopilot", "dna", "wins", "nightreport", "wisdom",
"decision", "emails", "goals", "focus", "energy", "habits",
"sleep", "workout", "stretching", "challenge", "journal",
"balance", "family", "gifts", "ideas", "budget", "savings",
"bills", "flashcards", "reading",
];

const freeFeatureIds = [
"dashboard", "tasks", "calendar", "pomodoro", "checklist",
"notes", "water", "gratitude", "zen", "chat", "countdown",
"links", "settings", "pricing",
];

export function isProFeature(featureId) {
return proFeatureIds.includes(featureId);
}

export function isFreeFeature(featureId) {
return freeFeatureIds.includes(featureId);
}

export function ProGate({ show, onClose }) {
if (!show) return null;

return (
<div style={{
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)",
    zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center",
    padding: 24, animation: "fadeIn 0.3s ease",
}}>
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 20, padding: 32, maxWidth: 400, width: "100%",
    textAlign: "center", position: "relative",
    animation: "fadeInScale 0.3s ease",
    }}>
    <div onClick={onClose} style={{
        position: "absolute", top: 12, right: 12, cursor: "pointer",
        color: "var(--fm-muted)", padding: 4,
    }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    </div>

    <div style={{
        width: 64, height: 64, borderRadius: 18, margin: "0 auto 16px",
        background: "linear-gradient(135deg, #10b981, #34d399)",
        display: "flex", alignItems: "center", justifyContent: "center",
    }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" />
        </svg>
    </div>

    <h3 style={{ fontSize: 22, fontWeight: 800, color: "var(--fm-text)", marginBottom: 8 }}>
        Unlock this feature
    </h3>
    <p style={{ fontSize: 14, color: "var(--fm-muted)", marginBottom: 24, lineHeight: 1.6 }}>
        This feature is part of DayLyft Pro. Upgrade to get all 40+ features and unlimited Kai AI for just $6.99/month.
    </p>

    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <a href="https://buy.stripe.com/8x25kE2pK5Ho4Wo25AaR205" style={{
        display: "block", padding: "14px 24px", borderRadius: 12,
        background: "linear-gradient(135deg, #10b981, #34d399)", color: "#fff",
        fontSize: 15, fontWeight: 700, textDecoration: "none", textAlign: "center",
        }}>
        Upgrade to Pro — $6.99/mo
        </a>
        <button onClick={() => window.location.href = "/pricing"} style={{
        padding: "12px 24px", borderRadius: 12, border: "1px solid var(--fm-border)",
        background: "transparent", color: "var(--fm-muted)",
        fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>
        See all Pro features
        </button>
        <button onClick={onClose} style={{
        padding: "8px", background: "transparent", border: "none",
        color: "var(--fm-muted)", fontSize: 12, cursor: "pointer",
        fontFamily: "Outfit, sans-serif",
        }}>
        Maybe later
        </button>
    </div>
    </div>
</div>
);
}