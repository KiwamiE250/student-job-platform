export type UserRole = "student" | "employer" | "admin";

export interface Vacancy {
  id: string;
  title: string;
  company_name: string;
  description: string;
  salary?: number;
  employment_type?: string;
  created_at?: string;
}

export interface Application {
  id: string;
  vacancy_id: string;
  student_id: string;
  status: "pending" | "reviewed" | "invited" | "rejected";
  created_at?: string;
}