"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PricingPage() {
const router = useRouter();
const [billing, setBilling] = useState("monthly");
const [loading, setLoading] = useState(false);

const handleUpgrade = async () => {
setLoading(true);
try {
    const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId: "price_1TIKDiJSvfMiVzPBzl9nAQU7" }),
    });
    const data = await res.json();
    if (data.url) {
    window.location.href = data.url;
    }
} catch (err) {
    console.error("Checkout error:", err);
}
setLoading(false);
};

const proPrice = billing === "monthly" ? "$6.99" : "$5.59";
const bizPrice = billing === "monthly" ? "$12.99" : "$10.39";

return (
<div
    style={{
    minHeight: "100vh",
    background: "#0a0a0f",
    fontFamily: "Outfit, sans-serif",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    }}
>
    {/* Logo */}
    <div
    onClick={() => router.push("/")}
    style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 40,
        cursor: "pointer",
    }}
    >
    <div
        style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        }}
    >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
        <circle cx="12" cy="12" r="3" />
        <circle cx="4" cy="6" r="2" />
        <circle cx="20" cy="6" r="2" />
        <circle cx="4" cy="18" r="2" />
        <circle cx="20" cy="18" r="2" />
        <line x1="6" y1="6" x2="10" y2="10" />
        <line x1="18" y1="6" x2="14" y2="10" />
        <line x1="6" y1="18" x2="10" y2="14" />
        <line x1="18" y1="18" x2="14" y2="14" />
        </svg>
    </div>
    <span style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>DayLyft</span>
    </div>

    {/* Header */}
    <h1 style={{ fontSize: 36, fontWeight: 800, color: "#fff", margin: "0 0 12px", textAlign: "center" }}>
    Choose your plan
    </h1>
    <p style={{ fontSize: 16, color: "#888", margin: "0 0 32px", textAlign: "center" }}>
    Start free, upgrade when you're ready. Cancel anytime.
    </p>

    {/* Billing Toggle */}
    <div
    style={{
        display: "flex",
        background: "#1a1a2e",
        borderRadius: 50,
        padding: 4,
        marginBottom: 48,
        border: "1px solid #2a2a4a",
    }}
    >
    {["monthly", "annual"].map((b) => (
        <button
        key={b}
        onClick={() => setBilling(b)}
        style={{
            padding: "8px 24px",
            borderRadius: 50,
            border: "none",
            background: billing === b ? "linear-gradient(135deg, #6C5CE7, #a29bfe)" : "transparent",
            color: billing === b ? "#fff" : "#888",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "Outfit, sans-serif",
            transition: "all 0.2s",
        }}
        >
        {b === "monthly" ? "Monthly" : "Annual (save 20%)"}
        </button>
    ))}
    </div>

    {/* Plans */}
    <div
    style={{
        display: "flex",
        gap: 20,
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: 1000,
        width: "100%",
    }}
    >
    {/* Starter */}
    <div
        style={{
        background: "#111118",
        border: "1px solid #2a2a4a",
        borderRadius: 20,
        padding: 32,
        flex: 1,
        minWidth: 260,
        maxWidth: 300,
        }}
    >
        <div style={{ fontSize: 14, fontWeight: 600, color: "#888", marginBottom: 8 }}>Starter</div>
        <div style={{ fontSize: 42, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Free</div>
        <div style={{ fontSize: 13, color: "#666", marginBottom: 28 }}>Get started with basic productivity</div>

        <button
        style={{
            width: "100%",
            padding: "13px",
            borderRadius: 12,
            border: "1px solid #2a2a4a",
            background: "transparent",
            color: "#888",
            fontSize: 14,
            fontWeight: 600,
            cursor: "default",
            fontFamily: "Outfit, sans-serif",
        }}
        >
        Current plan
        </button>

        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
        {[
            "5 tasks per day",
            "Basic Kai conversations (10/day)",
            "2 color themes (Midnight + Snow)",
            "Basic calendar view",
            "Zen Mode (2 sounds)",
        ].map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
            </svg>
            <span style={{ fontSize: 13, color: "#aaa" }}>{f}</span>
            </div>
        ))}
        </div>
    </div>

    {/* Pro */}
    <div
        style={{
        background: "#111118",
        border: "2px solid #6C5CE7",
        borderRadius: 20,
        padding: 32,
        flex: 1,
        minWidth: 260,
        maxWidth: 300,
        position: "relative",
        }}
    >
        <div
        style={{
            position: "absolute",
            top: -14,
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 16px",
            borderRadius: 50,
            whiteSpace: "nowrap",
        }}
        >
        Most popular
        </div>

        <div style={{ fontSize: 14, fontWeight: 600, color: "#a29bfe", marginBottom: 8 }}>Pro</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 4 }}>
        <span style={{ fontSize: 42, fontWeight: 800, color: "#fff" }}>{proPrice}</span>
        <span style={{ fontSize: 14, color: "#666", marginBottom: 10 }}>/month</span>
        </div>
        <div style={{ fontSize: 13, color: "#666", marginBottom: 28 }}>Full AI copilot experience</div>

        <button
        onClick={handleUpgrade}
        disabled={loading}
        style={{
            width: "100%",
            padding: "13px",
            borderRadius: 12,
            border: "none",
            background: loading ? "#555" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "Outfit, sans-serif",
            transition: "all 0.2s",
        }}
        >
        {loading ? "Redirecting..." : "Upgrade to Pro"}
        </button>

        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
        {[
            "Unlimited tasks",
            "Unlimited Kai AI conversations",
            "All 7 color themes",
            "Life Journal & Ghostwriter",
            "Productivity DNA card",
            "Focus Shield auto-replies",
            "Smart Energy Map",
            "All Zen Mode sounds",
            "Priority support",
        ].map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
            </svg>
            <span style={{ fontSize: 13, color: "#aaa" }}>{f}</span>
            </div>
        ))}
        </div>
    </div>

    {/* Business */}
    <div
        style={{
        background: "#111118",
        border: "1px solid #2a2a4a",
        borderRadius: 20,
        padding: 32,
        flex: 1,
        minWidth: 260,
        maxWidth: 300,
        }}
    >
        <div style={{ fontSize: 14, fontWeight: 600, color: "#888", marginBottom: 8 }}>Business</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 4 }}>
        <span style={{ fontSize: 42, fontWeight: 800, color: "#fff" }}>{bizPrice}</span>
        <span style={{ fontSize: 14, color: "#666", marginBottom: 10 }}>/user/month</span>
        </div>
        <div style={{ fontSize: 13, color: "#666", marginBottom: 28 }}>For teams that want to win together</div>

        <button
        style={{
            width: "100%",
            padding: "13px",
            borderRadius: 12,
            border: "1px solid #2a2a4a",
            background: "transparent",
            color: "#888",
            fontSize: 14,
            fontWeight: 600,
            cursor: "default",
            fontFamily: "Outfit, sans-serif",
        }}
        >
        Coming soon
        </button>

        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
        {[
            "Everything in Pro",
            "Team dashboard",
            "AI workload balancing",
            "Shared task management",
            "Team analytics",
            "Admin controls",
            "Dedicated support",
        ].map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
            </svg>
            <span style={{ fontSize: 13, color: "#aaa" }}>{f}</span>
            </div>
        ))}
        </div>
    </div>
    </div>

    {/* Back */}
    <div
    onClick={() => router.push("/")}
    style={{
        marginTop: 48,
        fontSize: 14,
        color: "#666",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6,
    }}
    >
    ← Back to home
    </div>

    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
    `}</style>
</div>
);
}