// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json();

    if (!email || !password || !role) {
      return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
    }

    if (!["student", "employer", "admin"].includes(role)) {
      return NextResponse.json({ error: "Неверная роль" }, { status: 400 });
    }

    // Проверяем, есть ли пользователь с таким email
    const { data: existingUser } = await supabaseServer
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: "Пользователь уже существует" }, { status: 400 });
    }

    // Создаем пользователя
    const { data, error } = await supabaseServer
      .from("users")
      .insert([{ email, password, role }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ message: "Пользователь создан", user: data });
  } catch (err) {
    return NextResponse.json({ error: "Ошибка регистрации" }, { status: 500 });
  }
}