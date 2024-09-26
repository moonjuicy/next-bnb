'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { RecoilRoot } from 'recoil'
interface Props {
  children?: React.ReactNode
}

export const NextProvider = ({ children }: Props) => {
  return <RecoilRoot>{children}</RecoilRoot>
}
export const NextLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className="mt-20 p-10 min-h-[80vh]">{children}</div>
      <Footer />
    </>
  )
}
