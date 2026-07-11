"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const noteColors = [
{ id: "#10b981", label: "Purple" },
{ id: "#00CEC9", label: "Teal" },
{ id: "#fd79a8", label: "Pink" },
{ id: "#fdcb6e", label: "Yellow" },
{ id: "#00b894", label: "Green" },
{ id: "#e17055", label: "Orange" },
{ id: "#74b9ff", label: "Blue" },
{ id: "#34d399", label: "Lavender" },
{ id: "#ff6b6b", label: "Red" },
{ id: "#636e72", label: "Gray" },
];

export default function NotesPage() {
const [notes, setNotes] = useState([]);
const [loading, setLoading] = useState(true);
const [showAdd, setShowAdd] = useState(false);
const [editingNote, setEditingNote] = useState(null);
const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [color, setColor] = useState("#10b981");
const [searchQuery, setSearchQuery] = useState("");
const [kaiMessage, setKaiMessage] = useState("");
const [generatingKai, setGeneratingKai] = useState(false);

useEffect(() => { fetchNotes(); }, []);

const fetchNotes = async () => {
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;

const { data } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", session.user.id)
    .order("pinned", { ascending: false })
    .order("updated_at", { ascending: false });

if (data) setNotes(data);
setLoading(false);
};

const saveNote = async () => {
if (!title.trim()) { alert("Please enter a title"); return; }

const { data: { session } } = await supabase.auth.getSession();
if (!session) return;

if (editingNote) {
    const { data, error } = await supabase
    .from("notes")
    .update({ title: title.trim(), content: content.trim(), color, updated_at: new Date().toISOString() })
    .eq("id", editingNote.id)
    .select();

    if (!error && data) {
    setNotes(notes.map((n) => n.id === editingNote.id ? data[0] : n));
    closeEditor();
    }
} else {
    const { data, error } = await supabase
    .from("notes")
    .insert([{ title: title.trim(), content: content.trim(), color, user_id: session.user.id }])
    .select();

    if (!error && data) {
    setNotes([data[0], ...notes]);
    closeEditor();
    } else if (error) {
    alert("Error: " + error.message);
    }
}
};

const closeEditor = () => {
setShowAdd(false);
setEditingNote(null);
setTitle("");
setContent("");
setColor("#10b981");
};

const openEditor = (note) => {
setEditingNote(note);
setTitle(note.title);
setContent(note.content || "");
setColor(note.color || "#10b981");
setShowAdd(true);
};

const deleteNote = async (id) => {
if (!confirm("Delete this note?")) return;
await supabase.from("notes").delete().eq("id", id);
setNotes(notes.filter((n) => n.id !== id));
};

const togglePin = async (id, currentPinned) => {
const newPinned = !currentPinned;
await supabase.from("notes").update({ pinned: newPinned }).eq("id", id);
const updated = notes.map((n) => n.id === id ? { ...n, pinned: newPinned } : n);
updated.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.updated_at) - new Date(a.updated_at);
});
setNotes(updated);
};

const expandWithKai = async (noteId) => {
const note = notes.find((n) => n.id === noteId);
if (!note) return;
setGeneratingKai(true);

try {
    const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: `I have a note titled "${note.title}" with this content: "${note.content || 'empty'}". Help me expand on this idea. Give me 3-5 bullet points of additional thoughts, related ideas, or action items I could add. Keep each point concise and practical.`,
        history: [],
    }),
    });
    const data = await response.json();
    if (data.reply) setKaiMessage(data.reply);
} catch (e) {
    setKaiMessage("Couldn't connect to Kai right now.");
}
setGeneratingKai(false);
};

const formatDate = (dateStr) => {
const d = new Date(dateStr);
return d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
};

const filteredNotes = searchQuery.trim()
? notes.filter((n) =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (n.content && n.content.toLowerCase().includes(searchQuery.toLowerCase()))
    )
: notes;

const pinnedNotes = filteredNotes.filter((n) => n.pinned);
const unpinnedNotes = filteredNotes.filter((n) => !n.pinned);

if (loading) return <div style={{ padding: 40, textAlign: "center", color: "var(--fm-muted)" }}>Loading notes...</div>;

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Quick Notes</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Capture ideas, thoughts, and inspiration instantly — never lose a great idea again</p>
    </div>
    <button onClick={() => { if (showAdd) closeEditor(); else setShowAdd(true); }} style={{
        padding: "8px 18px", borderRadius: 10, border: "none",
        background: "linear-gradient(135deg, #10b981, #34d399)", color: "#fff",
        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>{showAdd ? "Cancel" : "+ New Note"}</button>
    </div>

    {/* Search */}
    {notes.length > 0 && !showAdd && (
    <div style={{ marginBottom: 16 }}>
        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search notes..." style={{
        width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-surface)", color: "var(--fm-text)", fontSize: 13,
        fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box",
        }} />
    </div>
    )}

    {/* Stats */}
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
    <div style={{ flex: 1, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Total notes</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-accent-light)" }}>{notes.length}</div>
    </div>
    <div style={{ flex: 1, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Pinned</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#fdcb6e" }}>{notes.filter((n) => n.pinned).length}</div>
    </div>
    <div style={{ flex: 1, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>This week</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#00CEC9" }}>{notes.filter((n) => {
        const d = new Date(n.created_at);
        const now = new Date();
        return (now - d) < 7 * 24 * 60 * 60 * 1000;
        }).length}</div>
    </div>
    </div>

    {/* Note Editor */}
    {showAdd && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 20, marginBottom: 16,
    }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>
        {editingNote ? "Edit note" : "New note"}
        </div>

        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note title..." style={{
        width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 15, fontWeight: 600,
        fontFamily: "Outfit, sans-serif", outline: "none", marginBottom: 10, boxSizing: "border-box",
        }} />

        <textarea value={content} onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughts, ideas, anything..." rows={6} style={{
        width: "100%", padding: "14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
        fontFamily: "Outfit, sans-serif", outline: "none", resize: "vertical",
        marginBottom: 12, boxSizing: "border-box", lineHeight: 1.7,
        }} />

        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 8 }}>Color</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {noteColors.map((c) => (
            <div key={c.id} onClick={() => setColor(c.id)} style={{
            width: 28, height: 28, borderRadius: 7, background: c.id, cursor: "pointer",
            border: color === c.id ? "3px solid var(--fm-text)" : "3px solid transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            }}>
            {color === c.id && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
            </div>
        ))}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
        <button onClick={saveNote} style={{
            flex: 1, padding: "12px", borderRadius: 12, border: "none",
            background: "linear-gradient(135deg, #10b981, #34d399)", color: "#fff",
            fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>{editingNote ? "Update Note" : "Save Note"}</button>
        <button onClick={closeEditor} style={{
            padding: "12px 20px", borderRadius: 12, border: "1px solid var(--fm-border)",
            background: "transparent", color: "var(--fm-muted)", fontSize: 13,
            cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Cancel</button>
        </div>
    </div>
    )}

    {/* Kai Expand */}
    {kaiMessage && (
    <div style={{
        background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)",
        borderRadius: 14, padding: 20, marginBottom: 16,
    }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg, #10b981, #34d399)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-accent-light)" }}>Kai's ideas</span>
        </div>
        <div onClick={() => setKaiMessage("")} style={{ cursor: "pointer", color: "var(--fm-muted)", fontSize: 11 }}>Close</div>
        </div>
        <div style={{ fontSize: 13, color: "var(--fm-text)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{kaiMessage}</div>
    </div>
    )}

    {/* Notes Grid */}
    {filteredNotes.length === 0 ? (
    <div style={{
        textAlign: "center", padding: 50,
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 16,
    }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>📝</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--fm-text)", marginBottom: 8 }}>
        {searchQuery ? "No notes found" : "No notes yet"}
        </h3>
        <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto" }}>
        {searchQuery ? "Try a different search term" : "Tap '+ New Note' to capture your first idea!"}
        </p>
    </div>
    ) : (
    <div>
        {/* Pinned Notes */}
        {pinnedNotes.length > 0 && (
        <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#fdcb6e", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
            📌 Pinned
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 10 }}>
            {pinnedNotes.map((note) => (
                <div key={note.id} style={{
                background: "var(--fm-surface)", borderRadius: 14, padding: 18,
                borderTop: `4px solid ${note.color}`,
                border: "1px solid var(--fm-border)", borderTopWidth: 4, borderTopColor: note.color,
                display: "flex", flexDirection: "column", minHeight: 120,
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", flex: 1 }}>{note.title}</div>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0, marginLeft: 8 }}>
                    <div onClick={() => togglePin(note.id, note.pinned)} style={{ cursor: "pointer", fontSize: 14, color: "#fdcb6e" }}>📌</div>
                    <div onClick={() => openEditor(note)} style={{ cursor: "pointer", color: "var(--fm-muted)" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    </div>
                    <div onClick={() => deleteNote(note.id)} style={{ cursor: "pointer", color: "var(--fm-muted)" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </div>
                    </div>
                </div>
                <div style={{
                    fontSize: 13, color: "var(--fm-muted)", lineHeight: 1.6, flex: 1,
                    overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical",
                }}>{note.content || "No content"}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--fm-border)" }}>
                    <span style={{ fontSize: 10, color: "var(--fm-muted)" }}>{formatDate(note.updated_at)}</span>
                    <button onClick={() => expandWithKai(note.id)} disabled={generatingKai} style={{
                    padding: "4px 10px", borderRadius: 8, border: "none", fontSize: 10, fontWeight: 600,
                    background: "rgba(16,185,129,0.1)", color: "var(--fm-accent-light)",
                    cursor: generatingKai ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
                    }}>{generatingKai ? "..." : "✦ Expand with Kai"}</button>
                </div>
                </div>
            ))}
            </div>
        </div>
        )}

        {/* Regular Notes */}
        {unpinnedNotes.length > 0 && (
        <div>
            {pinnedNotes.length > 0 && (
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-muted)", marginBottom: 8 }}>All notes</div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 10 }}>
            {unpinnedNotes.map((note) => (
                <div key={note.id} style={{
                background: "var(--fm-surface)", borderRadius: 14, padding: 18,
                borderTop: `4px solid ${note.color}`,
                border: "1px solid var(--fm-border)", borderTopWidth: 4, borderTopColor: note.color,
                display: "flex", flexDirection: "column", minHeight: 120,
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", flex: 1 }}>{note.title}</div>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0, marginLeft: 8 }}>
                    <div onClick={() => togglePin(note.id, note.pinned)} style={{ cursor: "pointer", color: "var(--fm-muted)", fontSize: 12 }}>📌</div>
                    <div onClick={() => openEditor(note)} style={{ cursor: "pointer", color: "var(--fm-muted)" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    </div>
                    <div onClick={() => deleteNote(note.id)} style={{ cursor: "pointer", color: "var(--fm-muted)" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </div>
                    </div>
                </div>
                <div style={{
                    fontSize: 13, color: "var(--fm-muted)", lineHeight: 1.6, flex: 1,
                    overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical",
                }}>{note.content || "No content"}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--fm-border)" }}>
                    <span style={{ fontSize: 10, color: "var(--fm-muted)" }}>{formatDate(note.updated_at)}</span>
                    <button onClick={() => expandWithKai(note.id)} disabled={generatingKai} style={{
                    padding: "4px 10px", borderRadius: 8, border: "none", fontSize: 10, fontWeight: 600,
                    background: "rgba(16,185,129,0.1)", color: "var(--fm-accent-light)",
                    cursor: generatingKai ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
                    }}>{generatingKai ? "..." : "✦ Expand with Kai"}</button>
                </div>
                </div>
            ))}
            </div>
        </div>
        )}
    </div>
    )}
</div>
);
}