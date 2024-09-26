import prisma from '@/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const data = await prisma.room.findMany();
  return NextResponse.json(data, {
    status: 200,
  })
}