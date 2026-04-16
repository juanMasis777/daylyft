"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [isSignUp, setIsSignUp] = useState(false);
const [fullName, setFullName] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [mounted, setMounted] = useState(false);

useEffect(() => {
setMounted(true);
const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) window.location.href = "/dashboard";
};
checkUser();
}, []);

const handleAuth = async (e) => {
e.preventDefault();
setLoading(true);
setError("");

if (isSignUp) {
    const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
    });
    if (error) { setError(error.message); setLoading(false); return; }
    window.location.href = "/dashboard";
} else {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    window.location.href = "/dashboard";
}
};

const handleGoogleLogin = async () => {
await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${window.location.origin}/dashboard` },
});
};

return (
<div style={{
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    background: "#0a0a12", position: "relative", overflow: "hidden",
    fontFamily: "'Outfit', sans-serif",
}}>
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
    @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(2deg); } }
    @keyframes pulse { 0%, 100% { opacity: 0.12; } 50% { opacity: 0.25; } }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
    @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(108,92,231,0.15); } 50% { box-shadow: 0 0 40px rgba(108,92,231,0.3); } }
    @keyframes spin { to { transform: rotate(360deg); } }
    
    .login-input {
        width: 100%; padding: 14px 16px; border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.04);
        color: #e8e8f0; font-size: 15px; font-family: 'Outfit', sans-serif;
        outline: none; transition: all 0.3s ease; box-sizing: border-box;
    }
    .login-input:focus {
        border-color: #6C5CE7; background: rgba(108,92,231,0.06);
        box-shadow: 0 0 0 3px rgba(108,92,231,0.1);
    }
    .login-input::placeholder { color: rgba(255,255,255,0.25); }
    
    .login-btn {
        width: 100%; padding: 14px; border-radius: 12px; border: none;
        font-size: 16px; font-weight: 700; cursor: pointer;
        font-family: 'Outfit', sans-serif; transition: all 0.3s ease;
        display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .login-btn:hover { transform: translateY(-1px); }
    .login-btn:active { transform: scale(0.98); }
    
    .google-btn {
        width: 100%; padding: 13px; border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04);
        color: #e8e8f0; font-size: 14px; font-weight: 500; cursor: pointer;
        font-family: 'Outfit', sans-serif; transition: all 0.3s ease;
        display: flex; align-items: center; justify-content: center; gap: 10px;
    }
    .google-btn:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); }
    
    .toggle-link { color: #a29bfe; cursor: pointer; font-weight: 600; }
    .toggle-link:hover { color: #6C5CE7; text-decoration: underline; }
    `}</style>

    {/* Animated Background Orbs */}
    <div style={{
    position: "absolute", width: 500, height: 500, borderRadius: "50%",
    background: "radial-gradient(circle, #6C5CE7 0%, transparent 70%)",
    top: -150, left: -150, opacity: 0.08, filter: "blur(60px)",
    animation: "pulse 6s ease-in-out infinite",
    }} />
    <div style={{
    position: "absolute", width: 400, height: 400, borderRadius: "50%",
    background: "radial-gradient(circle, #00CEC9 0%, transparent 70%)",
    bottom: -100, right: -100, opacity: 0.08, filter: "blur(60px)",
    animation: "pulse 6s ease-in-out infinite 3s",
    }} />
    <div style={{
    position: "absolute", width: 300, height: 300, borderRadius: "50%",
    background: "radial-gradient(circle, #fd79a8 0%, transparent 70%)",
    top: "50%", right: "15%", opacity: 0.06, filter: "blur(60px)",
    animation: "pulse 8s ease-in-out infinite 1.5s",
    }} />

    {/* Floating Particles */}
    {[...Array(6)].map((_, i) => (
    <div key={i} style={{
        position: "absolute",
        width: 4 + Math.random() * 4, height: 4 + Math.random() * 4,
        borderRadius: "50%", background: "#6C5CE7",
        opacity: 0.15 + Math.random() * 0.15,
        top: `${10 + Math.random() * 80}%`,
        left: `${5 + Math.random() * 90}%`,
        animation: `float ${4 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 3}s`,
    }} />
    ))}

    {/* Grid Pattern */}
    <div style={{
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: "linear-gradient(rgba(108,92,231,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(108,92,231,0.03) 1px, transparent 1px)",
    backgroundSize: "60px 60px",
    }} />

    {/* Login Card */}
    <div style={{
    position: "relative", zIndex: 10, width: "100%", maxWidth: 420, padding: "0 20px",
    animation: mounted ? "fadeUp 0.8s ease" : "none",
    }}>
    {/* Logo & Brand */}
    <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{
        width: 64, height: 64, borderRadius: 18, margin: "0 auto 16px",
        background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "glow 4s ease-in-out infinite",
        }}>
        <svg width={28} height={28} viewBox="0 0 24 24" fill="none">
            <circle cx="8" cy="8" r="3" fill="white" />
            <circle cx="16" cy="14" r="3" fill="white" />
            <line x1="8" y1="8" x2="16" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: "#fff", margin: "0 0 4px" }}>DayLyft</h1>
        <p style={{ fontSize: 14, color: "#6c6c80", margin: 0 }}>Your AI copilot for life</p>
    </div>

    {/* Card */}
    <div style={{
        background: "rgba(18,18,30,0.8)", backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 20, padding: "32px 28px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
    }}>
        {/* Tab Switch */}
        <div style={{
        display: "flex", gap: 4, padding: 4, borderRadius: 12, marginBottom: 24,
        background: "rgba(255,255,255,0.04)",
        }}>
        <button onClick={() => { setIsSignUp(false); setError(""); }} style={{
            flex: 1, padding: "10px", borderRadius: 10, border: "none",
            background: !isSignUp ? "linear-gradient(135deg, #6C5CE7, #a29bfe)" : "transparent",
            color: !isSignUp ? "#fff" : "#6c6c80",
            fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
            transition: "all 0.3s",
        }}>Sign In</button>
        <button onClick={() => { setIsSignUp(true); setError(""); }} style={{
            flex: 1, padding: "10px", borderRadius: 10, border: "none",
            background: isSignUp ? "linear-gradient(135deg, #6C5CE7, #a29bfe)" : "transparent",
            color: isSignUp ? "#fff" : "#6c6c80",
            fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit, sans-serif",
            transition: "all 0.3s",
        }}>Sign Up</button>
        </div>

        {/* Google Button */}
        <button onClick={handleGoogleLogin} className="google-btn">
        <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Continue with Google
        </button>

        {/* Divider */}
        <div style={{
        display: "flex", alignItems: "center", gap: 12, margin: "20px 0",
        }}>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
        <span style={{ fontSize: 12, color: "#6c6c80" }}>or</span>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
        </div>

        {/* Form */}
        <div onSubmit={handleAuth} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {isSignUp && (
            <div style={{ animation: "slideIn 0.3s ease" }}>
            <label style={{ fontSize: 12, color: "#6c6c80", marginBottom: 6, display: "block", fontWeight: 500 }}>Full Name</label>
            <input
                type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                placeholder="Juan Masis" className="login-input"
            />
            </div>
        )}

        <div>
            <label style={{ fontSize: 12, color: "#6c6c80", marginBottom: 6, display: "block", fontWeight: 500 }}>Email</label>
            <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com" className="login-input"
            />
        </div>

        <div>
            <label style={{ fontSize: 12, color: "#6c6c80", marginBottom: 6, display: "block", fontWeight: 500 }}>Password</label>
            <input
            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" className="login-input"
            />
        </div>

        {error && (
            <div style={{
            padding: "10px 14px", borderRadius: 10,
            background: "rgba(255,107,107,0.08)", border: "1px solid rgba(255,107,107,0.2)",
            fontSize: 13, color: "#ff6b6b", animation: "slideIn 0.3s ease",
            }}>{error}</div>
        )}

        <button onClick={handleAuth} disabled={loading} className="login-btn" style={{
            background: loading ? "rgba(108,92,231,0.5)" : "linear-gradient(135deg, #6C5CE7, #a29bfe)",
            color: "#fff", marginTop: 4,
        }}>
            {loading ? (
            <>
                <span style={{
                width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)",
                borderTopColor: "#fff", borderRadius: "50%", display: "inline-block",
                animation: "spin 1s linear infinite",
                }} />
                {isSignUp ? "Creating account..." : "Signing in..."}
            </>
            ) : (
            <>
                {isSignUp ? "Create Account" : "Sign In"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
            </>
            )}
        </button>
        </div>
    </div>

    {/* Bottom text */}
    <div style={{ textAlign: "center", marginTop: 24 }}>
        <p style={{ fontSize: 13, color: "#6c6c80" }}>
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <span className="toggle-link" onClick={() => { setIsSignUp(!isSignUp); setError(""); }}>
            {isSignUp ? "Sign In" : "Sign Up Free"}
        </span>
        </p>
    </div>

    {/* Features badge */}
    <div style={{
        display: "flex", justifyContent: "center", gap: 16, marginTop: 20,
        animation: mounted ? "fadeUp 1.2s ease" : "none",
    }}>
        {[
        { icon: "✦", text: "40+ features" },
        { icon: "◆", text: "AI powered" },
        { icon: "○", text: "Free forever" },
        ].map((item, i) => (
        <div key={i} style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 11, color: "#6c6c80",
        }}>
            <span style={{ color: "#6C5CE7", fontSize: 10 }}>{item.icon}</span>
            {item.text}
        </div>
        ))}
    </div>
    </div>
</div>
);
}