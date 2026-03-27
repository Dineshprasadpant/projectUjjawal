// hooks/useHospitals.ts
import { useState, useEffect } from "react";
import { fetchNearbyHospitals } from "@/services/hospitalService";
import { Hospital } from "@/types/hospital";
export function useHospitals() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
      setUserLocation(coords);

      const data = await fetchNearbyHospitals(coords[0], coords[1]);
      setHospitals(data);
      setLoading(false);
    }, () => setLoading(false));
  }, []);

  return { hospitals, userLocation, loading };
}