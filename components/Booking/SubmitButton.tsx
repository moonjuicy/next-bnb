'use client'

import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams, useParams } from 'next/navigation'

import toast from 'react-hot-toast'

export default function SubmitButton({title}: {title: string}) {
  const {status, data: session} = useSession()
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const id = params?.id
  const checkIn = searchParams.get('checkIn')
  const checkOut = searchParams.get('checkOut')
  const guestCount = searchParams.get('guestCount')
  const totalAmount = searchParams.get('totalAmount')
  const totalDays = searchParams.get('totalDays')

  const handleSubmit = async () => {
    const res = await axios.post('/api/bookings', {
      roomId: id,
      checkIn,
      checkOut,
      guestCount,
      totalAmount,
      totalDays,
      status: 'PENDING',
    })

    if (res.status === 200) {
      toast.success('예약 성공')
      router.replace(
        `/payments?customerKey=${session?.user.id}&roomTitle=${title}&checkIn=${checkIn}&checkOut=${checkOut}&guestCount=${guestCount}&totalAmount=${totalAmount}&totalDays=${totalDays}&bookingId=${res?.data.id}`,
      )
    } else {
      toast.error('예약 실패')
    }
  }
  return (
    <div>
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-rose-600 hover:bg-rose-500 px-6 py-3 text-white rounded-md w-full"
      >
        확인 및 결제
      </button>
    </div>
  )
}
