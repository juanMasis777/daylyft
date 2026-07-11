"use client";

export default function PrivacyPage() {
return (
<div style={{
    minHeight: "100vh", background: "#080d0b",
    fontFamily: "'Outfit', sans-serif", padding: "60px 24px",
}}>
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
    <a href="/" style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        color: "#10b981", textDecoration: "none", fontSize: 14, marginBottom: 32,
    }}>← Back to DayLyft</a>

    <h1 style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Privacy Policy</h1>
    <p style={{ fontSize: 13, color: "#6c6c80", marginBottom: 32 }}>Last updated: April 19, 2026</p>

    <div style={{ fontSize: 15, color: "#b0b0c0", lineHeight: 1.8 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginTop: 32, marginBottom: 12 }}>1. Introduction</h2>
        <p>DayLyft ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our application and website at daylyft.com.</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginTop: 32, marginBottom: 12 }}>2. Information we collect</h2>
        <p style={{ marginBottom: 12 }}>We collect the following types of information:</p>
        <p><strong style={{ color: "#e8e8f0" }}>Account Information:</strong> When you create an account, we collect your email address, name, and password. If you sign in with Google, we receive your name and email from Google.</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: "#e8e8f0" }}>User-Generated Content:</strong> Tasks, journal entries, habits, goals, budget data, and other content you create within the app. This data is stored securely in our database and is only accessible by you.</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: "#e8e8f0" }}>Local Data:</strong> Some features (water tracker, sleep tracker, notes, etc.) store data locally on your device using localStorage. This data never leaves your device.</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: "#e8e8f0" }}>AI Interactions:</strong> When you use Kai (our AI copilot), your messages are sent to our AI provider to generate responses. We do not store conversation history on our servers.</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginTop: 32, marginBottom: 12 }}>3. How we use your information</h2>
        <p>We use your information to:</p>
        <p style={{ marginTop: 8 }}>• Provide and maintain the DayLyft service</p>
        <p>• Authenticate your account and protect your data</p>
        <p>• Generate AI-powered insights and recommendations through Kai</p>
        <p>• Improve our app and develop new features</p>
        <p>• Send important service-related communications</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginTop: 32, marginBottom: 12 }}>4. Data sharing</h2>
        <p>We do NOT sell, rent, or share your personal data with third parties for marketing purposes. We only share data with:</p>
        <p style={{ marginTop: 8 }}>• <strong style={{ color: "#e8e8f0" }}>Supabase:</strong> Our database provider, which stores your account and app data securely.</p>
        <p>• <strong style={{ color: "#e8e8f0" }}>Anthropic:</strong> Our AI provider, which processes your Kai chat messages to generate responses.</p>
        <p>• <strong style={{ color: "#e8e8f0" }}>Vercel:</strong> Our hosting provider, which serves the application.</p>
        <p>• <strong style={{ color: "#e8e8f0" }}>Stripe:</strong> Our payment processor, if you subscribe to a paid plan.</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginTop: 32, marginBottom: 12 }}>5. Data security</h2>
        <p>All data transmitted between your device and our servers is encrypted using HTTPS/TLS. Your password is hashed and never stored in plain text. We use Row Level Security (RLS) in our database to ensure you can only access your own data.</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginTop: 32, marginBottom: 12 }}>6. Data retention</h2>
        <p>We retain your data for as long as your account is active. If you delete your account, all associated data will be permanently deleted within 30 days.</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginTop: 32, marginBottom: 12 }}>7. Your rights</h2>
        <p>You have the right to:</p>
        <p style={{ marginTop: 8 }}>• Access your personal data</p>
        <p>• Export your data at any time from Settings</p>
        <p>• Request deletion of your account and all associated data</p>
        <p>• Opt out of non-essential communications</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginTop: 32, marginBottom: 12 }}>8. Children's privacy</h2>
        <p>DayLyft is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18.</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginTop: 32, marginBottom: 12 }}>9. Changes to this policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginTop: 32, marginBottom: 12 }}>10. Contact us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p style={{ marginTop: 8 }}>
        <a href="mailto:juanmasis777@gmail.com" style={{ color: "#10b981", textDecoration: "none" }}>juanmasis777@gmail.com</a>
        </p>
    </div>

    <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#636e72" }}>© 2026 DayLyft. All rights reserved. Made with ❤️ in Miami</p>
    </div>
    </div>
</div>
);
}