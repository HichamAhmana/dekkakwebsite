"use client";

import { useState } from "react";

const GOLD = "#C9A84C";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

const SHARE_PLATFORMS = [
  {
    id: "x",
    label: "X (Twitter)",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.262 5.638L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
      </svg>
    ),
    getUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&via=MohamedDekkak1`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    getUrl: (url: string, title: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
    getUrl: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
];

export default function SocialShare({ url, title, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const fullUrl = url.startsWith("http") ? url : `https://dekkak.com${url}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = fullUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const openShare = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  return (
    <div
      style={{
        borderTop: "1px solid rgba(201,168,76,0.18)",
        borderBottom: "1px solid rgba(201,168,76,0.18)",
        padding: "36px 0",
        margin: "64px 0 0",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* Label row */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ width: "28px", height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
        <span
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: GOLD,
            opacity: 0.85,
          }}
        >
          Share This Article
        </span>
        <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${GOLD}44, transparent)` }} />
      </div>

      {/* Excerpt teaser */}
      {description && (
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "13px",
            fontWeight: 300,
            lineHeight: 1.7,
            color: "var(--text-color)",
            opacity: 0.55,
            margin: 0,
            fontStyle: "italic",
          }}
        >
          {description.length > 140 ? `${description.substring(0, 140)}…` : description}
        </p>
      )}

      {/* Buttons row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
        {SHARE_PLATFORMS.map((platform) => {
          const isHovered = hoveredId === platform.id;
          return (
            <button
              key={platform.id}
              onClick={() => openShare(platform.getUrl(fullUrl, title))}
              onMouseEnter={() => setHoveredId(platform.id)}
              onMouseLeave={() => setHoveredId(null)}
              aria-label={`Share on ${platform.label}`}
              title={`Share on ${platform.label}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                background: isHovered ? GOLD : "transparent",
                border: `1px solid ${isHovered ? GOLD : "rgba(201,168,76,0.3)"}`,
                color: isHovered ? "#0A0A0A" : GOLD,
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s ease",
                transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                boxShadow: isHovered ? `0 8px 24px rgba(201,168,76,0.2)` : "none",
              }}
            >
              {platform.icon}
              <span className="share-label">{platform.label}</span>
            </button>
          );
        })}

        {/* Copy link button */}
        <button
          onClick={handleCopy}
          onMouseEnter={() => setHoveredId("copy")}
          onMouseLeave={() => setHoveredId(null)}
          aria-label="Copy link"
          title="Copy link to clipboard"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            background: copied ? "rgba(201,168,76,0.12)" : "transparent",
            border: `1px solid ${copied ? GOLD : "rgba(201,168,76,0.3)"}`,
            color: GOLD,
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>

      {/* Mobile: hide labels to save space */}
      <style>{`
        @media (max-width: 480px) {
          .share-label { display: none; }
        }
      `}</style>
    </div>
  );
}
