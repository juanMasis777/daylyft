"use client";

import { useState } from "react";

export default function PricingPage() {
const [annual, setAnnual] = useState(false);

const plans = [
{
    name: "Starter", price: "Free", priceAnnual: "Free",
    desc: "Get started organizing your life",
    color: "#6b6b80", features: [
    "Basic AI daily planning", "Up to 10 tasks/day", "1 user",
    "Simple reminders", "7-day history",
    ], cta: "Get started free",
},
{
    name: "Pro", price: "$6.99", priceAnnual: "$5.59",
    desc: "For families and small teams", popular: true,
    color: "#6C5CE7", features: [
    "Advanced pattern-learning AI", "Unlimited tasks", "Up to 5 users",
    "Google Calendar + Outlook sync", "Weekly productivity insights",
    "Zen Mode with ambient sounds", "Kai's weekly lessons",
    "Productivity DNA card", "Chat support",
    ], cta: "Start free trial",
},
{
    name: "Business", price: "$12.99", priceAnnual: "$10.39",
    desc: "Per user/month — for companies",
    color: "#00CEC9", features: [
    "Everything in Pro", "Unlimited users", "Team dashboard + metrics",
    "AI workload balancing", "Predictive AI engine",
    "Auto-generated reports", "Custom API integrations",
    "SSO + access control", "24/7 priority support",
    ], cta: "Contact sales",
},
];

return (
<div style={{
    minHeight: "100vh", background: "var(--fm-bg)", fontFamily: "Outfit, sans-serif",
    padding: "60px 20px",
}}>
    {/* Header */}
    <div style={{ textAlign: "center", marginBottom: 48 }}>
    <div
        style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, cursor: "pointer" }}
        onClick={() => (window.location.href = "/")}
    >
        <div style={{
        width: 32, height: 32, borderRadius: 9,
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        display: "flex", alignItems: "center", justifyContent: "center",
        }}>
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <circle cx="8" cy="8" r="3" fill="white" />
            <circle cx="16" cy="14" r="3" fill="white" />
            <line x1="8" y1="8" x2="16" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        </div>
        <span style={{ fontSize: 20, fontWeight: 800, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>FlowMind</span>
    </div>
    <h1 style={{ fontSize: 36, fontWeight: 800, color: "var(--fm-text)", letterSpacing: "-0.03em", margin: "0 0 12px" }}>
        Choose your plan
    </h1>
    <p style={{ fontSize: 16, color: "var(--fm-muted)", margin: "0 0 24px" }}>Start free, scale when ready</p>
    <div style={{
        display: "inline-flex", background: "var(--fm-surface)", borderRadius: 12,
        padding: 4, border: "1px solid var(--fm-border)",
    }}>
        <button onClick={() => setAnnual(false)} style={{
        padding: "8px 22px", borderRadius: 9, border: "none", fontSize: 13, fontWeight: 600,
        background: !annual ? "#6C5CE7" : "transparent", color: !annual ? "#fff" : "var(--fm-muted)",
        cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Monthly</button>
        <button onClick={() => setAnnual(true)} style={{
        padding: "8px 22px", borderRadius: 9, border: "none", fontSize: 13, fontWeight: 600,
        background: annual ? "#6C5CE7" : "transparent", color: annual ? "#fff" : "var(--fm-muted)",
        cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Annual <span style={{ fontSize: 11, opacity: 0.8 }}>-20%</span></button>
    </div>
    </div>

    {/* Plan cards */}
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", maxWidth: 1000, margin: "0 auto" }}>
    {plans.map((plan, i) => (
        <div key={i} style={{
        flex: 1, minWidth: 270, maxWidth: 320,
        background: "var(--fm-surface)", border: `1px solid ${plan.popular ? "#6C5CE7" : "var(--fm-border)"}`,
        borderRadius: 22, padding: 32, position: "relative",
        boxShadow: plan.popular ? "0 0 40px rgba(108,92,231,0.15)" : "none",
        }}>
        {plan.popular && (
            <div style={{
            position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 16px",
            borderRadius: 20, letterSpacing: "0.05em",
            }}>MOST POPULAR</div>
        )}
        <div style={{ fontSize: 14, fontWeight: 700, color: plan.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{plan.name}</div>
        <div style={{ marginBottom: 8 }}>
            <span style={{ fontSize: 42, fontWeight: 900, color: "var(--fm-text)", letterSpacing: "-0.03em" }}>{annual ? plan.priceAnnual : plan.price}</span>
            {plan.price !== "Free" && <span style={{ fontSize: 15, color: "var(--fm-muted)" }}>{plan.name === "Business" ? "/user/mo" : "/mo"}</span>}
        </div>
        <p style={{ fontSize: 14, color: "var(--fm-muted)", marginBottom: 24 }}>{plan.desc}</p>
        <button
            onClick={() => (window.location.href = "/")}
            style={{
            width: "100%", padding: "14px", borderRadius: 12, border: "none",
            background: plan.popular ? "linear-gradient(135deg, #6C5CE7, #a29bfe)" : "rgba(255,255,255,0.06)",
            color: plan.popular ? "#fff" : "var(--fm-text)",
            fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit, sans-serif", marginBottom: 24,
            }}
        >{plan.cta}</button>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {plan.features.map((f, j) => (
            <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--fm-text)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
                </svg>
                {f}
            </div>
            ))}
        </div>
        </div>
    ))}
    </div>
</div>
);
}