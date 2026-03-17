import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "Не передан userId" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer
      .from("employer_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      return NextResponse.json(
        { error: "Ошибка при получении профиля" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { message: "Профиль не найден", profile: null },
        { status: 200 }
      );
    }

    return NextResponse.json({ profile: data });
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}