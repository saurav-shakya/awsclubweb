import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function DELETE() {
  return NextResponse.json({ ok: true }, { status: 200 });
}
