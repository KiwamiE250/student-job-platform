// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
    }

    // Ищем пользователя по email
    const { data: user, error } = await supabaseServer
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 });
    }

    // Проверяем пароль
    if (user.password !== password) {
      return NextResponse.json({ error: "Неверный пароль" }, { status: 401 });
    }

    // Возвращаем данные пользователя и роль
    return NextResponse.json({
      message: "Вход успешен",
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    return NextResponse.json({ error: "Ошибка входа" }, { status: 500 });
  }
}