'use client'
import Script from 'next/script'

declare global {
  interface Window {
    kakao: any
  }
}

export default function Map() {
  const loadKakaoMap = () => {
    window.kakao.maps.load(function () {
      const container = document.getElementById('map')
      const options = {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      }
      new window.kakao.maps.Map(container, options)
    })
  }
  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appKey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen"></div>
    </>
  )
}
