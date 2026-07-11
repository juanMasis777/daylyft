"use client";

import { useState, useEffect } from "react";

const occasions = [
{ id: "birthday", label: "Birthday", emoji: "🎂", color: "#fd79a8" },
{ id: "christmas", label: "Christmas", emoji: "🎄", color: "#00b894" },
{ id: "anniversary", label: "Anniversary", emoji: "💕", color: "#ff6b6b" },
{ id: "valentines", label: "Valentine's", emoji: "❤️", color: "#e84393" },
{ id: "mothers", label: "Mother's Day", emoji: "🌷", color: "#34d399" },
{ id: "fathers", label: "Father's Day", emoji: "👔", color: "#10b981" },
{ id: "graduation", label: "Graduation", emoji: "🎓", color: "#fdcb6e" },
{ id: "wedding", label: "Wedding", emoji: "💍", color: "#00CEC9" },
{ id: "babyshower", label: "Baby Shower", emoji: "👶", color: "#74b9ff" },
{ id: "thankyou", label: "Thank You", emoji: "🙏", color: "#55efc4" },
{ id: "justbecause", label: "Just Because", emoji: "🎁", color: "#e17055" },
{ id: "other", label: "Other", emoji: "⭐", color: "#636e72" },
];

const budgetRanges = [
{ id: "under25", label: "Under $25", emoji: "💚" },
{ id: "25to50", label: "$25 - $50", emoji: "💙" },
{ id: "50to100", label: "$50 - $100", emoji: "💜" },
{ id: "100to200", label: "$100 - $200", emoji: "🧡" },
{ id: "over200", label: "$200+", emoji: "❤️" },
];

export default function GiftsPage() {
const [people, setPeople] = useState([]);
const [showAdd, setShowAdd] = useState(false);
const [name, setName] = useState("");
const [occasion, setOccasion] = useState("birthday");
const [date, setDate] = useState("");
const [budget, setBudget] = useState("25to50");
const [giftIdeas, setGiftIdeas] = useState("");
const [interests, setInterests] = useState("");
const [purchased, setPurchased] = useState(false);
const [editingId, setEditingId] = useState(null);
const [kaiMessage, setKaiMessage] = useState("");
const [generatingKai, setGeneratingKai] = useState(false);
const [activeKaiPerson, setActiveKaiPerson] = useState(null);

useEffect(() => {
const saved = localStorage.getItem("daylyft-gifts");
if (saved) setPeople(JSON.parse(saved));
}, []);

const savePeople = (updated) => {
setPeople(updated);
localStorage.setItem("daylyft-gifts", JSON.stringify(updated));
};

const addPerson = () => {
if (!name.trim()) { alert("Enter the person's name"); return; }
if (editingId) {
    const updated = people.map((p) => p.id === editingId ? {
    ...p, name: name.trim(), occasion, date, budget, giftIdeas: giftIdeas.trim(),
    interests: interests.trim(), purchased,
    } : p);
    savePeople(updated);
} else {
    const newPerson = {
    id: Date.now(), name: name.trim(), occasion, date, budget,
    giftIdeas: giftIdeas.trim(), interests: interests.trim(), purchased,
    createdAt: new Date().toISOString(),
    };
    savePeople([...people, newPerson].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date) - new Date(b.date);
    }));
}
closeForm();
};

const closeForm = () => {
setShowAdd(false); setEditingId(null); setName(""); setOccasion("birthday");
setDate(""); setBudget("25to50"); setGiftIdeas(""); setInterests(""); setPurchased(false);
};

const editPerson = (person) => {
setEditingId(person.id); setName(person.name); setOccasion(person.occasion);
setDate(person.date || ""); setBudget(person.budget); setGiftIdeas(person.giftIdeas || "");
setInterests(person.interests || ""); setPurchased(person.purchased || false); setShowAdd(true);
};

const deletePerson = (id) => {
if (!confirm("Delete this gift plan?")) return;
savePeople(people.filter((p) => p.id !== id));
};

const togglePurchased = (id) => {
savePeople(people.map((p) => p.id === id ? { ...p, purchased: !p.purchased } : p));
};

const getKaiSuggestion = async (person) => {
setGeneratingKai(true); setKaiMessage(""); setActiveKaiPerson(person.id);
const budgetLabel = budgetRanges.find((b) => b.id === person.budget)?.label || "any budget";
const occasionLabel = occasions.find((o) => o.id === person.occasion)?.label || "special occasion";
try {
    const response = await fetch("/api/chat", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: `I need gift ideas for ${person.name}. Occasion: ${occasionLabel}. Budget: ${budgetLabel}. Their interests: ${person.interests || "not specified"}. ${person.giftIdeas ? `Ideas I already have: ${person.giftIdeas}.` : ""} Give me: 1) 5 specific gift ideas with approximate prices, 2) One unique/creative gift they probably haven't received before, 3) A thoughtful addition that costs under $10 to make the gift extra special. Keep it practical and specific.`,
        history: [],
    }),
    });
    const data = await response.json();
    if (data.reply) setKaiMessage(data.reply);
} catch (e) { setKaiMessage("Couldn't connect to Kai right now."); }
setGeneratingKai(false);
};

const getOccasionInfo = (id) => occasions.find((o) => o.id === id) || occasions[11];
const getBudgetInfo = (id) => budgetRanges.find((b) => b.id === id) || budgetRanges[1];

const getDaysUntil = (dateStr) => {
if (!dateStr) return null;
const target = new Date(dateStr + "T00:00:00");
const now = new Date(); now.setHours(0, 0, 0, 0);
return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
};

const formatDate = (dateStr) => {
if (!dateStr) return "No date set";
const d = new Date(dateStr + "T12:00:00");
return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

const upcoming = people.filter((p) => !p.purchased).sort((a, b) => {
if (!a.date) return 1; if (!b.date) return -1;
return new Date(a.date) - new Date(b.date);
});
const purchasedList = people.filter((p) => p.purchased);
const urgent = upcoming.filter((p) => { const d = getDaysUntil(p.date); return d !== null && d >= 0 && d <= 14; });

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Gift Planner</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Plan perfect gifts for everyone — never forget a birthday or special occasion again</p>
    </div>
    <button onClick={() => { if (showAdd) closeForm(); else setShowAdd(true); }} style={{
        padding: "8px 18px", borderRadius: 10, border: "none",
        background: "linear-gradient(135deg, #10b981, #34d399)", color: "#fff",
        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>{showAdd ? "Cancel" : "+ Add Gift"}</button>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginBottom: 16 }}>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Upcoming</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-accent-light)" }}>{upcoming.length}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Urgent</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: urgent.length > 0 ? "#ff6b6b" : "#00CEC9" }}>{urgent.length}</div>
        {urgent.length > 0 && <div style={{ fontSize: 10, color: "#ff6b6b" }}>Within 2 weeks!</div>}
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Purchased</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#00CEC9" }}>{purchasedList.length}</div>
    </div>
    </div>

    {showAdd && (
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>{editingId ? "Edit gift plan" : "Plan a gift"}</div>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Who is it for? e.g. Mom, David, Sarah..." style={{
        width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 15, fontWeight: 600,
        fontFamily: "Outfit, sans-serif", outline: "none", marginBottom: 10, boxSizing: "border-box",
        }} />
        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 8 }}>Occasion</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 4, marginBottom: 12 }}>
        {occasions.map((o) => (
            <button key={o.id} onClick={() => setOccasion(o.id)} style={{
            padding: "6px 8px", borderRadius: 8, fontSize: 10, cursor: "pointer",
            border: occasion === o.id ? `1px solid ${o.color}40` : "1px solid var(--fm-border)",
            background: occasion === o.id ? `${o.color}15` : "var(--fm-card)",
            color: occasion === o.id ? o.color : "var(--fm-muted)",
            fontFamily: "Outfit, sans-serif", display: "flex", alignItems: "center", gap: 4,
            }}>{o.emoji} {o.label}</button>
        ))}
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Date</div>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{
            width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13,
            fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box",
            }} />
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Budget</div>
            <select value={budget} onChange={(e) => setBudget(e.target.value)} style={{
            width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13,
            fontFamily: "Outfit, sans-serif", outline: "none",
            }}>
            {budgetRanges.map((b) => (<option key={b.id} value={b.id}>{b.label}</option>))}
            </select>
        </div>
        </div>
        <textarea value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="Their interests, hobbies, things they like..." rows={2} style={{
        width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13,
        fontFamily: "Outfit, sans-serif", outline: "none", resize: "none",
        marginBottom: 10, boxSizing: "border-box", lineHeight: 1.6,
        }} />
        <textarea value={giftIdeas} onChange={(e) => setGiftIdeas(e.target.value)} placeholder="Gift ideas you already have in mind..." rows={2} style={{
        width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13,
        fontFamily: "Outfit, sans-serif", outline: "none", resize: "none",
        marginBottom: 14, boxSizing: "border-box", lineHeight: 1.6,
        }} />
        <button onClick={addPerson} style={{
        width: "100%", padding: "12px", borderRadius: 12, border: "none",
        background: "linear-gradient(135deg, #10b981, #34d399)", color: "#fff",
        fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>{editingId ? "Update" : "Save Gift Plan"}</button>
    </div>
    )}

    {kaiMessage && (
    <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 14, padding: 20, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg, #10b981, #34d399)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-accent-light)" }}>Kai's gift ideas</span>
        </div>
        <div onClick={() => { setKaiMessage(""); setActiveKaiPerson(null); }} style={{ cursor: "pointer", color: "var(--fm-muted)", fontSize: 11 }}>Close</div>
        </div>
        <div style={{ fontSize: 13, color: "var(--fm-text)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{kaiMessage}</div>
    </div>
    )}

    {people.length === 0 ? (
    <div style={{ textAlign: "center", padding: 50, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16 }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🎁</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--fm-text)", marginBottom: 8 }}>No gifts planned yet</h3>
        <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto" }}>
        Start planning gifts for the people you love. Kai can help you find the perfect present!
        </p>
    </div>
    ) : (
    <div>
        {upcoming.length > 0 && (
        <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 10 }}>Upcoming ({upcoming.length})</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {upcoming.map((person) => {
                const occ = getOccasionInfo(person.occasion);
                const bud = getBudgetInfo(person.budget);
                const daysUntil = getDaysUntil(person.date);
                const isUrgent = daysUntil !== null && daysUntil >= 0 && daysUntil <= 14;
                const isPast = daysUntil !== null && daysUntil < 0;
                return (
                <div key={person.id} style={{
                    background: "var(--fm-surface)",
                    border: isUrgent ? "1px solid rgba(255,107,107,0.25)" : "1px solid var(--fm-border)",
                    borderRadius: 14, padding: 18, borderLeft: `4px solid ${occ.color}`,
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                        <div style={{
                        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                        background: `${occ.color}15`, border: `1px solid ${occ.color}25`,
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                        }}>{occ.emoji}</div>
                        <div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--fm-text)" }}>{person.name}</div>
                        <div style={{ fontSize: 12, color: "var(--fm-muted)" }}>
                            {occ.label} · {bud.label}{person.date && ` · ${formatDate(person.date)}`}
                        </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                        {daysUntil !== null && daysUntil >= 0 && (
                        <span style={{
                            fontSize: 10, padding: "3px 10px", borderRadius: 8,
                            background: isUrgent ? "rgba(255,107,107,0.1)" : "rgba(16,185,129,0.1)",
                            color: isUrgent ? "#ff6b6b" : "var(--fm-accent-light)", fontWeight: 600,
                        }}>{daysUntil === 0 ? "Today!" : `${daysUntil} days`}</span>
                        )}
                        {isPast && (
                        <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 8, background: "rgba(255,107,107,0.1)", color: "#ff6b6b", fontWeight: 600 }}>Passed</span>
                        )}
                    </div>
                    </div>
                    {person.interests && (
                    <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>
                        <span style={{ fontWeight: 600 }}>Interests:</span> {person.interests}
                    </div>
                    )}
                    {person.giftIdeas && (
                    <div style={{
                        fontSize: 12, color: "var(--fm-text)", padding: "8px 12px",
                        background: "var(--fm-card)", borderRadius: 8, marginBottom: 10, lineHeight: 1.6,
                    }}>
                        <span style={{ fontWeight: 600, color: "var(--fm-muted)" }}>Ideas:</span> {person.giftIdeas}
                    </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => togglePurchased(person.id)} style={{
                        padding: "5px 14px", borderRadius: 8, border: "none", fontSize: 11, fontWeight: 600,
                        background: "rgba(0,206,201,0.15)", color: "#00CEC9",
                        cursor: "pointer", fontFamily: "Outfit, sans-serif",
                        }}>Mark purchased</button>
                        <button onClick={() => getKaiSuggestion(person)} disabled={generatingKai} style={{
                        padding: "5px 12px", borderRadius: 8, border: "none", fontSize: 11, fontWeight: 600,
                        background: "rgba(16,185,129,0.1)", color: "var(--fm-accent-light)",
                        cursor: generatingKai ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
                        }}>{generatingKai && activeKaiPerson === person.id ? "..." : "✦ Kai ideas"}</button>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                        <div onClick={() => editPerson(person)} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 4 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                        </div>
                        <div onClick={() => deletePerson(person.id)} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 4 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </div>
                    </div>
                    </div>
                </div>
                );
            })}
            </div>
        </div>
        )}

        {purchasedList.length > 0 && (
        <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#00CEC9", marginBottom: 10 }}>✅ Purchased ({purchasedList.length})</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {purchasedList.map((person) => {
                const occ = getOccasionInfo(person.occasion);
                return (
                <div key={person.id} style={{
                    background: "rgba(0,206,201,0.05)", border: "1px solid rgba(0,206,201,0.15)",
                    borderRadius: 12, padding: 14, display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{occ.emoji}</span>
                    <div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--fm-text)", textDecoration: "line-through" }}>{person.name}</div>
                        <div style={{ fontSize: 11, color: "var(--fm-muted)" }}>{occ.label} · {formatDate(person.date)}</div>
                    </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                    <div onClick={() => togglePurchased(person.id)} style={{ fontSize: 11, color: "var(--fm-muted)", cursor: "pointer" }}>Undo</div>
                    <div onClick={() => deletePerson(person.id)} style={{ fontSize: 11, color: "var(--fm-danger)", cursor: "pointer" }}>Delete</div>
                    </div>
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