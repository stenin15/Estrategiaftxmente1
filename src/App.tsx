import { CountdownTimer } from './components/CountdownTimer'
import { HeroSection } from './components/HeroSection'
import { ContentSection } from './components/ContentSection'
import { FormSection } from './components/FormSection'
import { ModulesSection } from './components/ModulesSection'
import { VideoSection } from './components/VideoSection'
import { RealResultsSection } from './components/RealResultsSection'
import { ProofSection } from './components/ProofSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <CountdownTimer />
      <HeroSection />
      <ContentSection />
      <FormSection />
      <ModulesSection />
      <VideoSection />
      <RealResultsSection />
      <ProofSection />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}

export default App

