"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function submitPayment(paymentData: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await fetch(`${API_URL}/subscriptions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paymentData),
    });

    const data = await res.json();

    if (!res.ok) {
        // Backend detail
      return { error: data.detail || "Payment submission failed" };
    }
    
    revalidatePath("/dashboard/student");
    return { success: true, data };
  } catch (err: any) {
    return { error: "An unexpected error occurred" };
  }
}
