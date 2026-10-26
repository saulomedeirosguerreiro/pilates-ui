import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { Benefits } from '../components/sections/Benefits'
import { Faq } from '../components/sections/Faq'
import { FinalCta } from '../components/sections/FinalCta'
import { Hero } from '../components/sections/Hero'
import { PreSaleOffer } from '../components/sections/PreSaleOffer'
import { Services } from '../components/sections/Services'
import { Studio } from '../components/sections/Studio'

export function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Studio />
        <Services />
        <Benefits />
        <PreSaleOffer />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
