import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db/prisma';
import { requireAuth } from '@/lib/auth/requireAuth';

const projectCreateSchema = z.object({
  title: z.string().min(1, 'Název je povinný').max(200),
  description: z.string().min(1, 'Popis je povinný'),
  tags: z.array(z.string()).default([]),
  date: z.string().datetime().nullable().optional(),
  author: z.string().nullable().optional(),
  status: z.enum(['IN_PROGRESS', 'PLANNED', 'COMPLETED']).default('IN_PROGRESS'),
});

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  const projects = await prisma.project.findMany({
    orderBy: [{ updatedAt: 'desc' }],
  });

  return NextResponse.json({ projects });
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.ok) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Neplatný JSON' }, { status: 400 });
  }

  const parsed = projectCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const { title, description, tags, date, author, status } = parsed.data;

  const project = await prisma.project.create({
    data: {
      title,
      description,
      tags,
      date: date ? new Date(date) : null,
      author: author ?? null,
      status,
      createdById: auth.user.userId,
    },
  });

  return NextResponse.json({ project }, { status: 201 });
}
