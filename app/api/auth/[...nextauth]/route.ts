import NextAuth, { NextAuthOptions } from 'next-auth'
import prisma from '@/db'
import { PrismaAdapter } from '@auth/prisma-adapter'

import KakaoProvider from 'next-auth/providers/kakao'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt' as const,
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 60 * 2,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/users/login',
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id
      }
      return token
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }