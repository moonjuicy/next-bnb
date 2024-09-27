'use client'
import {useState} from 'react'
import Map from '@/components/Map'
import { RoomType } from '@/interface'
import SelectedRoom from './SelectedRoom'
export default function MapPage() {
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null)
  return (
    <>
      <SelectedRoom selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
      <Map setSelectedRoom={setSelectedRoom} />
    </>
  )
}
