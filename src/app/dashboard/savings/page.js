"use client";

import { useState, useEffect } from "react";

const goalIcons = [
{ id: "vacation", emoji: "✈️", label: "Vacation" },
{ id: "car", emoji: "🚗", label: "Car" },
{ id: "house", emoji: "🏠", label: "House" },
{ id: "laptop", emoji: "💻", label: "Tech" },
{ id: "emergency", emoji: "🛡", label: "Emergency" },
{ id: "education", emoji: "🎓", label: "Education" },
{ id: "wedding", emoji: "💍", label: "Wedding" },
{ id: "business", emoji: "💼", label: "Business" },
{ id: "gift", emoji: "🎁", label: "Gift" },
{ id: "other", emoji: "🐷", label: "Other" },
];

const goalColors = ["#6C5CE7", "#00CEC9", "#fd79a8", "#fdcb6e", "#00b894", "#e17055", "#74b9ff", "#a29bfe", "#ff6b6b", "#55efc4"];

export default function SavingsPage() {
const [goals, setGoals] = useState([]);
const [showAdd, setShowAdd] = useState(false);
const [title, setTitle] = useState("");
const [target, setTarget] = useState("");
const [saved, setSaved] = useState("");
const [deadline, setDeadline] = useState("");
const [icon, setIcon] = useState("vacation");
const [color, setColor] = useState("#6C5CE7");
const [editingId, setEditingId] = useState(null);
const [showDeposit, setShowDeposit] = useState(null);
const [depositAmount, setDepositAmount] = useState("");
const [kaiMessage, setKaiMessage] = useState("");
const [generatingKai, setGeneratingKai] = useState(false);

useEffect(() => {
const data = localStorage.getItem("daylyft-savings");
if (data) setGoals(JSON.parse(data));
}, []);

const saveGoals = (updated) => {
setGoals(updated);
localStorage.setItem("daylyft-savings", JSON.stringify(updated));
};

const addGoal = () => {
if (!title.trim()) { alert("Give your goal a name"); return; }
if (!target || parseFloat(target) <= 0) { alert("Enter a target amount"); return; }

if (editingId) {
    const updated = goals.map((g) => g.id === editingId ? {
    ...g, title: title.trim(), target: parseFloat(target), saved: parseFloat(saved) || 0,
    deadline, icon, color,
    } : g);
    saveGoals(updated);
} else {
    const newGoal = {
    id: Date.now(),
    title: title.trim(),
    target: parseFloat(target),
    saved: parseFloat(saved) || 0,
    deadline,
    icon,
    color,
    deposits: [],
    createdAt: new Date().toISOString(),
    };
    saveGoals([newGoal, ...goals]);
}
closeForm();
};

const closeForm = () => {
setShowAdd(false);
setEditingId(null);
setTitle("");
setTarget("");
setSaved("");
setDeadline("");
setIcon("vacation");
setColor("#6C5CE7");
};

const editGoal = (goal) => {
setEditingId(goal.id);
setTitle(goal.title);
setTarget(goal.target.toString());
setSaved(goal.saved.toString());
setDeadline(goal.deadline || "");
setIcon(goal.icon);
setColor(goal.color);
setShowAdd(true);
};

const deleteGoal = (id) => {
if (!confirm("Delete this savings goal?")) return;
saveGoals(goals.filter((g) => g.id !== id));
};

const addDeposit = (goalId) => {
if (!depositAmount || parseFloat(depositAmount) <= 0) return;
const amount = parseFloat(depositAmount);
const updated = goals.map((g) => {
    if (g.id === goalId) {
    const newDeposits = [...(g.deposits || []), {
        amount,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        id: Date.now(),
    }];
    return { ...g, saved: g.saved + amount, deposits: newDeposits };
    }
    return g;
});
saveGoals(updated);
setDepositAmount("");
setShowDeposit(null);
};

const withdrawAmount = (goalId) => {
const amountStr = prompt("How much do you want to withdraw?");
if (!amountStr) return;
const amount = parseFloat(amountStr);
if (isNaN(amount) || amount <= 0) return;

const updated = goals.map((g) => {
    if (g.id === goalId) {
    const newSaved = Math.max(0, g.saved - amount);
    const newDeposits = [...(g.deposits || []), {
        amount: -amount,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        id: Date.now(),
    }];
    return { ...g, saved: newSaved, deposits: newDeposits };
    }
    return g;
});
saveGoals(updated);
};

const getKaiAdvice = async () => {
if (goals.length === 0) return;
setGeneratingKai(true);

const goalsList = goals.map((g) => {
    const pct = Math.round((g.saved / g.target) * 100);
    const remaining = g.target - g.saved;
    return `"${g.title}": $${g.saved.toFixed(0)} saved of $${g.target.toFixed(0)} (${pct}%), $${remaining.toFixed(0)} remaining${g.deadline ? `, deadline: ${g.deadline}` : ""}`;
}).join(". ");

try {
    const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: `Analyze my savings goals and give me practical advice. My goals: ${goalsList}. Total saved across all goals: $${goals.reduce((sum, g) => sum + g.saved, 0).toFixed(0)}. Give me: 1) Which goal I should prioritize and why, 2) A specific weekly savings plan to hit my closest deadline, 3) One creative way to save more money this month. Keep it concise, practical, and motivating.`,
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

const getIconInfo = (id) => goalIcons.find((i) => i.id === id) || goalIcons[9];

const totalSaved = goals.reduce((sum, g) => sum + g.saved, 0);
const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);
const completedGoals = goals.filter((g) => g.saved >= g.target).length;

const getDaysRemaining = (deadline) => {
if (!deadline) return null;
const diff = new Date(deadline) - new Date();
return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Savings Goals</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Set savings targets, track deposits, and watch your money grow toward your dreams</p>
    </div>
    <button onClick={() => { if (showAdd) closeForm(); else setShowAdd(true); }} style={{
        padding: "8px 18px", borderRadius: 10, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>{showAdd ? "Cancel" : "+ New Goal"}</button>
    </div>

    {/* Stats */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginBottom: 16 }}>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Total saved</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#00CEC9" }}>${totalSaved.toLocaleString()}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Total target</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#6C5CE7" }}>${totalTarget.toLocaleString()}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Completed</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: completedGoals > 0 ? "#00CEC9" : "var(--fm-muted)" }}>{completedGoals}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Remaining</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-warning)" }}>${Math.max(0, totalTarget - totalSaved).toLocaleString()}</div>
    </div>
    </div>

    {/* Add Form */}
    {showAdd && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 20, marginBottom: 16,
    }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>{editingId ? "Edit goal" : "Create savings goal"}</div>

        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Hawaii Vacation, New Car, Emergency Fund..." style={{
        width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 15, fontWeight: 600,
        fontFamily: "Outfit, sans-serif", outline: "none", marginBottom: 10, boxSizing: "border-box",
        }} />

        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Target amount ($)</div>
            <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="5000" min="1" style={{
            width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
            fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box",
            }} />
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Already saved ($)</div>
            <input type="number" value={saved} onChange={(e) => setSaved(e.target.value)} placeholder="0" min="0" style={{
            width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
            fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box",
            }} />
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Deadline (optional)</div>
            <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} style={{
            width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13,
            fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box",
            }} />
        </div>
        </div>

        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 8 }}>Icon</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {goalIcons.map((gi) => (
            <button key={gi.id} onClick={() => setIcon(gi.id)} style={{
            padding: "6px 10px", borderRadius: 8, fontSize: 11, cursor: "pointer",
            border: icon === gi.id ? "1px solid rgba(108,92,231,0.4)" : "1px solid var(--fm-border)",
            background: icon === gi.id ? "rgba(108,92,231,0.1)" : "var(--fm-card)",
            color: icon === gi.id ? "#6C5CE7" : "var(--fm-muted)",
            fontFamily: "Outfit, sans-serif",
            }}>{gi.emoji} {gi.label}</button>
        ))}
        </div>

        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 8 }}>Color</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {goalColors.map((c) => (
            <div key={c} onClick={() => setColor(c)} style={{
            width: 28, height: 28, borderRadius: 7, background: c, cursor: "pointer",
            border: color === c ? "3px solid var(--fm-text)" : "3px solid transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            }}>
            {color === c && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
            </div>
        ))}
        </div>

        <button onClick={addGoal} style={{
        width: "100%", padding: "12px", borderRadius: 12, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>{editingId ? "Update Goal" : "Create Goal"}</button>
    </div>
    )}

    {/* Goals List */}
    {goals.length === 0 ? (
    <div style={{
        textAlign: "center", padding: 50,
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16,
    }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🐷</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--fm-text)", marginBottom: 8 }}>No savings goals yet</h3>
        <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto" }}>
        Start saving for something exciting! A vacation, a new laptop, or your emergency fund.
        </p>
    </div>
    ) : (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {goals.map((goal) => {
        const iconInfo = getIconInfo(goal.icon);
        const pct = goal.target > 0 ? Math.min(Math.round((goal.saved / goal.target) * 100), 100) : 0;
        const remaining = Math.max(0, goal.target - goal.saved);
        const isComplete = goal.saved >= goal.target;
        const daysLeft = getDaysRemaining(goal.deadline);
        const weeklyNeeded = daysLeft && daysLeft > 0 && remaining > 0 ? (remaining / (daysLeft / 7)).toFixed(0) : null;

        return (
            <div key={goal.id} style={{
            background: isComplete ? "linear-gradient(135deg, rgba(0,206,201,0.08), rgba(85,239,196,0.05))" : "var(--fm-surface)",
            border: isComplete ? "1px solid rgba(0,206,201,0.25)" : "1px solid var(--fm-border)",
            borderRadius: 16, padding: 20, borderLeft: `4px solid ${goal.color}`,
            }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: `${goal.color}15`, border: `1px solid ${goal.color}25`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                }}>{iconInfo.emoji}</div>
                <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: isComplete ? "#00CEC9" : "var(--fm-text)" }}>
                    {goal.title} {isComplete && "🎉"}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--fm-muted)" }}>
                    ${goal.saved.toLocaleString()} of ${goal.target.toLocaleString()}
                    {daysLeft !== null && !isComplete && <span> · {daysLeft} days left</span>}
                    </div>
                </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <div onClick={() => editGoal(goal)} style={{ cursor: "pointer", color: "var(--fm-muted)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                </div>
                <div onClick={() => deleteGoal(goal.id)} style={{ cursor: "pointer", color: "var(--fm-muted)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "var(--fm-muted)" }}>${remaining.toLocaleString()} remaining</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: goal.color }}>{pct}%</span>
                </div>
                <div style={{ background: "var(--fm-card)", borderRadius: 6, height: 12, overflow: "hidden" }}>
                <div style={{
                    height: "100%", borderRadius: 6, width: `${pct}%`,
                    background: isComplete ? "linear-gradient(135deg, #00CEC9, #55efc4)" : `linear-gradient(135deg, ${goal.color}, ${goal.color}aa)`,
                    transition: "width 0.5s ease",
                }} />
                </div>
            </div>

            {weeklyNeeded && !isComplete && (
                <div style={{
                padding: "8px 12px", borderRadius: 8, marginBottom: 12,
                background: "rgba(253,203,110,0.1)", border: "1px solid rgba(253,203,110,0.2)",
                fontSize: 12, color: "#fdcb6e",
                }}>
                Save ~${weeklyNeeded}/week to reach your goal by the deadline
                </div>
            )}

            {/* Deposit/Withdraw Buttons */}
            {!isComplete && (
                <div>
                {showDeposit === goal.id ? (
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input type="number" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} placeholder="Amount" min="1" style={{
                        flex: 1, padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
                        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
                        fontFamily: "Outfit, sans-serif", outline: "none",
                    }} />
                    <button onClick={() => addDeposit(goal.id)} style={{
                        padding: "10px 18px", borderRadius: 10, border: "none",
                        background: `linear-gradient(135deg, ${goal.color}, ${goal.color}aa)`,
                        color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer",
                        fontFamily: "Outfit, sans-serif",
                    }}>Add</button>
                    <button onClick={() => { setShowDeposit(null); setDepositAmount(""); }} style={{
                        padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
                        background: "transparent", color: "var(--fm-muted)", fontSize: 12,
                        cursor: "pointer", fontFamily: "Outfit, sans-serif",
                    }}>Cancel</button>
                    </div>
                ) : (
                    <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setShowDeposit(goal.id)} style={{
                        flex: 1, padding: "10px", borderRadius: 10, border: "none",
                        background: `${goal.color}15`, color: goal.color,
                        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
                    }}>+ Add deposit</button>
                    {goal.saved > 0 && (
                        <button onClick={() => withdrawAmount(goal.id)} style={{
                        padding: "10px 16px", borderRadius: 10, border: "1px solid var(--fm-border)",
                        background: "transparent", color: "var(--fm-muted)", fontSize: 12,
                        cursor: "pointer", fontFamily: "Outfit, sans-serif",
                        }}>Withdraw</button>
                    )}
                    </div>
                )}
                </div>
            )}

            {isComplete && (
                <div style={{ textAlign: "center", padding: 8, fontSize: 14, fontWeight: 600, color: "#00CEC9" }}>
                Goal reached! Congratulations!
                </div>
            )}

            {/* Recent Deposits */}
            {goal.deposits && goal.deposits.length > 0 && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--fm-border)" }}>
                <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 6 }}>Recent activity</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {goal.deposits.slice(-5).reverse().map((dep) => (
                    <span key={dep.id} style={{
                        fontSize: 10, padding: "3px 8px", borderRadius: 6,
                        background: dep.amount > 0 ? "rgba(0,206,201,0.1)" : "rgba(255,107,107,0.1)",
                        color: dep.amount > 0 ? "#00CEC9" : "#ff6b6b",
                    }}>
                        {dep.amount > 0 ? "+" : ""}{dep.amount < 0 ? "-" : ""}${Math.abs(dep.amount)} · {dep.date}
                    </span>
                    ))}
                </div>
                </div>
            )}
            </div>
        );
        })}
    </div>
    )}

    {/* Kai Advice */}
    {goals.length > 0 && (
    kaiMessage ? (
        <div style={{
        background: "rgba(108,92,231,0.08)", border: "1px solid rgba(108,92,231,0.15)",
        borderRadius: 14, padding: 20, marginTop: 16,
        }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-accent-light)" }}>Kai's savings advice</span>
            </div>
            <div onClick={() => setKaiMessage("")} style={{ cursor: "pointer", color: "var(--fm-muted)", fontSize: 11 }}>Close</div>
        </div>
        <div style={{ fontSize: 13, color: "var(--fm-text)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{kaiMessage}</div>
        </div>
    ) : (
        <div style={{ textAlign: "center", marginTop: 16 }}>
        <button onClick={getKaiAdvice} disabled={generatingKai} style={{
            padding: "12px 24px", borderRadius: 12, border: "none",
            background: generatingKai ? "var(--fm-muted)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            color: "#fff", fontSize: 13, fontWeight: 600,
            cursor: generatingKai ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
            display: "inline-flex", alignItems: "center", gap: 8,
        }}>
            {generatingKai ? (
            <>
                <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                Kai is analyzing...
            </>
            ) : (
            <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
                Get Kai's savings advice
            </>
            )}
        </button>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )
    )}
</div>
);
}