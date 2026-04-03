"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { projects } from "@/data/content";

interface Props {
  open: boolean;
  onClose: () => void;
  orientation: string;
  origin?: { x: string; y: string };
}

type ProjectItem = (typeof projects)[0] & {
  subtitle?: string;
  summary?: string;
  impact?: string;
  stack?: string[];
  repo?: string;
  page?: number;
  logoBg?: string;
  comingSoon?: boolean;
};

function ProjectIcon({ project, size, selected, onSelect }: { project: ProjectItem; size: number; selected: boolean; onSelect: () => void }) {
  const logoSrc = project.logo;
  const logoBg = project.logoBg;
  const comingSoon = project.comingSoon;

  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        cursor: "pointer",
        width: size + 16,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.2255,
          overflow: "hidden",
          flexShrink: 0,
          background: logoBg ?? `linear-gradient(135deg, ${project.color}cc, ${project.color})`,
          border: selected ? "2px solid rgba(255,255,255,0.9)" : "1px solid rgba(255,255,255,0.22)",
          boxShadow: selected
            ? `0 0 0 3px rgba(124,58,237,0.45), 0 8px 26px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.26)`
            : `0 4px 18px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.22)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoSrc} alt={project.title} style={{ width: "80%", height: "80%", objectFit: "contain" }} />
        ) : (
          <span
            style={{
              color: "white",
              fontWeight: 800,
              fontSize: size * 0.26,
              fontFamily: "-apple-system, sans-serif",
              letterSpacing: "-0.03em",
              textAlign: "center",
              padding: "0 4px",
            }}
          >
            {project.title.slice(0, 2).toUpperCase()}
          </span>
        )}
        {comingSoon && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(4px)",
              fontSize: size * 0.12,
              color: "rgba(255,255,255,0.7)",
              textAlign: "center",
              fontFamily: "-apple-system, sans-serif",
              fontWeight: 600,
              letterSpacing: 0.2,
              padding: "2px 0 3px",
            }}
          >
            SOON
          </div>
        )}
      </div>
      <span
        style={{
          fontSize: 10,
          color: "white",
          textAlign: "center",
          fontWeight: 500,
          letterSpacing: -0.1,
          textShadow: "0 1px 4px rgba(0,0,0,0.8)",
          maxWidth: size + 12,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          lineHeight: 1.2,
        }}
      >
        {project.title}
      </span>
    </motion.div>
  );
}

const COLS = 3;
const ROWS = 3;

export default function ProjectsFolder({ open, onClose, orientation, origin }: Props) {
  const isLandscape = orientation === "landscape";
  const iconSize = isLandscape ? 76 : 68;
  const [page, setPage] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id ?? "");
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const wheelAccum = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hPad = isLandscape ? 28 : 22;
  const contentWidth = COLS * (iconSize + 16) + (COLS - 1) * (isLandscape ? 14 : 12);
  const cardWidth = contentWidth + hPad * 2;

  const page1 = projects.filter((p) => !(p as ProjectItem).page || (p as ProjectItem).page === 1);
  const page2 = projects.filter((p) => (p as ProjectItem).page === 2);
  const pages = [page1, page2].filter((p) => p.length > 0);
  const totalPages = pages.length;

  const selectedProject = useMemo(
    () => (projects.find((p) => p.id === selectedProjectId) as ProjectItem | undefined) ?? (projects[0] as ProjectItem | undefined),
    [selectedProjectId],
  );

  const originX = origin?.x ?? "50%";
  const originY = origin?.y ?? "50%";

  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    wheelAccum.current += e.deltaX;
    if (wheelTimer.current) clearTimeout(wheelTimer.current);
    wheelTimer.current = setTimeout(() => {
      wheelAccum.current = 0;
    }, 300);
    if (wheelAccum.current > 60) {
      wheelAccum.current = 0;
      setPage((p) => Math.min(p + 1, totalPages - 1));
    } else if (wheelAccum.current < -60) {
      wheelAccum.current = 0;
      setPage((p) => Math.max(p - 1, 0));
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    swipeStart.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!swipeStart.current) return;
    const dx = e.clientX - swipeStart.current.x;
    const dy = e.clientY - swipeStart.current.y;
    swipeStart.current = null;
    if (Math.abs(dx) < 8) return;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx < -40 && page < totalPages - 1) setPage((p) => p + 1);
      else if (dx > 40 && page > 0) setPage((p) => p - 1);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="folder-root"
          initial={{ background: "rgba(0,0,0,0)", backdropFilter: "blur(0px) saturate(1)" }}
          animate={{ background: "rgba(0,0,0,0.22)", backdropFilter: "blur(28px) saturate(1.6)" }}
          exit={{ background: "rgba(0,0,0,0)", backdropFilter: "blur(0px) saturate(1)" }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{ position: "absolute", inset: 0, zIndex: 25, WebkitBackdropFilter: "blur(28px) saturate(1.6)" }}
        >
          <motion.div
            key="folder-card-wrapper"
            initial={{ scale: 0.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.08, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              transformOrigin: `${originX} ${originY}`,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                pointerEvents: "auto",
                background: "rgba(255,255,255,0.14)",
                backdropFilter: "blur(60px) saturate(2.2) brightness(1.1)",
                WebkitBackdropFilter: "blur(60px) saturate(2.2) brightness(1.1)",
                border: "1px solid rgba(255,255,255,0.32)",
                borderRadius: 28,
                padding: isLandscape ? "22px 28px 20px" : "18px 22px 16px",
                boxShadow: "0 24px 64px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.05)",
                width: `${cardWidth}px`,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  marginBottom: 16,
                  color: "white",
                  fontSize: isLandscape ? 18 : 16,
                  fontWeight: 600,
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                  letterSpacing: -0.3,
                  textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                }}
              >
                Ventures
              </div>

              <div style={{ overflow: "hidden", touchAction: "pan-y" }} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onWheel={onWheel}>
                <motion.div
                  animate={{ x: -page * contentWidth }}
                  transition={{ type: "spring", stiffness: 380, damping: 36 }}
                  style={{ display: "flex", width: `${totalPages * contentWidth}px` }}
                >
                  {pages.map((pageProjects, pi) => (
                    <div
                      key={pi}
                      style={{
                        width: contentWidth,
                        flexShrink: 0,
                        display: "grid",
                        gridTemplateColumns: `repeat(${COLS}, ${iconSize + 16}px)`,
                        gap: isLandscape ? "16px 14px" : "14px 12px",
                        justifyContent: "center",
                        minHeight: isLandscape ? `${ROWS * (iconSize + 30)}px` : `${ROWS * (iconSize + 28)}px`,
                        alignContent: "start",
                      }}
                    >
                      {pageProjects.map((project) => (
                        <ProjectIcon
                          key={project.id}
                          project={project as ProjectItem}
                          size={iconSize}
                          selected={selectedProject?.id === project.id}
                          onSelect={() => setSelectedProjectId(project.id)}
                        />
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>

              {totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
                  {pages.map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: i === page ? 1 : 0.35, scale: i === page ? 1 : 0.8 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setPage(i)}
                      style={{ width: 6, height: 6, borderRadius: "50%", background: "white", cursor: "pointer" }}
                    />
                  ))}
                </div>
              )}

              {selectedProject && (
                <div
                  style={{
                    marginTop: 14,
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.2)",
                    border: "1px solid rgba(255,255,255,0.32)",
                    padding: "12px 13px",
                    color: "white",
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{selectedProject.title}</div>
                  {selectedProject.subtitle && <div style={{ fontSize: 12, opacity: 0.9, marginBottom: 8 }}>{selectedProject.subtitle}</div>}
                  {selectedProject.summary && <div style={{ fontSize: 12, lineHeight: 1.45, opacity: 0.95, marginBottom: 8 }}>{selectedProject.summary}</div>}
                  {selectedProject.impact && <div style={{ fontSize: 11.5, lineHeight: 1.4, opacity: 0.9, marginBottom: 8 }}>Impact: {selectedProject.impact}</div>}
                  {selectedProject.stack && selectedProject.stack.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                      {selectedProject.stack.map((t) => (
                        <span key={t} style={{ fontSize: 10.5, padding: "3px 7px", borderRadius: 999, background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.25)" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 8 }}>
                    {selectedProject.live && (
                      <button
                        onClick={() => window.open(selectedProject.live, "_blank", "noopener,noreferrer")}
                        style={{
                          border: "none",
                          borderRadius: 10,
                          background: "rgba(124,58,237,0.95)",
                          color: "white",
                          fontSize: 12,
                          fontWeight: 700,
                          padding: "8px 10px",
                          cursor: "pointer",
                        }}
                      >
                        Open Project ↗
                      </button>
                    )}
                    {selectedProject.repo && (
                      <button
                        onClick={() => window.open(selectedProject.repo, "_blank", "noopener,noreferrer")}
                        style={{
                          borderRadius: 10,
                          border: "1px solid rgba(255,255,255,0.35)",
                          background: "rgba(255,255,255,0.12)",
                          color: "white",
                          fontSize: 12,
                          fontWeight: 600,
                          padding: "8px 10px",
                          cursor: "pointer",
                        }}
                      >
                        GitHub
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
