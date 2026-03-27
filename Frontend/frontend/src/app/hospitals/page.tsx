// app/hospitals/page.tsx
"use client";

import dynamic from "next/dynamic";
import { useHospitals } from "@/hooks/useHospitals";

const Map = dynamic(() => import("../../components/MapComponent"), { 
  ssr: false,
  loading: () => <div style={{ height: "100vh", background: "#f3f4f6" }} /> 
});

export default function HospitalsPage() {
  const { hospitals, userLocation, loading } = useHospitals();

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={headerStyle}>
        🏥 Nearby Hospitals {loading && "(Loading...)"}
      </header>

      <main style={{ flex: 1 }}>
        <Map hospitals={hospitals} userLocation={userLocation} />
      </main>
    </div>
  );
}

const headerStyle = {
  padding: "12px",
  background: "#0f172a",
  color: "white",
  textAlign: "center" as const,
  fontWeight: "bold",
};