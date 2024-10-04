import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

import prisma from '@/db'

interface PaymentProps {
  bookingId: string
  amount: string
  orderId: string
  orderName: string
  status:
    | 'READY'
    | 'IN_PROGRESS'
    | 'WAITING_FOR_DEPOSIT'
    | 'DONE'
    | 'CANCELED'
    | 'PARTIAL_CANCELED'
    | 'ABORTED'
    | 'EXPIRED'
}

interface PaymentApproveProps {
  orderId: string
  paymentKey: string
  amount: string
  method: string
  receiptUrl: string
  approvedAt: string
  status:
    | 'READY'
    | 'IN_PROGRESS'
    | 'WAITING_FOR_DEPOSIT'
    | 'DONE'
    | 'CANCELED'
    | 'PARTIAL_CANCELED'
    | 'ABORTED'
    | 'EXPIRED'
  bookingStatus: 'CANCEL' | 'SUCCESS' | 'PENDING' | 'FAILED'
  failureCode: string
  failureMessage: string
  cardNumber: string
  type: 'NORMAL' | 'BILLING' | 'BRANDPAY'
  mId: string
  requestedAt: string
  cardType: string
  checkoutUrl: string
}

export async function POST(req: Request) {
  // 결제 요청 값을 생성한다
  const session = await getServerSession(authOptions)
  const formData = await req.json()

  const { bookingId, amount, status, orderId, orderName }: PaymentProps =
    formData

  if (!session?.user) {
    return NextResponse.json({ error: 'unauthorized user' }, { status: 401 })
  }

  const payment = await prisma.payment.create({
    data: {
      bookingId: bookingId,
      amount: parseInt(amount),
      status: status,
      orderId: orderId,
      orderName: orderName,
    },
  })

  return NextResponse.json(payment, {
    status: 200,
  })
}

export async function PATCH(req: Request) {
  // 결제 승인 응답값을 업데이트한다
  const formData = await req.json()
  const {
    orderId,
    paymentKey,
    amount,
    method,
    receiptUrl,
    approvedAt,
    bookingStatus,
    status,
    failureCode,
    failureMessage,
    cardNumber,
    type,
    mId,
    requestedAt,
    cardType,
    checkoutUrl,
  }: PaymentApproveProps = formData

  const payment = await prisma.payment.update({
    where: {
      orderId: orderId,
    },
    data: {
      paymentKey: paymentKey,
      method: method,
      receiptUrl: receiptUrl,
      approvedAt: approvedAt,
      amount: parseInt(amount),
      failureCode: failureCode,
      failureMessage: failureMessage,
      status: status,
      cardNumber: cardNumber,
      type: type,
      mId: mId,
      requestedAt: requestedAt,
      cardType: cardType,
      checkoutUrl: checkoutUrl,
    },
  })

  await prisma.booking.update({
    where: {
      id: payment.bookingId,
    },
    data: {
      status: bookingStatus,
    },
  })

  return NextResponse.json(payment, {
    status: 200,
  })
}