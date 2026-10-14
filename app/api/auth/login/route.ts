import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serializeBigInt } from '../../utils';

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

  if (!user || !user.password || !user.is_active) {
    return NextResponse.json(
      { message: 'Usuario o contraseña incorrectos' },
      { status: 401 }
    );
  }

  const person = await prisma.ibrm_person.findUnique({
    where: { user_id: user.id },
  });

  return NextResponse.json(serializeBigInt({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.is_superuser || user.is_staff ? 'admin' : 'user',
    person: person
  }));
}
