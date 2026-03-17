import { supabase } from "@/lib/supabase"

export async function signUp(email: string, password: string) {
  return supabase.auth.signUp({
    email,
    password
  })
}