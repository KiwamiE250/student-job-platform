import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const {
      userId,
      full_name,
      university,
      faculty,
      course,
      skills,
      interests,
      contact_info,
    } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "Не передан userId" },
        { status: 400 }
      );
    }

    const { data: existingProfile } = await supabaseServer
      .from("student_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (existingProfile) {
      const { data, error } = await supabaseServer
        .from("student_profiles")
        .update({
          full_name,
          university,
          faculty,
          course,
          skills,
          interests,
          contact_info,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)
        .select()
        .single();

      if (error) {
        return NextResponse.json(
          { error: "Ошибка при обновлении профиля" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: "Профиль студента обновлён",
        profile: data,
      });
    }

    const { data, error } = await supabaseServer
      .from("student_profiles")
      .insert([
        {
          id: userId,
          full_name,
          university,
          faculty,
          course,
          skills,
          interests,
          contact_info,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Ошибка при создании профиля" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Профиль студента создан",
      profile: data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}