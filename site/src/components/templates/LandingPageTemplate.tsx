import React from 'react'
import { HeroSection } from '../organisms/HeroSection'
import { AboutSection } from '../organisms/AboutSection'
import { EcosystemSection } from '../organisms/EcosystemSection'
import { ChallengesSection } from '../organisms/ChallengesSection'
import { MethodologySection } from '../organisms/MethodologySection'
import { AchievementsSection } from '../organisms/AchievementsSection'
import { ImpactSection } from '../organisms/ImpactSection'
import { FutureSection } from '../organisms/FutureSection'
import { FooterSection } from '../organisms/FooterSection'

export const LandingPageTemplate: React.FC = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <EcosystemSection />
      <ChallengesSection />
      {/* <MethodologySection /> */}
      <AchievementsSection />
      <ImpactSection />
      <FutureSection />
      <FooterSection />
    </main>
  )
}

