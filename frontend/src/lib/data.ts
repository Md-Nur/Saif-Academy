import { fetcher, fetchList } from "./server-api";
import { Course, Batch, User } from "./types";

// Fetch current user
export async function getMe() {
  return await fetcher<User>("/auth/me");
}

// Fetch pending subscriptions with optional filters
export async function getPendingSubscriptions(batchId?: string, month?: string, courseId?: string) {
  const params: any = {};
  // Sanitize and only add if valid value (not "undefined" string, not "All")
  if (batchId && batchId !== "All" && batchId !== "undefined") params.batch_id = batchId;
  if (courseId && courseId !== "All" && courseId !== "undefined") params.course_id = courseId;
  if (month && month !== "All" && month !== "undefined") params.month = month;

  return await fetchList("/subscriptions/pending", params);
}

// Fetch routines for a batch
export async function getRoutines(batchId: string) {
  return await fetchList("/live/routines", { batch_id: batchId });
}

// Fetch live sessions for a batch
export async function getSessions(batchId: string) {
  return await fetchList("/live/sessions", { batch_id: batchId });
}

// Fetch current user's subscriptions
export async function getMySubscriptions() {
  return await fetchList("/subscriptions/me");
}

// Fetch live classes materials
export async function getLiveClasses() {
  return await fetchList("/materials/live-classes");
}

// Fetch all batches
export async function getBatches() {
  return await fetchList<Batch>("/batches/");
}

// Fetch single batch by ID
export async function getBatch(id: string) {
  return await fetcher<Batch>(`/batches/${id}`);
}

// Fetch single course by ID
export async function getCourse(id: string) {
  return await fetcher<Course>(`/courses/${id}`);
}

// Fetch all courses
export async function getCourses() {
  return await fetchList<Course>("/courses/");
}

// Fetch grammar quiz questions
export async function getQuizQuestions() {
  return await fetchList("/quizzes/questions");
}

// Fetch batches user is subscribed to
export async function getMyBatches() {
  return await fetchList("/subscriptions/my-batches");
}

// Fetch courses user is subscribed to
export async function getMyCourses() {
  return await fetchList("/subscriptions/my-courses");
}
