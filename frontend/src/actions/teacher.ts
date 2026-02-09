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

export async function verifySubscription(id: string) {
  const token = await getAuthToken();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_URL}/subscriptions/${id}/verify`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
        const data = await res.json();
        return { error: formatError(data.detail) || "Verification failed" };
    }
    
    revalidatePath("/dashboard/teacher");
    return { success: true };
  } catch (err: any) {
    return { error: formatError(err.message) };
  }
}

export async function uploadMaterial(uploadData: any) {
  const token = await getAuthToken();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_URL}/materials/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(uploadData),
    });

    if (!res.ok) {
        const data = await res.json();
        return { error: formatError(data.detail) || "Upload failed" };
    }

    revalidatePath("/dashboard/teacher");
    return { success: true };
  } catch (err: any) {
    return { error: formatError(err.message) };
  }
}

// Batch Management
export async function createBatch(data: any) {
  const token = await getAuthToken();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_URL}/batches/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: formatError(errorData.detail) || "Failed to create batch" };
    }

    revalidatePath("/dashboard/teacher");
    return { success: true };
  } catch (err: any) {
    return { error: formatError(err.message) };
  }
}

export async function updateBatch(id: string, data: any) {
  const token = await getAuthToken();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_URL}/batches/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: formatError(errorData.detail) || "Failed to update batch" };
    }

    revalidatePath("/dashboard/teacher");
    return { success: true };
  } catch (err: any) {
    return { error: formatError(err.message) };
  }
}

export async function deleteBatch(id: string) {
  const token = await getAuthToken();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_URL}/batches/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: formatError(errorData.detail) || "Failed to delete batch" };
    }

    revalidatePath("/dashboard/teacher");
    return { success: true };
  } catch (err: any) {
    return { error: formatError(err.message) };
  }
}

// Course Management
export async function createCourse(data: any) {
  const token = await getAuthToken();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_URL}/courses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: formatError(errorData.detail) || "Failed to create course" };
    }

    revalidatePath("/dashboard/teacher");
    return { success: true };
  } catch (err: any) {
    return { error: formatError(err.message) };
  }
}

export async function updateCourse(id: string, data: any) {
  const token = await getAuthToken();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_URL}/courses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: formatError(errorData.detail) || "Failed to update course" };
    }

    revalidatePath("/dashboard/teacher");
    return { success: true };
  } catch (err: any) {
    return { error: formatError(err.message) };
  }
}

export async function deleteCourse(id: string) {
  const token = await getAuthToken();
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await fetch(`${API_URL}/courses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: formatError(errorData.detail) || "Failed to delete course" };
    }

    revalidatePath("/dashboard/teacher");
    return { success: true };
  } catch (err: any) {
    return { error: formatError(err.message) };
  }
}
