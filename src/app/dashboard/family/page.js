"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const tabs = [
{ id: "meals", label: "Meals", emoji: "🍽" },
{ id: "chores", label: "Chores", emoji: "🏠" },
{ id: "budget", label: "Budget", emoji: "💰" },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const familyMembers = ["Me", "Partner", "Child 1", "Child 2", "Everyone"];

export default function FamilyPage() {
const [activeTab, setActiveTab] = useState("meals");
const [items, setItems] = useState([]);
const [loading, setLoading] = useState(true);
const [showAdd, setShowAdd] = useState(false);
const [title, setTitle] = useState("");
const [assignedTo, setAssignedTo] = useState("Me");
const [day, setDay] = useState("Monday");
const [amount, setAmount] = useState("");
const [generating, setGenerating] = useState(false);

useEffect(() => { fetchItems(); }, [activeTab]);

const fetchItems = async () => {
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;
const { data } = await supabase.from("family").select("*").eq("user_id", session.user.id).eq("type", activeTab).order("created_at", { ascending: false });
if (data) setItems(data);
setLoading(false);
};

const addItem = async () => {
if (!title.trim()) return;
const { data: { session } } = await supabase.auth.getSession();
if (!session) return;
const newItem = { title: title.trim(), type: activeTab, assigned_to: assignedTo, day: activeTab === "meals" ? day : activeTab === "chores" ? day : null, amount: activeTab === "budget" ? parseFloat(amount) || 0 : 0, status: "pending", user_id: session.user.id };
const { data, error } = await supabase.from("family").insert([newItem]).select();
if (!error && data) {
    setItems([data[0], ...items]);
    setTitle(""); setAmount(""); setAssignedTo("Me"); setDay("Monday"); setShowAdd(false);
}
};

const toggleStatus = async (id, currentStatus) => {
const newStatus = currentStatus === "done" ? "pending" : "done";
await supabase.from("family").update({ status: newStatus }).eq("id", id);
setItems(items.map((item) => item.id === id ? { ...item, status: newStatus } : item));
};

const deleteItem = async (id) => {
await supabase.from("family").delete().eq("id", id);
setItems(items.filter((item) => item.id !== id));
};

const generateWithKai = async () => {
setGenerating(true);
let prompt = "";
if (activeTab === "meals") prompt = "Suggest a weekly meal plan for a family. Give me 7 meals, one for each day (Monday to Sunday). For each meal give ONLY the meal name, nothing else. Format: Monday: Meal Name. Keep meals simple, healthy, and varied.";
else if (activeTab === "chores") prompt = "Suggest 8 household chores that should be done weekly. For each chore give ONLY the chore name, nothing else. Format each on a new line. Keep them practical and common.";
else if (activeTab === "budget") prompt = "Suggest 8 common monthly household budget categories with typical amounts. Format: Category: $amount. Keep it realistic for a family in the US.";

try {
    const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: prompt, history: [] }) });
    const data = await response.json();
    if (data.reply) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const lines = data.reply.split("\n").filter((l) => l.trim().length > 3);
    const newItems = [];
    for (const line of lines.slice(0, 8)) {
        let itemTitle = line.replace(/^[\d\.\-\*]+\s*/, "").trim();
        let itemDay = null;
        let itemAmount = 0;
        if (activeTab === "meals") {
        const dayMatch = days.find((d) => line.toLowerCase().includes(d.toLowerCase()));
        if (dayMatch) { itemDay = dayMatch; itemTitle = itemTitle.replace(new RegExp(dayMatch + "[:\\s-]*", "i"), "").trim(); }
        }
        if (activeTab === "budget") {
        const amountMatch = line.match(/\$[\d,]+/);
        if (amountMatch) { itemAmount = parseFloat(amountMatch[0].replace(/[$,]/g, "")) || 0; itemTitle = itemTitle.replace(/[\$\d,]+/g, "").replace(/:/g, "").trim(); }
        }
        if (itemTitle.length > 2) newItems.push({ title: itemTitle, type: activeTab, assigned_to: "Everyone", day: itemDay, amount: itemAmount, status: "pending", user_id: session.user.id });
    }
    if (newItems.length > 0) {
        const { data: inserted } = await supabase.from("family").insert(newItems).select();
        if (inserted) setItems([...inserted.reverse(), ...items]);
    }
    }
} catch (e) {}
setGenerating(false);
};

const doneCount = items.filter((i) => i.status === "done").length;
const totalBudget = items.reduce((sum, i) => sum + (parseFloat(i.amount) || 0), 0);

if (loading) return <div style={{ padding: 40, textAlign: "center", color: "var(--fm-muted)" }}>Loading family...</div>;

return (
<div style={{ animation: "fadeIn 0.5s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
    <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--fm-text)", margin: 0 }}>Family Mode</h2>
        <p style={{ fontSize: 13, color: "var(--fm-muted)", margin: "4px 0 0" }}>Plan weekly meals, assign household chores, and manage your family budget with AI</p>
    </div>
    <div style={{ display: "flex", gap: 8 }}>
        <button onClick={generateWithKai} disabled={generating} style={{ padding: "8px 14px", borderRadius: 10, border: "1px solid rgba(16,185,129,0.2)", background: "rgba(16,185,129,0.08)", color: "var(--fm-accent-light)", fontSize: 12, fontWeight: 600, cursor: generating ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
        {generating ? "Kai generating..." : "✦ Kai suggest"}
        </button>
        <button onClick={() => setShowAdd(!showAdd)} style={{ padding: "8px 16px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #10b981, #34d399)", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}>+ Add</button>
    </div>
    </div>

    <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
    {tabs.map((tab) => (
        <button key={tab.id} onClick={() => { setActiveTab(tab.id); setShowAdd(false); }} style={{
        flex: 1, padding: "10px 8px", borderRadius: 10, fontSize: 13, fontWeight: 600,
        border: activeTab === tab.id ? "1px solid rgba(16,185,129,0.3)" : "1px solid var(--fm-border)",
        background: activeTab === tab.id ? "rgba(16,185,129,0.1)" : "var(--fm-surface)",
        color: activeTab === tab.id ? "var(--fm-accent-light)" : "var(--fm-muted)",
        cursor: "pointer", fontFamily: "Outfit, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}><span style={{ fontSize: 16 }}>{tab.emoji}</span>{tab.label}</button>
    ))}
    </div>

    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
    <div style={{ flex: 1, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 2 }}>Total items</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "var(--fm-text)" }}>{items.length}</div>
    </div>
    {activeTab === "budget" ? (
        <div style={{ flex: 1, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 2 }}>Total budget</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "var(--fm-success)" }}>${totalBudget.toFixed(0)}</div>
        </div>
    ) : (
        <div style={{ flex: 1, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--fm-muted)", marginBottom: 2 }}>Completed</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "var(--fm-success)" }}>{doneCount}</div>
        </div>
    )}
    </div>

    {showAdd && (
    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 14, padding: 18, marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fm-text)", marginBottom: 12 }}>Add {activeTab === "meals" ? "a meal" : activeTab === "chores" ? "a chore" : "a budget item"}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={activeTab === "meals" ? "e.g. Grilled chicken with rice" : activeTab === "chores" ? "e.g. Vacuum living room" : "e.g. Groceries"} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)", background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13, fontFamily: "Outfit, sans-serif", outline: "none" }} />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(activeTab === "meals" || activeTab === "chores") && (
            <select value={day} onChange={(e) => setDay(e.target.value)} style={{ flex: 1, minWidth: 120, padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)", background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13, fontFamily: "Outfit, sans-serif", outline: "none" }}>
                {days.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            )}
            <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} style={{ flex: 1, minWidth: 100, padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)", background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13, fontFamily: "Outfit, sans-serif", outline: "none" }}>
            {familyMembers.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            {activeTab === "budget" && (
            <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="$0" type="number" style={{ flex: 1, minWidth: 80, padding: "10px 14px", borderRadius: 10, border: "1px solid var(--fm-border)", background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 13, fontFamily: "Outfit, sans-serif", outline: "none" }} />
            )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
            <button onClick={addItem} style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #10b981, #34d399)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}>Save</button>
            <button onClick={() => setShowAdd(false)} style={{ padding: "10px 24px", borderRadius: 10, border: "1px solid var(--fm-border)", background: "transparent", color: "var(--fm-muted)", fontSize: 13, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}>Cancel</button>
        </div>
        </div>
    </div>
    )}

    {items.length === 0 ? (
    <div style={{ textAlign: "center", padding: 40, background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 14 }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>{tabs.find((t) => t.id === activeTab)?.emoji}</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: "var(--fm-text)", marginBottom: 4 }}>No {activeTab} yet</div>
        <div style={{ fontSize: 13, color: "var(--fm-muted)", marginBottom: 16 }}>Add items manually or let Kai suggest a plan!</div>
    </div>
    ) : activeTab === "budget" ? (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item) => (
        <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12 }}>
            <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--fm-text)" }}>{item.title}</div>
            <div style={{ fontSize: 11, color: "var(--fm-muted)" }}>{item.assigned_to}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "var(--fm-success)" }}>${parseFloat(item.amount || 0).toFixed(0)}</span>
            <div onClick={() => deleteItem(item.id)} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 4 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </div>
            </div>
        </div>
        ))}
        <div style={{ background: "rgba(0,206,201,0.08)", border: "1px solid rgba(0,206,201,0.15)", borderRadius: 12, padding: 16, textAlign: "center" }}>
        <div style={{ fontSize: 12, color: "var(--fm-muted)", marginBottom: 2 }}>Total monthly budget</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "var(--fm-success)" }}>${totalBudget.toFixed(0)}</div>
        </div>
    </div>
    ) : (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item) => (
        <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div onClick={() => toggleStatus(item.id, item.status)} style={{
                width: 20, height: 20, borderRadius: 5, cursor: "pointer", flexShrink: 0,
                border: item.status === "done" ? "none" : "2px solid var(--fm-muted)",
                background: item.status === "done" ? "linear-gradient(135deg, #10b981, #00CEC9)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
            }}>
                {item.status === "done" && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
            </div>
            <div>
                <div style={{ fontSize: 13, color: item.status === "done" ? "var(--fm-muted)" : "var(--fm-text)", textDecoration: item.status === "done" ? "line-through" : "none" }}>{item.title}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
                <span style={{ fontSize: 10, color: "var(--fm-muted)" }}>{item.assigned_to}</span>
                {item.day && <span style={{ fontSize: 10, color: "var(--fm-accent-light)" }}>{item.day}</span>}
                </div>
            </div>
            </div>
            <div onClick={() => deleteItem(item.id)} style={{ cursor: "pointer", color: "var(--fm-muted)", padding: 4 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </div>
        </div>
        ))}
    </div>
    )}
</div>
);
}