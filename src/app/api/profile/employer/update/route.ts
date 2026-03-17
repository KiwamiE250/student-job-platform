import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const {
      userId,
      company_name,
      description,
      website,
      contact_info,
    } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "Не передан userId" },
        { status: 400 }
      );
    }

    const { data: existingProfile } = await supabaseServer
      .from("employer_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (existingProfile) {
      const { data, error } = await supabaseServer
        .from("employer_profiles")
        .update({
          company_name,
          description,
          website,
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
        message: "Профиль работодателя обновлён",
        profile: data,
      });
    }

    const { data, error } = await supabaseServer
      .from("employer_profiles")
      .insert([
        {
          id: userId,
          company_name,
          description,
          website,
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
      message: "Профиль работодателя создан",
      profile: data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}