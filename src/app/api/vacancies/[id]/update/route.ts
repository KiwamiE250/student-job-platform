import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

type Params = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const {
      userId,
      title,
      description,
      salary,
      employment_type,
      work_schedule,
      category_id,
    } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "Не передан userId" },
        { status: 400 }
      );
    }

    const { data: vacancy, error: vacancyError } = await supabaseServer
      .from("vacancies")
      .select("*")
      .eq("id", id)
      .single();

    if (vacancyError || !vacancy) {
      return NextResponse.json(
        { error: "Вакансия не найдена" },
        { status: 404 }
      );
    }

    if (vacancy.employer_id !== userId) {
      return NextResponse.json(
        { error: "Вы не можете редактировать эту вакансию" },
        { status: 403 }
      );
    }

    const { data, error } = await supabaseServer
      .from("vacancies")
      .update({
        title,
        description,
        salary,
        employment_type,
        work_schedule,
        category_id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Ошибка при обновлении вакансии" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Вакансия обновлена",
      vacancy: data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}