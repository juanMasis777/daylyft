"use client";

import { useState, useEffect } from "react";

const categories = [
{ id: "productivity", name: "Productivity", emoji: "⚡", color: "#6C5CE7" },
{ id: "mindfulness", name: "Mindfulness", emoji: "🧘", color: "#00CEC9" },
{ id: "growth", name: "Growth", emoji: "🌱", color: "#00b894" },
{ id: "motivation", name: "Motivation", emoji: "🔥", color: "#e17055" },
{ id: "leadership", name: "Leadership", emoji: "👑", color: "#fdcb6e" },
{ id: "balance", name: "Balance", emoji: "☯", color: "#a29bfe" },
{ id: "creativity", name: "Creativity", emoji: "🎨", color: "#fd79a8" },
{ id: "resilience", name: "Resilience", emoji: "💪", color: "#74b9ff" },
];

const fallbackQuotes = [
{ text: "The secret of getting ahead is getting started.", category: "productivity" },
{ text: "Almost everything will work again if you unplug it for a few minutes, including you.", category: "mindfulness" },
{ text: "The only way to do great work is to love what you do.", category: "motivation" },
{ text: "Growth is never by mere chance; it is the result of forces working together.", category: "growth" },
{ text: "Balance is not something you find, it's something you create.", category: "balance" },
{ text: "Creativity takes courage.", category: "creativity" },
{ text: "A leader is one who knows the way, goes the way, and shows the way.", category: "leadership" },
{ text: "Fall seven times, stand up eight.", category: "resilience" },
];

export default function WisdomPage() {
const [quote, setQuote] = useState(null);
const [loading, setLoading] = useState(false);
const [selectedCategory, setSelectedCategory] = useState("all");
const [savedQuotes, setSavedQuotes] = useState([]);
const [showSaved, setShowSaved] = useState(false);

useEffect(() => {
const saved = localStorage.getItem("daylyft-saved-quotes");
if (saved) setSavedQuotes(JSON.parse(saved));
loadDailyQuote();
}, []);

const loadDailyQuote = () => {
const today = new Date().toDateString();
const savedDaily = localStorage.getItem("daylyft-daily-quote");
if (savedDaily) {
    const parsed = JSON.parse(savedDaily);
    if (parsed.date === today) {
    setQuote(parsed);
    return;
    }
}
const random = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
const cat = categories.find(c => c.id === random.category) || categories[0];
const dailyQuote = { text: random.text, category: random.category, emoji: cat.emoji, color: cat.color, categoryName: cat.name, date: today, source: "daily" };
setQuote(dailyQuote);
localStorage.setItem("daylyft-daily-quote", JSON.stringify(dailyQuote));
};

const generateQuote = async (category) => {
setLoading(true);
const catName = category === "all" ? "any topic related to productivity, wellness, or personal growth" : category;

try {
    const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: `Give me ONE powerful, original motivational quote about ${catName}. The quote should be concise (under 20 words), impactful, and feel fresh — not a famous quote everyone knows. Just give me the quote text, nothing else. No quotation marks, no author, no explanation.`,
        history: [],
    }),
    });
    const data = await response.json();
    if (data.reply) {
    const cat = category === "all"
        ? categories[Math.floor(Math.random() * categories.length)]
        : categories.find(c => c.id === category) || categories[0];
    const newQuote = {
        text: data.reply.replace(/"/g, "").trim(),
        category: cat.id,
        emoji: cat.emoji,
        color: cat.color,
        categoryName: cat.name,
        date: new Date().toDateString(),
        source: "kai",
    };
    setQuote(newQuote);
    }
} catch (e) {
    const random = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    const cat = categories.find(c => c.id === random.category) || categories[0];
    setQuote({ text: random.text, category: random.category, emoji: cat.emoji, color: cat.color, categoryName: cat.name, date: new Date().toDateString(), source: "fallback" });
}
setLoading(false);
};

const saveQuote = () => {
if (!quote) return;
const exists = savedQuotes.some(q => q.text === quote.text);
if (exists) return;
const updated = [quote, ...savedQuotes];
setSavedQuotes(updated);
localStorage.setItem("daylyft-saved-quotes", JSON.stringify(updated));
};

const removeSavedQuote = (index) => {
const updated = savedQuotes.filter((_, i) => i !== index);
setSavedQuotes(updated);
localStorage.setItem("daylyft-saved-quotes", JSON.stringify(updated));
};

const isSaved = quote && savedQuotes.some(q => q.text === quote.text);

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Kai's Wisdom</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Daily inspiration powered by AI</p>
    </div>
    <button onClick={() => setShowSaved(!showSaved)} style={{
        padding: "8px 16px", borderRadius: 10,
        border: "1px solid var(--fm-border)", background: showSaved ? "rgba(108,92,231,0.1)" : "var(--fm-surface)",
        color: showSaved ? "var(--fm-accent-light)" : "var(--fm-muted)",
        fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>
        {showSaved ? "Back to wisdom" : `Saved (${savedQuotes.length})`}
    </button>
    </div>

    {showSaved ? (
    <div>
        {savedQuotes.length === 0 ? (
        <div style={{
            textAlign: "center", padding: 50,
            background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
            borderRadius: 16,
        }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>📌</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "var(--fm-text)", marginBottom: 4 }}>No saved quotes yet</div>
            <div style={{ fontSize: 13, color: "var(--fm-muted)" }}>Save quotes you love and revisit them here</div>
        </div>
        ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {savedQuotes.map((q, i) => {
            const cat = categories.find(c => c.id === q.category) || categories[0];
            return (
                <div key={i} style={{
                background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
                borderRadius: 14, padding: 18, borderLeft: `3px solid ${cat.color}`,
                }}>
                <div style={{ fontSize: 15, color: "var(--fm-text)", lineHeight: 1.7, marginBottom: 10, fontStyle: "italic" }}>
                    "{q.text}"
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 14 }}>{cat.emoji}</span>
                    <span style={{ fontSize: 11, color: cat.color }}>{cat.name}</span>
                    </div>
                    <div onClick={() => removeSavedQuote(i)} style={{
                    fontSize: 11, color: "var(--fm-muted)", cursor: "pointer",
                    }}>Remove</div>
                </div>
                </div>
            );
            })}
        </div>
        )}
    </div>
    ) : (
    <div>
        {/* Main Quote Card */}
        {quote && (
        <div style={{
            background: `linear-gradient(135deg, ${quote.color}12, ${quote.color}06)`,
            border: `1px solid ${quote.color}25`,
            borderRadius: 20, padding: 32, marginBottom: 20, textAlign: "center",
            position: "relative",
        }}>
            <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.3 }}>"</div>
            <div style={{
            fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 600, color: "var(--fm-text)",
            lineHeight: 1.6, maxWidth: 500, margin: "0 auto 20px", fontStyle: "italic",
            }}>
            {quote.text}
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 18 }}>{quote.emoji}</span>
            <span style={{ fontSize: 13, color: quote.color, fontWeight: 500 }}>{quote.categoryName}</span>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            <button onClick={saveQuote} disabled={isSaved} style={{
                padding: "8px 18px", borderRadius: 10, fontSize: 12, fontWeight: 500,
                border: isSaved ? `1px solid rgba(0,206,201,0.2)` : "1px solid var(--fm-border)",
                background: isSaved ? "rgba(0,206,201,0.1)" : "var(--fm-surface)",
                color: isSaved ? "#00CEC9" : "var(--fm-text)",
                cursor: isSaved ? "default" : "pointer", fontFamily: "Outfit, sans-serif",
            }}>{isSaved ? "✓ Saved" : "📌 Save"}</button>
            </div>
            <div style={{
            fontSize: 10, color: "var(--fm-muted)", marginTop: 12,
            }}>
            {quote.source === "kai" ? "Generated by Kai AI" : "Daily wisdom"} · {quote.date}
            </div>
        </div>
        )}

        {/* Category Filter */}
        <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 18, marginBottom: 16,
        }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>Generate wisdom by topic</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 8 }}>
            {categories.map((cat) => (
            <button key={cat.id} onClick={() => { setSelectedCategory(cat.id); generateQuote(cat.id); }} disabled={loading} style={{
                padding: "10px 8px", borderRadius: 10, cursor: loading ? "not-allowed" : "pointer",
                background: selectedCategory === cat.id ? `${cat.color}15` : "var(--fm-card)",
                border: selectedCategory === cat.id ? `1px solid ${cat.color}30` : "1px solid var(--fm-border)",
                fontFamily: "Outfit, sans-serif", textAlign: "center",
            }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{cat.emoji}</div>
                <div style={{ fontSize: 11, color: selectedCategory === cat.id ? cat.color : "var(--fm-muted)", fontWeight: 500 }}>{cat.name}</div>
            </button>
            ))}
        </div>
        </div>

        {/* Generate Random */}
        <div style={{ textAlign: "center" }}>
        <button onClick={() => generateQuote("all")} disabled={loading} style={{
            padding: "14px 28px", borderRadius: 14, border: "none",
            background: loading ? "var(--fm-muted)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            color: "#fff", fontSize: 14, fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
            display: "inline-flex", alignItems: "center", gap: 8,
        }}>
            {loading ? (
            <>
                <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                Kai is thinking...
            </>
            ) : (
            <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
                New random wisdom
            </>
            )}
        </button>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    </div>
    )}
</div>
);
}