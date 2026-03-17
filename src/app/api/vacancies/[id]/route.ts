import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const { data, error } = await supabaseServer
      .from("vacancies")
      .select(`
        *,
        employer_profiles (
          company_name,
          description,
          website,
          contact_info
        ),
        categories (
          name
        )
      `)
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Вакансия не найдена" },
        { status: 404 }
      );
    }

    return NextResponse.json({ vacancy: data });
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}