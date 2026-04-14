"use client";

import { useState, useEffect } from "react";

const deckColors = ["#6C5CE7", "#00CEC9", "#fd79a8", "#fdcb6e", "#00b894", "#e17055", "#74b9ff", "#a29bfe", "#ff6b6b", "#55efc4"];

export default function FlashcardsPage() {
const [decks, setDecks] = useState([]);
const [showAddDeck, setShowAddDeck] = useState(false);
const [deckName, setDeckName] = useState("");
const [deckColor, setDeckColor] = useState("#6C5CE7");
const [editingDeckId, setEditingDeckId] = useState(null);
const [activeDeck, setActiveDeck] = useState(null);
const [showAddCard, setShowAddCard] = useState(false);
const [front, setFront] = useState("");
const [back, setBack] = useState("");
const [editingCardId, setEditingCardId] = useState(null);
const [studyMode, setStudyMode] = useState(false);
const [currentCardIndex, setCurrentCardIndex] = useState(0);
const [flipped, setFlipped] = useState(false);
const [score, setScore] = useState({ correct: 0, wrong: 0 });
const [studyCards, setStudyCards] = useState([]);
const [studyComplete, setStudyComplete] = useState(false);
const [kaiMessage, setKaiMessage] = useState("");
const [generatingKai, setGeneratingKai] = useState(false);

useEffect(() => {
const saved = localStorage.getItem("daylyft-flashcards");
if (saved) setDecks(JSON.parse(saved));
}, []);

const saveDecks = (updated) => {
setDecks(updated);
localStorage.setItem("daylyft-flashcards", JSON.stringify(updated));
};

// Deck functions
const addDeck = () => {
if (!deckName.trim()) { alert("Enter a deck name"); return; }
if (editingDeckId) {
    const updated = decks.map((d) => d.id === editingDeckId ? { ...d, name: deckName.trim(), color: deckColor } : d);
    saveDecks(updated);
} else {
    const newDeck = { id: Date.now(), name: deckName.trim(), color: deckColor, cards: [], createdAt: new Date().toISOString() };
    saveDecks([...decks, newDeck]);
}
closeDeckForm();
};

const closeDeckForm = () => {
setShowAddDeck(false);
setEditingDeckId(null);
setDeckName("");
setDeckColor("#6C5CE7");
};

const editDeck = (deck) => {
setEditingDeckId(deck.id);
setDeckName(deck.name);
setDeckColor(deck.color);
setShowAddDeck(true);
};

const deleteDeck = (id) => {
if (!confirm("Delete this deck and all its cards?")) return;
saveDecks(decks.filter((d) => d.id !== id));
if (activeDeck?.id === id) setActiveDeck(null);
};

// Card functions
const addCard = () => {
if (!front.trim()) { alert("Enter the front of the card"); return; }
if (!back.trim()) { alert("Enter the back of the card"); return; }

const updated = decks.map((d) => {
    if (d.id === activeDeck.id) {
    if (editingCardId) {
        return { ...d, cards: d.cards.map((c) => c.id === editingCardId ? { ...c, front: front.trim(), back: back.trim() } : c) };
    } else {
        return { ...d, cards: [...d.cards, { id: Date.now(), front: front.trim(), back: back.trim(), correct: 0, wrong: 0 }] };
    }
    }
    return d;
});
saveDecks(updated);
setActiveDeck(updated.find((d) => d.id === activeDeck.id));
closeCardForm();
};

const closeCardForm = () => {
setShowAddCard(false);
setEditingCardId(null);
setFront("");
setBack("");
};

const editCard = (card) => {
setEditingCardId(card.id);
setFront(card.front);
setBack(card.back);
setShowAddCard(true);
};

const deleteCard = (cardId) => {
if (!confirm("Delete this card?")) return;
const updated = decks.map((d) => {
    if (d.id === activeDeck.id) {
    return { ...d, cards: d.cards.filter((c) => c.id !== cardId) };
    }
    return d;
});
saveDecks(updated);
setActiveDeck(updated.find((d) => d.id === activeDeck.id));
};

// Study functions
const startStudy = () => {
if (!activeDeck || activeDeck.cards.length === 0) return;
const shuffled = [...activeDeck.cards].sort(() => Math.random() - 0.5);
setStudyCards(shuffled);
setCurrentCardIndex(0);
setFlipped(false);
setScore({ correct: 0, wrong: 0 });
setStudyComplete(false);
setStudyMode(true);
};

const markAnswer = (isCorrect) => {
const card = studyCards[currentCardIndex];
const updated = decks.map((d) => {
    if (d.id === activeDeck.id) {
    return {
        ...d,
        cards: d.cards.map((c) => {
        if (c.id === card.id) {
            return { ...c, correct: (c.correct || 0) + (isCorrect ? 1 : 0), wrong: (c.wrong || 0) + (isCorrect ? 0 : 1) };
        }
        return c;
        }),
    };
    }
    return d;
});
saveDecks(updated);

setScore({ correct: score.correct + (isCorrect ? 1 : 0), wrong: score.wrong + (isCorrect ? 0 : 1) });

if (currentCardIndex + 1 >= studyCards.length) {
    setStudyComplete(true);
} else {
    setCurrentCardIndex(currentCardIndex + 1);
    setFlipped(false);
}
};

const generateCards = async () => {
if (!activeDeck) return;
setGeneratingKai(true);
setKaiMessage("");

const existingCards = activeDeck.cards.map((c) => c.front).join(", ");

try {
    const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: `I have a flashcard deck called "${activeDeck.name}". ${existingCards ? `I already have these cards: ${existingCards}.` : ""} Generate 5 new flashcard pairs for this deck. Respond in this EXACT format with nothing else:
Q: [question/front]
A: [answer/back]

Q: [question/front]
A: [answer/back]

Q: [question/front]
A: [answer/back]

Q: [question/front]
A: [answer/back]

Q: [question/front]
A: [answer/back]

Make the questions progressively harder. Focus on key concepts, definitions, and practical applications.`,
        history: [],
    }),
    });
    const data = await response.json();
    if (data.reply) {
    const pairs = data.reply.split("\n\n").filter((p) => p.includes("Q:") && p.includes("A:"));
    const newCards = pairs.map((pair) => {
        const lines = pair.split("\n");
        const frontLine = lines.find((l) => l.startsWith("Q:"));
        const backLine = lines.find((l) => l.startsWith("A:"));
        if (frontLine && backLine) {
        return {
            id: Date.now() + Math.random(),
            front: frontLine.replace("Q: ", "").replace("Q:", "").trim(),
            back: backLine.replace("A: ", "").replace("A:", "").trim(),
            correct: 0,
            wrong: 0,
        };
        }
        return null;
    }).filter(Boolean);

    if (newCards.length > 0) {
        const updated = decks.map((d) => {
        if (d.id === activeDeck.id) {
            return { ...d, cards: [...d.cards, ...newCards] };
        }
        return d;
        });
        saveDecks(updated);
        setActiveDeck(updated.find((d) => d.id === activeDeck.id));
        setKaiMessage(`Added ${newCards.length} cards to your deck!`);
    } else {
        setKaiMessage("Couldn't generate cards. Try again!");
    }
    }
} catch (e) {
    setKaiMessage("Couldn't connect to Kai right now.");
}
setGeneratingKai(false);
};

const totalCards = decks.reduce((sum, d) => sum + d.cards.length, 0);

// Study Mode View
if (studyMode && activeDeck) {
if (studyComplete) {
    const total = score.correct + score.wrong;
    const pct = total > 0 ? Math.round((score.correct / total) * 100) : 0;
    return (
    <div style={{ animation: "fadeIn 0.5s ease", textAlign: "center", paddingTop: 40 }}>
        <div style={{ fontSize: 60, marginBottom: 16 }}>{pct >= 80 ? "🎉" : pct >= 50 ? "👍" : "💪"}</div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-text)", marginBottom: 8 }}>Session complete!</h2>
        <p style={{ fontSize: 15, color: "var(--fm-muted)", marginBottom: 24 }}>{activeDeck.name}</p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 32 }}>
        <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 20, minWidth: 100, textAlign: "center" }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#00CEC9" }}>{score.correct}</div>
            <div style={{ fontSize: 12, color: "var(--fm-muted)" }}>Correct</div>
        </div>
        <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 20, minWidth: 100, textAlign: "center" }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#ff6b6b" }}>{score.wrong}</div>
            <div style={{ fontSize: 12, color: "var(--fm-muted)" }}>Wrong</div>
        </div>
        <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 20, minWidth: 100, textAlign: "center" }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: pct >= 80 ? "#00CEC9" : "#fdcb6e" }}>{pct}%</div>
            <div style={{ fontSize: 12, color: "var(--fm-muted)" }}>Score</div>
        </div>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={startStudy} style={{
            padding: "12px 28px", borderRadius: 12, border: "none",
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
            fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Study again</button>
        <button onClick={() => setStudyMode(false)} style={{
            padding: "12px 28px", borderRadius: 12, border: "1px solid var(--fm-border)",
            background: "transparent", color: "var(--fm-muted)", fontSize: 14,
            cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Back to deck</button>
        </div>
    </div>
    );
}

const card = studyCards[currentCardIndex];
const progress = ((currentCardIndex + 1) / studyCards.length) * 100;

return (
    <div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)" }}>
        {activeDeck.name} — Card {currentCardIndex + 1}/{studyCards.length}
        </div>
        <button onClick={() => setStudyMode(false)} style={{
        padding: "6px 14px", borderRadius: 8, border: "1px solid var(--fm-border)",
        background: "transparent", color: "var(--fm-muted)", fontSize: 12,
        cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Exit</button>
    </div>

    <div style={{ background: "var(--fm-card)", borderRadius: 8, height: 6, marginBottom: 20, overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 8, width: `${progress}%`, background: `linear-gradient(135deg, ${activeDeck.color}, ${activeDeck.color}aa)`, transition: "width 0.3s ease" }} />
    </div>

    <div onClick={() => setFlipped(!flipped)} style={{
        background: flipped ? `linear-gradient(135deg, ${activeDeck.color}12, ${activeDeck.color}06)` : "var(--fm-surface)",
        border: `1px solid ${flipped ? activeDeck.color + "30" : "var(--fm-border)"}`,
        borderRadius: 20, padding: 40, minHeight: 200, cursor: "pointer",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", marginBottom: 20, transition: "all 0.3s ease",
    }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 12, letterSpacing: "0.08em" }}>
        {flipped ? "ANSWER" : "QUESTION"}
        </div>
        <div style={{
        fontSize: flipped ? 18 : 22, fontWeight: flipped ? 500 : 700,
        color: "var(--fm-text)", lineHeight: 1.6, maxWidth: 400,
        }}>
        {flipped ? card.back : card.front}
        </div>
        {!flipped && (
        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginTop: 16 }}>Tap to reveal answer</div>
        )}
    </div>

    {flipped && (
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button onClick={() => markAnswer(false)} style={{
            flex: 1, maxWidth: 180, padding: "14px", borderRadius: 14, border: "none",
            background: "rgba(255,107,107,0.15)", color: "#ff6b6b",
            fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>✗ Wrong</button>
        <button onClick={() => markAnswer(true)} style={{
            flex: 1, maxWidth: 180, padding: "14px", borderRadius: 14, border: "none",
            background: "rgba(0,206,201,0.15)", color: "#00CEC9",
            fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>✓ Correct</button>
        </div>
    )}

    <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 20 }}>
        <span style={{ fontSize: 13, color: "#00CEC9", fontWeight: 600 }}>✓ {score.correct}</span>
        <span style={{ fontSize: 13, color: "#ff6b6b", fontWeight: 600 }}>✗ {score.wrong}</span>
    </div>
    </div>
);
}

// Active Deck View
if (activeDeck) {
const deck = decks.find((d) => d.id === activeDeck.id) || activeDeck;
return (
    <div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div onClick={() => { setActiveDeck(null); setKaiMessage(""); }} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 4 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        </div>
        <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>{deck.name}</h2>
            <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: 0 }}>{deck.cards.length} cards</p>
        </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => { if (showAddCard) closeCardForm(); else setShowAddCard(true); }} style={{
            padding: "8px 16px", borderRadius: 10, border: "none",
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>{showAddCard ? "Cancel" : "+ Add Card"}</button>
        </div>
    </div>

    {/* Deck Actions */}
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {deck.cards.length > 0 && (
        <button onClick={startStudy} style={{
            flex: 1, padding: "12px", borderRadius: 12,
            background: `${deck.color}15`, border: `1px solid ${deck.color}30`,
            color: deck.color, fontSize: 14, fontWeight: 600,
            cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>📖 Study ({deck.cards.length} cards)</button>
        )}
        <button onClick={generateCards} disabled={generatingKai} style={{
        flex: 1, padding: "12px", borderRadius: 12,
        background: generatingKai ? "var(--fm-card)" : "rgba(108,92,231,0.1)",
        border: "1px solid rgba(108,92,231,0.2)",
        color: generatingKai ? "var(--fm-muted)" : "var(--fm-accent-light)",
        fontSize: 13, fontWeight: 600,
        cursor: generatingKai ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
        }}>{generatingKai ? "Generating..." : "✦ Kai generates 5 cards"}</button>
    </div>

    {kaiMessage && (
        <div style={{
        background: "rgba(0,206,201,0.08)", border: "1px solid rgba(0,206,201,0.15)",
        borderRadius: 10, padding: 12, marginBottom: 16, fontSize: 13, color: "#00CEC9", textAlign: "center",
        }}>{kaiMessage}</div>
    )}

    {/* Add Card Form */}
    {showAddCard && (
        <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 20, marginBottom: 16,
        }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>{editingCardId ? "Edit card" : "New card"}</div>
        <textarea value={front} onChange={(e) => setFront(e.target.value)} placeholder="Front (question, term, concept)..." rows={2} style={{
            width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14, fontWeight: 600,
            fontFamily: "Outfit, sans-serif", outline: "none", resize: "none",
            marginBottom: 10, boxSizing: "border-box", lineHeight: 1.6,
        }} />
        <textarea value={back} onChange={(e) => setBack(e.target.value)} placeholder="Back (answer, definition, explanation)..." rows={2} style={{
            width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
            fontFamily: "Outfit, sans-serif", outline: "none", resize: "none",
            marginBottom: 14, boxSizing: "border-box", lineHeight: 1.6,
        }} />
        <button onClick={addCard} style={{
            width: "100%", padding: "12px", borderRadius: 12, border: "none",
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
            fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>{editingCardId ? "Update Card" : "Add Card"}</button>
        </div>
    )}

    {/* Cards List */}
    {deck.cards.length === 0 ? (
        <div style={{
        textAlign: "center", padding: 50,
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16,
        }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🧠</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--fm-text)", marginBottom: 8 }}>No cards yet</h3>
        <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto" }}>
            Add cards manually or let Kai generate them for you!
        </p>
        </div>
    ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {deck.cards.map((card, i) => {
            const total = (card.correct || 0) + (card.wrong || 0);
            const accuracy = total > 0 ? Math.round(((card.correct || 0) / total) * 100) : 0;
            return (
            <div key={card.id} style={{
                background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
                borderRadius: 12, padding: 14,
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 4 }}>{card.front}</div>
                    <div style={{ fontSize: 13, color: "var(--fm-muted)", lineHeight: 1.5 }}>{card.back}</div>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0, marginLeft: 10 }}>
                    {total > 0 && (
                    <span style={{
                        fontSize: 10, padding: "2px 8px", borderRadius: 6,
                        background: accuracy >= 70 ? "rgba(0,206,201,0.1)" : "rgba(255,107,107,0.1)",
                        color: accuracy >= 70 ? "#00CEC9" : "#ff6b6b",
                    }}>{accuracy}%</span>
                    )}
                    <div onClick={() => editCard(card)} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 2 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    </div>
                    <div onClick={() => deleteCard(card.id)} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 2 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </div>
                </div>
                </div>
            </div>
            );
        })}
        </div>
    )}
    </div>
);
}

// Decks List View
return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Flashcards</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Create study decks, test yourself, and let Kai generate cards from any topic</p>
    </div>
    <button onClick={() => { if (showAddDeck) closeDeckForm(); else setShowAddDeck(true); }} style={{
        padding: "8px 18px", borderRadius: 10, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>{showAddDeck ? "Cancel" : "+ New Deck"}</button>
    </div>

    {/* Stats */}
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
    <div style={{ flex: 1, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Decks</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-accent-light)" }}>{decks.length}</div>
    </div>
    <div style={{ flex: 1, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Total cards</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#00CEC9" }}>{totalCards}</div>
    </div>
    </div>

    {/* Add Deck Form */}
    {showAddDeck && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 20, marginBottom: 16,
    }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>{editingDeckId ? "Edit deck" : "Create a deck"}</div>
        <input value={deckName} onChange={(e) => setDeckName(e.target.value)} placeholder="e.g. Spanish Vocabulary, JavaScript, Biology..." style={{
        width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 15, fontWeight: 600,
        fontFamily: "Outfit, sans-serif", outline: "none", marginBottom: 12, boxSizing: "border-box",
        }} />
        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 8 }}>Color</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {deckColors.map((c) => (
            <div key={c} onClick={() => setDeckColor(c)} style={{
            width: 28, height: 28, borderRadius: 7, background: c, cursor: "pointer",
            border: deckColor === c ? "3px solid var(--fm-text)" : "3px solid transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            }}>
            {deckColor === c && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
            </div>
        ))}
        </div>
        <button onClick={addDeck} style={{
        width: "100%", padding: "12px", borderRadius: 12, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>{editingDeckId ? "Update Deck" : "Create Deck"}</button>
    </div>
    )}

    {/* Decks Grid */}
    {decks.length === 0 ? (
    <div style={{
        textAlign: "center", padding: 50,
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16,
    }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🧠</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--fm-text)", marginBottom: 8 }}>No decks yet</h3>
        <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto" }}>
        Create your first flashcard deck and start learning anything faster!
        </p>
    </div>
    ) : (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {decks.map((deck) => (
        <div key={deck.id} onClick={() => setActiveDeck(deck)} style={{
            background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
            borderRadius: 16, padding: 20, cursor: "pointer",
            borderTop: `4px solid ${deck.color}`,
            transition: "all 0.2s ease",
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: "var(--fm-text)" }}>{deck.name}</div>
            <div style={{ display: "flex", gap: 4 }} onClick={(e) => e.stopPropagation()}>
                <div onClick={() => editDeck(deck)} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 2 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                </div>
                <div onClick={() => deleteDeck(deck.id)} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 2 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </div>
            </div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: deck.color, marginBottom: 4 }}>{deck.cards.length}</div>
            <div style={{ fontSize: 12, color: "var(--fm-muted)" }}>cards</div>
        </div>
        ))}
    </div>
    )}
</div>
);
}