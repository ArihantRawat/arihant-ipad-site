"use client";

import { useState } from "react";
import { LazyMotion, m, domAnimation, AnimatePresence } from "framer-motion";
import { education } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

const noteContent: Record<string, { body: string }> = {
  usc: {
    body: `I am currently pursuing an MBA (STEM) at USC Marshall School of Business in Los Angeles.

This phase is helping me sharpen product strategy, leadership, and business judgment while building on my engineering background. I am focused on becoming a stronger end-to-end product builder who can move from insight to execution.

Scholarships and milestones: Dean's Merit Scholarship (100%), Prediger Endowed Scholarship, and GMAT Focus Edition 705.`,
  },
  nsit: {
    body: `I completed my B.E. in Information Technology at NSIT (now NSUT) in Delhi, India.

My undergraduate years built the technical foundation I still rely on today: systems thinking, software engineering fundamentals, and structured problem-solving.

I graduated with First Class Distinction (CGPA 8.6/10.0), which set up my transition into product-focused engineering roles at high-growth teams.`,
  },
};

function noteDate(period: string): string {
  if (period.toLowerCase().includes("expected")) return period;
  const yearMatch = period.match(/\d{4}/);
  return yearMatch ? yearMatch[0] : period;
}

export default function EducationApp({ onClose: _onClose }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedEd = education.find((e) => e.id === selected);
  const recent = education[0];

  return (
    <LazyMotion features={domAnimation}>
      <div className="app-window" style={{ background: "#f2f2f7" }}>
        <AnimatePresence mode="wait">
          {!selected ? (
            <m.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -30 }}
              style={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <div className="ios-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 0 32px" }}>
                <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ padding: "4px 16px 18px" }}>
                  <h1 className="ios-large-title font-poppins" style={{ color: "#1c1c1e" }}>
                    Education
                  </h1>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 }}
                  style={{ margin: "0 16px 22px" }}
                >
                  <div
                    style={{
                      background: "white",
                      borderRadius: 18,
                      padding: 18,
                      boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
                    }}
                  >
                    <div style={{ marginBottom: 10 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#8e8e93", letterSpacing: 0.2 }}>Current</span>
                    </div>

                    <h2
                      style={{
                        fontSize: 20,
                        fontWeight: 800,
                        color: "#1c1c1e",
                        lineHeight: 1.2,
                        marginBottom: 10,
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                        letterSpacing: -0.4,
                      }}
                    >
                      {recent.school}
                    </h2>

                    <p style={{ fontSize: 14, color: "#636366", lineHeight: 1.55, marginBottom: 14 }}>
                      {noteContent[recent.id]?.body.slice(0, 120).trim()}...
                    </p>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, color: "#aeaeb2" }}>{recent.period}</span>
                      <m.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelected(recent.id)}
                        style={{
                          background: "white",
                          border: "none",
                          borderRadius: 20,
                          padding: "7px 18px",
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#1c1c1e",
                          cursor: "pointer",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                          fontFamily: "-apple-system, sans-serif",
                        }}
                      >
                        Open
                      </m.button>
                    </div>
                  </div>
                </m.div>

                <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} style={{ margin: "0 16px" }}>
                  <div
                    style={{
                      background: "white",
                      borderRadius: 18,
                      overflow: "hidden",
                      boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "14px 16px 10px",
                        borderBottom: "0.5px solid rgba(60,60,67,0.12)",
                      }}
                    >
                      <span style={{ fontSize: 16, fontWeight: 700, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif" }}>
                        Academic Timeline
                      </span>
                      <span style={{ fontSize: 13, color: "#8e8e93" }}>{education.length} entries</span>
                    </div>

                    {education.map((ed, i) => (
                      <m.div
                        key={ed.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 + i * 0.04 }}
                        whileTap={{ background: "rgba(0,0,0,0.04)" }}
                        onClick={() => setSelected(ed.id)}
                        style={{
                          padding: "12px 16px",
                          borderBottom: i < education.length - 1 ? "0.5px solid rgba(60,60,67,0.1)" : "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span
                            style={{
                              display: "block",
                              fontSize: 14,
                              fontWeight: 700,
                              color: "#1c1c1e",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              marginBottom: 3,
                              fontFamily: "-apple-system, sans-serif",
                            }}
                          >
                            {ed.school}
                          </span>
                          <p style={{ fontSize: 13, color: "#8e8e93", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {ed.degree}
                          </p>
                        </div>
                        <span style={{ fontSize: 12, color: "#aeaeb2", flexShrink: 0, whiteSpace: "nowrap" }}>{noteDate(ed.period)}</span>
                        <svg width="8" height="13" viewBox="0 0 8 13" fill="none" style={{ flexShrink: 0 }}>
                          <path d="M1 1L7 6.5L1 12" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </m.div>
                    ))}
                  </div>
                </m.div>
              </div>
            </m.div>
          ) : (
            <m.div
              key={`detail-${selected}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              style={{ display: "flex", flexDirection: "column", height: "100%", background: "white" }}
            >
              <div style={{ padding: "14px 16px 4px", flexShrink: 0 }}>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    color: "#8e8e93",
                    fontSize: 16,
                    fontWeight: 400,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "-apple-system, sans-serif",
                    padding: 0,
                  }}
                >
                  <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
                    <path d="M7 1L1 6.5L7 12" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back
                </button>
              </div>

              {selectedEd && (
                <div className="ios-scroll" style={{ flex: 1, overflowY: "auto", padding: "8px 20px 32px" }}>
                  <h1
                    style={{
                      fontSize: 26,
                      fontWeight: 800,
                      color: selectedEd.color,
                      letterSpacing: -0.6,
                      lineHeight: 1.2,
                      marginBottom: 8,
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                    }}
                  >
                    {selectedEd.school}
                  </h1>

                  <p style={{ fontSize: 13, color: "#aeaeb2", marginBottom: 4, letterSpacing: 0.1 }}>{selectedEd.period}</p>
                  {selectedEd.subtitle && (
                    <p style={{ fontSize: 13, color: "#636366", marginBottom: 20, fontStyle: "italic" }}>{selectedEd.subtitle}</p>
                  )}
                  {!selectedEd.subtitle && <div style={{ marginBottom: 20 }} />}

                  <div
                    style={{
                      fontSize: 16,
                      lineHeight: 1.75,
                      color: "#1c1c1e",
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                    }}
                  >
                    {(noteContent[selectedEd.id]?.body || selectedEd.description).split("\n\n").map((para, paraNum) => (
                      <p key={`para-${paraNum}`} style={{ marginBottom: 18 }}>
                        {para}
                      </p>
                    ))}
                  </div>

                  {selectedEd.highlights.length > 0 && (
                    <div style={{ marginTop: 8 }}>
                      <p
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: "#1c1c1e",
                          marginBottom: 10,
                          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                        }}
                      >
                        Highlights
                      </p>
                      {selectedEd.highlights.map((h, hNum) => (
                        <div key={`highlight-${hNum}`} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                          <span style={{ fontSize: 20, lineHeight: "1.55", color: "#1c1c1e", flexShrink: 0, marginTop: -1 }}>•</span>
                          <p style={{ fontSize: 16, color: "#1c1c1e", lineHeight: 1.55, margin: 0 }}>{h}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}
