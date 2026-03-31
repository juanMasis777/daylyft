
"use client";

import { useState } from "react";

const events = [
{ id: 1, title: "Team standup", time: "9:00", duration: 30, day: 1, type: "meeting", color: "#6C5CE7" },
{ id: 2, title: "Design work", time: "10:00", duration: 120, day: 1, type: "focus", color: "#00CEC9", ai: true },
{ id: 3, title: "Client call", time: "14:00", duration: 60, day: 1, type: "meeting", color: "#fd79a8" },
{ id: 4, title: "Deep focus block", time: "9:00", duration: 180, day: 2, type: "focus", color: "#00CEC9", ai: true },
{ id: 5, title: "Lunch with Sarah", time: "13:00", duration: 60, day: 2, type: "personal", color: "#fdcb6e" },
{ id: 6, title: "Q2 planning", time: "15:00", duration: 90, day: 2, type: "meeting", color: "#6C5CE7" },
{ id: 7, title: "Code review", time: "10:00", duration: 60, day: 3, type: "focus", color: "#00CEC9" },
{ id: 8, title: "Marketing sync", time: "14:00", duration: 45, day: 3, type: "meeting", color: "#6C5CE7" },
{ id: 9, title: "Creative writing", time: "9:00", duration: 120, day: 4, type: "focus", color: "#00CEC9", ai: true },
{ id: 10, title: "1:1 with manager", time: "11:30", duration: 30, day: 4, type: "meeting", color: "#fd79a8" },
{ id: 11, title: "Gym", time: "17:00", duration: 60, day: 4, type: "personal", color: "#fdcb6e" },
{ id: 12, title: "Sprint review", time: "10:00", duration: 60, day: 5, type: "meeting", color: "#6C5CE7" },
{ id: 13, title: "Documentation", time: "13:00", duration: 120, day: 5, type: "focus", color: "#00CEC9", ai: true },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const hours = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM"];

export default function CalendarPage() {
const [view, setView] = useState("week");

const getTop = (time) => {
const [h] = time.split(":").map(Number);
return (h - 8) * 60;
};

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Calendar</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>March 24 - 28, 2026</p>
    </div>
    <div style={{ display: "flex", gap: 6 }}>
        {["week", "day"].map((v) => (
        <button
            key={v}
            onClick={() => setView(v)}
            style={{
            padding: "6px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600,
            border: view === v ? "none" : "1px solid var(--fm-border)",
            background: view === v ? "var(--fm-accent)" : "transparent",
            color: view === v ? "#fff" : "var(--fm-muted)",
            cursor: "pointer", fontFamily: "Outfit, sans-serif", textTransform: "capitalize",
            }}
        >
            {v}
        </button>
        ))}
    </div>
    </div>

    {/* AI insight */}
    <div style={{
    background: "linear-gradient(135deg, rgba(0,206,201,0.08), rgba(85,239,196,0.04))",
    border: "1px solid rgba(0,206,201,0.15)", borderRadius: 12, padding: 14, marginBottom: 20,
    display: "flex", alignItems: "center", gap: 10,
    }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#00CEC9">
        <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
    </svg>
    <span style={{ fontSize: 13, color: "var(--fm-text)" }}>
        Kai blocked 3 focus sessions this week based on your energy patterns. Teal blocks = AI-optimized time.
    </span>
    </div>

    {/* Legend */}
    <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
    {[
        { label: "Meeting", color: "#6C5CE7" },
        { label: "Focus (AI)", color: "#00CEC9" },
        { label: "Personal", color: "#fdcb6e" },
    ].map((l) => (
        <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--fm-muted)" }}>
        <div style={{ width: 10, height: 10, borderRadius: 3, background: l.color }} />
        {l.label}
        </div>
    ))}
    </div>

    {/* Week grid */}
    <div style={{
    background: "var(--fm-card)", border: "1px solid var(--fm-border)", borderRadius: 14,
    overflow: "hidden",
    }}>
    {/* Day headers */}
    <div style={{ display: "grid", gridTemplateColumns: "60px repeat(5, 1fr)", borderBottom: "1px solid var(--fm-border)" }}>
        <div style={{ padding: 10 }} />
        {days.map((d, i) => (
        <div key={d} style={{
            padding: "10px 8px", textAlign: "center", fontSize: 12, fontWeight: 600,
            color: i === 0 ? "var(--fm-accent)" : "var(--fm-text)",
            borderLeft: "1px solid var(--fm-border)",
        }}>
            {d}
        </div>
        ))}
    </div>

    {/* Time grid */}
    <div style={{ display: "grid", gridTemplateColumns: "60px repeat(5, 1fr)", position: "relative", height: 660 }}>
        {/* Hour labels */}
        <div>
        {hours.map((h) => (
            <div key={h} style={{
            height: 60, fontSize: 11, color: "var(--fm-muted)", padding: "0 8px",
            display: "flex", alignItems: "flex-start", justifyContent: "flex-end", paddingTop: 2,
            }}>
            {h}
            </div>
        ))}
        </div>

        {/* Day columns */}
        {days.map((_, dayIndex) => (
        <div key={dayIndex} style={{ position: "relative", borderLeft: "1px solid var(--fm-border)" }}>
            {hours.map((_, hi) => (
            <div key={hi} style={{ height: 60, borderBottom: "1px solid rgba(28,28,42,0.5)" }} />
            ))}
            {events
            .filter((e) => e.day === dayIndex + 1)
            .map((event) => (
                <div
                key={event.id}
                style={{
                    position: "absolute",
                    top: getTop(event.time),
                    left: 3,
                    right: 3,
                    height: event.duration - 2,
                    background: `${event.color}20`,
                    borderLeft: `3px solid ${event.color}`,
                    borderRadius: 6,
                    padding: "4px 8px",
                    overflow: "hidden",
                    cursor: "pointer",
                }}
                >
                <div style={{ fontSize: 11, fontWeight: 600, color: event.color }}>{event.title}</div>
                <div style={{ fontSize: 10, color: "var(--fm-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                    {event.time.replace(/:00$/, "")}:00
                    {event.ai && (
                    <span style={{ color: "var(--fm-teal)", display: "flex", alignItems: "center", gap: 2 }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
                        </svg>
                        Kai
                    </span>
                    )}
                </div>
                </div>
            ))}
        </div>
        ))}
    </div>
    </div>
</div>
);
}
