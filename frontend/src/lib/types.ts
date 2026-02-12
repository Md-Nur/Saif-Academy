export interface Course {
  id: string;
  title: string;
  description: string;
  classLevel: number;
  board: string;
  subject: string;
  price: number;
  course_type: "live" | "recorded";
  is_free: boolean;
  video_url?: string;
  instituteName?: string;
  meeting_link?: string;
  created_at?: string;
}

export interface Batch {
  id: string;
  name: string;
  class_level: number;
  subject: string;
  price_per_month: number;
  teacher_id?: string;
  teacher_name?: string;
  description?: string;
  meeting_link?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
  class_level?: number;
  phone?: string;
  institute_name?: string;
  created_at: string;
}

export interface Entity {
  id: string;
  title?: string;
  name?: string;
  classLevel?: number;
  class_level?: number;
  description?: string;
  desc?: string;
  price?: number;
  price_per_month?: number;
  type?: string;
  course_type?: string;
  is_free?: boolean;
  video_url?: string;
}
