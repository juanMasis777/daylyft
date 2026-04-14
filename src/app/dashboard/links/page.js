"use client";

import { useState, useEffect } from "react";

const linkCategories = [
{ id: "work", label: "Work", emoji: "💼", color: "#6C5CE7" },
{ id: "learn", label: "Learning", emoji: "📚", color: "#00CEC9" },
{ id: "tools", label: "Tools", emoji: "🔧", color: "#fdcb6e" },
{ id: "news", label: "News", emoji: "📰", color: "#e17055" },
{ id: "social", label: "Social", emoji: "📱", color: "#fd79a8" },
{ id: "video", label: "Videos", emoji: "▶️", color: "#ff6b6b" },
{ id: "design", label: "Design", emoji: "🎨", color: "#a29bfe" },
{ id: "shopping", label: "Shopping", emoji: "🛍", color: "#00b894" },
{ id: "recipes", label: "Recipes", emoji: "🍳", color: "#74b9ff" },
{ id: "other", label: "Other", emoji: "🔗", color: "#636e72" },
];

export default function LinksPage() {
const [links, setLinks] = useState([]);
const [showAdd, setShowAdd] = useState(false);
const [title, setTitle] = useState("");
const [url, setUrl] = useState("");
const [category, setCategory] = useState("work");
const [note, setNote] = useState("");
const [editingId, setEditingId] = useState(null);
const [searchQuery, setSearchQuery] = useState("");
const [filterCat, setFilterCat] = useState("all");

useEffect(() => {
const saved = localStorage.getItem("daylyft-links");
if (saved) setLinks(JSON.parse(saved));
}, []);

const saveLinks = (updated) => {
setLinks(updated);
localStorage.setItem("daylyft-links", JSON.stringify(updated));
};

const addLink = () => {
if (!title.trim()) { alert("Give your link a name"); return; }
if (!url.trim()) { alert("Enter a URL"); return; }

let finalUrl = url.trim();
if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
    finalUrl = "https://" + finalUrl;
}

if (editingId) {
    const updated = links.map((l) => l.id === editingId ? {
    ...l, title: title.trim(), url: finalUrl, category, note: note.trim(),
    } : l);
    saveLinks(updated);
} else {
    const newLink = {
    id: Date.now(),
    title: title.trim(),
    url: finalUrl,
    category,
    note: note.trim(),
    favorite: false,
    createdAt: new Date().toISOString(),
    };
    saveLinks([newLink, ...links]);
}
closeForm();
};

const closeForm = () => {
setShowAdd(false);
setEditingId(null);
setTitle("");
setUrl("");
setCategory("work");
setNote("");
};

const editLink = (link) => {
setEditingId(link.id);
setTitle(link.title);
setUrl(link.url);
setCategory(link.category);
setNote(link.note || "");
setShowAdd(true);
};

const deleteLink = (id) => {
if (!confirm("Delete this link?")) return;
saveLinks(links.filter((l) => l.id !== id));
};

const toggleFavorite = (id) => {
const updated = links.map((l) => l.id === id ? { ...l, favorite: !l.favorite } : l);
updated.sort((a, b) => {
    if (a.favorite && !b.favorite) return -1;
    if (!a.favorite && b.favorite) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
});
saveLinks(updated);
};

const copyUrl = (url) => {
navigator.clipboard.writeText(url);
alert("Link copied!");
};

const getDomain = (url) => {
try {
    const domain = new URL(url).hostname.replace("www.", "");
    return domain;
} catch (e) {
    return url;
}
};

const getCategoryInfo = (id) => linkCategories.find((c) => c.id === id) || linkCategories[9];

const formatDate = (dateStr) => {
const d = new Date(dateStr);
return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const filtered = links
.filter((l) => filterCat === "all" || l.category === filterCat)
.filter((l) =>
    !searchQuery.trim() ||
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (l.note && l.note.toLowerCase().includes(searchQuery.toLowerCase()))
);

const favoriteLinks = filtered.filter((l) => l.favorite);
const regularLinks = filtered.filter((l) => !l.favorite);

// Category counts
const catCounts = {};
links.forEach((l) => {
catCounts[l.category] = (catCounts[l.category] || 0) + 1;
});

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Link Saver</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Save and organize important links — never lose a useful website again</p>
    </div>
    <button onClick={() => { if (showAdd) closeForm(); else setShowAdd(true); }} style={{
        padding: "8px 18px", borderRadius: 10, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>{showAdd ? "Cancel" : "+ Save Link"}</button>
    </div>

    {/* Stats */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginBottom: 16 }}>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Total links</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-accent-light)" }}>{links.length}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Favorites</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#fdcb6e" }}>{links.filter((l) => l.favorite).length}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Categories</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#00CEC9" }}>{Object.keys(catCounts).length}</div>
    </div>
    </div>

    {/* Search + Filter */}
    {links.length > 0 && !showAdd && (
    <div style={{ marginBottom: 16 }}>
        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search links..." style={{
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
        }}>All ({links.length})</button>
        {linkCategories.filter((cat) => catCounts[cat.id]).map((cat) => (
            <button key={cat.id} onClick={() => setFilterCat(cat.id)} style={{
            padding: "5px 10px", borderRadius: 8, fontSize: 11, fontWeight: 500,
            border: filterCat === cat.id ? `1px solid ${cat.color}40` : "1px solid var(--fm-border)",
            background: filterCat === cat.id ? `${cat.color}15` : "var(--fm-surface)",
            color: filterCat === cat.id ? cat.color : "var(--fm-muted)",
            cursor: "pointer", fontFamily: "Outfit, sans-serif",
            }}>{cat.emoji} {cat.label} ({catCounts[cat.id]})</button>
        ))}
        </div>
    </div>
    )}

    {/* Add Form */}
    {showAdd && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 20, marginBottom: 16,
    }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>{editingId ? "Edit link" : "Save a link"}</div>

        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Design Inspiration, React Tutorial, Cool Tool..." style={{
        width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 15, fontWeight: 600,
        fontFamily: "Outfit, sans-serif", outline: "none", marginBottom: 10, boxSizing: "border-box",
        }} />

        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" style={{
        width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13,
        fontFamily: "Outfit, sans-serif", outline: "none", marginBottom: 10, boxSizing: "border-box",
        }} />

        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Why did you save this? (optional)" rows={2} style={{
        width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13,
        fontFamily: "Outfit, sans-serif", outline: "none", resize: "none",
        marginBottom: 12, boxSizing: "border-box", lineHeight: 1.6,
        }} />

        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 8 }}>Category</div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 16 }}>
        {linkCategories.map((cat) => (
            <button key={cat.id} onClick={() => setCategory(cat.id)} style={{
            padding: "6px 10px", borderRadius: 8, fontSize: 11, cursor: "pointer",
            border: category === cat.id ? `1px solid ${cat.color}40` : "1px solid var(--fm-border)",
            background: category === cat.id ? `${cat.color}15` : "var(--fm-card)",
            color: category === cat.id ? cat.color : "var(--fm-muted)",
            fontFamily: "Outfit, sans-serif",
            }}>{cat.emoji} {cat.label}</button>
        ))}
        </div>

        <button onClick={addLink} style={{
        width: "100%", padding: "12px", borderRadius: 12, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>{editingId ? "Update Link" : "Save Link"}</button>
    </div>
    )}

    {/* Links List */}
    {filtered.length === 0 ? (
    <div style={{
        textAlign: "center", padding: 50,
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16,
    }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🔗</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--fm-text)", marginBottom: 8 }}>
        {searchQuery || filterCat !== "all" ? "No links found" : "No saved links yet"}
        </h3>
        <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto" }}>
        {searchQuery || filterCat !== "all" ? "Try a different search or filter" : "Save links to articles, tools, videos — anything you want to find later!"}
        </p>
    </div>
    ) : (
    <div>
        {/* Favorites */}
        {favoriteLinks.length > 0 && (
        <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#fdcb6e", marginBottom: 8 }}>⭐ Favorites</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {favoriteLinks.map((link) => renderLinkCard(link))}
            </div>
        </div>
        )}

        {/* Regular Links */}
        {regularLinks.length > 0 && (
        <div>
            {favoriteLinks.length > 0 && <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-muted)", marginBottom: 8 }}>All links</div>}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {regularLinks.map((link) => renderLinkCard(link))}
            </div>
        </div>
        )}
    </div>
    )}
</div>
);

function renderLinkCard(link) {
const cat = getCategoryInfo(link.category);
return (
    <div key={link.id} style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: 16, borderLeft: `4px solid ${cat.color}`,
    }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
        <div style={{ flex: 1, overflow: "hidden" }}>
        <a href={link.url} target="_blank" rel="noopener noreferrer" style={{
            fontSize: 15, fontWeight: 600, color: "var(--fm-text)", textDecoration: "none",
            display: "block", marginBottom: 2,
        }}>{link.title}</a>
        <div style={{
            fontSize: 12, color: cat.color, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{getDomain(link.url)}</div>
        </div>
        <div style={{ display: "flex", gap: 6, flexShrink: 0, marginLeft: 10 }}>
        <div onClick={() => toggleFavorite(link.id)} style={{ cursor: "pointer", fontSize: 14, color: link.favorite ? "#fdcb6e" : "var(--fm-muted)" }}>
            {link.favorite ? "⭐" : "☆"}
        </div>
        <div onClick={() => copyUrl(link.url)} style={{ cursor: "pointer", color: "var(--fm-muted)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
        </div>
        <div onClick={() => editLink(link)} style={{ cursor: "pointer", color: "var(--fm-muted)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
        </div>
        <div onClick={() => deleteLink(link.id)} style={{ cursor: "pointer", color: "var(--fm-muted)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </div>
        </div>
    </div>

    {link.note && (
        <div style={{ fontSize: 12, color: "var(--fm-muted)", lineHeight: 1.5, marginBottom: 6 }}>"{link.note}"</div>
    )}

    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 6, background: `${cat.color}15`, color: cat.color }}>{cat.emoji} {cat.label}</span>
        <span style={{ fontSize: 10, color: "var(--fm-muted)" }}>{formatDate(link.createdAt)}</span>
        </div>
        <a href={link.url} target="_blank" rel="noopener noreferrer" style={{
        padding: "4px 12px", borderRadius: 8, border: "none", fontSize: 10, fontWeight: 600,
        background: `${cat.color}15`, color: cat.color, textDecoration: "none",
        cursor: "pointer",
        }}>Open →</a>
    </div>
    </div>
);
}
}