"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const colorOptions = [
{ id: "purple", bg: "rgba(108,92,231,0.15)", border: "rgba(108,92,231,0.3)", text: "#a29bfe" },
{ id: "teal", bg: "rgba(0,206,201,0.15)", border: "rgba(0,206,201,0.3)", text: "#00CEC9" },
{ id: "pink", bg: "rgba(253,121,168,0.15)", border: "rgba(253,121,168,0.3)", text: "#fd79a8" },
{ id: "amber", bg: "rgba(253,203,110,0.15)", border: "rgba(253,203,110,0.3)", text: "#fdcb6e" },
{ id: "red", bg: "rgba(255,107,107,0.15)", border: "rgba(255,107,107,0.3)", text: "#ff6b6b" },
];

const inputStyle = {
padding: "10px 14px", borderRadius: 10,
border: "1px solid var(--fm-border)",
background: "var(--fm-card)", color: "var(--fm-text)",
fontSize: 13, fontFamily: "Outfit, sans-serif", outline: "none",
};

export default function CalendarPage() {
const [events, setEvents] = useState([]);
const [weekStart, setWeekStart] = useState(getMonday(new Date()));
const [showAdd, setShowAdd] = useState(false);
const [title, setTitle] = useState("");
const [eventDate, setEventDate] = useState("");
const [startTime, setStartTime] = useState("09:00");
const [endTime, setEndTime] = useState("10:00");
const [color, setColor] = useState("purple");
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);

function getMonday(d) {
const date = new Date(d);
const day = date.getDay();
const diff = date.getDate() - day + (day === 0 ? -6 : 1);
return new Date(date.setDate(diff));
}

function getWeekDays() {
const days = [];
for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    days.push(d);
}
return days;
}

function formatDate(d) {
const y = d.getFullYear();
const m = String(d.getMonth() + 1).padStart(2, "0");
const day = String(d.getDate()).padStart(2, "0");
return `${y}-${m}-${day}`;
}

useEffect(() => {
fetchEvents();
}, [weekStart]);

const fetchEvents = async () => {
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;
const days = getWeekDays();
const { data } = await supabase
    .from("events")
    .select("*")
    .eq("user_id", session.user.id)
    .gte("event_date", formatDate(days[0]))
    .lte("event_date", formatDate(days[6]))
    .order("start_time", { ascending: true });
if (data) setEvents(data);
setLoading(false);
};

const addEvent = async () => {
if (!title.trim()) return alert("Please enter an event name");
if (!eventDate) return alert("Please select a date");
setSaving(true);
const { data: { session } } = await supabase.auth.getSession();
if (!session) { setSaving(false); return alert("Please log in first"); }
const { data, error } = await supabase
    .from("events")
    .insert([{ title: title.trim(), event_date: eventDate, start_time: startTime, end_time: endTime, color, user_id: session.user.id }])
    .select();
setSaving(false);
if (error) return alert("Error: " + error.message);
if (data && data[0]) {
    setEvents([...events, data[0]]);
    setTitle("");
    setEventDate("");
    setStartTime("09:00");
    setEndTime("10:00");
    setColor("purple");
    setShowAdd(false);
}
};

const deleteEvent = async (id) => {
if (!confirm("Delete this event?")) return;
await supabase.from("events").delete().eq("id", id);
setEvents(events.filter((e) => e.id !== id));
};

const weekDays = getWeekDays();
const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const today = formatDate(new Date());

const timeOptions = Array.from({ length: 24 }, (_, i) => {
const h = String(i).padStart(2, "0");
return <option key={h} value={`${h}:00`}>{`${h}:00`}</option>;
});

if (loading) return (
<div style={{ padding: 40, textAlign: "center", color: "var(--fm-muted)" }}>Loading calendar...</div>
);

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>

    {/* Header */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Calendar</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>
        {weekDays[0].toLocaleDateString("en-US", { month: "long", day: "numeric" })} –{" "}
        {weekDays[6].toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
    </div>
    <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => { const d = new Date(weekStart); d.setDate(d.getDate() - 7); setWeekStart(d); }}
        style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid var(--fm-border)", background: "var(--fm-surface)", color: "var(--fm-text)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button onClick={() => { const d = new Date(weekStart); d.setDate(d.getDate() + 7); setWeekStart(d); }}
        style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid var(--fm-border)", background: "var(--fm-surface)", color: "var(--fm-text)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
        <button onClick={() => setShowAdd(!showAdd)}
        style={{ padding: "8px 16px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}>
        + Add event
        </button>
    </div>
    </div>

    {/* Add Event Form */}
    {showAdd && (
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 18, marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>New event</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

        <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addEvent()}
            placeholder="Event name"
            style={{ ...inputStyle }}
        />

        <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            style={{ ...inputStyle, width: "180px" }}
        />

        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <select value={startTime} onChange={(e) => setStartTime(e.target.value)} style={{ ...inputStyle }}>
            {timeOptions}
            </select>
            <span style={{ color: "var(--fm-muted)", fontSize: 13 }}>to</span>
            <select value={endTime} onChange={(e) => setEndTime(e.target.value)} style={{ ...inputStyle }}>
            {timeOptions}
            </select>
        </div>

        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "var(--fm-muted)", marginRight: 4 }}>Color:</span>
            {colorOptions.map((c) => (
            <div key={c.id} onClick={() => setColor(c.id)}
                style={{ width: 26, height: 26, borderRadius: 7, background: c.text, cursor: "pointer", border: color === c.id ? "2px solid var(--fm-text)" : "2px solid transparent", transition: "all 0.15s" }} />
            ))}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
            <button onClick={addEvent} disabled={saving}
            style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: saving ? "#555" : "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif" }}>
            {saving ? "Saving..." : "Save event"}
            </button>
            <button onClick={() => setShowAdd(false)}
            style={{ padding: "10px 24px", borderRadius: 10, border: "1px solid var(--fm-border)", background: "transparent", color: "var(--fm-muted)", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}>
            Cancel
            </button>
        </div>

        </div>
    </div>
    )}

    {/* Week Grid */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8, marginBottom: 16 }}>
    {weekDays.map((day, i) => {
        const dateStr = formatDate(day);
        const isToday = dateStr === today;
        const dayEvents = events.filter((e) => e.event_date === dateStr);
        return (
        <div key={i} style={{ background: "var(--fm-surface)", border: isToday ? "1px solid rgba(108,92,231,0.4)" : "1px solid var(--fm-border)", borderRadius: 12, padding: 10, minHeight: 160 }}>
            <div style={{ textAlign: "center", marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid var(--fm-border)" }}>
            <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 2 }}>{dayNames[i]}</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: isToday ? "var(--fm-accent-light)" : "var(--fm-text)" }}>{day.getDate()}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {dayEvents.length === 0 ? (
                <div style={{ fontSize: 10, color: "var(--fm-muted)", textAlign: "center", padding: "8px 0" }}>No events</div>
            ) : (
                dayEvents.map((ev) => {
                const c = colorOptions.find((co) => co.id === ev.color) || colorOptions[0];
                return (
                    <div key={ev.id} onClick={() => deleteEvent(ev.id)}
                    style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 6, padding: "4px 6px", cursor: "pointer" }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: c.text, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{ev.title}</div>
                    <div style={{ fontSize: 9, color: "var(--fm-muted)" }}>{ev.start_time} - {ev.end_time}</div>
                    </div>
                );
                })
            )}
            </div>
        </div>
        );
    })}
    </div>

    {/* Events List */}
    {events.length > 0 && (
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 18 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>
        This week ({events.length} event{events.length !== 1 ? "s" : ""})
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {events.map((ev) => {
            const c = colorOptions.find((co) => co.id === ev.color) || colorOptions[0];
            return (
            <div key={ev.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "var(--fm-card)", borderRadius: 10, borderLeft: `3px solid ${c.text}` }}>
                <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-text)" }}>{ev.title}</div>
                <div style={{ fontSize: 11, color: "var(--fm-muted)" }}>
                    {new Date(ev.event_date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} · {ev.start_time} - {ev.end_time}
                </div>
                </div>
                <div onClick={() => deleteEvent(ev.id)} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 4 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                </div>
            </div>
            );
        })}
        </div>
    </div>
    )}

    <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
</div>
);
}