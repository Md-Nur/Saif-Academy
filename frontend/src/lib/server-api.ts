import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Helper to get headers with token
async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Unified fetcher function to handle common logic
export async function fetcher<T>(endpoint: string, params: any = {}): Promise<T | null> {
  try {
    const headers = await getAuthHeaders();
    const res = await axios.get(`${API_URL}${endpoint}`, {
      headers,
      params,
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
      return null;
    }
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
}

// For cases where we want an empty array on error (lists)
export async function fetchList<T>(endpoint: string, params: any = {}): Promise<T[]> {
  const data = await fetcher<T[]>(endpoint, params);
  return data || [];
}
