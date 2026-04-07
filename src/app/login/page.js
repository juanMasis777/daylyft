"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
const [isLogin, setIsLogin] = useState(true);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [name, setName] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
setError("");
setLoading(true);

try {
    if (isLogin) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) throw error;
    window.location.href = "/dashboard";
    } else {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
        data: { full_name: name },
        },
    });
    if (error) throw error;
    window.location.href = "/dashboard";
    }
} catch (err) {
    setError(err.message);
} finally {
    setLoading(false);
}
};

const handleGoogleLogin = async () => {
const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
    redirectTo: window.location.origin + "/dashboard",
    },
});
if (error) setError(error.message);
};

return (
<div style={{ minHeight: "100vh", background: "var(--fm-bg)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Outfit, sans-serif", padding: 20 }}>
    <div style={{ width: "100%", maxWidth: 420 }}>
    <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ width: 40, height: 40, borderRadius: 11, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <circle cx="8" cy="8" r="3" fill="white" />
            <circle cx="16" cy="14" r="3" fill="white" />
            <line x1="8" y1="8" x2="16" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        </div>
        <span style={{ fontSize: 22, fontWeight: 800, background: "linear-gradient(135deg, #6C5CE7, #a29bfe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>DayLyft</span>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--fm-text)", margin: "0 0 6px" }}>
        {isLogin ? "Welcome back" : "Create your account"}
        </h1>
        <p style={{ fontSize: 14, color: "var(--fm-muted)", margin: 0 }}>
        {isLogin ? "Sign in to continue to DayLyft" : "Start your productivity journey with Kai"}
        </p>
    </div>

    <div style={{ background: "var(--fm-surface)", border: "1px solid var(--fm-border)", borderRadius: 16, padding: 28 }}>
        {error && (
        <div style={{ background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.2)", borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#ff6b6b" }}>
            {error}
        </div>
        )}

        <button
        onClick={handleGoogleLogin}
        style={{ width: "100%", padding: "12px", borderRadius: 12, border: "1px solid var(--fm-border)", background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20 }}
        >
        <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Continue with Google
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1, height: 1, background: "var(--fm-border)" }} />
        <span style={{ fontSize: 12, color: "var(--fm-muted)" }}>or</span>
        <div style={{ flex: 1, height: 1, background: "var(--fm-border)" }} />
        </div>

        {!isLogin && (
        <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, color: "var(--fm-muted)", display: "block", marginBottom: 6 }}>Full name</label>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Juan Martinez"
            style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)", background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14, fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box" }}
            />
        </div>
        )}

        <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 13, color: "var(--fm-muted)", display: "block", marginBottom: 6 }}>Email</label>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)", background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14, fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box" }}
        />
        </div>

        <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 13, color: "var(--fm-muted)", display: "block", marginBottom: 6 }}>Password</label>
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--fm-border)", background: "var(--fm-card)", color: "var(--fm-text)", fontSize: 14, fontFamily: "Outfit, sans-serif", outline: "none", boxSizing: "border-box" }}
        />
        </div>

        <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", background: loading ? "var(--fm-muted)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)", color: "#fff", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "Outfit, sans-serif" }}
        >
        {loading ? "Loading..." : isLogin ? "Sign in" : "Create account"}
        </button>
    </div>

    <p style={{ textAlign: "center", fontSize: 13, color: "var(--fm-muted)", marginTop: 20 }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span
        onClick={() => { setIsLogin(!isLogin); setError(""); }}
        style={{ color: "var(--fm-accent-light)", cursor: "pointer", fontWeight: 600 }}
        >
        {isLogin ? "Sign up free" : "Sign in"}
        </span>
    </p>

    <p style={{ textAlign: "center", marginTop: 12 }}>
        <span onClick={() => window.location.href = "/"} style={{ fontSize: 13, color: "var(--fm-muted)", cursor: "pointer" }}>
        &larr; Back to home
        </span>
    </p>
    </div>
</div>
);
}