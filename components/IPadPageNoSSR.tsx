"use client";

import dynamic from "next/dynamic";

const IPadPage = dynamic(() => import("./IPadPage"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(160deg, #140a2a 0%, #211043 35%, #1a0d35 65%, #10071f 100%)",
        color: "rgba(255,255,255,0.86)",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      }}
    >
      Loading portfolio...
    </div>
  ),
});

export default function IPadPageNoSSR() {
  return <IPadPage />;
}
