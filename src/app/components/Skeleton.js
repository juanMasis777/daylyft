"use client";

export function Skeleton({ width = "100%", height = 20, borderRadius = 8, style = {} }) {
return (
<div
    style={{
    width,
    height,
    borderRadius,
    background: "linear-gradient(90deg, var(--fm-card) 0%, var(--fm-surface) 50%, var(--fm-card) 100%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s ease-in-out infinite",
    ...style,
    }}
/>
);
}

export function SkeletonCard({ height = 120 }) {
return (
<div style={{
    background: "var(--fm-surface)",
    border: "1px solid var(--fm-border)",
    borderRadius: 14,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
}}>
    <Skeleton width="60%" height={16} />
    <Skeleton width="100%" height={12} />
    <Skeleton width="80%" height={12} />
    <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
    <Skeleton width={60} height={20} borderRadius={6} />
    <Skeleton width={50} height={20} borderRadius={6} />
    </div>
</div>
);
}

export function SkeletonStat() {
return (
<div style={{
    background: "var(--fm-surface)",
    border: "1px solid var(--fm-border)",
    borderRadius: 12,
    padding: 16,
    textAlign: "center",
}}>
    <Skeleton width="50%" height={10} style={{ margin: "0 auto 8px" }} />
    <Skeleton width="30%" height={28} style={{ margin: "0 auto 4px" }} />
    <Skeleton width="40%" height={10} style={{ margin: "0 auto" }} />
</div>
);
}

export function SkeletonList({ items = 4 }) {
return (
<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    {Array.from({ length: items }, (_, i) => (
    <div key={i} style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        background: "var(--fm-surface)",
        border: "1px solid var(--fm-border)",
        borderRadius: 12,
    }}>
        <Skeleton width={36} height={36} borderRadius={10} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <Skeleton width="70%" height={14} />
        <Skeleton width="40%" height={11} />
        </div>
    </div>
    ))}
</div>
);
}

export function SkeletonHeader() {
return (
<div style={{ marginBottom: 16 }}>
    <Skeleton width="30%" height={22} style={{ marginBottom: 6 }} />
    <Skeleton width="60%" height={13} />
</div>
);
}