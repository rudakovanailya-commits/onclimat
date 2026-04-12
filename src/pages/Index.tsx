import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PromosSection from "@/components/PromosSection";
import TrustSection from "@/components/TrustSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import CatalogSection from "@/components/CatalogSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import PortfolioSection from "@/components/PortfolioSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import ReviewsSection from "@/components/ReviewsSection";
import ArticlesSection from "@/components/ArticlesSection";
import Footer from "@/components/Footer";
import SilkCSSBackground from "@/components/SilkCSSBackground";
import ChatWidget from "@/components/ChatWidget";
import ScrollReveal from "@/components/ScrollReveal";
import SocialProofNotifications from "@/components/SocialProofNotifications";

const Index = () => (
  <div className="min-h-screen">
    <SilkCSSBackground />
    <Header />
    <HeroSection />
    <SocialProofNotifications />
    <ScrollReveal>
      <TrustSection />
    </ScrollReveal>
    <ScrollReveal delay={100}>
      <HowWeWorkSection />
    </ScrollReveal>
    <ScrollReveal>
      <PromosSection />
    </ScrollReveal>
    <ScrollReveal delay={100}>
      <CatalogSection />
    </ScrollReveal>
    <ScrollReveal>
      <ServicesSection />
    </ScrollReveal>
    <ScrollReveal delay={100}>
      <PricingSection />
    </ScrollReveal>
    <ScrollReveal>
      <PortfolioSection />
    </ScrollReveal>
    <ScrollReveal delay={100}>
      <BeforeAfterSection />
    </ScrollReveal>
    <ScrollReveal delay={100}>
      <ReviewsSection />
    </ScrollReveal>
    <ScrollReveal>
      <ArticlesSection />
    </ScrollReveal>
    <Footer />
    <ChatWidget />
  </div>
);

export default Index;
