"use client";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Hospital } from "@/types/hospital";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});


export default function MapComponent({
  hospitals,
  userLocation,
}: {
  hospitals: Hospital[];
  userLocation: [number, number] | null;
}) {
  const center = userLocation || [27.7, 85.33]; // fallback Kathmandu

  return (
    <MapContainer center={center as any} zoom={13} style={{ height: "100%", width: "100%" }}>
      
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User Location */}
      {userLocation && (
        <CircleMarker
          center={userLocation}
          radius={8}
          pathOptions={{ color: "blue" }}
        >
          <Popup>📍 Your Location</Popup>
        </CircleMarker>
      )}

      {/* Hospitals */}
      {hospitals.map((h) => (
        <Marker key={h.id} position={[h.latitude, h.longitude]}>
          <Popup>
            <div style={{ fontSize: "14px" }}>
              <strong>{h.name}</strong><br />
              {h.address}<br />
              <span style={{ color: "green" }}>
                {(h.distanceInMeters / 1000).toFixed(2)} km away
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}