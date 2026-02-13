"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function getTestimonials() {
    try {
        const response = await fetch(`${API_URL}/testimonials/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            return { success: false, error: "Failed to fetch testimonials" };
        }

        const data = await response.json();
        return { success: true, testimonials: data };
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return { success: false, error: "An unexpected error occurred" };
    }
}

export async function createTestimonial(
    token: string,
    testimonialData: {
        name: string;
        role: string;
        content: string;
        rating: number;
        avatar?: string;
    }
) {
    try {
        const response = await fetch(`${API_URL}/testimonials/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(testimonialData),
        });

        if (!response.ok) {
            const error = await response.json();
            return { success: false, error: error.detail || "Failed to create testimonial" };
        }

        const data = await response.json();
        return { success: true, testimonial: data };
    } catch (error) {
        console.error("Error creating testimonial:", error);
        return { success: false, error: "An unexpected error occurred" };
    }
}

export async function deleteTestimonial(token: string, testimonialId: string) {
    try {
        const response = await fetch(`${API_URL}/testimonials/${testimonialId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            return { success: false, error: error.detail || "Failed to delete testimonial" };
        }

        return { success: true };
    } catch (error) {
        console.error("Error deleting testimonial:", error);
        return { success: false, error: "An unexpected error occurred" };
    }
}
