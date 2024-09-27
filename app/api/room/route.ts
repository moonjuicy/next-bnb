import prisma from '@/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page') as string
  const limit = searchParams.get('limit') as string

  if (page) {
    // 무한 스크롤 페이지 처리
    const count = await prisma.room.count()
    const skipPage = parseInt(page) - 1
    const rooms = await prisma.room.findMany({ orderBy: { id: 'asc' }, skip: skipPage * parseInt(limit), take: parseInt(limit) });

    return NextResponse.json({
      data: rooms,
      totalCount: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / parseInt(limit)),
    }, {
      status: 200,
    })
  }

  const data = await prisma.room.findMany()
  return NextResponse.json(data, {
    status: 200,
  })
}
