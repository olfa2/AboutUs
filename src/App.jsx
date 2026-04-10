import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import DemoSection from './components/DemoSection';
import OfferSection from './components/OfferSection';
import RedesignSection from './components/RedesignSection';
import SocialProofSection from './components/SocialProofSection';
import TrustSection from './components/TrustSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <DemoSection />
        <OfferSection />
        <RedesignSection />
        <SocialProofSection />
        <TrustSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
