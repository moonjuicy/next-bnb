'use client'

import CategoryList from '@/components/CategoryList'
import Loader from '@/components/Loader'
import { GridLayout, RoomItem } from '@/components/RoomList'
import { RoomType } from '@/interface'
import { useQuery } from 'react-query'

export default function Home() {
  const fetchRoom = async () => {
    const res = await fetch('/api/room')
    const data = await res.json()
    return data
  }

  const { data, isError, isLoading } = useQuery('rooms', fetchRoom)
  if (isLoading) return <Loader className="mt-60 mb-40" />
  return (
    <>
      <CategoryList />
      <GridLayout>{data?.map((room: RoomType) => <RoomItem key={room.id} room={room} />)}</GridLayout>
    </>
  )
}
