export { default } from 'next-auth/middleware'

export const config = { matcher: ['/users/mypage', '/users/info', '/users/likes', '/users/comments', '/users/bookings/:path*'] }