"use client";

const members = [
{ name: "Ana Garcia", role: "Product Lead", productivity: 94, tasks: 12, done: 11, status: "focus", avatar: "AG" },
{ name: "Carlos Ruiz", role: "Developer", productivity: 88, tasks: 8, done: 6, status: "available", avatar: "CR" },
{ name: "Maria Lopez", role: "Designer", productivity: 91, tasks: 10, done: 9, status: "meeting", avatar: "ML" },
{ name: "Pedro Sanchez", role: "Marketing", productivity: 76, tasks: 6, done: 3, status: "away", avatar: "PS" },
{ name: "Laura Chen", role: "Engineer", productivity: 89, tasks: 9, done: 7, status: "focus", avatar: "LC" },
];

const statusConfig = {
focus: { color: "#6C5CE7", label: "Focused" },
available: { color: "#00CEC9", label: "Available" },
meeting: { color: "#fdcb6e", label: "In meeting" },
away: { color: "#6b6b80", label: "Away" },
};

export default function TeamPage() {
const totalTasks = members.reduce((sum, m) => sum + m.tasks, 0);
const totalDone = members.reduce((sum, m) => sum + m.done, 0);
const avgProd = Math.round(members.reduce((sum, m) => sum + m.productivity, 0) / members.length);

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: "0 0 4px" }}>Team</h2>
    <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "0 0 24px" }}>Real-time team performance dashboard</p>

    {/* AI Alert */}
    <div style={{
    background: "linear-gradient(135deg, rgba(253,121,168,0.08), rgba(232,67,147,0.04))",
    border: "1px solid rgba(253,121,168,0.15)", borderRadius: 14, padding: 18, marginBottom: 24,
    }}>
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#fd79a8">
        <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
        </svg>
        <span style={{ color: "#fd79a8", fontSize: 12, fontWeight: 600 }}>Kai's team alert</span>
    </div>
    <p style={{ color: "var(--fm-text)", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
        Pedro's workload is 40% lighter than the team average and he's only completed 50% of his tasks.
        I suggest reassigning 2 tasks from Ana to balance the distribution. Want me to do this?
    </p>
    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button style={{
        background: "#fd79a8", color: "#fff", border: "none", borderRadius: 9,
        padding: "8px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Yes, rebalance</button>
        <button style={{
        background: "rgba(255,255,255,0.05)", color: "var(--fm-muted)", border: "1px solid var(--fm-border)",
        borderRadius: 9, padding: "8px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Keep current</button>
    </div>
    </div>

    {/* Team stats */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 24 }}>
    {[
        { label: "Team members", value: members.length, color: "var(--fm-accent)" },
        { label: "Avg productivity", value: `${avgProd}%`, color: "var(--fm-success)" },
        { label: "Tasks today", value: totalTasks, color: "var(--fm-warning)" },
        { label: "Completed", value: `${totalDone}/${totalTasks}`, color: "var(--fm-pink)" },
    ].map((s, i) => (
        <div key={i} style={{ background: "var(--fm-card)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>{s.label}</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "var(--fm-text)" }}>{s.value}</div>
        </div>
    ))}
    </div>

    {/* Member list */}
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    {members.map((m, i) => (
        <div key={i} style={{
        display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
        background: "var(--fm-card)", border: "1px solid var(--fm-border)", borderRadius: 12,
        }}>
        <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0,
        }}>{m.avatar}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)" }}>{m.name}</div>
            <div style={{ fontSize: 12, color: "var(--fm-muted)" }}>{m.role}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: statusConfig[m.status].color }} />
            <span style={{ fontSize: 11, color: statusConfig[m.status].color, fontWeight: 500 }}>{statusConfig[m.status].label}</span>
        </div>
        <div style={{ textAlign: "center", minWidth: 50 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: m.productivity > 85 ? "var(--fm-success)" : "var(--fm-warning)" }}>{m.productivity}%</div>
            <div style={{ fontSize: 9, color: "var(--fm-muted)" }}>Productivity</div>
        </div>
        <div style={{ textAlign: "center", minWidth: 45 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)" }}>{m.done}/{m.tasks}</div>
            <div style={{ fontSize: 9, color: "var(--fm-muted)" }}>Tasks</div>
        </div>
        {/* Progress bar */}
        <div style={{ width: 60 }}>
            <div style={{ height: 4, background: "var(--fm-border)", borderRadius: 2 }}>
            <div style={{
                height: "100%", borderRadius: 2,
                width: `${(m.done / m.tasks) * 100}%`,
                background: m.done / m.tasks > 0.8 ? "var(--fm-success)" : m.done / m.tasks > 0.5 ? "var(--fm-warning)" : "var(--fm-danger)",
            }} />
            </div>
        </div>
        </div>
    ))}
    </div>
</div>
);
}
