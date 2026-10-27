import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { Classes } from '../components/sections/Classes'
import { Hero } from '../components/sections/Hero'
import { Instructors } from '../components/sections/Instructors'
import { Pricing } from '../components/sections/Pricing'
import { Testimonials } from '../components/sections/Testimonials'
import { ScrollProgressBar } from '../components/motion/ScrollProgressBar'
import { SmoothScroll } from '../components/motion/SmoothScroll'

export function LandingPage() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgressBar />
      <Header />
      <main>
        <Hero />
        <Classes />
        <Instructors />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
