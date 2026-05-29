"use client";
import { useState, useEffect, useCallback } from "react";
import { Copy, Check, Search } from "lucide-react";
import { toast, Toaster } from "sonner";
import Navbar from "@/components/Navbar";

const LOGO =
  "https://raw.createusercontent.com/2eeffb20-0d06-4217-b99c-799e258d97fa/";
const TYPE_BADGES = {
  video: { emoji: "🎬", label: "Video", bg: "#E8F4FF", color: "#1565C0" },
  image: { emoji: "🖼️", label: "Image", bg: "#F5E8FF", color: "#6A1B9A" },
  text: { emoji: "✍️", label: "AI Builder", bg: "#FFF8E8", color: "#E65100" },
};

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [copiedId, setCopiedId] = useState(null);

  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch("/api/prompts");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setHistory(await res.json());
    } catch (e) {
      console.error(e);
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (str) => {
    const diff = (Date.now() - new Date(str)) / 1000;
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(str).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const filtered = history.filter(
    (item) =>
      item.content.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "all" || item.source_type === filter),
  );

  const cardStyle = {
    background: "#fff",
    borderRadius: 20,
    padding: "20px 22px",
    border: "1.5px solid #F0EAFF",
    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
    marginBottom: 12,
  };

  return (
    <div
      style={{
        background: "#F8F6FF",
        minHeight: "100vh",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <Navbar />
      <Toaster position="top-center" richColors />

      <div
        style={{ maxWidth: 900, margin: "0 auto", padding: "88px 20px 60px" }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src={LOGO}
              alt=""
              style={{
                width: 36,
                height: 36,
                borderRadius: 11,
                objectFit: "cover",
              }}
            />
            <div>
              <h1
                style={{
                  fontSize: "clamp(22px,4vw,34px)",
                  fontWeight: 800,
                  color: "#1A1A2E",
                  letterSpacing: "-1px",
                }}
              >
                Prompt{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg,#FF6B35,#E040FB)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  History
                </span>
              </h1>
              <p
                style={{
                  fontSize: 13,
                  color: "#AAA",
                  fontWeight: 500,
                  marginTop: 2,
                }}
              >
                {history.length} prompts saved · Copy and reuse anytime
              </p>
            </div>
          </div>
          <a
            href="/generate"
            style={{
              padding: "11px 22px",
              borderRadius: 13,
              fontSize: 14,
              fontWeight: 700,
              background: "linear-gradient(135deg,#FF6B35,#E040FB)",
              color: "#fff",
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(224,64,251,0.3)",
            }}
          >
            ✨ New Prompt
          </a>
        </div>

        {/* Search + Filter */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <Search
              size={15}
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#BBB",
                pointerEvents: "none",
              }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your prompts…"
              style={{
                width: "100%",
                background: "#fff",
                border: "1.5px solid #EAE0FF",
                borderRadius: 13,
                paddingLeft: 40,
                paddingRight: 16,
                paddingTop: 12,
                paddingBottom: 12,
                fontSize: 14,
                color: "#333",
                fontFamily: "inherit",
                outline: "none",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 7 }}>
            {[
              ["all", "All"],
              ["video", "🎬 Video"],
              ["image", "🖼️ Image"],
              ["text", "✍️ AI"],
            ].map(([f, l]) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "10px 16px",
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 700,
                  border: "1.5px solid",
                  borderColor: filter === f ? "#E040FB" : "#EAE0FF",
                  background: filter === f ? "#F5E8FF" : "#fff",
                  color: filter === f ? "#9C27B0" : "#888",
                  cursor: "pointer",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div
              key={i}
              style={{ ...cardStyle, animation: "pulse 1.5s infinite" }}
            >
              <div
                style={{
                  height: 12,
                  background: "#F0EAFF",
                  borderRadius: 6,
                  width: "40%",
                  marginBottom: 14,
                }}
              />
              <div
                style={{
                  height: 10,
                  background: "#F5F0FF",
                  borderRadius: 6,
                  marginBottom: 8,
                }}
              />
              <div
                style={{
                  height: 10,
                  background: "#F5F0FF",
                  borderRadius: 6,
                  width: "70%",
                }}
              />
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "64px 20px",
              background: "#fff",
              borderRadius: 24,
              border: "1.5px solid #F0EAFF",
            }}
          >
            <div style={{ fontSize: 52, marginBottom: 16 }}>📭</div>
            <h3
              style={{
                fontWeight: 700,
                fontSize: 18,
                color: "#333",
                marginBottom: 8,
              }}
            >
              {search || filter !== "all"
                ? "No prompts found"
                : "No prompts yet"}
            </h3>
            <p style={{ color: "#AAA", fontSize: 14, marginBottom: 24 }}>
              {search || filter !== "all"
                ? "Try a different search or filter"
                : "Generate your first prompt to see it here"}
            </p>
            {!search && filter === "all" && (
              <a
                href="/generate"
                style={{
                  padding: "12px 28px",
                  borderRadius: 13,
                  fontWeight: 700,
                  background: "linear-gradient(135deg,#FF6B35,#E040FB)",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: 14,
                }}
              >
                ✨ Generate Now
              </a>
            )}
          </div>
        ) : (
          filtered.map((item) => {
            const badge = TYPE_BADGES[item.source_type] || TYPE_BADGES.text;
            return (
              <div key={item.id} style={cardStyle}>
                <div
                  style={{ display: "flex", alignItems: "flex-start", gap: 14 }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 10,
                      }}
                    >
                      <span
                        style={{
                          padding: "4px 12px",
                          borderRadius: 100,
                          fontSize: 11,
                          fontWeight: 700,
                          background: badge.bg,
                          color: badge.color,
                        }}
                      >
                        {badge.emoji} {badge.label}
                      </span>
                      <span
                        style={{ fontSize: 11, color: "#CCC", fontWeight: 500 }}
                      >
                        {formatDate(item.created_at)}
                      </span>
                    </div>
                    <p
                      style={{ fontSize: 14, color: "#444", lineHeight: 1.75 }}
                    >
                      {item.content}
                    </p>
                  </div>
                  <button
                    onClick={() => copy(item.content, item.id)}
                    style={{
                      flexShrink: 0,
                      padding: "9px",
                      borderRadius: 11,
                      border: "1.5px solid",
                      borderColor: copiedId === item.id ? "#6FCF97" : "#EAE0FF",
                      background: copiedId === item.id ? "#EDFFF5" : "#F8F6FF",
                      cursor: "pointer",
                      color: copiedId === item.id ? "#27AE60" : "#AAA",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {copiedId === item.id ? (
                      <Check size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
