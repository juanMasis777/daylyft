"use client";

import { useState } from "react";

function Logo({ size = 40 }) {
return (
<div
    style={{
    width: size,
    height: size,
    borderRadius: size * 0.3,
    background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "pulseGlow 3s ease-in-out infinite",
    }}
>
    <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="3" fill="white" />
    <circle cx="16" cy="14" r="3" fill="white" />
    <circle cx="18" cy="6" r="2.2" fill="white" opacity="0.7" />
    <circle cx="10" cy="16" r="2" fill="white" opacity="0.6" />
    <line x1="8" y1="8" x2="16" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="14" x2="18" y2="6" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    <line x1="8" y1="8" x2="10" y2="16" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <line x1="10" y1="16" x2="16" y2="14" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
</div>
);
}

function GoogleIcon() {
return (
<svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
</svg>
);
}

function AppleIcon() {
return (
<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
</svg>
);
}

export default function LoginPage() {
const [isLogin, setIsLogin] = useState(true);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [name, setName] = useState("");

const handleSubmit = (e) => {
e.preventDefault();
window.location.href = "/dashboard";
};

return (
<div
    style={{
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: "20px",
    }}
>
    {/* Background orbs */}
    <div
    style={{
        position: "absolute",
        width: 350,
        height: 350,
        borderRadius: "50%",
        background: "var(--fm-accent-glow)",
        filter: "blur(100px)",
        opacity: 0.3,
        left: "10%",
        top: "15%",
        pointerEvents: "none",
        animation: "float 8s ease-in-out infinite alternate",
    }}
    />
    <div
    style={{
        position: "absolute",
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: "var(--fm-teal-glow)",
        filter: "blur(100px)",
        opacity: 0.25,
        right: "10%",
        bottom: "20%",
        pointerEvents: "none",
        animation: "float 10s ease-in-out infinite alternate",
        animationDelay: "-3s",
    }}
    />
    <div
    style={{
        position: "absolute",
        width: 200,
        height: 200,
        borderRadius: "50%",
        background: "var(--fm-accent-glow)",
        filter: "blur(80px)",
        opacity: 0.15,
        right: "30%",
        top: "10%",
        pointerEvents: "none",
        animation: "float 12s ease-in-out infinite alternate",
        animationDelay: "-5s",
    }}
    />

    {/* Login card */}
    <div
    style={{
        background: "var(--fm-surface)",
        border: "1px solid var(--fm-border)",
        borderRadius: 24,
        padding: "44px 40px",
        width: "100%",
        maxWidth: 420,
        position: "relative",
        zIndex: 2,
        animation: "fadeIn 0.6s ease forwards",
    }}
    >
    {/* Logo */}
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <Logo size={42} />
        <h1
        style={{
            fontSize: 26,
            fontWeight: 800,
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
        }}
        >
        FlowMind
        </h1>
    </div>
    <p style={{ color: "var(--fm-muted)", fontSize: 14, marginBottom: 32 }}>
        Your AI copilot for productivity
    </p>

    {/* Google button */}
    <button
        onClick={() => alert("Google login coming soon!")}
        style={{
        width: "100%",
        padding: 12,
        borderRadius: 12,
        border: "1px solid var(--fm-border)",
        background: "var(--fm-card)",
        color: "var(--fm-text)",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "Outfit, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginBottom: 10,
        }}
    >
        <GoogleIcon /> Continue with Google
    </button>

    {/* Apple button */}
    <button
        onClick={() => alert("Apple login coming soon!")}
        style={{
        width: "100%",
        padding: 12,
        borderRadius: 12,
        border: "1px solid var(--fm-border)",
        background: "var(--fm-card)",
        color: "var(--fm-text)",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "Outfit, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginBottom: 24,
        }}
    >
        <AppleIcon /> Continue with Apple
    </button>

    {/* Divider */}
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ flex: 1, height: 1, background: "var(--fm-border)" }} />
        <span style={{ fontSize: 12, color: "var(--fm-muted)" }}>or with email</span>
        <div style={{ flex: 1, height: 1, background: "var(--fm-border)" }} />
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit}>
        {!isLogin && (
        <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid var(--fm-border)",
            background: "var(--fm-card)",
            color: "var(--fm-text)",
            fontSize: 14,
            fontFamily: "Outfit, sans-serif",
            marginBottom: 10,
            }}
        />
        )}

        <input
        type="email"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid var(--fm-border)",
            background: "var(--fm-card)",
            color: "var(--fm-text)",
            fontSize: 14,
            fontFamily: "Outfit, sans-serif",
            marginBottom: 10,
        }}
        />

        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid var(--fm-border)",
            background: "var(--fm-card)",
            color: "var(--fm-text)",
            fontSize: 14,
            fontFamily: "Outfit, sans-serif",
            marginBottom: 24,
        }}
        />

        <button
        type="submit"
        style={{
            width: "100%",
            padding: 14,
            borderRadius: 12,
            border: "none",
            background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            color: "white",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "Outfit, sans-serif",
        }}
        >
        {isLogin ? "Sign in" : "Create account"}
        </button>
    </form>

    {/* Toggle */}
    <p style={{ textAlign: "center", fontSize: 14, color: "var(--fm-muted)", marginTop: 20 }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span
        onClick={() => setIsLogin(!isLogin)}
        style={{ color: "var(--fm-accent-light)", cursor: "pointer" }}
        >
        {isLogin ? "Sign up free" : "Sign in"}
        </span>
    </p>

    <p style={{ textAlign: "center", fontSize: 11, color: "var(--fm-muted)", opacity: 0.5, marginTop: 24 }}>
        By continuing, you agree to our Terms of Service and Privacy Policy
    </p>
    </div>
</div>
);
}