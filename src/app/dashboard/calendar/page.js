"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const hours = ["8:00", "9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00"];
const colorOptions = [
{ id: "purple", bg: "rgba(108,92,231,0.15)", border: "rgba(108,92,231,0.3)", text: "#a29bfe" },
{ id: "teal", bg: "rgba(0,206,201,0.15)", border: "rgba(0,206,201,0.3)", text: "#00CEC9" },
{ id: "pink", bg: "rgba(253,121,168,0.15)", border: "rgba(253,121,168,0.3)", text: "#fd79a8" },
{ id: "amber", bg: "rgba(253,203,110,0.15)", border: "rgba(253,203,110,0.3)", text: "#fdcb6e" },
{ id: "red", bg: "rgba(255,107,107,0.15)", border: "rgba(255,107,107,0.3)", text: "#ff6b6b" },
];

export default function CalendarPage() {
const [events, setEvents] = useState([]);
const [weekStart, setWeekStart] = useState(getMonday(new Date()));
const [showAdd, setShowAdd] = useState(false);
const [newEvent, setNewEvent] = useState({ title: "", event_date: "", start_time: "09:00", end_time: "10:00", color: "purple" });
const [loading, setLoading] = useState(true);

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
return d.toISOString().split("T")[0];
}

useEffect(() => {
fetchEvents();
}, [weekStart]);

const fetchEvents = async () => {
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;

const days = getWeekDays();
const startDate = formatDate(days[0]);
const endDate = formatDate(days[6]);

const { data } = await supabase
    .from("events")
    .select("*")
    .eq("user_id", session.user.id)
    .gte("event_date", startDate)
    .lte("event_date", endDate)
    .order("start_time", { ascending: true });

if (data) setEvents(data);
setLoading(false);
};

const addEvent = async () => {
if (!newEvent.title.trim() || !newEvent.event_date) return;
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;

const { data, error } = await supabase
    .from("events")
    .insert([{ ...newEvent, user_id: session.user.id }])
    .select();

if (!error && data) {
    setEvents([...events, data[0]]);
    setNewEvent({ title: "", event_date: "", start_time: "09:00", end_time: "10:00", color: "purple" });
    setShowAdd(false);
}
};

const deleteEvent = async (id) => {
await supabase.from("events").delete().eq("id", id);
setEvents(events.filter((e) => e.id !== id));
};

const prevWeek = () => {
const d = new Date(weekStart);
d.setDate(d.getDate() - 7);
setWeekStart(d);
};

const nextWeek = () => {
const d = new Date(weekStart);
d.setDate(d.getDate() + 7);
setWeekStart(d);
};

const weekDays = getWeekDays();
const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const today = formatDate(new Date());

if (loading) {
return <div style={{ padding: 40, textAlign: "center", color: "var(--fm-muted)" }}>Loading calendar...</div>;
}

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Calendar</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>
        {weekDays[0].toLocaleDateString("en-US", { month: "long", day: "numeric" })} - {weekDays[6].toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
    </div>
    <div style={{ display: "flex", gap: 8 }}>
        <button onClick={prevWeek} style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid var(--fm-border)", background: "var(--fm-surface)", color: "var(--fm-text)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button onClick={nextWeek} style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid var(--fm-border)", background: "var(--fm-surface)", color: "var(--fm-text)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
        <button onClick={() => setShowAdd(!showAdd)} style={{ padding: "8px 16px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}>
        + Add event
        </button>
    </div>
    </div>

    {showAdd && (
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 18, marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <input value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="Event name" style={{ flex: 1, minWidth: 150, padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)", background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13, fontFamily: "Outfit, sans-serif", outline: "none" }} />
        <input type="date" value={newEvent.event_date} onChange={(e) => setNewEvent({ ...newEvent, event_date: e.target.value })} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)", background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13, fontFamily: "Outfit, sans-serif", outline: "none" }} />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <select value={newEvent.start_time} onChange={(e) => setNewEvent({ ...newEvent, start_time: e.target.value })} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)", background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13, fontFamily: "Outfit, sans-serif", outline: "none" }}>
            {Array.from({ length: 24 }, (_, i) => { const h = String(i).padStart(2, "0"); return <option key={h} value={`${h}:00`}>{`${h}:00`}</option>; })}
        </select>
        <span style={{ color: "var(--fm-muted)", fontSize: 13 }}>to</span>
        <select value={newEvent.end_time} onChange={(e) => setNewEvent({ ...newEvent, end_time: e.target.value })} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)", background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13, fontFamily: "Outfit, sans-serif", outline: "none" }}>
            {Array.from({ length: 24 }, (_, i) => { const h = String(i).padStart(2, "0"); return <option key={h} value={`${h}:00`}>{`${h}:00`}</option>; })}
        </select>
        <div style={{ display: "flex", gap: 4 }}>
            {colorOptions.map((c) => (
            <div key={c.id} onClick={() => setNewEvent({ ...newEvent, color: c.id })} style={{ width: 24, height: 24, borderRadius: 6, background: c.text, cursor: "pointer", border: newEvent.color === c.id ? "2px solid var(--fm-text)" : "2px solid transparent" }} />
            ))}
        </div>
        <button onClick={addEvent} style={{ padding: "10px 20px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}>Add</button>
        </div>
    </div>
    )}

    {/* Week Grid */}
    <div style={{ display: "grid", gridTemplateColumns: "60px repeat(7, 1fr)", gap: 0, border: "1px solid var(--fm-border)", borderRadius: 14, overflow: "hidden" }}>
    {/* Header */}
    <div style={{ padding: 8, background: "var(--fm-surface)", borderBottom: "1px solid var(--fm-border)" }} />
    {weekDays.map((day, i) => (
        <div key={i} style={{
        padding: "8px 4px", textAlign: "center",
        background: formatDate(day) === today ? "rgba(108,92,231,0.1)" : "var(--fm-surface)",
        borderBottom: "1px solid var(--fm-border)",
        borderLeft: "1px solid var(--fm-border)",
        }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)" }}>{dayNames[i]}</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: formatDate(day) === today ? "var(--fm-accent-light)" : "var(--fm-text)" }}>{day.getDate()}</div>
        </div>
    ))}

    {/* Time rows */}
    {hours.map((hour) => (
        <div key={hour} style={{ display: "contents" }}>
        <div style={{ padding: "8px 6px", fontSize: 10, color: "var(--fm-muted)", textAlign: "right", borderBottom: "1px solid var(--fm-border)", display: "flex", alignItems: "flex-start", justifyContent: "flex-end" }}>{hour}</div>
        {weekDays.map((day, di) => {
            const dateStr = formatDate(day);
            const hourNum = parseInt(hour);
            const cellEvents = events.filter((e) => e.event_date === dateStr && parseInt(e.start_time) === (hourNum > 7 ? hourNum : hourNum + 12));

            return (
            <div key={di} style={{ minHeight: 40, borderBottom: "1px solid var(--fm-border)", borderLeft: "1px solid var(--fm-border)", padding: 2, background: formatDate(day) === today ? "rgba(108,92,231,0.03)" : "transparent" }}>
                {cellEvents.map((ev) => {
                const c = colorOptions.find((co) => co.id === ev.color) || colorOptions[0];
                return (
                    <div key={ev.id} onClick={() => deleteEvent(ev.id)} style={{
                    background: c.bg, border: `1px solid ${c.border}`, borderRadius: 6,
                    padding: "3px 6px", fontSize: 10, color: c.text, cursor: "pointer",
                    overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
                    }} title={`${ev.title} (click to delete)`}>
                    {ev.title}
                    </div>
                );
                })}
            </div>
            );
        })}
        </div>
    ))}
    </div>
</div>
);
}