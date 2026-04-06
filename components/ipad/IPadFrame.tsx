"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  orientation: "landscape" | "portrait";
  children: ReactNode;
  onPowerPress?: () => void;
}

// iPad Pro 11" (M4) Space Gray -realistic proportions
// Portrait:  630 × 900  outer frame
// Landscape: 900 × 630  outer frame

export default function IPadFrame({ orientation, children, onPowerPress }: Props) {
  const isLandscape = orientation === "landscape";

  const outerW = isLandscape ? 900 : 630;
  const outerH = isLandscape ? 630 : 900;

  // Thin bezels matching real iPad Pro 11"
  const bezelH = isLandscape ? 19 : 22;
  const bezelV = isLandscape ? 22 : 19;
  const screenW = outerW - bezelV * 2;
  const screenH = outerH - bezelH * 2;

  // Matte black aluminum frame gradient
  const frameGrad = `
    radial-gradient(ellipse at 25% 15%, #3a3a3f 0%, transparent 50%),
    radial-gradient(ellipse at 75% 85%, #0f0f12 0%, transparent 55%),
    linear-gradient(155deg, #2a2a2f 0%, #1d1d22 25%, #26262b 50%, #17171b 75%, #303036 100%)
  `;

  const btnGrad = isLandscape
    ? "linear-gradient(90deg, #111114 0%, #2a2a2f 50%, #1b1b20 100%)"
    : "linear-gradient(180deg, #111114 0%, #2a2a2f 50%, #1b1b20 100%)";

  return (
    <motion.div
      animate={{
        width: outerW,
        height: outerH,
        borderRadius: isLandscape ? 30 : 40,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      style={{
        background: frameGrad,
        position: "relative",
        flexShrink: 0,
        boxShadow: `
          0 0 0 0.5px rgba(0,0,0,0.08) inset,
          0 0 0 1px rgba(0,0,0,0.25),
          0 50px 120px rgba(0,0,0,0.55),
          0 20px 60px rgba(0,0,0,0.35),
          0 8px 24px rgba(0,0,0,0.25),
          inset 0 1px 0 rgba(255,255,255,0.9),
          inset 0 -1px 0 rgba(0,0,0,0.15)
        `,
      }}
    >
      {/* ── Side / Top Buttons ── */}
      {/* Power button (right side landscape / top-right portrait) */}
      <motion.div
        onClick={onPowerPress}
        whileTap={onPowerPress ? { scale: 0.9 } : undefined}
        style={{
          position: "absolute",
          ...(isLandscape
            ? { right: -3, top: 64, width: 3, height: 60 }
            : { right: -3, top: 160, width: 3, height: 66 }),
          background: btnGrad,
          borderRadius: isLandscape ? "0 3px 3px 0" : "0 3px 3px 0",
          boxShadow: "2px 0 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
          cursor: onPowerPress ? "pointer" : "default",
        }}
      />
      {/* Volume Up */}
      <div
        style={{
          position: "absolute",
          ...(isLandscape
            ? { left: -3, top: 54, width: 3, height: 42 }
            : { left: -3, top: 148, width: 3, height: 44 }),
          background: btnGrad,
          borderRadius: isLandscape ? "3px 0 0 3px" : "3px 0 0 3px",
          boxShadow: "-2px 0 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      />
      {/* Volume Down */}
      <div
        style={{
          position: "absolute",
          ...(isLandscape
            ? { left: -3, top: 108, width: 3, height: 42 }
            : { left: -3, top: 208, width: 3, height: 44 }),
          background: btnGrad,
          borderRadius: isLandscape ? "3px 0 0 3px" : "3px 0 0 3px",
          boxShadow: "-2px 0 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      />

      {/* ── Screen Container ── */}
      <motion.div
        animate={{
          top: bezelH,
          left: bezelV,
          width: screenW,
          height: screenH,
          borderRadius: isLandscape ? 18 : 26,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        style={{
          position: "absolute",
          overflow: "hidden",
          background: "#0a0a0c",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.9) inset",
        }}
      >
        {/* Full-screen content -edge to edge */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
          }}
        >
          {children}
        </div>

        {/* In-progress corner strip */}
        <div
          style={{
            position: "absolute",
            right: -32,
            bottom: 14,
            width: 124,
            height: 18,
            transform: "rotate(-45deg)",
            background: "linear-gradient(90deg, #22c55e 0%, #16a34a 100%)",
            color: "#f0fdf4",
            fontSize: 8,
            fontWeight: 700,
            letterSpacing: 0.5,
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
            pointerEvents: "none",
            zIndex: 20,
            fontFamily: "-apple-system, sans-serif",
          }}
        >
          In Progress
        </div>
      </motion.div>

      {/* ── Frame specular / shine overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.45) 0%, transparent 30%, rgba(0,0,0,0.05) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Camera pill (top-center in portrait, left-center in landscape) ── */}
      <div
        style={{
          position: "absolute",
          ...(isLandscape
            ? {
                left: bezelV / 2 - 5,
                top: "50%",
                transform: "translateY(-50%)",
                width: 10,
                height: 10,
              }
            : {
                top: bezelH / 2 - 5,
                left: "50%",
                transform: "translateX(-50%)",
                width: 10,
                height: 10,
              }),
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 35%, #2a2a2c, #0a0a0c)",
          boxShadow: "0 0 0 1.5px rgba(255,255,255,0.06), inset 0 0 4px rgba(0,0,0,0.8)",
        }}
      />
    </motion.div>
  );
}
