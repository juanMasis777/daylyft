"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const expenseCategories = [
{ id: "food", label: "Food & Drinks", emoji: "🍔", color: "#e17055" },
{ id: "transport", label: "Transport", emoji: "🚗", color: "#6C5CE7" },
{ id: "shopping", label: "Shopping", emoji: "🛍", color: "#fd79a8" },
{ id: "bills", label: "Bills & Utilities", emoji: "💡", color: "#fdcb6e" },
{ id: "health", label: "Health", emoji: "💊", color: "#00CEC9" },
{ id: "entertainment", label: "Entertainment", emoji: "🎬", color: "#a29bfe" },
{ id: "education", label: "Education", emoji: "📚", color: "#74b9ff" },
{ id: "subscriptions", label: "Subscriptions", emoji: "📱", color: "#ff6b6b" },
{ id: "savings", label: "Savings", emoji: "🏦", color: "#00b894" },
{ id: "other", label: "Other", emoji: "📦", color: "#636e72" },
];

const incomeCategories = [
{ id: "salary", label: "Salary", emoji: "💼", color: "#00CEC9" },
{ id: "freelance", label: "Freelance", emoji: "💻", color: "#6C5CE7" },
{ id: "business", label: "Business", emoji: "🏪", color: "#00b894" },
{ id: "investment", label: "Investment", emoji: "📈", color: "#fdcb6e" },
{ id: "gift", label: "Gift", emoji: "🎁", color: "#fd79a8" },
{ id: "other_income", label: "Other", emoji: "💰", color: "#636e72" },
];

export default function BudgetPage() {
const [entries, setEntries] = useState([]);
const [loading, setLoading] = useState(true);
const [showAdd, setShowAdd] = useState(false);
const [title, setTitle] = useState("");
const [amount, setAmount] = useState("");
const [type, setType] = useState("expense");
const [category, setCategory] = useState("food");
const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
const [filterMonth, setFilterMonth] = useState(new Date().toISOString().slice(0, 7));
const [kaiMessage, setKaiMessage] = useState("");
const [generatingKai, setGeneratingKai] = useState(false);

useEffect(() => { fetchEntries(); }, [filterMonth]);

const fetchEntries = async () => {
setLoading(true);
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;

const startDate = `${filterMonth}-01`;
const year = parseInt(filterMonth.split("-")[0]);
const month = parseInt(filterMonth.split("-")[1]);
const lastDay = new Date(year, month, 0).getDate();
const endDate = `${filterMonth}-${lastDay}`;

const { data } = await supabase
    .from("budget")
    .select("*")
    .eq("user_id", session.user.id)
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date", { ascending: false });

if (data) setEntries(data);
setLoading(false);
};

const addEntry = async () => {
if (!title.trim()) { alert("Please enter a title"); return; }
if (!amount || parseFloat(amount) <= 0) { alert("Please enter a valid amount"); return; }

const { data: { session } } = await supabase.auth.getSession();
if (!session) { alert("Please log in again"); return; }

const { data, error } = await supabase
    .from("budget")
    .insert([{
    title: title.trim(),
    amount: parseFloat(amount),
    type: type,
    category: category,
    date: date,
    user_id: session.user.id,
    }])
    .select();

if (error) {
    alert("Error: " + error.message);
    return;
}

if (data && data.length > 0) {
    setEntries([data[0], ...entries]);
    setTitle("");
    setAmount("");
    setCategory(type === "expense" ? "food" : "salary");
    setDate(new Date().toISOString().split("T")[0]);
    setShowAdd(false);
}
};

const deleteEntry = async (id) => {
if (!confirm("Delete this transaction?")) return;
await supabase.from("budget").delete().eq("id", id);
setEntries(entries.filter((e) => e.id !== id));
};

const totalIncome = entries.filter((e) => e.type === "income").reduce((sum, e) => sum + parseFloat(e.amount), 0);
const totalExpenses = entries.filter((e) => e.type === "expense").reduce((sum, e) => sum + parseFloat(e.amount), 0);
const balance = totalIncome - totalExpenses;

const categoryTotals = {};
entries.filter((e) => e.type === "expense").forEach((e) => {
categoryTotals[e.category] = (categoryTotals[e.category] || 0) + parseFloat(e.amount);
});
const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
const topCategory = sortedCategories[0];

const getCategoryInfo = (catId, entryType) => {
const list = entryType === "income" ? incomeCategories : expenseCategories;
return list.find((c) => c.id === catId) || { label: catId, emoji: "📦", color: "#636e72" };
};

const formatMonthLabel = (monthStr) => {
const [year, month] = monthStr.split("-");
const d = new Date(year, month - 1);
return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

const prevMonth = () => {
const d = new Date(filterMonth + "-15");
d.setMonth(d.getMonth() - 1);
setFilterMonth(d.toISOString().slice(0, 7));
};

const nextMonth = () => {
const d = new Date(filterMonth + "-15");
d.setMonth(d.getMonth() + 1);
setFilterMonth(d.toISOString().slice(0, 7));
};

const generateKaiInsight = async () => {
if (entries.length < 3) return;
setGeneratingKai(true);

const catBreakdown = sortedCategories.map(([cat, total]) => {
    const info = getCategoryInfo(cat, "expense");
    return `${info.label}: $${total.toFixed(0)}`;
}).join(", ");

try {
    const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: `Analyze my budget for ${formatMonthLabel(filterMonth)}. Income: $${totalIncome.toFixed(0)}. Total expenses: $${totalExpenses.toFixed(0)}. Balance: $${balance.toFixed(0)}. Expense breakdown by category: ${catBreakdown}. My biggest expense category is ${topCategory ? getCategoryInfo(topCategory[0], "expense").label : "unknown"} at $${topCategory ? topCategory[1].toFixed(0) : 0}. Give me: 1) A quick assessment of my spending habits, 2) One specific area where I could save money and how much, 3) A practical tip for next month. Keep it concise, friendly, and actionable.`,
        history: [],
    }),
    });
    const data = await response.json();
    if (data.reply) setKaiMessage(data.reply);
} catch (e) {
    setKaiMessage("Couldn't connect to Kai right now. Try again in a moment!");
}
setGeneratingKai(false);
};

if (loading) return <div style={{ padding: 40, textAlign: "center", color: "var(--fm-muted)" }}>Loading budget...</div>;

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Budget Tracker</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Track your income and expenses — see where your money goes and save smarter</p>
    </div>
    <button onClick={() => setShowAdd(!showAdd)} style={{
        padding: "8px 18px", borderRadius: 10, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>{showAdd ? "Cancel" : "+ Add"}</button>
    </div>

    {/* Month Selector */}
    <div style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 12, padding: "10px 16px", marginBottom: 16,
    }}>
    <div onClick={prevMonth} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 4 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
    </div>
    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)" }}>{formatMonthLabel(filterMonth)}</div>
    <div onClick={nextMonth} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 4 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
    </div>
    </div>

    {/* Summary Cards */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Income</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#00CEC9" }}>${totalIncome.toFixed(0)}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Expenses</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#ff6b6b" }}>${totalExpenses.toFixed(0)}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Balance</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: balance >= 0 ? "#00CEC9" : "#ff6b6b" }}>${balance.toFixed(0)}</div>
    </div>
    </div>

    {/* Balance Bar */}
    {totalIncome > 0 && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 12, padding: 14, marginBottom: 16,
    }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: "var(--fm-muted)" }}>Spending ratio</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: totalExpenses / totalIncome > 0.8 ? "#ff6b6b" : "#00CEC9" }}>
            {Math.round((totalExpenses / totalIncome) * 100)}% of income spent
        </span>
        </div>
        <div style={{ background: "var(--fm-card)", borderRadius: 6, height: 10, overflow: "hidden" }}>
        <div style={{
            height: "100%", borderRadius: 6,
            width: `${Math.min((totalExpenses / totalIncome) * 100, 100)}%`,
            background: totalExpenses / totalIncome > 0.8 ? "linear-gradient(135deg, #ff6b6b, #e17055)" : "linear-gradient(135deg, #00CEC9, #55efc4)",
            transition: "width 0.5s ease",
        }} />
        </div>
    </div>
    )}

    {/* Add Entry Form */}
    {showAdd && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 20, marginBottom: 16,
    }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>Add transaction</div>

        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        <button onClick={() => { setType("expense"); setCategory("food"); }} style={{
            flex: 1, padding: "10px", borderRadius: 10, fontSize: 13, fontWeight: 600,
            border: type === "expense" ? "1px solid rgba(255,107,107,0.4)" : "1px solid var(--fm-border)",
            background: type === "expense" ? "rgba(255,107,107,0.1)" : "var(--fm-card)",
            color: type === "expense" ? "#ff6b6b" : "var(--fm-muted)",
            cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Expense</button>
        <button onClick={() => { setType("income"); setCategory("salary"); }} style={{
            flex: 1, padding: "10px", borderRadius: 10, fontSize: 13, fontWeight: 600,
            border: type === "income" ? "1px solid rgba(0,206,201,0.4)" : "1px solid var(--fm-border)",
            background: type === "income" ? "rgba(0,206,201,0.1)" : "var(--fm-card)",
            color: type === "income" ? "#00CEC9" : "var(--fm-muted)",
            cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Income</button>
        </div>

        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={type === "expense" ? "e.g. Lunch, Uber, Netflix..." : "e.g. Salary, Freelance payment..."} style={{
        width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
        fontFamily: "Outfit, sans-serif", outline: "none", marginBottom: 10, boxSizing: "border-box",
        }} />

        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Amount ($)</div>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" min="0" step="0.01" style={{
            width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
            fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box",
            }} />
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Date</div>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{
            width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13,
            fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box",
            }} />
        </div>
        </div>

        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 8 }}>Category</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 6, marginBottom: 16 }}>
        {(type === "expense" ? expenseCategories : incomeCategories).map((cat) => (
            <div key={cat.id} onClick={() => setCategory(cat.id)} style={{
            padding: "8px 10px", borderRadius: 10, cursor: "pointer",
            background: category === cat.id ? `${cat.color}15` : "var(--fm-card)",
            border: category === cat.id ? `1px solid ${cat.color}40` : "1px solid var(--fm-border)",
            display: "flex", alignItems: "center", gap: 6,
            }}>
            <span style={{ fontSize: 16 }}>{cat.emoji}</span>
            <span style={{ fontSize: 11, fontWeight: 500, color: category === cat.id ? cat.color : "var(--fm-muted)" }}>{cat.label}</span>
            </div>
        ))}
        </div>

        <button onClick={addEntry} style={{
        width: "100%", padding: "12px", borderRadius: 12, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        color: "#fff", fontSize: 14, fontWeight: 600,
        cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Add {type === "expense" ? "Expense" : "Income"}</button>
    </div>
    )}

    {/* Category Breakdown */}
    {sortedCategories.length > 0 && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 18, marginBottom: 16,
    }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>Spending by category</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sortedCategories.map(([catId, total]) => {
            const info = getCategoryInfo(catId, "expense");
            const pct = totalExpenses > 0 ? Math.round((total / totalExpenses) * 100) : 0;
            return (
            <div key={catId}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16 }}>{info.emoji}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--fm-text)" }}>{info.label}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-text)" }}>${total.toFixed(0)}</span>
                    <span style={{ fontSize: 11, color: "var(--fm-muted)" }}>{pct}%</span>
                </div>
                </div>
                <div style={{ background: "var(--fm-card)", borderRadius: 4, height: 6, overflow: "hidden" }}>
                <div style={{
                    height: "100%", borderRadius: 4, width: `${pct}%`,
                    background: info.color, transition: "width 0.5s ease",
                }} />
                </div>
            </div>
            );
        })}
        </div>
    </div>
    )}

    {/* Transactions List */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 14, padding: 18, marginBottom: 16,
    }}>
    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>
        Transactions ({entries.length})
    </div>

    {entries.length === 0 ? (
        <div style={{ textAlign: "center", padding: 30 }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>💵</div>
        <div style={{ fontSize: 14, color: "var(--fm-muted)" }}>No transactions this month. Tap "+ Add" to start tracking!</div>
        </div>
    ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {entries.map((entry) => {
            const info = getCategoryInfo(entry.category, entry.type);
            const entryDate = new Date(entry.date + "T12:00:00");
            return (
            <div key={entry.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 12px", background: "var(--fm-card)", borderRadius: 10,
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, overflow: "hidden" }}>
                <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: `${info.color}15`, border: `1px solid ${info.color}25`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                }}>{info.emoji}</div>
                <div style={{ overflow: "hidden" }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--fm-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{entry.title}</div>
                    <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>
                    {info.label} · {entryDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                    fontSize: 15, fontWeight: 700,
                    color: entry.type === "income" ? "#00CEC9" : "#ff6b6b",
                }}>
                    {entry.type === "income" ? "+" : "-"}${parseFloat(entry.amount).toFixed(2)}
                </span>
                <div onClick={() => deleteEntry(entry.id)} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 4 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </div>
                </div>
            </div>
            );
        })}
        </div>
    )}
    </div>

    {/* Kai Insight */}
    {entries.length >= 3 && (
    kaiMessage ? (
        <div style={{
        background: "rgba(108,92,231,0.08)", border: "1px solid rgba(108,92,231,0.15)",
        borderRadius: 14, padding: 20,
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-accent-light)" }}>Kai's budget insight</span>
        </div>
        <div style={{ fontSize: 14, color: "var(--fm-text)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{kaiMessage}</div>
        </div>
    ) : (
        <div style={{ textAlign: "center" }}>
        <button onClick={generateKaiInsight} disabled={generatingKai} style={{
            padding: "14px 28px", borderRadius: 14, border: "none",
            background: generatingKai ? "var(--fm-muted)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            color: "#fff", fontSize: 14, fontWeight: 700,
            cursor: generatingKai ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif",
            display: "inline-flex", alignItems: "center", gap: 8,
        }}>
            {generatingKai ? (
            <>
                <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                Kai is analyzing your budget...
            </>
            ) : (
            <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" /></svg>
                Get Kai's budget insight
            </>
            )}
        </button>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )
    )}

    {entries.length < 3 && entries.length > 0 && (
    <div style={{
        textAlign: "center", padding: 16,
        background: "rgba(108,92,231,0.05)", border: "1px solid rgba(108,92,231,0.1)",
        borderRadius: 14, fontSize: 13, color: "var(--fm-muted)",
    }}>
        Add at least 3 transactions to unlock Kai's budget analysis
    </div>
    )}
</div>
);
}