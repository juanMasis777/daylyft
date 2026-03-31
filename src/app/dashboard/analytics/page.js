"use client";

export default function AnalyticsPage() {
const weekData = [
{ day: "Mon", hours: 6.2, tasks: 8 },
{ day: "Tue", hours: 7.5, tasks: 11 },
{ day: "Wed", hours: 5.1, tasks: 7 },
{ day: "Thu", hours: 8.0, tasks: 12 },
{ day: "Fri", hours: 6.8, tasks: 9 },
{ day: "Sat", hours: 3.2, tasks: 4 },
{ day: "Sun", hours: 1.8, tasks: 2 },
];
const maxH = 8;

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: "0 0 4px" }}>Analytics</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "0 0 24px" }}>Kai analyzes your patterns to optimize performance</p>

    {/* AI Insight */}
    <div
    style={{
        background: "linear-gradient(135deg, rgba(0,206,201,0.08), rgba(85,239,196,0.04))",
        border: "1px solid rgba(0,206,201,0.15)",
        borderRadius: 14,
        padding: 18,
        marginBottom: 24,
    }}
    >
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#00CEC9">
        <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
        </svg>
        <span style={{ color: "var(--fm-teal)", fontSize: 12, fontWeight: 600 }}>Kai's insight</span>
    </div>
    <p style={{ color: "var(--fm-text)", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
        Your productivity increases 34% when creative tasks are scheduled before 11am. 
        Thursdays are your peak day — you completed 12 tasks last Thursday. I recommend 
        moving important meetings to Thursdays for maximum impact.
    </p>
    </div>

    {/* Weekly Chart */}
    <div
    style={{
        background: "var(--fm-card)",
        border: "1px solid var(--fm-border)",
        borderRadius: 14,
        padding: 20,
        marginBottom: 20,
    }}
    >
    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 20 }}>
        Productive hours this week
    </div>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 160 }}>
        {weekData.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, color: "var(--fm-accent-light)", fontWeight: 500 }}>{d.hours}h</span>
            <div
            style={{
                width: "100%",
                maxWidth: 36,
                borderRadius: 6,
                height: `${(d.hours / maxH) * 120}px`,
                background: i === 3
                ? "linear-gradient(135deg, #6C5CE7, #a29bfe)"
                : `rgba(108,92,231,${0.15 + (d.hours / maxH) * 0.35})`,
                transition: "height 0.5s ease",
            }}
            />
            <span style={{ fontSize: 12, color: "var(--fm-muted)" }}>{d.day}</span>
        </div>
        ))}
    </div>
    </div>

    {/* Stats grid */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 24 }}>
    {[
        { label: "Best time", value: "8-11 AM", color: "var(--fm-accent)" },
        { label: "Best day", value: "Thursday", color: "var(--fm-teal)" },
        { label: "Tasks/week", value: "53 avg", color: "var(--fm-warning)" },
        { label: "Focus ratio", value: "68%", color: "var(--fm-pink)" },
    ].map((item, i) => (
        <div
        key={i}
        style={{
            background: "var(--fm-card)",
            border: "1px solid var(--fm-border)",
            borderRadius: 12,
            padding: 16,
        }}
        >
        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>{item.label}</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)" }}>{item.value}</div>
        </div>
    ))}
    </div>

    {/* Productivity DNA preview */}
    <div
    style={{
        background: "linear-gradient(135deg, rgba(108,92,231,0.1), rgba(162,155,254,0.05))",
        border: "1px solid rgba(108,92,231,0.2)",
        borderRadius: 14,
        padding: 20,
        textAlign: "center",
    }}
    >
    <div style={{ fontSize: 16, fontWeight: 600, color: "var(--fm-text)", marginBottom: 6 }}>
        Your Productivity DNA
    </div>
    <div style={{ fontSize: 28, fontWeight: 800, color: "var(--fm-accent)", marginBottom: 4 }}>
        The Deep Diver
    </div>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", marginBottom: 16, maxWidth: 400, margin: "0 auto 16px" }}>
        You excel at long, focused work sessions. Your ideal block is 2.5 hours 
        of uninterrupted time. You're in the top 15% of FlowMind users for deep focus.
    </p>
    <button
        style={{
        background: "var(--fm-accent)",
        color: "#fff",
        border: "none",
        borderRadius: 10,
        padding: "10px 24px",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "Outfit, sans-serif",
        }}
    >
        Share your DNA card
    </button>
    </div>
</div>
);
}
