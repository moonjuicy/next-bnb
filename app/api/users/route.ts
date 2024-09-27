import { NextRequest, NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import prisma from '@/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 })
  }

  const data = await prisma.user.findFirst({
    where: {
      id: session?.user?.id,
    },
    include: {
      account: true,
    },
  })

  return NextResponse.json({ data }, { status: 200 })
}

export async function PUT(req: NextRequest) {
  const formData = await req.json()
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 })
  }

  const user = await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: { ...formData },
  })

  return NextResponse.json({ user }, { status: 200 })
}
