"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function getPlatformStats() {
    try {
        const response = await fetch(`${API_URL}/stats/platform`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store", // Always fetch fresh data
        });

        if (!response.ok) {
            return { success: false, error: "Failed to fetch platform statistics" };
        }

        const data = await response.json();
        return { success: true, stats: data };
    } catch (error) {
        console.error("Error fetching platform stats:", error);
        return { success: false, error: "An unexpected error occurred" };
    }
}

export async function getUserStats(token: string) {
    try {
        const response = await fetch(`${API_URL}/stats/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!response.ok) {
            return { success: false, error: "Failed to fetch user statistics" };
        }

        const data = await response.json();
        return { success: true, stats: data };
    } catch (error) {
        console.error("Error fetching user stats:", error);
        return { success: false, error: "An unexpected error occurred" };
    }
}

export async function getTeacherStats(token: string) {
    try {
        const response = await fetch(`${API_URL}/stats/teacher`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!response.ok) {
            return { success: false, error: "Failed to fetch teacher statistics" };
        }

        const data = await response.json();
        return { success: true, stats: data };
    } catch (error) {
        console.error("Error fetching teacher stats:", error);
        return { success: false, error: "An unexpected error occurred" };
    }
}
