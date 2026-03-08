import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Animals } from '@/components/Animals'
import { AdoptionProcess } from '@/components/AdoptionProcess'
import { Donations } from '@/components/Donations'
import { SocialProof } from '@/components/SocialProof'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Animals />
      <AdoptionProcess />
      <Donations />
      <SocialProof />
      <Footer />
    </>
  )
}
