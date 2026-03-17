import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const {
      userId,
      title,
      description,
      salary,
      employment_type,
      work_schedule,
      category_id,
    } = await request.json();

    if (!userId || !title || !description) {
      return NextResponse.json(
        { error: "Не заполнены обязательные поля" },
        { status: 400 }
      );
    }

    const { data: employerProfile, error: employerError } = await supabaseServer
      .from("employer_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (employerError || !employerProfile) {
      return NextResponse.json(
        { error: "Профиль работодателя не найден" },
        { status: 404 }
      );
    }

    const { data, error } = await supabaseServer
      .from("vacancies")
      .insert([
        {
          employer_id: userId,
          category_id,
          title,
          description,
          salary,
          employment_type,
          work_schedule,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Ошибка при создании вакансии" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Вакансия создана",
      vacancy: data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}