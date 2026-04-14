"use client";

import { useState, useEffect } from "react";

const eventIcons = [
{ id: "vacation", emoji: "✈️", label: "Vacation" },
{ id: "birthday", emoji: "🎂", label: "Birthday" },
{ id: "launch", emoji: "🚀", label: "Launch" },
{ id: "wedding", emoji: "💍", label: "Wedding" },
{ id: "deadline", emoji: "⏰", label: "Deadline" },
{ id: "graduation", emoji: "🎓", label: "Graduation" },
{ id: "concert", emoji: "🎵", label: "Concert" },
{ id: "holiday", emoji: "🎄", label: "Holiday" },
{ id: "exam", emoji: "📝", label: "Exam" },
{ id: "move", emoji: "📦", label: "Moving" },
{ id: "baby", emoji: "👶", label: "Baby" },
{ id: "other", emoji: "⭐", label: "Other" },
];

const eventColors = ["#6C5CE7", "#00CEC9", "#fd79a8", "#fdcb6e", "#00b894", "#e17055", "#74b9ff", "#a29bfe", "#ff6b6b", "#55efc4"];

export default function CountdownPage() {
const [events, setEvents] = useState([]);
const [showAdd, setShowAdd] = useState(false);
const [title, setTitle] = useState("");
const [date, setDate] = useState("");
const [icon, setIcon] = useState("vacation");
const [color, setColor] = useState("#6C5CE7");
const [editingId, setEditingId] = useState(null);
const [now, setNow] = useState(new Date());

useEffect(() => {
const saved = localStorage.getItem("daylyft-countdown");
if (saved) setEvents(JSON.parse(saved));
}, []);

useEffect(() => {
const timer = setInterval(() => setNow(new Date()), 1000);
return () => clearInterval(timer);
}, []);

const saveEvents = (updated) => {
setEvents(updated);
localStorage.setItem("daylyft-countdown", JSON.stringify(updated));
};

const addEvent = () => {
if (!title.trim()) { alert("Give your event a name"); return; }
if (!date) { alert("Pick a date"); return; }

if (editingId) {
    const updated = events.map((e) => e.id === editingId ? { ...e, title: title.trim(), date, icon, color } : e);
    saveEvents(updated);
} else {
    const newEvent = {
    id: Date.now(),
    title: title.trim(),
    date,
    icon,
    color,
    createdAt: new Date().toISOString(),
    };
    saveEvents([...events, newEvent].sort((a, b) => new Date(a.date) - new Date(b.date)));
}
closeForm();
};

const closeForm = () => {
setShowAdd(false);
setEditingId(null);
setTitle("");
setDate("");
setIcon("vacation");
setColor("#6C5CE7");
};

const editEvent = (event) => {
setEditingId(event.id);
setTitle(event.title);
setDate(event.date);
setIcon(event.icon);
setColor(event.color);
setShowAdd(true);
};

const deleteEvent = (id) => {
if (!confirm("Delete this countdown?")) return;
saveEvents(events.filter((e) => e.id !== id));
};

const getTimeRemaining = (targetDate) => {
const target = new Date(targetDate + "T00:00:00");
const diff = target - now;

if (diff <= 0) return { passed: true, days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0 };

const days = Math.floor(diff / (1000 * 60 * 60 * 24));
const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((diff % (1000 * 60)) / 1000);

return { passed: false, days, hours, minutes, seconds, totalDays: days };
};

const getIconInfo = (id) => eventIcons.find((i) => i.id === id) || eventIcons[11];

const formatEventDate = (dateStr) => {
const d = new Date(dateStr + "T12:00:00");
return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
};

const upcomingEvents = events.filter((e) => !getTimeRemaining(e.date).passed);
const pastEvents = events.filter((e) => getTimeRemaining(e.date).passed);
const nextEvent = upcomingEvents[0];

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Countdown Timer</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Count down to your most exciting moments — vacations, launches, birthdays, and more</p>
    </div>
    <button onClick={() => { if (showAdd) closeForm(); else setShowAdd(true); }} style={{
        padding: "8px 18px", borderRadius: 10, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>{showAdd ? "Cancel" : "+ Add Event"}</button>
    </div>

    {/* Featured Countdown */}
    {nextEvent && !showAdd && (() => {
    const time = getTimeRemaining(nextEvent.date);
    const iconInfo = getIconInfo(nextEvent.icon);
    return (
        <div style={{
        background: `linear-gradient(135deg, ${nextEvent.color}15, ${nextEvent.color}08)`,
        border: `1px solid ${nextEvent.color}30`,
        borderRadius: 20, padding: 32, marginBottom: 20, textAlign: "center",
        }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>{iconInfo.emoji}</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", marginBottom: 4 }}>{nextEvent.title}</div>
        <div style={{ fontSize: 13, color: "var(--fm-muted)", marginBottom: 20 }}>{formatEventDate(nextEvent.date)}</div>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 8 }}>
            {[
            { value: time.days, label: "Days" },
            { value: time.hours, label: "Hours" },
            { value: time.minutes, label: "Min" },
            { value: time.seconds, label: "Sec" },
            ].map((unit, i) => (
            <div key={i} style={{
                background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
                borderRadius: 14, padding: "14px 18px", minWidth: 65,
            }}>
                <div style={{
                fontSize: 32, fontWeight: 800, color: nextEvent.color,
                lineHeight: 1, fontFamily: "Outfit, sans-serif",
                }}>{String(unit.value).padStart(2, "0")}</div>
                <div style={{ fontSize: 10, color: "var(--fm-muted)", marginTop: 4, fontWeight: 500 }}>{unit.label}</div>
            </div>
            ))}
        </div>

        {time.totalDays <= 7 && (
            <div style={{
            marginTop: 12, padding: "6px 16px", borderRadius: 10, display: "inline-block",
            background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.2)",
            fontSize: 12, fontWeight: 600, color: "#ff6b6b",
            }}>
            {time.totalDays === 0 ? "Tomorrow!" : `Only ${time.totalDays} days left!`}
            </div>
        )}
        </div>
    );
    })()}

    {/* Add Form */}
    {showAdd && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 20, marginBottom: 16,
    }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>{editingId ? "Edit event" : "Add countdown"}</div>

        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Hawaii Trip, Product Launch, Mom's Birthday..." style={{
        width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 15, fontWeight: 600,
        fontFamily: "Outfit, sans-serif", outline: "none", marginBottom: 10, boxSizing: "border-box",
        }} />

        <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Event date</div>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{
            width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
            fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box",
        }} />
        </div>

        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 8 }}>Icon</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {eventIcons.map((ei) => (
            <button key={ei.id} onClick={() => setIcon(ei.id)} style={{
            padding: "6px 10px", borderRadius: 8, fontSize: 11, cursor: "pointer",
            border: icon === ei.id ? "1px solid rgba(108,92,231,0.4)" : "1px solid var(--fm-border)",
            background: icon === ei.id ? "rgba(108,92,231,0.1)" : "var(--fm-card)",
            color: icon === ei.id ? "#6C5CE7" : "var(--fm-muted)",
            fontFamily: "Outfit, sans-serif",
            }}>{ei.emoji} {ei.label}</button>
        ))}
        </div>

        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 8 }}>Color</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {eventColors.map((c) => (
            <div key={c} onClick={() => setColor(c)} style={{
            width: 28, height: 28, borderRadius: 7, background: c, cursor: "pointer",
            border: color === c ? "3px solid var(--fm-text)" : "3px solid transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            }}>
            {color === c && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
            </div>
        ))}
        </div>

        <button onClick={addEvent} style={{
        width: "100%", padding: "12px", borderRadius: 12, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>{editingId ? "Update Event" : "Start Countdown"}</button>
    </div>
    )}

    {/* Stats */}
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
    <div style={{ flex: 1, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Upcoming</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-accent-light)" }}>{upcomingEvents.length}</div>
    </div>
    <div style={{ flex: 1, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Next event</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: nextEvent ? nextEvent.color : "var(--fm-muted)" }}>
        {nextEvent ? `${getTimeRemaining(nextEvent.date).days}d` : "—"}
        </div>
    </div>
    <div style={{ flex: 1, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Past</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#636e72" }}>{pastEvents.length}</div>
    </div>
    </div>

    {/* Upcoming Events */}
    {events.length === 0 ? (
    <div style={{
        textAlign: "center", padding: 50,
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16,
    }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>⏳</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--fm-text)", marginBottom: 8 }}>No countdowns yet</h3>
        <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto" }}>
        Add events you're looking forward to and watch the countdown tick away!
        </p>
    </div>
    ) : (
    <div>
        {upcomingEvents.length > 0 && (
        <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 10 }}>Upcoming ({upcomingEvents.length})</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {upcomingEvents.map((event) => {
                const time = getTimeRemaining(event.date);
                const iconInfo = getIconInfo(event.icon);
                const isFirst = event.id === nextEvent?.id;
                return (
                <div key={event.id} style={{
                    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
                    borderRadius: 14, padding: 16, borderLeft: `4px solid ${event.color}`,
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                        <div style={{
                        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                        background: `${event.color}15`, border: `1px solid ${event.color}25`,
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                        }}>{iconInfo.emoji}</div>
                        <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)" }}>{event.title}</div>
                        <div style={{ fontSize: 11, color: "var(--fm-muted)" }}>{formatEventDate(event.date)}</div>
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 22, fontWeight: 800, color: event.color, lineHeight: 1 }}>{time.days}</div>
                        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>days</div>
                        </div>
                        {!isFirst && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <div onClick={() => editEvent(event)} style={{ cursor: "pointer", color: "var(--fm-muted)" }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                            </div>
                            <div onClick={() => deleteEvent(event.id)} style={{ cursor: "pointer", color: "var(--fm-muted)" }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            </div>
                        </div>
                        )}
                    </div>
                    </div>

                    {time.totalDays <= 30 && (
                    <div style={{
                        marginTop: 10, background: "var(--fm-card)", borderRadius: 6, height: 6, overflow: "hidden",
                    }}>
                        <div style={{
                        height: "100%", borderRadius: 6,
                        width: `${Math.max(5, 100 - (time.totalDays / 30) * 100)}%`,
                        background: `linear-gradient(135deg, ${event.color}, ${event.color}aa)`,
                        transition: "width 1s ease",
                        }} />
                    </div>
                    )}
                </div>
                );
            })}
            </div>
        </div>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
        <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-muted)", marginBottom: 10 }}>Past ({pastEvents.length})</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {pastEvents.map((event) => {
                const iconInfo = getIconInfo(event.icon);
                const daysPassed = Math.abs(Math.floor((now - new Date(event.date + "T00:00:00")) / (1000 * 60 * 60 * 24)));
                return (
                <div key={event.id} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 14px", background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
                    borderRadius: 10, opacity: 0.7,
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{iconInfo.emoji}</span>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--fm-text)", textDecoration: "line-through" }}>{event.title}</div>
                        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>{daysPassed} days ago</div>
                    </div>
                    </div>
                    <div onClick={() => deleteEvent(event.id)} style={{ cursor: "pointer", color: "var(--fm-muted)", fontSize: 11 }}>Remove</div>
                </div>
                );
            })}
            </div>
        </div>
        )}
    </div>
    )}
</div>
);
}