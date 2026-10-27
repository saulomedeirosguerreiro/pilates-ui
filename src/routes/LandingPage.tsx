import { SiteChrome } from '../components/layout/SiteChrome'
import { Classes } from '../components/sections/Classes'
import { Hero } from '../components/sections/Hero'
import { Instructors } from '../components/sections/Instructors'
import { Pricing } from '../components/sections/Pricing'
import { Testimonials } from '../components/sections/Testimonials'

export function LandingPage() {
  return (
    <SiteChrome>
      <Hero />
      <Classes />
      <Instructors />
      <Pricing />
      <Testimonials />
    </SiteChrome>
  )
}
