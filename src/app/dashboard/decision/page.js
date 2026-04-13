"use client";

import { useState, useEffect } from "react";

export default function DecisionPage() {
const [question, setQuestion] = useState("");
const [options, setOptions] = useState(["", ""]);
const [context, setContext] = useState("");
const [result, setResult] = useState(null);
const [loading, setLoading] = useState(false);
const [history, setHistory] = useState([]);
const [showHistory, setShowHistory] = useState(false);

useEffect(() => {
const saved = localStorage.getItem("daylyft-decisions");
if (saved) setHistory(JSON.parse(saved));
}, []);

const addOption = () => {
if (options.length >= 6) return;
setOptions([...options, ""]);
};

const removeOption = (index) => {
if (options.length <= 2) return;
setOptions(options.filter((_, i) => i !== index));
};

const updateOption = (index, value) => {
const updated = [...options];
updated[index] = value;
setOptions(updated);
};

const analyzeDecision = async () => {
const filledOptions = options.filter((o) => o.trim());
if (!question.trim()) { alert("Please enter your question or decision"); return; }
if (filledOptions.length < 2) { alert("Please enter at least 2 options"); return; }

setLoading(true);
setResult(null);

const optionsList = filledOptions.map((o, i) => `Option ${i + 1}: "${o}"`).join(", ");

try {
    const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: `I need help making a decision. My question: "${question.trim()}". My options: ${optionsList}. ${context.trim() ? `Additional context: ${context.trim()}.` : ""} 

Please analyze this decision and respond in this EXACT format:

RECOMMENDATION: [Write the option you recommend]

ANALYSIS:
[For each option, write the option name, then list 2-3 pros and 2-3 cons. Keep each point to one short sentence.]

REASONING:
[In 2-3 sentences, explain why you recommend that option over the others. Be specific and practical.]

CONFIDENCE: [Write a percentage from 50-95% indicating how confident you are in this recommendation]

FINAL THOUGHT:
[One sentence of encouragement or a key insight to help them feel good about deciding.]`,
        history: [],
    }),
    });
    const data = await response.json();
    if (data.reply) {
    const newResult = {
        question: question.trim(),
        options: filledOptions,
        context: context.trim(),
        analysis: data.reply,
        date: new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }),
        id: Date.now(),
    };
    setResult(newResult);

    const updatedHistory = [newResult, ...history].slice(0, 20);
    setHistory(updatedHistory);
    localStorage.setItem("daylyft-decisions", JSON.stringify(updatedHistory));
    }
} catch (e) {
    alert("Couldn't connect to Kai right now. Try again in a moment!");
}
setLoading(false);
};

const resetForm = () => {
setQuestion("");
setOptions(["", ""]);
setContext("");
setResult(null);
};

const loadDecision = (decision) => {
setResult(decision);
setShowHistory(false);
};

const deleteDecision = (id) => {
if (!confirm("Delete this decision?")) return;
const updated = history.filter((h) => h.id !== id);
setHistory(updated);
localStorage.setItem("daylyft-decisions", JSON.stringify(updated));
};

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Decision Maker</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Stuck between options? Kai analyzes pros and cons to help you decide with confidence</p>
    </div>
    <button onClick={() => setShowHistory(!showHistory)} style={{
        padding: "8px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: showHistory ? "rgba(108,92,231,0.1)" : "var(--fm-surface)",
        color: showHistory ? "var(--fm-accent-light)" : "var(--fm-muted)",
        fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>{showHistory ? "New decision" : `History (${history.length})`}</button>
    </div>

    {/* Stats */}
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
    <div style={{ flex: 1, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Decisions made</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-accent-light)" }}>{history.length}</div>
    </div>
    <div style={{ flex: 1, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Time saved</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#00CEC9" }}>{history.length * 15}m</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>~15 min each</div>
    </div>
    <div style={{ flex: 1, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Powered by</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#6C5CE7" }}>Kai AI</div>
    </div>
    </div>

    {showHistory ? (
    <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>Past decisions</div>
        {history.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16 }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🎯</div>
            <div style={{ fontSize: 14, color: "var(--fm-muted)" }}>No decisions yet. Ask Kai to help you decide!</div>
        </div>
        ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {history.map((h) => (
            <div key={h.id} style={{
                background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
                borderRadius: 12, padding: 14, cursor: "pointer",
            }} onClick={() => loadDecision(h)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 2 }}>{h.question}</div>
                    <div style={{ fontSize: 11, color: "var(--fm-muted)" }}>{h.date} · {h.options.length} options</div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "var(--fm-accent-light)" }}>View</span>
                    <div onClick={(e) => { e.stopPropagation(); deleteDecision(h.id); }} style={{ color: "var(--fm-muted)", padding: 4 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>
        )}
    </div>
    ) : result ? (
    <div>
        {/* Result Card */}
        <div style={{
        background: "linear-gradient(135deg, rgba(108,92,231,0.08), rgba(0,206,201,0.05))",
        border: "1px solid rgba(108,92,231,0.2)",
        borderRadius: 16, padding: 24, marginBottom: 16,
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            </div>
            <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--fm-text)" }}>Kai's Analysis</div>
            <div style={{ fontSize: 12, color: "var(--fm-muted)" }}>{result.question}</div>
            </div>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
            {result.options.map((opt, i) => (
            <span key={i} style={{
                padding: "4px 12px", borderRadius: 10, fontSize: 12, fontWeight: 500,
                background: "rgba(108,92,231,0.1)", color: "var(--fm-accent-light)",
                border: "1px solid rgba(108,92,231,0.2)",
            }}>{opt}</span>
            ))}
        </div>

        <div style={{
            fontSize: 14, color: "var(--fm-text)", lineHeight: 1.8, whiteSpace: "pre-line",
            background: "var(--fm-surface)", borderRadius: 12, padding: 18,
            border: "1px solid var(--fm-border)",
        }}>
            {result.analysis}
        </div>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={resetForm} style={{
            padding: "12px 28px", borderRadius: 12, border: "none",
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
            fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>New decision</button>
        </div>
    </div>
    ) : (
    <div>
        {/* Decision Form */}
        <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 16, padding: 24, marginBottom: 16,
        }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: "var(--fm-text)", marginBottom: 16 }}>What are you trying to decide?</div>

        <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="e.g. Should I change jobs? Which laptop should I buy? Where should I move?" style={{
            width: "100%", padding: "14px 16px", borderRadius: 12, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 15,
            fontFamily: "Outfit, sans-serif", outline: "none", marginBottom: 20, boxSizing: "border-box",
        }} />

        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>Your options</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
            {options.map((opt, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                background: opt.trim() ? "rgba(108,92,231,0.15)" : "var(--fm-card)",
                border: opt.trim() ? "1px solid rgba(108,92,231,0.3)" : "1px solid var(--fm-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, color: opt.trim() ? "#6C5CE7" : "var(--fm-muted)",
                }}>{String.fromCharCode(65 + i)}</div>
                <input value={opt} onChange={(e) => updateOption(i, e.target.value)} placeholder={`Option ${String.fromCharCode(65 + i)}...`} style={{
                flex: 1, padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
                background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
                fontFamily: "Outfit, sans-serif", outline: "none",
                }} />
                {options.length > 2 && (
                <div onClick={() => removeOption(i)} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 4 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </div>
                )}
            </div>
            ))}
        </div>

        {options.length < 6 && (
            <button onClick={addOption} style={{
            padding: "8px 16px", borderRadius: 8, border: "1px solid var(--fm-border)",
            background: "transparent", color: "var(--fm-muted)", fontSize: 12,
            cursor: "pointer", fontFamily: "Outfit, sans-serif", marginBottom: 16,
            }}>+ Add another option</button>
        )}

        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 8 }}>Additional context (optional)</div>
        <textarea value={context} onChange={(e) => setContext(e.target.value)}
            placeholder="e.g. I value work-life balance, my budget is $2000, I'm planning long-term..."
            rows={3} style={{
            width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13,
            fontFamily: "Outfit, sans-serif", outline: "none", resize: "none",
            marginBottom: 20, boxSizing: "border-box", lineHeight: 1.6,
        }} />

        <button onClick={analyzeDecision} disabled={loading} style={{
            width: "100%", padding: "14px", borderRadius: 14, border: "none",
            background: loading ? "var(--fm-muted)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            color: "#fff", fontSize: 15, fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        }}>
            {loading ? (
            <>
                <span style={{ display: "inline-block", width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                Kai is analyzing your options...
            </>
            ) : (
            <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
                Analyze with Kai
            </>
            )}
        </button>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>

        {/* Examples */}
        <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 18,
        }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>Example decisions Kai can help with</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
            { emoji: "💼", text: "Should I accept this job offer or stay at my current company?" },
            { emoji: "🏠", text: "Should I rent or buy a home?" },
            { emoji: "💻", text: "MacBook Pro vs Dell XPS vs ThinkPad for my workflow?" },
            { emoji: "📚", text: "Should I go back to school or keep self-learning?" },
            { emoji: "✈️", text: "Japan vs Italy vs Portugal for my next vacation?" },
            ].map((ex, i) => (
            <div key={i} onClick={() => { setQuestion(ex.text); }} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                background: "var(--fm-card)", borderRadius: 10, cursor: "pointer",
            }}>
                <span style={{ fontSize: 18 }}>{ex.emoji}</span>
                <span style={{ fontSize: 13, color: "var(--fm-muted)", lineHeight: 1.5 }}>{ex.text}</span>
            </div>
            ))}
        </div>
        </div>
    </div>
    )}
</div>
);
}