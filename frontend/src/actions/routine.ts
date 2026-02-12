"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function getRoutines(id: string, type: "batch" | "course" = "batch") {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { error: "Not authenticated" };
  }

  try {
    const queryParam = type === "batch" ? `batch_id=${id}` : `course_id=${id}`;
    const res = await fetch(`${API_URL}/live/routines?${queryParam}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return { error: "Failed to fetch routines" };
    }

    const data = await res.json();
    return { success: true, routines: data };
  } catch (err: any) {
    return { error: "An unexpected error occurred: " + err.message };
  }
}

export async function createRoutine(routineData: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { error: "Not authenticated" };
  }

  try {
    const res = await fetch(`${API_URL}/live/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(routineData),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.detail || "Failed to create routine" };
    }

    return { success: true, routine: data };
  } catch (err: any) {
    return { error: "An unexpected error occurred: " + err.message };
  }
}

export async function updateRoutine(routineId: string, routineData: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { error: "Not authenticated" };
  }

  try {
    const res = await fetch(`${API_URL}/live/routines/${routineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(routineData),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.detail || "Failed to update routine" };
    }

    return { success: true, routine: data };
  } catch (err: any) {
    return { error: "An unexpected error occurred: " + err.message };
  }
}

export async function deleteRoutine(routineId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { error: "Not authenticated" };
  }

  try {
    const res = await fetch(`${API_URL}/live/routines/${routineId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.detail || "Failed to delete routine" };
    }

    return { success: true };
  } catch (err: any) {
    return { error: "An unexpected error occurred: " + err.message };
  }
}

// Live Session Actions

export async function createSession(sessionData: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { error: "Not authenticated" };
  }

  try {
    const res = await fetch(`${API_URL}/live/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(sessionData),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.detail || "Failed to create session" };
    }

    return { success: true, session: data };
  } catch (err: any) {
    return { error: "An unexpected error occurred: " + err.message };
  }
}

export async function getSessions(id: string, type: "batch" | "course" = "batch") {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { error: "Not authenticated" };
  }

  try {
    const queryParam = type === "batch" ? `batch_id=${id}` : `course_id=${id}`;
    const res = await fetch(`${API_URL}/live/sessions?${queryParam}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return { error: "Failed to fetch sessions" };
    }

    const data = await res.json();
    return { success: true, sessions: data };
  } catch (err: any) {
    return { error: "An unexpected error occurred: " + err.message };
  }
}

export async function getNextSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { error: "Not authenticated" };
  }

  try {
    const res = await fetch(`${API_URL}/live/student/next-session`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      return { error: "Failed to fetch next session" };
    }

    const data = await res.json();
    return { success: true, nextSession: data.next_session };
  } catch (err: any) {
    return { error: "An unexpected error occurred: " + err.message };
  }
}

export async function getTeacherNextSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { error: "Not authenticated" };
  }

  try {
    const res = await fetch(`${API_URL}/live/teacher/next-session`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      return { error: "Failed to fetch next session" };
    }

    const data = await res.json();
    return { success: true, nextSession: data.next_session };
  } catch (err: any) {
    return { error: "An unexpected error occurred: " + err.message };
  }
}
