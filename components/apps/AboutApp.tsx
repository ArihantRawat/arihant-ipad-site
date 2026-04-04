"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { profile, social } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

type SectionKey = "identity" | "career" | "education" | "skills" | "interests" | "contact";

const quickStats = [
  { label: "Experience", value: "4+ Years" },
  { label: "Products", value: "10+ Shipped" },
  { label: "Focus", value: "PM + AI" },
];

const sections: {
  key: SectionKey;
  label: string;
  icon: string;
  color: string;
  title: string;
  summary: string;
  rows: Array<{ k: string; v: string }>;
}[] = [
  {
    key: "identity",
    label: "Identity",
    icon: "ID",
    color: "#7C3AED",
    title: "Who I Am",
    summary:
      "I am a product-minded builder focused on turning ambiguity into shipped outcomes. I combine engineering depth with product judgment to build practical, user-centered technology.",
    rows: [
      { k: "Name", v: "Arihant Rawat" },
      { k: "Based in", v: "Los Angeles, California" },
      { k: "Originally", v: "India (Delhi / Bangalore)" },
      { k: "Focus", v: "Product Management + AI Products" },
    ],
  },
  {
    key: "career",
    label: "Career",
    icon: "WK",
    color: "#8B5CF6",
    title: "Career Snapshot",
    summary:
      "At Salesforce and Cult.fit, I led end-to-end product execution across user journeys, backend systems, data workflows, and cross-functional delivery from idea to launch.",
    rows: [
      { k: "Latest role", v: "Senior Product Developer (MTS), Salesforce" },
      { k: "Prior", v: "Product Developer → Senior Product Developer, Cult.fit" },
      { k: "Strength", v: "Bridging product, engineering, and data" },
      { k: "Current direction", v: "Product Management + AI-native products" },
    ],
  },
  {
    key: "education",
    label: "Education",
    icon: "ED",
    color: "#A855F7",
    title: "Education",
    summary:
      "I am currently pursuing an MBA (STEM) at USC Marshall to deepen product, business, and leadership capabilities. My engineering foundation from NSIT (now NSUT) shapes my systems-first problem-solving approach.",
    rows: [
      { k: "Current", v: "MBA (STEM) Candidate, USC Marshall" },
      { k: "Expected", v: "May 2027" },
      { k: "Undergrad", v: "B.E. Information Technology, NSIT/NSUT" },
      { k: "Scholarships", v: "Dean's Merit + Prediger Endowed" },
    ],
  },
  {
    key: "skills",
    label: "Skills",
    icon: "SK",
    color: "#6D28D9",
    title: "Core Skills",
    summary:
      "My toolkit blends software execution with product thinking: full-stack development, AI prototyping, experimentation, roadmapping, and clear stakeholder communication.",
    rows: [
      { k: "Product", v: "Strategy, Roadmapping, User Research" },
      { k: "Engineering", v: "TypeScript, React, Next.js, Python, SQL" },
      { k: "Data", v: "SQL, analytics, experimentation" },
      { k: "AI", v: "LLM integration and product workflows" },
    ],
  },
  {
    key: "interests",
    label: "Interests",
    icon: "IN",
    color: "#9333EA",
    title: "Beyond Work",
    summary:
      "Outside work, I enjoy films, music discovery, outdoor activity, and practical self-improvement systems. These interests keep my thinking creative and grounded.",
    rows: [
      { k: "Music", v: "Album discovery and curation" },
      { k: "Film", v: "Story-driven cinema" },
      { k: "Sports", v: "Hiking, pickleball, and active weekends" },
      { k: "Lifestyle", v: "Routines, focus systems, and growth mindset" },
    ],
  },
  {
    key: "contact",
    label: "Contact",
    icon: "CT",
    color: "#7E22CE",
    title: "Find Me",
    summary:
      "I am always open to thoughtful conversations about products, AI, and building high-leverage systems. Reach out via email or social platforms below.",
    rows: [
      { k: "Email", v: profile.email },
      { k: "GitHub", v: "ArihantRawat" },
      { k: "LinkedIn", v: "/in/arihantrawat" },
      { k: "YouTube", v: "@ArihantRawat" },
    ],
  },
];

export default function AboutApp({ orientation }: Props) {
  const [active, setActive] = useState<SectionKey>("identity");
  const compact = orientation === "portrait";

  const selected = useMemo(
    () => sections.find((s) => s.key === active) ?? sections[0],
    [active],
  );

  return (
    <div className="app-window" style={{ background: "#efeff4" }}>
      <div className="ios-scroll" style={{ flex: 1, overflowY: "auto", padding: compact ? 12 : 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "340px 1fr", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: compact ? 40 : 52, fontWeight: 800, letterSpacing: -1.4, color: "#111827", margin: "2px 4px 12px", lineHeight: 1 }}>
              About
            </h1>

            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 18, overflow: "hidden", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px" }}>
                <Image src={profile.photo} alt={profile.photoAlt} width={56} height={56} style={{ borderRadius: 999, objectFit: "cover" }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>{profile.name}</div>
                  <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>{profile.tagline}</div>
                </div>
              </div>
            </div>

            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 18, overflow: "hidden" }}>
              {sections.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => setActive(s.key)}
                  style={{
                    width: "100%",
                    border: "none",
                    borderTop: i ? "1px solid #edeef0" : "none",
                    background: active === s.key ? "#f5f3ff" : "#fff",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 14px",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: s.color, color: "#fff", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                    {s.icon}
                  </div>
                  <div style={{ flex: 1, fontSize: 16, fontWeight: 500, color: "#111827" }}>{s.label}</div>
                  <div style={{ color: "#c4c4c6", fontSize: 24, lineHeight: 1 }}>›</div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 18, padding: "16px", textAlign: "center" }}>
              <Image src={profile.photo} alt={profile.photoAlt} width={92} height={92} style={{ borderRadius: 999, objectFit: "cover", margin: "0 auto 10px" }} />
              <h2 style={{ fontSize: compact ? 34 : 44, fontWeight: 800, letterSpacing: -1.2, lineHeight: 1.05, marginBottom: 6, color: "#111827" }}>{profile.name}</h2>
              <p style={{ fontSize: compact ? 15 : 17, color: "#6b7280" }}>{profile.tagline}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "repeat(3, 1fr)", gap: 10 }}>
              {quickStats.map((s) => (
                <div key={s.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "12px 14px" }}>
                  <div style={{ fontSize: 12, color: "#8b8f98", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: "#6D28D9", letterSpacing: -0.6 }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div>
              <p style={{ fontSize: 13, color: "#81838a", margin: "0 6px 6px", textTransform: "uppercase", letterSpacing: 0.7 }}>Summary</p>
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 18, padding: "16px 18px" }}>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 8, letterSpacing: -0.5 }}>{selected.title}</h3>
                <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.62 }}>{selected.summary}</p>
              </div>
            </div>

            <div>
              <p style={{ fontSize: 13, color: "#81838a", margin: "0 6px 6px", textTransform: "uppercase", letterSpacing: 0.7 }}>Details</p>
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 18, overflow: "hidden" }}>
                {selected.rows.map((row, i) => (
                  <div key={row.k} style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "1fr 1.4fr", gap: 10, padding: "13px 16px", borderTop: i ? "1px solid #edeef0" : "none" }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>{row.k}</div>
                    <div style={{ fontSize: 15, color: "#6b7280", textAlign: compact ? "left" : "right" }}>{row.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 18, overflow: "hidden" }}>
              {[
                { label: "GitHub", url: social.github },
                { label: "LinkedIn", url: social.linkedin },
                { label: "YouTube", url: social.youtube },
                { label: "X", url: social.x },
              ].map((link, i, arr) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textDecoration: "none",
                    padding: "12px 16px",
                    borderTop: i ? "1px solid #edeef0" : "none",
                    color: "#111827",
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 600 }}>{link.label}</span>
                  <span style={{ fontSize: 13, color: "#8b8f98" }}>Open ↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
