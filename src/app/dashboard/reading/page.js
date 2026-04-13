"use client";

import { useState, useEffect } from "react";

const statuses = [
{ id: "toread", label: "To Read", emoji: "📚", color: "#6C5CE7" },
{ id: "reading", label: "Reading", emoji: "📖", color: "#fdcb6e" },
{ id: "finished", label: "Finished", emoji: "✅", color: "#00CEC9" },
];

const genres = [
{ id: "business", label: "Business", emoji: "💼" },
{ id: "selfhelp", label: "Self-Help", emoji: "🌟" },
{ id: "fiction", label: "Fiction", emoji: "🏰" },
{ id: "science", label: "Science", emoji: "🔬" },
{ id: "tech", label: "Technology", emoji: "💻" },
{ id: "biography", label: "Biography", emoji: "👤" },
{ id: "health", label: "Health", emoji: "💪" },
{ id: "finance", label: "Finance", emoji: "💰" },
{ id: "other", label: "Other", emoji: "📕" },
];

export default function ReadingPage() {
const [books, setBooks] = useState([]);
const [showAdd, setShowAdd] = useState(false);
const [title, setTitle] = useState("");
const [author, setAuthor] = useState("");
const [genre, setGenre] = useState("business");
const [status, setStatus] = useState("toread");
const [notes, setNotes] = useState("");
const [rating, setRating] = useState(0);
const [editingId, setEditingId] = useState(null);
const [activeTab, setActiveTab] = useState("toread");
const [kaiMessage, setKaiMessage] = useState("");
const [generatingKai, setGeneratingKai] = useState(false);

useEffect(() => {
const saved = localStorage.getItem("daylyft-reading");
if (saved) setBooks(JSON.parse(saved));
}, []);

const saveBooks = (updated) => {
setBooks(updated);
localStorage.setItem("daylyft-reading", JSON.stringify(updated));
};

const addBook = () => {
if (!title.trim()) { alert("Enter a book title"); return; }

if (editingId) {
    const updated = books.map((b) => b.id === editingId ? { ...b, title: title.trim(), author: author.trim(), genre, status, notes: notes.trim(), rating, updatedAt: new Date().toISOString() } : b);
    saveBooks(updated);
} else {
    const newBook = {
    id: Date.now(),
    title: title.trim(),
    author: author.trim(),
    genre,
    status,
    notes: notes.trim(),
    rating: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    };
    saveBooks([newBook, ...books]);
}
closeForm();
};

const closeForm = () => {
setShowAdd(false);
setEditingId(null);
setTitle("");
setAuthor("");
setGenre("business");
setStatus("toread");
setNotes("");
setRating(0);
};

const editBook = (book) => {
setEditingId(book.id);
setTitle(book.title);
setAuthor(book.author || "");
setGenre(book.genre);
setStatus(book.status);
setNotes(book.notes || "");
setRating(book.rating || 0);
setShowAdd(true);
};

const deleteBook = (id) => {
if (!confirm("Remove this book?")) return;
saveBooks(books.filter((b) => b.id !== id));
};

const moveBook = (id, newStatus) => {
const updated = books.map((b) => b.id === id ? { ...b, status: newStatus, updatedAt: new Date().toISOString() } : b);
saveBooks(updated);
};

const setBookRating = (id, r) => {
const updated = books.map((b) => b.id === id ? { ...b, rating: r } : b);
saveBooks(updated);
};

const getRecommendation = async () => {
setGeneratingKai(true);
setKaiMessage("");

const finished = books.filter((b) => b.status === "finished").map((b) => `"${b.title}" by ${b.author || "unknown"} (${b.genre}, rated ${b.rating}/5)`).join(", ");
const reading = books.filter((b) => b.status === "reading").map((b) => `"${b.title}" by ${b.author || "unknown"} (${b.genre})`).join(", ");
const toread = books.filter((b) => b.status === "toread").map((b) => `"${b.title}"`).join(", ");

try {
    const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: `Based on my reading list, recommend 3 books I should read next. Books I've finished: ${finished || "none"}. Currently reading: ${reading || "none"}. On my to-read list: ${toread || "none"}. For each recommendation give me: 1) The book title and author, 2) Why I would like it based on my reading history, 3) One sentence about what I'll learn. If I haven't read enough books yet, recommend 3 popular books based on the genres I seem interested in. Keep it concise.`,
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

const getGenreInfo = (id) => genres.find((g) => g.id === id) || genres[8];

const filteredBooks = books.filter((b) => b.status === activeTab);
const toReadCount = books.filter((b) => b.status === "toread").length;
const readingCount = books.filter((b) => b.status === "reading").length;
const finishedCount = books.filter((b) => b.status === "finished").length;

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Reading List</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Track books you want to read, are reading, and have finished — Kai recommends what's next</p>
    </div>
    <button onClick={() => { if (showAdd) closeForm(); else setShowAdd(true); }} style={{
        padding: "8px 18px", borderRadius: 10, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>{showAdd ? "Cancel" : "+ Add Book"}</button>
    </div>

    {/* Stats */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginBottom: 16 }}>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>To read</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#6C5CE7" }}>{toReadCount}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Reading</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#fdcb6e" }}>{readingCount}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Finished</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#00CEC9" }}>{finishedCount}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Total</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-accent-light)" }}>{books.length}</div>
    </div>
    </div>

    {/* Tabs */}
    <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
    {statuses.map((s) => {
        const count = books.filter((b) => b.status === s.id).length;
        return (
        <button key={s.id} onClick={() => setActiveTab(s.id)} style={{
            flex: 1, padding: "10px 8px", borderRadius: 10, fontSize: 13, fontWeight: 600,
            border: activeTab === s.id ? `1px solid ${s.color}40` : "1px solid var(--fm-border)",
            background: activeTab === s.id ? `${s.color}15` : "var(--fm-surface)",
            color: activeTab === s.id ? s.color : "var(--fm-muted)",
            cursor: "pointer", fontFamily: "Outfit, sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}>
            <span style={{ fontSize: 16 }}>{s.emoji}</span> {s.label} ({count})
        </button>
        );
    })}
    </div>

    {/* Add Form */}
    {showAdd && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 20, marginBottom: 16,
    }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>{editingId ? "Edit book" : "Add a book"}</div>

        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Book title..." style={{
        width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 15, fontWeight: 600,
        fontFamily: "Outfit, sans-serif", outline: "none", marginBottom: 10, boxSizing: "border-box",
        }} />

        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author name..." style={{
        width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13,
        fontFamily: "Outfit, sans-serif", outline: "none", marginBottom: 12, boxSizing: "border-box",
        }} />

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
        <div>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Genre</div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {genres.map((g) => (
                <button key={g.id} onClick={() => setGenre(g.id)} style={{
                padding: "5px 10px", borderRadius: 8, fontSize: 11, cursor: "pointer",
                border: genre === g.id ? "1px solid rgba(108,92,231,0.4)" : "1px solid var(--fm-border)",
                background: genre === g.id ? "rgba(108,92,231,0.1)" : "var(--fm-card)",
                color: genre === g.id ? "#6C5CE7" : "var(--fm-muted)",
                fontFamily: "Outfit, sans-serif",
                }}>{g.emoji} {g.label}</button>
            ))}
            </div>
        </div>
        <div>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Status</div>
            <div style={{ display: "flex", gap: 4 }}>
            {statuses.map((s) => (
                <button key={s.id} onClick={() => setStatus(s.id)} style={{
                padding: "5px 12px", borderRadius: 8, fontSize: 11, cursor: "pointer",
                border: status === s.id ? `1px solid ${s.color}40` : "1px solid var(--fm-border)",
                background: status === s.id ? `${s.color}15` : "var(--fm-card)",
                color: status === s.id ? s.color : "var(--fm-muted)",
                fontFamily: "Outfit, sans-serif",
                }}>{s.emoji} {s.label}</button>
            ))}
            </div>
        </div>
        </div>

        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes, key takeaways, why you want to read it..." rows={2} style={{
        width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13,
        fontFamily: "Outfit, sans-serif", outline: "none", resize: "none",
        marginBottom: 16, boxSizing: "border-box", lineHeight: 1.6,
        }} />

        <button onClick={addBook} style={{
        width: "100%", padding: "12px", borderRadius: 12, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>{editingId ? "Update Book" : "Add Book"}</button>
    </div>
    )}

    {/* Books List */}
    {filteredBooks.length === 0 ? (
    <div style={{
        textAlign: "center", padding: 50,
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16,
    }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>{statuses.find((s) => s.id === activeTab)?.emoji}</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--fm-text)", marginBottom: 8 }}>No books here yet</h3>
        <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto" }}>
        Add books you want to read, track your progress, and build a reading habit!
        </p>
    </div>
    ) : (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filteredBooks.map((book) => {
        const genreInfo = getGenreInfo(book.genre);
        return (
            <div key={book.id} style={{
            background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
            borderRadius: 14, padding: 18,
            }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 2 }}>{book.title}</div>
                {book.author && <div style={{ fontSize: 12, color: "var(--fm-muted)" }}>by {book.author}</div>}
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0, marginLeft: 10 }}>
                <div onClick={() => editBook(book)} style={{ cursor: "pointer", color: "var(--fm-muted)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                </div>
                <div onClick={() => deleteBook(book.id)} style={{ cursor: "pointer", color: "var(--fm-muted)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </div>
                </div>
            </div>

            {book.notes && (
                <div style={{ fontSize: 13, color: "var(--fm-muted)", lineHeight: 1.6, marginBottom: 10, padding: "8px 12px", background: "var(--fm-card)", borderRadius: 8 }}>
                {book.notes}
                </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 6, background: "rgba(108,92,231,0.1)", color: "#6C5CE7" }}>{genreInfo.emoji} {genreInfo.label}</span>

                {/* Rating */}
                <div style={{ display: "flex", gap: 2 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} onClick={() => setBookRating(book.id, star === book.rating ? 0 : star)} style={{
                        cursor: "pointer", fontSize: 14,
                        color: star <= (book.rating || 0) ? "#fdcb6e" : "var(--fm-border)",
                    }}>★</span>
                    ))}
                </div>
                </div>

                <div style={{ display: "flex", gap: 4 }}>
                {activeTab === "toread" && (
                    <button onClick={() => moveBook(book.id, "reading")} style={{
                    padding: "4px 12px", borderRadius: 8, border: "none", fontSize: 10, fontWeight: 600,
                    background: "rgba(253,203,110,0.15)", color: "#fdcb6e",
                    cursor: "pointer", fontFamily: "Outfit, sans-serif",
                    }}>Start reading</button>
                )}
                {activeTab === "reading" && (
                    <>
                    <button onClick={() => moveBook(book.id, "toread")} style={{
                        padding: "4px 10px", borderRadius: 8, border: "none", fontSize: 10, fontWeight: 600,
                        background: "rgba(108,92,231,0.1)", color: "#6C5CE7",
                        cursor: "pointer", fontFamily: "Outfit, sans-serif",
                    }}>Pause</button>
                    <button onClick={() => moveBook(book.id, "finished")} style={{
                        padding: "4px 12px", borderRadius: 8, border: "none", fontSize: 10, fontWeight: 600,
                        background: "rgba(0,206,201,0.15)", color: "#00CEC9",
                        cursor: "pointer", fontFamily: "Outfit, sans-serif",
                    }}>Finished!</button>
                    </>
                )}
                {activeTab === "finished" && (
                    <button onClick={() => moveBook(book.id, "toread")} style={{
                    padding: "4px 12px", borderRadius: 8, border: "none", fontSize: 10, fontWeight: 600,
                    background: "rgba(108,92,231,0.1)", color: "#6C5CE7",
                    cursor: "pointer", fontFamily: "Outfit, sans-serif",
                    }}>Re-read</button>
                )}
                </div>
            </div>
            </div>
        );
        })}
    </div>
    )}

    {/* Kai Recommendations */}
    {kaiMessage ? (
    <div style={{
        background: "rgba(108,92,231,0.08)", border: "1px solid rgba(108,92,231,0.15)",
        borderRadius: 14, padding: 20, marginTop: 16,
    }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-accent-light)" }}>Kai's book recommendations</span>
        </div>
        <div onClick={() => setKaiMessage("")} style={{ cursor: "pointer", color: "var(--fm-muted)", fontSize: 11 }}>Close</div>
        </div>
        <div style={{ fontSize: 13, color: "var(--fm-text)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{kaiMessage}</div>
    </div>
    ) : (
    <div style={{ textAlign: "center", marginTop: 16 }}>
        <button onClick={getRecommendation} disabled={generatingKai} style={{
        padding: "12px 24px", borderRadius: 12, border: "none",
        background: generatingKai ? "var(--fm-muted)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        color: "#fff", fontSize: 13, fontWeight: 600,
        cursor: generatingKai ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
        display: "inline-flex", alignItems: "center", gap: 8,
        }}>
        {generatingKai ? (
            <>
            <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            Kai is thinking...
            </>
        ) : (
            <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            Get book recommendations from Kai
            </>
        )}
        </button>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
    )}
</div>
);
}