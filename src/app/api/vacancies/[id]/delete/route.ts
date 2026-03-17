import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

type Params = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const { userId } = await request.json();

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
        { error: "Вы не можете удалить эту вакансию" },
        { status: 403 }
      );
    }

    const { error } = await supabaseServer
      .from("vacancies")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: "Ошибка при удалении вакансии" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Вакансия удалена",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}