"use client";

const freeFeatures = [
"Smart Tasks (basic)", "Calendar", "Pomodoro Timer", "Daily Checklist",
"Quick Notes", "Water Tracker", "Gratitude Journal", "Zen Mode (3 sounds)",
"Kai Chat (10 msgs/day)", "Countdown Timer", "Link Saver", "3 color themes",
];

const proFeatures = {
"AI Copilot (unlimited)": ["Unlimited Kai Chat", "Morning Autopilot", "Night Report", "Productivity DNA", "Weekly Wins", "Decision Maker", "Email Templates", "Kai's Wisdom"],
"Productivity": ["Analytics", "Goal Setting", "Energy Map", "Focus Shield", "Habit Tracker"],
"Wellness & Fitness": ["Sleep Tracker", "Workout Tracker", "Stretching Guide", "Daily Challenge", "Zen Mode (8 sounds + breathing)"],
"Life & Finance": ["Life Journal + AI summaries", "Life Balance Wheel", "Family Mode", "Gift Planner", "Idea Vault", "Budget Tracker", "Savings Goals", "Bill Reminder"],
"Learning & Extras": ["Flashcards", "Reading List", "7 premium themes", "Priority support"],
};

export default function PricingPage() {
return (
<div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "'Outfit', sans-serif", padding: "80px 24px" }}>
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Sora:wght@400;500;600;700;800&display=swap');
    @media (max-width: 768px) { .pricing-cols { grid-template-columns: 1fr !important; } }
    `}</style>

    <div style={{ maxWidth: 900, margin: "0 auto" }}>
    <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#10b981", textDecoration: "none", fontSize: 14, marginBottom: 32 }}>← Back to DayLyft</a>

    <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 16px", borderRadius: 100, background: "#e8fff8", border: "1px solid #c8f5e6", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#00b894", textTransform: "uppercase", marginBottom: 20 }}>PRICING</div>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: "#1a1a2e", marginBottom: 12, fontFamily: "Sora, sans-serif" }}>Simple pricing</h1>
        <p style={{ fontSize: 16, color: "#9ca3af" }}>Start free. Upgrade when you're ready.</p>
    </div>

    <div className="pricing-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* FREE */}
        <div style={{ background: "#fff", border: "1px solid #f0f0f5", borderRadius: 20, padding: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#9ca3af", marginBottom: 8 }}>Starter</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
            <span style={{ fontSize: 48, fontWeight: 900, color: "#1a1a2e", fontFamily: "Sora" }}>$0</span>
            <span style={{ fontSize: 14, color: "#c0c0ca" }}>/forever</span>
        </div>
        <div style={{ fontSize: 13, color: "#c0c0ca", marginBottom: 24 }}>11 features to get you hooked</div>

        <a href="/login" style={{
            display: "block", padding: "13px", borderRadius: 12, textAlign: "center",
            background: "#f4f4f8", border: "1px solid #e8e8f0", color: "#1a1a2e",
            fontSize: 14, fontWeight: 600, textDecoration: "none", marginBottom: 24,
        }}>Get started free</a>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {freeFeatures.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6b7280" }}>
                <span style={{ color: "#00CEC9", fontSize: 14 }}>✓</span>{f}
            </div>
            ))}
        </div>
        </div>

        {/* PRO */}
        <div style={{
        background: "#fff", border: "2px solid #10b981", borderRadius: 20, padding: 32,
        position: "relative", boxShadow: "0 8px 40px rgba(16,185,129,0.12)",
        }}>
        <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", padding: "4px 16px", borderRadius: 100, background: "#10b981", fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: "0.08em" }}>MOST POPULAR</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#10b981", marginBottom: 8 }}>Pro</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
            <span style={{ fontSize: 48, fontWeight: 900, color: "#1a1a2e", fontFamily: "Sora" }}>$6.99</span>
            <span style={{ fontSize: 14, color: "#c0c0ca" }}>/month</span>
        </div>
        <div style={{ fontSize: 13, color: "#c0c0ca", marginBottom: 24 }}>All 40+ features, unlimited everything</div>

        <a href="https://buy.stripe.com/8x25kE2pK5Ho4Wo25AaR205" style={{
            display: "block", padding: "13px", borderRadius: 12, textAlign: "center",
            background: "linear-gradient(135deg, #10b981, #34d399)", color: "#fff",
            fontSize: 14, fontWeight: 700, textDecoration: "none", marginBottom: 24,
        }}>Upgrade to Pro</a>

        <div style={{ fontSize: 12, fontWeight: 600, color: "#10b981", marginBottom: 14 }}>Everything in Starter, plus:</div>

        {Object.entries(proFeatures).map(([category, items]) => (
            <div key={category} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{category}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {items.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6b7280" }}>
                    <span style={{ color: "#10b981", fontSize: 14 }}>✓</span>{f}
                </div>
                ))}
            </div>
            </div>
        ))}
        </div>
    </div>

    <div style={{
        marginTop: 24, padding: 20, borderRadius: 16,
        background: "#fafaff", border: "1px solid #f0f0f5", textAlign: "center",
    }}>
        <div style={{ fontSize: 14, color: "#6b7280" }}>
        Need DayLyft for your team?{" "}
        <a href="mailto:juanmasis777@gmail.com?subject=DayLyft Business Plan" style={{ color: "#10b981", textDecoration: "none", fontWeight: 600 }}>
            Contact us about Business ($12.99/user/mo)
        </a>
        </div>
    </div>

    <div style={{ marginTop: 48, textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#c0c0ca" }}>© 2026 DayLyft. All rights reserved.</p>
    </div>
    </div>
</div>
);
}