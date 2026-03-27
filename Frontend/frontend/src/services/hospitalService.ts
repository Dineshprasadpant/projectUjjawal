const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import { Hospital } from "@/types/hospital";
export async function fetchNearbyHospitals(lat: number, lon: number): Promise<Hospital[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/Hospitals/nearby?lat=${lat}&lon=${lon}`);//
    
    if (!response.ok) {
      throw new Error("Failed to fetch hospital data");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Hospital Service Error:", error);
    return [];
  }
}