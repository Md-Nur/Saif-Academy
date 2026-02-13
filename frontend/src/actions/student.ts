"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function formatError(detail: any): string {
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) {
        return detail.map(err => `${err.loc?.join(".") || "error"}: ${err.msg}`).join(", ");
    }
    if (typeof detail === "object" && detail !== null) {
        return JSON.stringify(detail);
    }
    return "An unexpected error occurred";
}

async function getAuthToken() {
    const cookieStore = await cookies();
    return cookieStore.get("token")?.value;
}

export async function uploadSubmission(data: any) {
    const token = await getAuthToken();
    if (!token) return { error: "Unauthorized" };

    try {
        const res = await fetch(`${API_URL}/submissions/upload`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { error: formatError(errorData.detail) || "Upload failed" };
        }

        revalidatePath("/dashboard/student");
        return { success: true };
    } catch (err: any) {
        return { error: formatError(err.message) };
    }
}

export async function getMySubmissions() {
    const token = await getAuthToken();
    if (!token) return { error: "Unauthorized" };

    try {
        const res = await fetch(`${API_URL}/submissions/my`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { error: formatError(errorData.detail) || "Failed to fetch" };
        }

        const submissions = await res.json();
        return { success: true, submissions };
    } catch (err: any) {
        return { error: formatError(err.message) };
    }
}
