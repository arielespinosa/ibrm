import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body ?? {};

  if (!username || !password) {
    return NextResponse.json(
      { message: 'Usuario y contraseña son obligatorios' },
      { status: 400 }
    );
  }

  const user = await prisma.auth_user.findUnique({
    where: { username },
  });

  if (!user || user.password !== password || !user.is_active) {
    return NextResponse.json(
      { message: 'Usuario o contraseña incorrectos' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.is_superuser || user.is_staff ? 'admin' : 'user',
  });
}
