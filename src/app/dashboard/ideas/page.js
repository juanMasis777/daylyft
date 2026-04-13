"use client";

import { useState, useEffect } from "react";

const categories = [
{ id: "business", label: "Business", emoji: "💼", color: "#6C5CE7" },
{ id: "app", label: "App / Product", emoji: "📱", color: "#00CEC9" },
{ id: "content", label: "Content", emoji: "🎬", color: "#fd79a8" },
{ id: "personal", label: "Personal", emoji: "🌟", color: "#fdcb6e" },
{ id: "project", label: "Side Project", emoji: "🔨", color: "#e17055" },
{ id: "other", label: "Other", emoji: "💡", color: "#a29bfe" },
];

const priorities = [
{ id: "hot", label: "Hot", emoji: "🔥", color: "#ff6b6b" },
{ id: "warm", label: "Warm", emoji: "⭐", color: "#fdcb6e" },
{ id: "cool", label: "Cool", emoji: "❄️", color: "#74b9ff" },
];

export default function IdeasPage() {
const [ideas, setIdeas] = useState([]);
const [showAdd, setShowAdd] = useState(false);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [category, setCategory] = useState("business");
const [priority, setPriority] = useState("warm");
const [searchQuery, setSearchQuery] = useState("");
const [filterCat, setFilterCat] = useState("all");
const [editingId, setEditingId] = useState(null);
const [kaiMessage, setKaiMessage] = useState("");
const [generatingKai, setGeneratingKai] = useState(false);

useEffect(() => {
const saved = localStorage.getItem("daylyft-ideas");
if (saved) setIdeas(JSON.parse(saved));
}, []);

const saveIdeas = (updated) => {
setIdeas(updated);
localStorage.setItem("daylyft-ideas", JSON.stringify(updated));
};

const addIdea = () => {
if (!title.trim()) { alert("Give your idea a name"); return; }

if (editingId) {
    const updated = ideas.map((idea) => idea.id === editingId ? { ...idea, title: title.trim(), description: description.trim(), category, priority, updatedAt: new Date().toISOString() } : idea);
    saveIdeas(updated);
} else {
    const newIdea = {
    id: Date.now(),
    title: title.trim(),
    description: description.trim(),
    category,
    priority,
    favorite: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    };
    saveIdeas([newIdea, ...ideas]);
}
closeForm();
};

const closeForm = () => {
setShowAdd(false);
setEditingId(null);
setTitle("");
setDescription("");
setCategory("business");
setPriority("warm");
};

const editIdea = (idea) => {
setEditingId(idea.id);
setTitle(idea.title);
setDescription(idea.description || "");
setCategory(idea.category);
setPriority(idea.priority);
setShowAdd(true);
};

const deleteIdea = (id) => {
if (!confirm("Delete this idea?")) return;
saveIdeas(ideas.filter((i) => i.id !== id));
};

const toggleFavorite = (id) => {
const updated = ideas.map((i) => i.id === id ? { ...i, favorite: !i.favorite } : i);
updated.sort((a, b) => {
    if (a.favorite && !b.favorite) return -1;
    if (!a.favorite && b.favorite) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
});
saveIdeas(updated);
};

const developWithKai = async (idea) => {
setGeneratingKai(true);
setKaiMessage("");

try {
    const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: `I have an idea I'd like you to help me develop. Title: "${idea.title}". Description: "${idea.description || 'No description yet'}". Category: ${idea.category}. Help me think through this idea by giving me: 1) A quick validation — is this a good idea and why? 2) 3 concrete next steps to start working on it today, 3) Potential challenges I should prepare for, 4) One way to test this idea quickly and cheaply. Keep it practical and actionable.`,
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

const getCategoryInfo = (catId) => categories.find((c) => c.id === catId) || categories[5];
const getPriorityInfo = (priId) => priorities.find((p) => p.id === priId) || priorities[1];

const formatDate = (dateStr) => {
const d = new Date(dateStr);
return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const filtered = ideas
.filter((i) => filterCat === "all" || i.category === filterCat)
.filter((i) => !searchQuery.trim() || i.title.toLowerCase().includes(searchQuery.toLowerCase()) || (i.description && i.description.toLowerCase().includes(searchQuery.toLowerCase())));

const favoriteIdeas = filtered.filter((i) => i.favorite);
const regularIdeas = filtered.filter((i) => !i.favorite);

const hotCount = ideas.filter((i) => i.priority === "hot").length;

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Idea Vault</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Capture every idea before it disappears — let Kai help you develop the best ones</p>
    </div>
    <button onClick={() => { if (showAdd) closeForm(); else setShowAdd(true); }} style={{
        padding: "8px 18px", borderRadius: 10, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>{showAdd ? "Cancel" : "+ New Idea"}</button>
    </div>

    {/* Stats */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginBottom: 16 }}>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Total ideas</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-accent-light)" }}>{ideas.length}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Hot ideas</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#ff6b6b" }}>{hotCount}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Favorites</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#fdcb6e" }}>{ideas.filter((i) => i.favorite).length}</div>
    </div>
    </div>

    {/* Search + Filter */}
    {ideas.length > 0 && !showAdd && (
    <div style={{ marginBottom: 16 }}>
        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search ideas..." style={{
        width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-surface)", color: "var(--fm-text)", fontSize: 13,
        fontFamily: "Outfit, sans-serif", outline: "none", marginBottom: 8, boxSizing: "border-box",
        }} />
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        <button onClick={() => setFilterCat("all")} style={{
            padding: "5px 12px", borderRadius: 8, fontSize: 11, fontWeight: 500,
            border: filterCat === "all" ? "1px solid rgba(108,92,231,0.4)" : "1px solid var(--fm-border)",
            background: filterCat === "all" ? "rgba(108,92,231,0.1)" : "var(--fm-surface)",
            color: filterCat === "all" ? "#6C5CE7" : "var(--fm-muted)",
            cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>All</button>
        {categories.map((cat) => (
            <button key={cat.id} onClick={() => setFilterCat(cat.id)} style={{
            padding: "5px 10px", borderRadius: 8, fontSize: 11, fontWeight: 500,
            border: filterCat === cat.id ? `1px solid ${cat.color}40` : "1px solid var(--fm-border)",
            background: filterCat === cat.id ? `${cat.color}15` : "var(--fm-surface)",
            color: filterCat === cat.id ? cat.color : "var(--fm-muted)",
            cursor: "pointer", fontFamily: "Outfit, sans-serif",
            }}>{cat.emoji} {cat.label}</button>
        ))}
        </div>
    </div>
    )}

    {/* Add/Edit Form */}
    {showAdd && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 20, marginBottom: 16,
    }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>
        {editingId ? "Edit idea" : "Capture your idea"}
        </div>

        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What's your idea?" style={{
        width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 15, fontWeight: 600,
        fontFamily: "Outfit, sans-serif", outline: "none", marginBottom: 10, boxSizing: "border-box",
        }} />

        <textarea value={description} onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe it... Why is it exciting? What problem does it solve?" rows={3} style={{
        width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13,
        fontFamily: "Outfit, sans-serif", outline: "none", resize: "none",
        marginBottom: 12, boxSizing: "border-box", lineHeight: 1.6,
        }} />

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
        <div>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Category</div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {categories.map((cat) => (
                <button key={cat.id} onClick={() => setCategory(cat.id)} style={{
                padding: "6px 10px", borderRadius: 8, fontSize: 11, cursor: "pointer",
                border: category === cat.id ? `1px solid ${cat.color}40` : "1px solid var(--fm-border)",
                background: category === cat.id ? `${cat.color}15` : "var(--fm-card)",
                color: category === cat.id ? cat.color : "var(--fm-muted)",
                fontFamily: "Outfit, sans-serif",
                }}>{cat.emoji} {cat.label}</button>
            ))}
            </div>
        </div>
        <div>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Priority</div>
            <div style={{ display: "flex", gap: 4 }}>
            {priorities.map((pri) => (
                <button key={pri.id} onClick={() => setPriority(pri.id)} style={{
                padding: "6px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer",
                border: priority === pri.id ? `1px solid ${pri.color}40` : "1px solid var(--fm-border)",
                background: priority === pri.id ? `${pri.color}15` : "var(--fm-card)",
                color: priority === pri.id ? pri.color : "var(--fm-muted)",
                fontFamily: "Outfit, sans-serif", fontWeight: 600,
                }}>{pri.emoji} {pri.label}</button>
            ))}
            </div>
        </div>
        </div>

        <button onClick={addIdea} style={{
        width: "100%", padding: "12px", borderRadius: 12, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>{editingId ? "Update Idea" : "Save Idea"}</button>
    </div>
    )}

    {/* Kai Develop */}
    {kaiMessage && (
    <div style={{
        background: "rgba(108,92,231,0.08)", border: "1px solid rgba(108,92,231,0.15)",
        borderRadius: 14, padding: 20, marginBottom: 16,
    }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-accent-light)" }}>Kai's analysis</span>
        </div>
        <div onClick={() => setKaiMessage("")} style={{ cursor: "pointer", color: "var(--fm-muted)", fontSize: 11 }}>Close</div>
        </div>
        <div style={{ fontSize: 13, color: "var(--fm-text)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{kaiMessage}</div>
    </div>
    )}

    {/* Ideas List */}
    {filtered.length === 0 ? (
    <div style={{
        textAlign: "center", padding: 50,
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16,
    }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>💡</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--fm-text)", marginBottom: 8 }}>
        {searchQuery || filterCat !== "all" ? "No ideas found" : "Your vault is empty"}
        </h3>
        <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto" }}>
        {searchQuery || filterCat !== "all" ? "Try a different filter" : "Every great business started as a random idea. Capture yours before they disappear!"}
        </p>
    </div>
    ) : (
    <div>
        {favoriteIdeas.length > 0 && (
        <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#fdcb6e", marginBottom: 8 }}>⭐ Favorites</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {favoriteIdeas.map((idea) => renderIdeaCard(idea))}
            </div>
        </div>
        )}
        {regularIdeas.length > 0 && (
        <div>
            {favoriteIdeas.length > 0 && <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-muted)", marginBottom: 8 }}>All ideas</div>}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {regularIdeas.map((idea) => renderIdeaCard(idea))}
            </div>
        </div>
        )}
    </div>
    )}
</div>
);

function renderIdeaCard(idea) {
const cat = getCategoryInfo(idea.category);
const pri = getPriorityInfo(idea.priority);
return (
    <div key={idea.id} style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: 18, borderLeft: `4px solid ${cat.color}`,
    }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 18 }}>{cat.emoji}</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)" }}>{idea.title}</span>
        </div>
        {idea.description && (
            <div style={{ fontSize: 13, color: "var(--fm-muted)", lineHeight: 1.6, marginLeft: 26 }}>{idea.description}</div>
        )}
        </div>
        <div style={{ display: "flex", gap: 6, flexShrink: 0, marginLeft: 10 }}>
        <div onClick={() => toggleFavorite(idea.id)} style={{ cursor: "pointer", fontSize: 14, color: idea.favorite ? "#fdcb6e" : "var(--fm-muted)" }}>
            {idea.favorite ? "⭐" : "☆"}
        </div>
        <div onClick={() => editIdea(idea)} style={{ cursor: "pointer", color: "var(--fm-muted)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
        </div>
        <div onClick={() => deleteIdea(idea.id)} style={{ cursor: "pointer", color: "var(--fm-muted)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </div>
        </div>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
        <div style={{ display: "flex", gap: 6 }}>
        <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 6, background: `${cat.color}15`, color: cat.color }}>{cat.label}</span>
        <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 6, background: `${pri.color}15`, color: pri.color }}>{pri.emoji} {pri.label}</span>
        <span style={{ fontSize: 10, color: "var(--fm-muted)" }}>{formatDate(idea.createdAt)}</span>
        </div>
        <button onClick={() => developWithKai(idea)} disabled={generatingKai} style={{
        padding: "4px 10px", borderRadius: 8, border: "none", fontSize: 10, fontWeight: 600,
        background: "rgba(108,92,231,0.1)", color: "var(--fm-accent-light)",
        cursor: generatingKai ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
        }}>{generatingKai ? "..." : "✦ Develop with Kai"}</button>
    </div>
    </div>
);
}
}