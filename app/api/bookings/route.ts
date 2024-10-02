import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import prisma from '@/db'

interface BookingProps {
  roomId: string
  checkIn: string
  checkOut: string
  guestCount: string
  totalAmount: string
  totalDays: string
}

interface RefundProps {
  id: string
  status: 'SUCCESS' | 'CANCEL'
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const page = searchParams.get('page') as string
  const limit = searchParams.get('limit') as string
  const userId = searchParams.get('userId') as string

  if (id) {
    const booking = await prisma.booking.findFirst({
      where: {
        id: id ? parseInt(id) : {},
      },
      include: {
        room: true,
        user: true,
      },
    })

    return NextResponse.json(booking, { status: 200 })
  } else if (page) {
    const count = await prisma.booking.count({
      where: {
        userId: userId,
      },
    })

    const skipPage = parseInt(page) - 1
    const bookings = await prisma.booking.findMany({
      orderBy: { updatedAt: 'desc' },
      skip: skipPage * parseInt(limit),
      take: parseInt(limit),
      include: {
        room: true,
        user: true,
      },
    })

    return NextResponse.json(
      {
        page: parseInt(page),
        data: bookings,
      },
      { status: 200 },
    )
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const formData = await req.json()

  const { roomId, checkIn, checkOut, guestCount, totalAmount, totalDays }: BookingProps = formData

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized user' }, { status: 401 })
  }

  const booking = await prisma.booking.create({
    data: {
      roomId: parseInt(roomId),
      userId: session.user.id,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guestCount: parseInt(guestCount),
      totalAmount: parseInt(totalAmount),
      totalDays: parseInt(totalDays),
      status: 'SUCCESS',
    },
  })

  return NextResponse.json(booking, { status: 201 })
}

export async function PATCH(req: Request) {
  const formData = await req.json()
  const { id, status }: RefundProps = formData
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized user' }, { status: 401 })
  }

  const result = await prisma.booking.update({
    where: { id: parseInt(id) },
    data: { status: status  },
  })

  return NextResponse.json(result, { status: 200 })
}
