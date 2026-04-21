import Hero from '@/components/sections/hero'
import StatsBar from '@/components/sections/stats-bar'
import ServicesPreview from '@/components/sections/services-preview'
import WhyChooseUs from '@/components/sections/why-choose-us'
import BeforeAfter from '@/components/sections/before-after'
import SocialFeed from '@/components/sections/social-feed'
import Testimonials from '@/components/sections/testimonials'
import Team from '@/components/sections/team'
import CtaBanner from '@/components/sections/cta-banner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesPreview />
      <WhyChooseUs />
      <BeforeAfter />
      <Team />
      <Testimonials />
      <SocialFeed />
      <CtaBanner />
    </>
  )
}
