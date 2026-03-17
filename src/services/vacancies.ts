import { supabase } from "@/lib/supabase"

export async function getVacancies() {
  const { data, error } = await supabase
    .from("vacancies")
    .select("*")

  if (error) throw error

  return data
}