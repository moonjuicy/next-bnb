'use client'
/*global kakao*/

import Script from 'next/script'
import { useQuery } from 'react-query'
import axios from 'axios'
import { RoomType } from '@/interface'
import { BsMap } from 'react-icons/bs'

declare global {
  interface Window {
    kakao: any
  }
}

const DEFAULT_LAT = 37.565337
const DEFAULT_LNG = 126.9772095
const ZOOM_LEVEL = 7

export default function Map() {
  const fetchRooms = async () => {
    const { data } = await axios('/api/rooms')
    return data as RoomType[]
  }

  const { data: rooms, isSuccess } = useQuery('map-rooms', fetchRooms)

  // @see - https://apis.map.kakao.com/web/documentation/#load
  const loadKakoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map')
      const mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
        level: ZOOM_LEVEL,
      }

      const map = new window.kakao.maps.Map(mapContainer, mapOption)

      // @see - https://apis.map.kakao.com/web/sample/basicMarker/
      rooms?.map((room) => {
        // 마커가 표시될 위치입니다
        const markerPosition = new window.kakao.maps.LatLng(room.lat, room.lng)
        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        })
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map)
      })
    })
  }
  return (
    <>
      {isSuccess && (
        <Script
          strategy="afterInteractive"
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
          onReady={loadKakoMap}
        />
      )}
      <div id="map" className="w-full h-screen" />
    </>
  )
}

export function MapButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex gap-2 items-center text-sm bg-black rounded-full text-white px-5 py-3.5 shadow-sm hover:shadow-lg mx-auto sticky bottom-12"
    >
      지도 표시하기 <BsMap className="text-xs" />
    </button>
  )
}