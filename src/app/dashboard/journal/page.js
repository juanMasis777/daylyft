"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const moods = [
{ id: "great", emoji: "😄", label: "Great" },
{ id: "good", emoji: "🙂", label: "Good" },
{ id: "neutral", emoji: "😐", label: "Okay" },
{ id: "low", emoji: "😔", label: "Low" },
{ id: "stressed", emoji: "😰", label: "Stressed" },
];

export default function JournalPage() {
const [entries, setEntries] = useState([]);
const [content, setContent] = useState("");
const [mood, setMood] = useState("neutral");
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [generating, setGenerating] = useState(false);
const [showWrite, setShowWrite] = useState(false);
const [todaySummary, setTodaySummary] = useState("");

useEffect(() => {
fetchEntries();
generateDaySummary();
}, []);

const fetchEntries = async () => {
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;

const { data } = await supabase
    .from("journal")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })
    .limit(30);

if (data) setEntries(data);
setLoading(false);
};

const generateDaySummary = async () => {
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;

const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", session.user.id);

if (!tasks || tasks.length === 0) {
    setTodaySummary("Start adding tasks and journal entries to see your AI-generated daily summary here!");
    return;
}

const completed = tasks.filter(t => t.completed).length;
const total = tasks.length;
const highPriority = tasks.filter(t => t.priority === "high" && !t.completed).length;

if (completed === total && total > 0) {
    setTodaySummary(`Amazing day! You completed all ${total} tasks. Take a moment to celebrate your productivity. Consider using Zen Mode to wind down.`);
} else if (completed > total / 2) {
    setTodaySummary(`Good progress today — ${completed} of ${total} tasks done. ${highPriority > 0 ? `You still have ${highPriority} high-priority task${highPriority > 1 ? 's' : ''} remaining.` : 'Keep the momentum going!'}`);
} else {
    setTodaySummary(`You've completed ${completed} of ${total} tasks so far. ${highPriority > 0 ? `Focus on your ${highPriority} high-priority task${highPriority > 1 ? 's' : ''} first.` : 'Pick one task and start there — small wins build momentum.'}`);
}
};

const saveEntry = async () => {
if (!content.trim()) return;
setSaving(true);

const { data: { session } } = await supabase.auth.getSession();
if (!session) return;

let aiSummary = "";
setGenerating(true);

try {
    const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: `Summarize this journal entry in one short sentence (max 15 words). Entry: "${content.trim()}"`,
        history: [],
    }),
    });
    const data = await response.json();
    if (data.reply) aiSummary = data.reply;
} catch (e) {}

setGenerating(false);

const { data, error } = await supabase
    .from("journal")
    .insert([{
    content: content.trim(),
    mood: mood,
    ai_summary: aiSummary,
    user_id: session.user.id,
    }])
    .select();

if (!error && data) {
    setEntries([data[0], ...entries]);
    setContent("");
    setMood("neutral");
    setShowWrite(false);
}
setSaving(false);
};

const deleteEntry = async (id) => {
if (!confirm("Delete this journal entry?")) return;
await supabase.from("journal").delete().eq("id", id);
setEntries(entries.filter(e => e.id !== id));
};

const formatDate = (dateStr) => {
const d = new Date(dateStr);
return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
};

const getMoodEmoji = (m) => moods.find(x => x.id === m)?.emoji || "😐";

if (loading) {
return <div style={{ padding: 40, textAlign: "center", color: "var(--fm-muted)" }}>Loading journal...</div>;
}

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Life Journal</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Your personal space to reflect, grow, and remember</p>
    </div>
    <button onClick={() => setShowWrite(!showWrite)} style={{
        padding: "8px 18px", borderRadius: 10, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>{showWrite ? "Cancel" : "✏ Write"}</button>
    </div>

    {/* Kai's Daily Summary */}
    <div style={{
    background: "rgba(108,92,231,0.08)", border: "1px solid rgba(108,92,231,0.15)",
    borderRadius: 14, padding: 16, marginBottom: 16,
    }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
        </div>
        <span style={{ fontSize: 13, color: "var(--fm-accent-light)", fontWeight: 600 }}>Kai's daily summary</span>
    </div>
    <p style={{ fontSize: 13, color: "var(--fm-text)", lineHeight: 1.6, margin: 0 }}>{todaySummary}</p>
    </div>

    {/* Write Entry */}
    {showWrite && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 20, marginBottom: 16,
    }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>How's your day going?</div>

        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {moods.map((m) => (
            <div key={m.id} onClick={() => setMood(m.id)} style={{
            padding: "8px 12px", borderRadius: 10, cursor: "pointer",
            background: mood === m.id ? "rgba(108,92,231,0.1)" : "var(--fm-card)",
            border: mood === m.id ? "1px solid rgba(108,92,231,0.3)" : "1px solid var(--fm-border)",
            textAlign: "center",
            }}>
            <div style={{ fontSize: 20 }}>{m.emoji}</div>
            <div style={{ fontSize: 10, color: mood === m.id ? "var(--fm-accent-light)" : "var(--fm-muted)", marginTop: 2 }}>{m.label}</div>
            </div>
        ))}
        </div>

        <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write about your day, thoughts, goals, gratitude, anything..."
        rows={5}
        style={{
            width: "100%", padding: "14px", borderRadius: 12,
            border: "1px solid var(--fm-border)", background: "var(--fm-card)",
            color: "var(--fm-text)", fontSize: 14, fontFamily: "Outfit, sans-serif",
            outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.6,
        }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
        <span style={{ fontSize: 12, color: "var(--fm-muted)" }}>{content.length} characters</span>
        <button onClick={saveEntry} disabled={saving || !content.trim()} style={{
            padding: "10px 24px", borderRadius: 10, border: "none",
            background: saving ? "var(--fm-muted)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            color: "#fff", fontSize: 13, fontWeight: 600, cursor: saving ? "not-allowed" : "pointer",
            fontFamily: "Outfit, sans-serif",
        }}>{generating ? "Kai is summarizing..." : saving ? "Saving..." : "Save entry"}</button>
        </div>
    </div>
    )}

    {/* Entries */}
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    {entries.length === 0 ? (
        <div style={{
        textAlign: "center", padding: 40,
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, color: "var(--fm-muted)", fontSize: 14,
        }}>
        No journal entries yet. Tap "Write" to start your first entry!
        </div>
    ) : (
        entries.map((entry) => (
        <div key={entry.id} style={{
            background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
            borderRadius: 14, padding: 18,
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>{getMoodEmoji(entry.mood)}</span>
                <span style={{ fontSize: 12, color: "var(--fm-muted)" }}>{formatDate(entry.created_at)}</span>
            </div>
            <div onClick={() => deleteEntry(entry.id)} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 4 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
            </div>
            </div>

            <p style={{ fontSize: 14, color: "var(--fm-text)", lineHeight: 1.7, margin: "0 0 10px", whiteSpace: "pre-line" }}>{entry.content}</p>

            {entry.ai_summary && (
            <div style={{
                padding: "8px 12px", borderRadius: 8,
                background: "rgba(108,92,231,0.06)", border: "1px solid rgba(108,92,231,0.1)",
            }}>
                <span style={{ fontSize: 11, color: "var(--fm-accent-light)" }}>✦ Kai's summary: </span>
                <span style={{ fontSize: 12, color: "var(--fm-muted)" }}>{entry.ai_summary}</span>
            </div>
            )}
        </div>
        ))
    )}
    </div>
</div>
);
}