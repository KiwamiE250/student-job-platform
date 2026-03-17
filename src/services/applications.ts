import { supabase } from "@/lib/supabase"

export async function applyToVacancy(userId: string, vacancyId: string) {
  return supabase.from("applications").insert({
    user_id: userId,
    vacancy_id: vacancyId
  })
}