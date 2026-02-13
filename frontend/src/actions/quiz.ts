"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function getServerQuizQuestions() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    try {
        const res = await fetch(`${API_URL}/quizzes/questions`, {
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            next: { revalidate: 60 } // Optional: Cache for 60 seconds
        });

        if (!res.ok) {
            return null;
        }

        return await res.json();
    } catch (err) {
        console.error("Failed to fetch quizzes via server action", err);
        return null;
    }
}
