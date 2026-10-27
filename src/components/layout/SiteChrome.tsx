import type { ReactNode } from 'react'
import { ScrollProgressBar } from '../motion/ScrollProgressBar'
import { SmoothScroll } from '../motion/SmoothScroll'
import { Footer } from './Footer'
import { Header } from './Header'

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <ScrollProgressBar />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
