"use client";

import { useState, useEffect } from "react";

const billCategories = [
{ id: "rent", label: "Rent", emoji: "🏠", color: "#6C5CE7" },
{ id: "electricity", label: "Electricity", emoji: "💡", color: "#fdcb6e" },
{ id: "water", label: "Water", emoji: "💧", color: "#74b9ff" },
{ id: "internet", label: "Internet", emoji: "📶", color: "#00CEC9" },
{ id: "phone", label: "Phone", emoji: "📱", color: "#a29bfe" },
{ id: "insurance", label: "Insurance", emoji: "🛡", color: "#00b894" },
{ id: "subscription", label: "Subscription", emoji: "🔄", color: "#fd79a8" },
{ id: "loan", label: "Loan", emoji: "🏦", color: "#e17055" },
{ id: "car", label: "Car", emoji: "🚗", color: "#636e72" },
{ id: "gym", label: "Gym", emoji: "🏋️", color: "#ff6b6b" },
{ id: "streaming", label: "Streaming", emoji: "🎬", color: "#e84393" },
{ id: "other", label: "Other", emoji: "📋", color: "#636e72" },
];

const frequencies = [
{ id: "monthly", label: "Monthly" },
{ id: "weekly", label: "Weekly" },
{ id: "biweekly", label: "Bi-weekly" },
{ id: "quarterly", label: "Quarterly" },
{ id: "yearly", label: "Yearly" },
{ id: "once", label: "One-time" },
];

export default function BillsPage() {
const [bills, setBills] = useState([]);
const [showAdd, setShowAdd] = useState(false);
const [title, setTitle] = useState("");
const [amount, setAmount] = useState("");
const [category, setCategory] = useState("rent");
const [dueDay, setDueDay] = useState("");
const [frequency, setFrequency] = useState("monthly");
const [autoPay, setAutoPay] = useState(false);
const [notes, setNotes] = useState("");
const [editingId, setEditingId] = useState(null);
const [showPaid, setShowPaid] = useState(false);

const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.toLocaleDateString("en-US", { month: "long", year: "numeric" });

useEffect(() => {
const saved = localStorage.getItem("daylyft-bills");
if (saved) setBills(JSON.parse(saved));
}, []);

const saveBills = (updated) => {
setBills(updated);
localStorage.setItem("daylyft-bills", JSON.stringify(updated));
};

const addBill = () => {
if (!title.trim()) { alert("Enter a bill name"); return; }
if (!amount || parseFloat(amount) <= 0) { alert("Enter a valid amount"); return; }
if (!dueDay || parseInt(dueDay) < 1 || parseInt(dueDay) > 31) { alert("Enter a due day (1-31)"); return; }

if (editingId) {
    const updated = bills.map((b) => b.id === editingId ? {
    ...b, title: title.trim(), amount: parseFloat(amount), category, dueDay: parseInt(dueDay),
    frequency, autoPay, notes: notes.trim(),
    } : b);
    saveBills(updated);
} else {
    const newBill = {
    id: Date.now(),
    title: title.trim(),
    amount: parseFloat(amount),
    category,
    dueDay: parseInt(dueDay),
    frequency,
    autoPay,
    notes: notes.trim(),
    paidHistory: [],
    createdAt: new Date().toISOString(),
    };
    saveBills([...bills, newBill].sort((a, b) => a.dueDay - b.dueDay));
}
closeForm();
};

const closeForm = () => {
setShowAdd(false);
setEditingId(null);
setTitle("");
setAmount("");
setCategory("rent");
setDueDay("");
setFrequency("monthly");
setAutoPay(false);
setNotes("");
};

const editBill = (bill) => {
setEditingId(bill.id);
setTitle(bill.title);
setAmount(bill.amount.toString());
setCategory(bill.category);
setDueDay(bill.dueDay.toString());
setFrequency(bill.frequency);
setAutoPay(bill.autoPay);
setNotes(bill.notes || "");
setShowAdd(true);
};

const deleteBill = (id) => {
if (!confirm("Delete this bill?")) return;
saveBills(bills.filter((b) => b.id !== id));
};

const togglePaid = (id) => {
const monthKey = `${today.getFullYear()}-${today.getMonth()}`;
const updated = bills.map((b) => {
    if (b.id === id) {
    const history = b.paidHistory || [];
    const isPaid = history.includes(monthKey);
    return {
        ...b,
        paidHistory: isPaid ? history.filter((h) => h !== monthKey) : [...history, monthKey],
    };
    }
    return b;
});
saveBills(updated);
};

const isPaidThisMonth = (bill) => {
const monthKey = `${today.getFullYear()}-${today.getMonth()}`;
return (bill.paidHistory || []).includes(monthKey);
};

const getDueStatus = (bill) => {
if (isPaidThisMonth(bill)) return { label: "Paid", color: "#00CEC9", emoji: "✅" };
const daysUntil = bill.dueDay - currentDay;
if (daysUntil < 0) return { label: "Overdue", color: "#ff6b6b", emoji: "🚨" };
if (daysUntil === 0) return { label: "Due today", color: "#ff6b6b", emoji: "⚠️" };
if (daysUntil <= 3) return { label: `Due in ${daysUntil}d`, color: "#fdcb6e", emoji: "⏰" };
if (daysUntil <= 7) return { label: `Due in ${daysUntil}d`, color: "#74b9ff", emoji: "📅" };
return { label: `Due on ${bill.dueDay}th`, color: "var(--fm-muted)", emoji: "📋" };
};

const getCategoryInfo = (id) => billCategories.find((c) => c.id === id) || billCategories[11];

const totalMonthly = bills
.filter((b) => b.frequency === "monthly")
.reduce((sum, b) => sum + b.amount, 0);

const paidThisMonth = bills.filter((b) => isPaidThisMonth(b));
const unpaidBills = bills.filter((b) => !isPaidThisMonth(b));
const overdueBills = unpaidBills.filter((b) => b.dueDay < currentDay);
const upcomingBills = unpaidBills.filter((b) => b.dueDay >= currentDay);
const paidAmount = paidThisMonth.reduce((sum, b) => sum + b.amount, 0);
const unpaidAmount = unpaidBills.reduce((sum, b) => sum + b.amount, 0);

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Bill Reminder</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Never miss a payment — track all your bills and due dates in one place</p>
    </div>
    <button onClick={() => { if (showAdd) closeForm(); else setShowAdd(true); }} style={{
        padding: "8px 18px", borderRadius: 10, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
    }}>{showAdd ? "Cancel" : "+ Add Bill"}</button>
    </div>

    {/* Month Header */}
    <div style={{
    background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
    borderRadius: 12, padding: "10px 16px", marginBottom: 16, textAlign: "center",
    fontSize: 15, fontWeight: 600, color: "var(--fm-text)",
    }}>{currentMonth}</div>

    {/* Stats */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 10, marginBottom: 16 }}>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Monthly total</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "var(--fm-accent-light)" }}>${totalMonthly.toFixed(0)}</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Paid</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#00CEC9" }}>${paidAmount.toFixed(0)}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>{paidThisMonth.length} bills</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Remaining</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: unpaidAmount > 0 ? "#fdcb6e" : "#00CEC9" }}>${unpaidAmount.toFixed(0)}</div>
        <div style={{ fontSize: 10, color: "var(--fm-muted)" }}>{unpaidBills.length} bills</div>
    </div>
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 4 }}>Overdue</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: overdueBills.length > 0 ? "#ff6b6b" : "#00CEC9" }}>{overdueBills.length}</div>
        {overdueBills.length > 0 && <div style={{ fontSize: 10, color: "#ff6b6b" }}>Action needed!</div>}
    </div>
    </div>

    {/* Progress Bar */}
    {bills.length > 0 && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 12, padding: 14, marginBottom: 16,
    }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: "var(--fm-muted)" }}>Bills paid this month</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: paidThisMonth.length === bills.length ? "#00CEC9" : "var(--fm-accent-light)" }}>
            {paidThisMonth.length}/{bills.length}
        </span>
        </div>
        <div style={{ background: "var(--fm-card)", borderRadius: 6, height: 10, overflow: "hidden" }}>
        <div style={{
            height: "100%", borderRadius: 6,
            width: `${bills.length > 0 ? (paidThisMonth.length / bills.length) * 100 : 0}%`,
            background: paidThisMonth.length === bills.length ? "linear-gradient(135deg, #00CEC9, #55efc4)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            transition: "width 0.5s ease",
        }} />
        </div>
    </div>
    )}

    {/* Add Form */}
    {showAdd && (
    <div style={{
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)",
        borderRadius: 14, padding: 20, marginBottom: 16,
    }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fm-text)", marginBottom: 14 }}>{editingId ? "Edit bill" : "Add a bill"}</div>

        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Rent, Netflix, Car Insurance..." style={{
        width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 15, fontWeight: 600,
        fontFamily: "Outfit, sans-serif", outline: "none", marginBottom: 10, boxSizing: "border-box",
        }} />

        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Amount ($)</div>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" style={{
            width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
            fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box",
            }} />
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Due day (1-31)</div>
            <input type="number" value={dueDay} onChange={(e) => setDueDay(e.target.value)} placeholder="15" min="1" max="31" style={{
            width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14,
            fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box",
            }} />
        </div>
        </div>

        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 8 }}>Category</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 4, marginBottom: 12 }}>
        {billCategories.map((cat) => (
            <button key={cat.id} onClick={() => setCategory(cat.id)} style={{
            padding: "6px 8px", borderRadius: 8, fontSize: 11, cursor: "pointer",
            border: category === cat.id ? `1px solid ${cat.color}40` : "1px solid var(--fm-border)",
            background: category === cat.id ? `${cat.color}15` : "var(--fm-card)",
            color: category === cat.id ? cat.color : "var(--fm-muted)",
            fontFamily: "Outfit, sans-serif", display: "flex", alignItems: "center", gap: 4,
            }}>{cat.emoji} {cat.label}</button>
        ))}
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 6 }}>Frequency</div>
            <select value={frequency} onChange={(e) => setFrequency(e.target.value)} style={{
            width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
            background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13,
            fontFamily: "Outfit, sans-serif", outline: "none",
            }}>
            {frequencies.map((f) => (
                <option key={f.id} value={f.id}>{f.label}</option>
            ))}
            </select>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
            <button onClick={() => setAutoPay(!autoPay)} style={{
            width: "100%", padding: "10px 14px", borderRadius: 10, cursor: "pointer",
            border: autoPay ? "1px solid rgba(0,206,201,0.4)" : "1px solid var(--fm-border)",
            background: autoPay ? "rgba(0,206,201,0.1)" : "var(--fm-card)",
            color: autoPay ? "#00CEC9" : "var(--fm-muted)",
            fontSize: 13, fontFamily: "Outfit, sans-serif", fontWeight: 500,
            }}>{autoPay ? "✓ Auto-pay ON" : "Auto-pay OFF"}</button>
        </div>
        </div>

        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Account number, website, notes..." rows={2} style={{
        width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)",
        background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13,
        fontFamily: "Outfit, sans-serif", outline: "none", resize: "none",
        marginBottom: 14, boxSizing: "border-box", lineHeight: 1.6,
        }} />

        <button onClick={addBill} style={{
        width: "100%", padding: "12px", borderRadius: 12, border: "none",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff",
        fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>{editingId ? "Update Bill" : "Add Bill"}</button>
    </div>
    )}

    {/* Bills List */}
    {bills.length === 0 ? (
    <div style={{
        textAlign: "center", padding: 50,
        background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16,
    }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>📋</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--fm-text)", marginBottom: 8 }}>No bills added</h3>
        <p style={{ fontSize: 14, color: "var(--fm-muted)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto" }}>
        Add your monthly bills and never miss a payment again!
        </p>
    </div>
    ) : (
    <div>
        {/* Overdue */}
        {overdueBills.length > 0 && (
        <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#ff6b6b", marginBottom: 8 }}>🚨 Overdue ({overdueBills.length})</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {overdueBills.map((bill) => renderBillCard(bill))}
            </div>
        </div>
        )}

        {/* Upcoming */}
        {upcomingBills.length > 0 && (
        <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fm-text)", marginBottom: 8 }}>Upcoming ({upcomingBills.length})</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {upcomingBills.map((bill) => renderBillCard(bill))}
            </div>
        </div>
        )}

        {/* Paid */}
        {paidThisMonth.length > 0 && (
        <div>
            <div onClick={() => setShowPaid(!showPaid)} style={{
            fontSize: 13, fontWeight: 600, color: "#00CEC9", marginBottom: 8,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            }}>
            ✅ Paid this month ({paidThisMonth.length})
            <span style={{ fontSize: 10, color: "var(--fm-muted)" }}>{showPaid ? "▲" : "▼"}</span>
            </div>
            {showPaid && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {paidThisMonth.map((bill) => renderBillCard(bill))}
            </div>
            )}
        </div>
        )}
    </div>
    )}
</div>
);

function renderBillCard(bill) {
const cat = getCategoryInfo(bill.category);
const status = getDueStatus(bill);
const paid = isPaidThisMonth(bill);

return (
    <div key={bill.id} style={{
    background: paid ? "rgba(0,206,201,0.05)" : "var(--fm-surface)",
    border: `1px solid ${paid ? "rgba(0,206,201,0.15)" : status.color === "#ff6b6b" ? "rgba(255,107,107,0.25)" : "var(--fm-border)"}`,
    borderRadius: 14, padding: 16, borderLeft: `4px solid ${paid ? "#00CEC9" : cat.color}`,
    opacity: paid ? 0.8 : 1,
    }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
        <div onClick={() => togglePaid(bill.id)} style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0, cursor: "pointer",
            background: paid ? "rgba(0,206,201,0.15)" : `${cat.color}15`,
            border: paid ? "1px solid rgba(0,206,201,0.3)" : `1px solid ${cat.color}25`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
        }}>
            {paid ? "✅" : cat.emoji}
        </div>
        <div style={{ flex: 1 }}>
            <div style={{
            fontSize: 15, fontWeight: 600,
            color: paid ? "var(--fm-muted)" : "var(--fm-text)",
            textDecoration: paid ? "line-through" : "none",
            }}>{bill.title}</div>
            <div style={{ fontSize: 11, color: "var(--fm-muted)", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <span>Due on {bill.dueDay}th</span>
            <span>·</span>
            <span>{bill.frequency}</span>
            {bill.autoPay && <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, background: "rgba(0,206,201,0.1)", color: "#00CEC9" }}>Auto-pay</span>}
            </div>
            {bill.notes && <div style={{ fontSize: 11, color: "var(--fm-muted)", marginTop: 2 }}>{bill.notes}</div>}
        </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: paid ? "var(--fm-muted)" : "var(--fm-text)" }}>${bill.amount.toFixed(2)}</div>
        <span style={{
            fontSize: 10, padding: "2px 8px", borderRadius: 6,
            background: `${status.color}15`, color: status.color,
        }}>{status.emoji} {status.label}</span>
        </div>
    </div>

    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 10 }}>
        {!paid && (
        <button onClick={() => togglePaid(bill.id)} style={{
            padding: "5px 14px", borderRadius: 8, border: "none", fontSize: 11, fontWeight: 600,
            background: "rgba(0,206,201,0.15)", color: "#00CEC9",
            cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Mark paid</button>
        )}
        {paid && (
        <button onClick={() => togglePaid(bill.id)} style={{
            padding: "5px 14px", borderRadius: 8, border: "1px solid var(--fm-border)", fontSize: 11,
            background: "transparent", color: "var(--fm-muted)",
            cursor: "pointer", fontFamily: "Outfit, sans-serif",
        }}>Undo</button>
        )}
        <div onClick={() => editBill(bill)} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 4 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
        </div>
        <div onClick={() => deleteBill(bill.id)} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 4 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </div>
    </div>
    </div>
);
}
}