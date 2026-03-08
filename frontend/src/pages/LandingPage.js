import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesGrid from '@/components/landing/FeaturesGrid';
import TrustedBy from '@/components/landing/TrustedBy';
import BentoLayout from '@/components/landing/BentoLayout';
import { DeepDive1, DeepDive2 } from '@/components/landing/DeepDive';
import ComparisonSection from '@/components/landing/ComparisonSection';
import PricingSection from '@/components/landing/PricingSection';
import AdditionalFeatures from '@/components/landing/AdditionalFeatures';
import ExpandableCards from '@/components/landing/ExpandableCards';
import SourcesSection from '@/components/landing/SourcesSection';
import FAQ from '@/components/landing/FAQ';
import Testimonials from '@/components/landing/Testimonials';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white" data-testid="landing-page">
      <Navbar />
      <HeroSection />
      <FeaturesGrid />
      <TrustedBy />
      <BentoLayout />
      <DeepDive1 />
      <DeepDive2 />
      <ComparisonSection />
      <PricingSection />
      <AdditionalFeatures />
      <ExpandableCards />
      <SourcesSection />
      <FAQ />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
