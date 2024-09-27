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

export default function Map({
  setSelectedRoom,
}: {
  setSelectedRoom: (room: RoomType | null) => void
}) {
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
        // custom overlay를 설정해줍니다

        // 마커 이미지 설정
        const imageSrc = '/images/marker-icon.png'
        const imageSize = new window.kakao.maps.Size(30, 30)
        const imageOption = { offset: new window.kakao.maps.Point(16, 46) }

        // 마커 이미지 생성
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

        // 마커 생성하기
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        })

        marker.setMap(map)

        const content = `<div class="custom_overlay">${room.price?.toLocaleString()}원</div>`

        // custom overlay를 생성합니다
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
        })
        // 커스텀 오버레이가 지도 위에 표시되도록 설정합니다
        customOverlay.setMap(map)

        // 마커 클릭 이벤트
        window.kakao.maps.event.addListener(marker, 'click', () => {
          setSelectedRoom(room)
        })

        window.kakao.maps.event.addListener(map, 'mouseover', () => {
          setSelectedRoom(null)
        })
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
